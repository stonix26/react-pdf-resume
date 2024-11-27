import { z } from 'zod'
import {
  descriptionSchema,
  educationSchema,
  experienceSchema,
  headerSchema,
  portfolioSchema,
  referenceSchema,
  resumeSchema
} from './schema'

export type InferredHeaderSchema = z.infer<typeof headerSchema>

export type InferredEducationSchema = z.infer<typeof educationSchema>

export type InferredDescriptionSchema = z.infer<typeof descriptionSchema>

export type InferredExperienceSchema = z.infer<typeof experienceSchema>

export type InferredPortfolioSchema = z.infer<typeof portfolioSchema>

export type InferredReferenceSchema = z.infer<typeof referenceSchema>

export type InferredResumeSchema = z.infer<typeof resumeSchema>
