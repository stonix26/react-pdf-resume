import { prepareResumeForPdf } from '@/lib/prepare-resume-for-pdf'
import type { InferredResumeSchema } from '@/types'
import { serializeFileField } from '@/utils'

export async function persistResumeValues(
  values: InferredResumeSchema
): Promise<InferredResumeSchema> {
  const [profilePicture, experiences] = await Promise.all([
    serializeFileField(values.header.profilePicture),
    Promise.all(
      values.experiences.map(async experience => ({
        ...experience,
        companyLogo: await serializeFileField(experience.companyLogo)
      }))
    )
  ])

  return prepareResumeForPdf({
    ...values,
    header: { ...values.header, profilePicture },
    experiences
  })
}
