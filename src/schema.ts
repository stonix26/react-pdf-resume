import { z } from 'zod'
import { isValidDate } from './utils'

export const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

export const fileSchema = z
  .instanceof(File)
  .refine(file => file.type.startsWith('image/'), {
    message: 'Must be an image file'
  })
  .or(z.string())

export const linkTypeSchema = z.enum([
  'Behance',
  'Bluesky',
  'Discord',
  'Dribbble',
  'Facebook',
  'Github',
  'Gitlab',
  'Instagram',
  'LinkedIn',
  'Mail',
  'Medium',
  'React',
  'Stack Overflow',
  'Terminal',
  'Threads',
  'Tiktok',
  'Twitter / X'
])

export const linkSchema = z.object({
  text: z.string(),
  url: z
    .string()
    .optional()
    .refine(
      value => {
        if (!value) return true // Allow empty strings or undefined
        const isUrl = z.string().url().safeParse(value).success
        const isEmail = z.string().email().safeParse(value).success
        return isUrl || isEmail // Accept either a valid URL or email
      },
      {
        message: 'Must be a valid URL or email'
      }
    ),
  type: linkTypeSchema
})

export const headerSchema = z.object({
  profilePicture: fileSchema.optional(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  address: z.string(),
  mobileNumber: z.string(),
  links: z.array(linkSchema)
})

export const employmentTypeSchema = z.enum([
  'Full-time',
  'Part-time',
  'Self-employed',
  'Freelance',
  'Contract',
  'Internship',
  'Apprenticeship',
  'Seasonal'
])

export const descriptionSchema = z.object({
  description: z.string()
})

export const skillSchema = z.object({
  skill: z.string()
})

export const roleSchema = z.object({
  role: z.string(),
  employmentType: employmentTypeSchema,
  startDate: z
    .string()
    .regex(dateRegex, { message: 'Start date must be in YYYY-MM-DD format' })
    .refine(date => isValidDate(date), {
      message: 'Invalid date (e.g., invalid day or leap year issue)'
    }),
  endDate: z
    .string()
    .regex(dateRegex, { message: 'End date must be in YYYY-MM-DD format' })
    .refine(date => isValidDate(date), {
      message: 'Invalid date (e.g., invalid day or leap year issue'
    })
    .optional(),
  descriptions: z.array(descriptionSchema),
  skills: z.array(skillSchema).optional()
})

export const locationTypeSchema = z.enum(['On-site', 'Hybrid', 'Remote'])

export const experienceSchema = z.object({
  companyName: z.string(),
  companyLogo: fileSchema.optional(),
  location: z.string(),
  locationType: locationTypeSchema,
  roles: z.array(roleSchema)
})

export const educationSchema = z.object({
  course: z.string(),
  schoolName: z.string(),
  gpa: z.string().optional(),
  schoolYear: z.string()
})

export const projectSchema = z.object({
  name: z.string(),
  type: z.string(),
  link: z
    .object({
      src: z.string(),
      label: z.string()
    })
    .optional(),
  description: z.string(),
  techStack: z.array(z.object({ tech: z.string() }))
})

export const referenceSchema = z.object({
  name: z.string(),
  company: z.string(),
  role: z.string(),
  contactNumber: z.string().optional()
})

export const resumeSchema = z.object({
  header: headerSchema,
  summary: z.string(),
  experiences: z.array(experienceSchema),
  additionalSkills: z.array(skillSchema).optional(),
  education: z.array(educationSchema),
  projects: z.array(projectSchema).optional(),
  reference: z.array(referenceSchema).optional()
})
