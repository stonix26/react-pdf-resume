import { zodToJsonSchema } from 'zod-to-json-schema'
import { importedResumeSchema } from '../src/schema'

type ChatRole = 'user' | 'assistant'

type ChatMessage = {
  role: ChatRole
  content: string
}

const GEMINI_BASE_URL =
  process.env.GEMINI_BASE_URL ??
  'https://generativelanguage.googleapis.com/v1beta/openai'
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash'

const RESUME_SCHEMA_JSON = JSON.stringify(
  zodToJsonSchema(importedResumeSchema, 'resume'),
  null,
  2
)

const CHAT_SYSTEM_PROMPT = `You are an expert resume-building assistant embedded in a resume form app.
Help the user craft a professional resume by asking ONE question at a time. Gather: contact info, professional summary, work experience (company, role, employment type, location, dates, achievements), skills, education, projects, and references.
Keep answers short and practical. Never output JSON in chat mode.`

const GENERATE_SYSTEM_PROMPT = `You generate resumes as strict JSON.
Using the conversation so far, produce a resume object that conforms EXACTLY to this JSON Schema:

${RESUME_SCHEMA_JSON}

Rules:
- Output ONLY a valid JSON object. No markdown, no code fences, no commentary.
- Dates must use YYYY-MM-DD (e.g. "2022-03-01"). startDate is required for every role; include endDate ONLY if the role ended (omit it for current roles).
- locationType must be one of: "On-site" | "Hybrid" | "Remote".
- employmentType must be one of the enum values in the schema.
- link.url must be a valid URL or email; link.type must be one of the enum values in the schema.
- Do NOT invent facts. Only include information the user provided. Use "" for unknown string fields and [] for unknown array fields.
- Do NOT include profilePicture or companyLogo (images cannot be generated).
- summary should be a concise, achievement-oriented professional summary.
- description bullets should be achievement-oriented and specific.`

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })
}

function stripCodeFences(text: string): string {
  const trimmed = text.trim()
  const match = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/)
  return match ? match[1] : trimmed
}

function extractJson(text: string): unknown | null {
  try {
    return JSON.parse(stripCodeFences(text))
  } catch {
    return null
  }
}

function schemaIssues(result: {
  success: false
  error: { issues: Array<{ path: Array<string | number>; message: string }> }
}): string {
  return result.error.issues
    .slice(0, 10)
    .map(issue => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'root'
      return `${path}: ${issue.message}`
    })
    .join('\n')
}

async function callGemini(
  apiKey: string,
  messages: ChatMessage[],
  generate: boolean
): Promise<
  | { ok: true; content: string }
  | { ok: false; status: number; error: string }
> {
  const url = `${GEMINI_BASE_URL}/chat/completions`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: GEMINI_MODEL,
      temperature: generate ? 0.4 : 0.7,
      ...(generate ? { response_format: { type: 'json_object' } } : {}),
      messages: [
        {
          role: 'system',
          content: generate ? GENERATE_SYSTEM_PROMPT : CHAT_SYSTEM_PROMPT
        },
        ...messages.slice(-12)
      ]
    })
  })

  if (!response.ok) {
    const bodyText = await response.text().catch(() => '')
    return {
      ok: false,
      status: response.status,
      error: bodyText || `Gemini request failed (${response.status})`
    }
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const content = data.choices?.[0]?.message?.content

  if (typeof content !== 'string' || content.length === 0) {
    return { ok: false, status: 502, error: 'Gemini returned an empty response' }
  }

  return { ok: true, content }
}

function validateGeneratedResume(
  content: string
): { ok: true; data: unknown } | { ok: false; issues: string } {
  const parsed = extractJson(content)

  if (parsed === null) {
    return { ok: false, issues: 'Response was not valid JSON.' }
  }

  const result = importedResumeSchema.safeParse(parsed)

  if (!result.success) {
    return { ok: false, issues: schemaIssues(result) }
  }

  return { ok: true, data: result.data }
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return json(
      { ok: false, error: 'AI assistant is not configured (missing GEMINI_API_KEY).' },
      500
    )
  }

  let body: { messages?: unknown; generate?: unknown } = {}

  try {
    body = (await request.json()) as typeof body
  } catch {
    return json({ ok: false, error: 'Invalid JSON body.' }, 400)
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return json({ ok: false, error: 'No messages provided.' }, 400)
  }

  const messages = (body.messages as ChatMessage[]).filter(
    message =>
      message &&
      typeof message.content === 'string' &&
      (message.role === 'user' || message.role === 'assistant')
  )

  if (messages.length === 0) {
    return json({ ok: false, error: 'No valid messages provided.' }, 400)
  }

  const generate = body.generate === true

  try {
    const first = await callGemini(apiKey, messages, generate)

    if (!first.ok) {
      return json({ ok: false, error: `AI request failed: ${first.error}` }, first.status)
    }

    if (!generate) {
      return json({ ok: true, reply: first.content })
    }

    const generated = validateGeneratedResume(first.content)

    if (generated.ok) {
      return json({ ok: true, data: generated.data })
    }

    const retry = await callGemini(
      apiKey,
      [
        ...messages,
        {
          role: 'user',
          content: `Your last response failed validation. Fix these issues and output only valid JSON:\n${generated.issues}`
        }
      ],
      true
    )

    if (!retry.ok) {
      return json({ ok: false, error: `AI request failed: ${retry.error}` }, retry.status)
    }

    const retried = validateGeneratedResume(retry.content)

    if (retried.ok) {
      return json({ ok: true, data: retried.data })
    }

    return json(
      { ok: false, error: `AI returned invalid resume data.\n${retried.issues}` },
      502
    )
  } catch (error) {
    return json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unexpected server error.'
      },
      500
    )
  }
}
