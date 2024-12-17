import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema } from '@/schema'
import type { InferredResumeSchema } from '@/types'

const DEFAULT_FORM: InferredResumeSchema = {
  header: {
    profilePicture: undefined,
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    mobileNumber: '',
    links: []
  },
  summary: '',
  experiences: [],
  additionalSkills: [],
  education: [],
  portfolio: [],
  reference: []
}

const LS_KEY = 'linkedInResumeFormatData'

const useResume = () => {
  const [storedData, setStoredData, resetLSData] =
    useLocalStorage<InferredResumeSchema | null>(LS_KEY, null)

  const form = useForm<InferredResumeSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: storedData || DEFAULT_FORM
  })

  const { reset } = form

  const validateFile = async (file: unknown): Promise<string | undefined> => {
    if (!file) return undefined

    try {
      // Validate using fileSchema
      const parsedFile = z
        .instanceof(File)
        .refine(file => file.type.startsWith('image/'), {
          message: 'Must be an image file'
        })
        .parse(file)

      // Convert the file to base64
      return new Promise<string>(resolve => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(parsedFile)
      })
    } catch (e) {
      console.error('File validation failed:', e)
      return undefined
    }
  }

  const onSubmit: SubmitHandler<InferredResumeSchema> = async values => {
    // Handle profile picture
    const profilePicture =
      values.header.profilePicture instanceof File
        ? await validateFile(values.header.profilePicture)
        : values.header.profilePicture

    // Handle company logos in experiences
    const experiences = await Promise.all(
      values.experiences.map(async experience => {
        const companyLogo =
          experience.companyLogo instanceof File
            ? await validateFile(experience.companyLogo)
            : experience.companyLogo

        return { ...experience, companyLogo }
      })
    )

    // Construct the final processed form data
    const processedValues = {
      ...values,
      header: { ...values.header, profilePicture },
      experiences
    }

    // Persist the processed values
    setStoredData(processedValues)
  }

  const handleExport = () => {
    if (!storedData) {
      alert(`No data found in localStorage for ${LS_KEY} key.`)
      return
    }

    const json = JSON.stringify(storedData, null, 2)
    const blob = new Blob([json], { type: 'application/json' })

    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'resume-data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    URL.revokeObjectURL(url)
  }

  const handleResetData = () => {
    resetLSData()
    reset(DEFAULT_FORM)
  }

  return {
    storedData,
    form,
    onSubmit,
    handleExport,
    handleResetData
  }
}

export type UseResumeReturnType = ReturnType<typeof useResume>

export default useResume
