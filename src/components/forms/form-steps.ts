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
    id: 'skills',
    title: 'Skills',
    description: 'Skills you bring to the table',
    fields: ['additionalSkills'],
    optional: true
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Academic history and certifications',
    fields: ['education'],
    optional: true
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Portfolio highlights (optional)',
    fields: ['projects'],
    optional: true
  },
  {
    id: 'references',
    title: 'References',
    description: 'People who can vouch for you (optional)',
    fields: ['reference'],
    optional: true
  }
]