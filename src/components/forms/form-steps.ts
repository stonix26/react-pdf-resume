import type { FieldPath } from 'react-hook-form'
import type { InferredResumeSchema } from '@/types'

export type FormStep = {
  id: string
  title: string
  description: string
  fields?: FieldPath<InferredResumeSchema>[]
  optional?: boolean
}

export const FORM_STEPS: FormStep[] = [
  {
    id: 'profile',
    title: 'Profile',
    description: 'Your name, photo, and contact details',
    fields: ['header']
  },
  {
    id: 'summary',
    title: 'Summary',
    description: 'A brief overview of your background',
    fields: ['summary']
  },
  {
    id: 'experience',
    title: 'Experience',
    description: 'Companies, roles, and key accomplishments',
    fields: ['experiences']
  },
  {
    id: 'skills-education',
    title: 'Skills & Education',
    description: 'Additional skills and academic history',
    fields: ['additionalSkills', 'education']
  },
  {
    id: 'projects-references',
    title: 'Projects & References',
    description: 'Portfolio highlights and references (optional)',
    optional: true
  }
]
