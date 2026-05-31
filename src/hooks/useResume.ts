import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema } from '@/schema'
import type { InferredResumeSchema } from '@/types'
import { prepareResumeForPdf } from '@/lib/prepare-resume-for-pdf'
import { serializeFileField } from '@/utils'

import { parseImportedResumeFile } from '@/lib/import-resume'

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
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewRevision, setPreviewRevision] = useState(0)
  const [previewData, setPreviewData] = useState<InferredResumeSchema | null>(
    null
  )
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

    const processedValues = prepareResumeForPdf({
      ...values,
      header: { ...values.header, profilePicture },
      experiences
    })

    setPreviewData(processedValues)
    setStoredData(processedValues)
    setPreviewRevision(revision => revision + 1)
    setPreviewOpen(true)
  }

  const openPreview = () => {
    const data = previewData ?? storedData
    if (!data) return

    setPreviewData(prepareResumeForPdf(data))
    setPreviewRevision(revision => revision + 1)
    setPreviewOpen(true)
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
    setPreviewData(null)
    setPreviewOpen(false)
    reset(DEFAULT_FORM)
  }

  const handleImport = async (file: File) => {
    const result = await parseImportedResumeFile(file)

    if (!result.ok) {
      return result
    }

    setStoredData(result.data)
    reset(result.data)
    setPreviewData(null)
    setPreviewOpen(false)

    return result
  }

  return {
    storedData,
    previewData,
    previewRevision,
    previewOpen,
    setPreviewOpen,
    openPreview,
    form,
    onSubmit,
    handleExport,
    handleImport,
    handleResetData
  }
}

export type UseResumeReturnType = ReturnType<typeof useResume>

export default useResume
