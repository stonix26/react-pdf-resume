import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema } from '@/schema'
import type { InferredResumeSchema } from '@/types'
import { serializeFileField } from '@/utils'

export const DEFAULT_FORM: InferredResumeSchema = {
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
  projects: [],
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

  const onSubmit: SubmitHandler<InferredResumeSchema> = async values => {
    const profilePicture = await serializeFileField(values.header.profilePicture)

    const experiences = await Promise.all(
      values.experiences.map(async experience => ({
        ...experience,
        companyLogo: await serializeFileField(experience.companyLogo)
      }))
    )

    setStoredData({
      ...values,
      header: { ...values.header, profilePicture },
      experiences
    })
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
