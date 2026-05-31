import { importedResumeSchema } from '@/schema'
import { prepareResumeForPdf } from '@/lib/prepare-resume-for-pdf'
import type { InferredResumeSchema } from '@/types'

export type ImportResult =
  | { ok: true; data: InferredResumeSchema }
  | { ok: false; title: string; details: string }

const EMPTY_HEADER: InferredResumeSchema['header'] = {
  profilePicture: undefined,
  firstName: '',
  middleName: '',
  lastName: '',
  address: '',
  mobileNumber: '',
  links: []
}

function normalizeImportedResume(data: InferredResumeSchema): InferredResumeSchema {
  return {
    header: {
      ...EMPTY_HEADER,
      ...data.header,
      links: data.header.links ?? []
    },
    summary: data.summary ?? '',
    experiences: data.experiences ?? [],
    additionalSkills: data.additionalSkills ?? [],
    education: data.education ?? [],
    projects: data.projects ?? [],
    reference: data.reference ?? []
  }
}

export function parseImportedResumeFile(file: File): Promise<ImportResult> {
  return file
    .text()
    .then(text => {
      let parsed: unknown

      try {
        parsed = JSON.parse(text)
      } catch {
        return {
          ok: false as const,
          title: 'Invalid JSON',
          details: 'The selected file is not valid JSON.'
        }
      }

      const result = importedResumeSchema.safeParse(parsed)

      if (!result.success) {
        const details = result.error.issues
          .map(issue => {
            const path = issue.path.length > 0 ? issue.path.join('.') : 'root'
            return `${path}: ${issue.message}`
          })
          .join('\n')

        return {
          ok: false as const,
          title: 'Schema validation failed',
          details
        }
      }

      const data = prepareResumeForPdf(normalizeImportedResume(result.data))

      return { ok: true as const, data }
    })
    .catch(() => ({
      ok: false as const,
      title: 'Import failed',
      details: 'Could not read the selected file.'
    }))
}
