import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema } from '@/schema'
import type { InferredResumeSchema } from '@/types'
import { prepareResumeForPdf } from '@/lib/prepare-resume-for-pdf'
import { persistResumeValues } from '@/lib/persist-resume-values'
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

  const { reset, getValues } = form
  const formRef = useRef<HTMLFormElement>(null)
  const persistTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const saveToLocalStorage = useCallback(async () => {
    const processedValues = await persistResumeValues(getValues())
    setStoredData(processedValues)
    return processedValues
  }, [getValues, setStoredData])

  const scheduleBlurSave = useCallback(() => {
    clearTimeout(persistTimeoutRef.current)
    persistTimeoutRef.current = setTimeout(() => {
      void saveToLocalStorage()
    }, 200)
  }, [saveToLocalStorage])

  useEffect(() => {
    const form = formRef.current
    if (!form) return

    const handleFocusOut = () => {
      scheduleBlurSave()
    }

    form.addEventListener('focusout', handleFocusOut)

    return () => {
      form.removeEventListener('focusout', handleFocusOut)
      const timeoutId = persistTimeoutRef.current
      clearTimeout(timeoutId)
    }
  }, [scheduleBlurSave])

  const onSubmit: SubmitHandler<InferredResumeSchema> = async values => {
    const processedValues = await persistResumeValues(values)

    setPreviewData(processedValues)
    setStoredData(processedValues)
    setPreviewRevision(revision => revision + 1)
    setPreviewOpen(true)
  }

  const openPreview = () => {
    const data = previewData ?? storedData
    if (!data) return

    ;(document.activeElement as HTMLElement | null)?.blur()
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
    handleResetData,
    formRef
  }
}

export type UseResumeReturnType = ReturnType<typeof useResume>

export default useResume
