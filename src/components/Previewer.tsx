import { useEffect, useMemo, useReducer, useState } from 'react'
import { useResumeForm } from '@/contexts/resume-form-context'
import { prepareResumeForPdf } from '@/lib/prepare-resume-for-pdf'
import type { InferredResumeSchema } from '@/types'
import { Download } from '@/components/icons'
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  ScrollArea
} from '@/components/ui'
import Resume from '@/components/pdf/Resume'

type PreviewState = {
  url: string | null
  loading: boolean
  error: string | null
}

type PreviewAction =
  | { type: 'success'; url: string }
  | { type: 'error'; message: string }

function previewReducer(
  state: PreviewState,
  action: PreviewAction
): PreviewState {
  switch (action.type) {
    case 'success':
      if (state.url) URL.revokeObjectURL(state.url)
      return { url: action.url, loading: false, error: null }
    case 'error':
      return { url: null, loading: false, error: action.message }
  }
}

function PdfPreviewFrame({
  preparedData
}: {
  preparedData: InferredResumeSchema
}) {
  const [preview, dispatch] = useReducer(previewReducer, {
    url: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    let cancelled = false

    void (async () => {
      try {
        const { pdf } = await import('@react-pdf/renderer')
        const blob = await pdf(<Resume {...preparedData} />).toBlob()

        if (cancelled) return
        dispatch({ type: 'success', url: URL.createObjectURL(blob) })
      } catch (err) {
        if (cancelled) return

        console.error('PDF preview error:', err)
        dispatch({
          type: 'error',
          message:
            err instanceof Error ? err.message : 'Failed to generate preview'
        })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [preparedData])

  useEffect(() => {
    return () => {
      if (preview.url) URL.revokeObjectURL(preview.url)
    }
  }, [preview.url])

  if (preview.loading) {
    return (
      <div className='flex h-[calc(100vh-10rem)] w-full items-center justify-center rounded-md border border-border text-muted-foreground'>
        Generating preview…
      </div>
    )
  }

  if (preview.error) {
    return (
      <div className='flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center gap-2 rounded-md border border-destructive/30 px-4 text-center text-destructive'>
        <p>Failed to generate preview.</p>
        <p className='text-xs text-muted-foreground'>{preview.error}</p>
      </div>
    )
  }

  if (!preview.url) return null

  return (
    <embed
      src={preview.url}
      type='application/pdf'
      title='Resume preview'
      aria-label='Resume preview'
      className='h-[calc(100vh-10rem)] w-full rounded-md border border-border bg-white'
    />
  )
}

function Previewer() {
  const { previewData, previewOpen, setPreviewOpen, previewRevision } =
    useResumeForm()
  const [downloading, setDownloading] = useState(false)

  const preparedData = useMemo(
    () => (previewData ? prepareResumeForPdf(previewData) : null),
    [previewData]
  )

  const downloadDocument = useMemo(
    () => (preparedData ? <Resume {...preparedData} /> : null),
    [preparedData]
  )

  const handleDownload = async () => {
    if (!preparedData || !downloadDocument || downloading) return

    setDownloading(true)

    try {
      const { pdf } = await import('@react-pdf/renderer')
      const blob = await pdf(downloadDocument).toBlob()
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `${preparedData.header.firstName.toUpperCase()} ${preparedData.header.lastName.toUpperCase()} - RESUME.pdf`
      anchor.click()
      URL.revokeObjectURL(url)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <Drawer open={previewOpen} onOpenChange={setPreviewOpen} direction='right'>
      <DrawerContent className='inset-y-0 h-full w-[50vw] max-w-[50vw] data-[vaul-drawer-direction=right]:w-[50vw] data-[vaul-drawer-direction=right]:max-w-[50vw] data-[vaul-drawer-direction=right]:sm:max-w-[50vw]'>
        <DrawerHeader className='border-b border-border pb-4'>
          <DrawerTitle>Resume Preview</DrawerTitle>
          <DrawerDescription>
            Review your PDF before downloading.
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className='min-h-0 flex-1 px-4'>
          {previewOpen && preparedData ? (
            <PdfPreviewFrame
              key={previewRevision}
              preparedData={preparedData}
            />
          ) : null}
        </ScrollArea>

        <DrawerFooter className='border-t border-border'>
          <Button
            className='w-full'
            disabled={!preparedData || !downloadDocument || downloading}
            onClick={() => void handleDownload()}
          >
            <Download /> {downloading ? 'Preparing PDF…' : 'Download PDF'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default Previewer
