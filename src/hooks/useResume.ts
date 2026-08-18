import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { resumeSchema } from '@/schema'
import type { InferredResumeSchema } from '@/types'
import { prepareResumeForPdf } from '@/lib/prepare-resume-for-pdf'
import { persistResumeValues } from '@/lib/persist-resume-values'
import { parseImportedResumeFile } from '@/lib/import-resume'
import { SAMPLE_RESUME } from '@/lib/sample-resume'

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
  projects: [],
  reference: []
}

const LS_KEY = 'linkedInResumeFormatData'
const AUTOSAVE_DELAY_MS = 500
const LIVE_PREVIEW_DELAY_MS = 400

export type SaveState = 'idle' | 'saving' | 'saved'

const useResume = () => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewRevision, setPreviewRevision] = useState(0)
  const [previewData, setPreviewData] = useState<InferredResumeSchema | null>(
    null
  )
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [storedData, setStoredData, resetLSData] =
    useLocalStorage<InferredResumeSchema | null>(LS_KEY, null)

  const form = useForm<InferredResumeSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: storedData || DEFAULT_FORM
  })

  const { reset, getValues } = form
  const formRef = useRef<HTMLFormElement>(null)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const livePreviewTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const dirtyRef = useRef(false)
  const skipNextSaveRef = useRef(false)

  const saveToLocalStorage = useCallback(async () => {
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false
      dirtyRef.current = false
      setSaveState('idle')
      return null
    }

    setSaveState('saving')
    try {
      const processedValues = await persistResumeValues(getValues())
      setStoredData(processedValues)
      dirtyRef.current = false
      setLastSavedAt(new Date())
      setSaveState('saved')
      return processedValues
    } catch {
      setSaveState('idle')
      return null
    }
  }, [getValues, setStoredData])

  const scheduleSave = useCallback(() => {
    dirtyRef.current = true
    clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(() => {
      void saveToLocalStorage()
    }, AUTOSAVE_DELAY_MS)
  }, [saveToLocalStorage])

  const flushSave = useCallback(() => {
    clearTimeout(saveTimeoutRef.current)
    dirtyRef.current = false
    void saveToLocalStorage()
  }, [saveToLocalStorage])

  useEffect(() => {
    const subscription = form.watch(() => scheduleSave())

    return () => {
      subscription.unsubscribe()
      clearTimeout(saveTimeoutRef.current)
    }
  }, [form, scheduleSave])

  const schedulePreviewRefresh = useCallback(() => {
    clearTimeout(livePreviewTimeoutRef.current)
    livePreviewTimeoutRef.current = setTimeout(() => {
      setPreviewData(prepareResumeForPdf(getValues()))
      setPreviewRevision(revision => revision + 1)
    }, LIVE_PREVIEW_DELAY_MS)
  }, [getValues])

  useEffect(() => {
    if (!previewOpen) return

    const subscription = form.watch(() => schedulePreviewRefresh())

    return () => {
      subscription.unsubscribe()
      clearTimeout(livePreviewTimeoutRef.current)
    }
  }, [previewOpen, form, schedulePreviewRefresh])

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirtyRef.current) return
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const onSubmit: SubmitHandler<InferredResumeSchema> = async values => {
    const processedValues = await persistResumeValues(values)

    setPreviewData(processedValues)
    setStoredData(processedValues)
    dirtyRef.current = false
    setLastSavedAt(new Date())
    setSaveState('saved')
    setPreviewRevision(revision => revision + 1)
    setPreviewOpen(true)
  }

  const openPreviewFromForm = async () => {
    const processedValues =
      (await saveToLocalStorage()) ?? (getValues() as InferredResumeSchema)

    setPreviewData(prepareResumeForPdf(processedValues))
    setPreviewRevision(revision => revision + 1)
    setPreviewOpen(true)
  }

  const handleExport = async () => {
    const exported = await saveToLocalStorage()

    if (!exported) {
      toast.error('No resume data found', {
        description: 'Fill in some fields first, then try exporting again.'
      })
      return
    }

    const json = JSON.stringify(exported, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'resume-data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    URL.revokeObjectURL(url)

    toast.success('Resume data exported', {
      description: 'Saved as resume-data.json'
    })
  }

  const handleResetData = () => {
    skipNextSaveRef.current = true
    clearTimeout(saveTimeoutRef.current)
    resetLSData()
    setPreviewData(null)
    setPreviewOpen(false)
    dirtyRef.current = false
    setSaveState('idle')
    setLastSavedAt(null)
    reset(DEFAULT_FORM)
    toast.success('Data cleared', {
      description: 'Your resume data has been reset.'
    })
  }

  const handleImport = async (file: File) => {
    const result = await parseImportedResumeFile(file)

    if (!result.ok) {
      return result
    }

    skipNextSaveRef.current = true
    clearTimeout(saveTimeoutRef.current)
    setStoredData(result.data)
    reset(result.data)
    setPreviewData(null)
    setPreviewOpen(false)
    dirtyRef.current = false
    setLastSavedAt(new Date())
    setSaveState('saved')

    toast.success('Resume imported', {
      description: 'Your data has been loaded.'
    })

    return result
  }

  const handleLoadSample = () => {
    skipNextSaveRef.current = true
    clearTimeout(saveTimeoutRef.current)
    setStoredData(SAMPLE_RESUME)
    reset(SAMPLE_RESUME)
    setPreviewData(null)
    setPreviewOpen(false)
    dirtyRef.current = false
    setLastSavedAt(new Date())
    setSaveState('saved')
    toast.success('Sample resume loaded', {
      description: 'Make it your own from here.'
    })
  }

  return {
    storedData,
    previewData,
    previewRevision,
    previewOpen,
    setPreviewOpen,
    openPreviewFromForm,
    saveState,
    lastSavedAt,
    form,
    flushSave,
    onSubmit,
    handleExport,
    handleImport,
    handleResetData,
    handleLoadSample,
    formRef
  }
}

export type UseResumeReturnType = ReturnType<typeof useResume>

export default useResume