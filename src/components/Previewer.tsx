import { useEffect, useMemo, useReducer } from 'react'
import { pdf, PDFDownloadLink } from '@react-pdf/renderer'
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

    pdf(<Resume {...preparedData} />)
      .toBlob()
      .then(blob => {
        if (cancelled) return
        dispatch({ type: 'success', url: URL.createObjectURL(blob) })
      })
      .catch(err => {
        if (cancelled) return

        console.error('PDF preview error:', err)
        dispatch({
          type: 'error',
          message:
            err instanceof Error ? err.message : 'Failed to generate preview'
        })
      })

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
    <iframe
      src={preview.url}
      title='Resume preview'
      sandbox='allow-same-origin'
      className='h-[calc(100vh-10rem)] w-full rounded-md border border-border bg-white'
    />
  )
}

function Previewer() {
  const { previewData, previewOpen, setPreviewOpen, previewRevision } =
    useResumeForm()

  const preparedData = useMemo(
    () => (previewData ? prepareResumeForPdf(previewData) : null),
    [previewData]
  )

  const downloadDocument = useMemo(
    () => (preparedData ? <Resume {...preparedData} /> : null),
    [preparedData]
  )

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
          {preparedData && downloadDocument ? (
            <Button className='w-full' asChild>
              <PDFDownloadLink
                document={downloadDocument}
                fileName={`${preparedData.header.firstName.toUpperCase()} ${preparedData.header.lastName.toUpperCase()} - RESUME.pdf`}
              >
                <Download /> Download PDF
              </PDFDownloadLink>
            </Button>
          ) : (
            <Button className='w-full' disabled>
              <Download /> Download PDF
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default Previewer
