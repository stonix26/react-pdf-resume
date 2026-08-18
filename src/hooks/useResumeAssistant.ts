import { useCallback, useState } from 'react'
import { useResumeForm } from '@/contexts/resume-form-context'
import { parseImportedResumeJson } from '@/lib/import-resume'

export type AssistantRole = 'user' | 'assistant'

export type AssistantMessage = {
  id: string
  role: AssistantRole
  content: string
}

type ApiResult =
  | { ok: true; reply: string }
  | { ok: true; data: unknown }
  | { ok: false; error: string }

export type AssistantStatus = 'idle' | 'thinking' | 'generating'

let messageId = 0

function createMessage(role: AssistantRole, content: string): AssistantMessage {
  messageId += 1
  return { id: `msg-${messageId}`, role, content }
}

const WELCOME_MESSAGE: AssistantMessage = createMessage(
  'assistant',
  "Hi! I'm your AI resume assistant. Tell me about your work experience, education, skills, and projects — or paste an existing resume — and I'll help you build a polished one. When you're ready, hit Generate Resume and I'll fill the form for you."
)

export function useResumeAssistant() {
  const { applyGeneratedResume } = useResumeForm()

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<AssistantMessage[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<AssistantStatus>('idle')

  const appendMessage = useCallback((message: AssistantMessage) => {
    setMessages(prev => [...prev, message])
  }, [])

  const requestAssistant = useCallback(
    async (history: AssistantMessage[], generate: boolean): Promise<ApiResult> => {
      try {
        const response = await fetch('/api/generate-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history, generate })
        })

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as
            | { error?: string }
            | null
          return {
            ok: false,
            error: payload?.error ?? `Request failed (${response.status})`
          }
        }

        const payload = (await response.json()) as ApiResult
        return payload
      } catch {
        return {
          ok: false,
          error: 'Could not reach the AI assistant. Please try again.'
        }
      }
    },
    []
  )

  const sendMessage = useCallback(async () => {
    const text = input.trim()

    if (!text || status !== 'idle') return

    const history: AssistantMessage[] = [
      ...messages,
      createMessage('user', text)
    ]
    setMessages(history)
    setInput('')
    setStatus('thinking')

    const result = await requestAssistant(history, false)
    setStatus('idle')

    if (result.ok && 'reply' in result) {
      appendMessage(createMessage('assistant', result.reply))
    } else {
      appendMessage(
        createMessage(
          'assistant',
          result.ok ? 'No response received.' : result.error
        )
      )
    }
  }, [input, messages, status, requestAssistant, appendMessage])

  const generateResume = useCallback(async () => {
    if (status !== 'idle') return

    const history: AssistantMessage[] = input.trim()
      ? [...messages, createMessage('user', input.trim())]
      : messages

    if (input.trim()) setInput('')
    setStatus('generating')

    const result = await requestAssistant(history, true)
    setStatus('idle')

    if (!result.ok) {
      appendMessage(
        createMessage(
          'assistant',
          `I couldn't generate a resume: ${result.error}`
        )
      )
      return
    }

    if (!('data' in result)) {
      appendMessage(
        createMessage('assistant', "I couldn't generate a resume. Please try again.")
      )
      return
    }

    const parsed = parseImportedResumeJson(JSON.stringify(result.data))

    if (!parsed.ok) {
      appendMessage(
        createMessage(
          'assistant',
          `The generated resume didn't quite match the format: ${parsed.title}\n${parsed.details}`
        )
      )
      return
    }

    applyGeneratedResume(parsed.data)

    appendMessage(
      createMessage(
        'assistant',
        'Your resume has been generated and loaded into the form. Review and tweak it, then export or preview the PDF.'
      )
    )
  }, [input, messages, status, requestAssistant, applyGeneratedResume, appendMessage])

  const clearConversation = useCallback(() => {
    setMessages([WELCOME_MESSAGE])
    setInput('')
    setStatus('idle')
  }, [])

  return {
    open,
    setOpen,
    messages,
    input,
    setInput,
    status,
    sendMessage,
    generateResume,
    clearConversation
  }
}
