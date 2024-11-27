import { resumeSchema } from '@/schema'
import { InferredResumeSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'

const DEFAULT_FORM = {
  header: {
    profileUrl: '',
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

const useResume = () => {
  const [storedData, setStoredData, resetLSData] =
    useLocalStorage<InferredResumeSchema | null>(
      'linkedInResumeFormatData',
      null
    )

  const form = useForm<InferredResumeSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: storedData || DEFAULT_FORM
  })

  const { reset } = form

  const onSubmit: SubmitHandler<InferredResumeSchema> = values => {
    setStoredData(values)
  }

  const handleExport = () => {
    if (!storedData) {
      alert('No data found in localStorage for the specified key.')
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
