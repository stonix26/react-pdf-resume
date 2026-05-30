import type { InferredResumeSchema } from '@/types'

function toImageSrc(value: unknown): string | undefined {
  if (typeof value === 'string' && value.length > 0) return value
  return undefined
}

export function prepareResumeForPdf(
  data: InferredResumeSchema
): InferredResumeSchema {
  return {
    ...data,
    header: {
      ...data.header,
      profilePicture: toImageSrc(data.header.profilePicture),
      links: data.header.links.map(link => ({
        ...link,
        url: link.url?.trim() || undefined
      }))
    },
    experiences: data.experiences.map(experience => ({
      ...experience,
      companyLogo: toImageSrc(experience.companyLogo),
      roles: experience.roles.map(role => ({
        ...role,
        skills: role.skills?.filter(item => item.skill.trim().length > 0)
      }))
    })),
    additionalSkills: data.additionalSkills?.filter(
      item => item.skill.trim().length > 0
    ),
    projects: data.projects
      ?.map(project => ({
        ...project,
        link:
          project.link?.src?.trim() && project.link.label?.trim()
            ? {
                src: project.link.src.trim(),
                label: project.link.label.trim()
              }
            : undefined
      }))
      .filter(project => project.name.trim().length > 0),
    reference: data.reference?.filter(
      item =>
        item.name.trim().length > 0 ||
        item.company.trim().length > 0 ||
        item.role.trim().length > 0
    )
  }
}
