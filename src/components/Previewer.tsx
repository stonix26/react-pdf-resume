import { useEffect, useMemo, useState } from 'react'
import { pdf, PDFDownloadLink } from '@react-pdf/renderer'
import { useResumeForm } from '@/contexts/resume-form-context'
import { prepareResumeForPdf } from '@/lib/prepare-resume-for-pdf'
import { Download } from '@/components/icons'
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui'
import Resume from '@/components/pdf/Resume'

function PdfPreviewFrame({ revision }: { revision: number }) {
  const { previewData } = useResumeForm()
  const [url, setUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const preparedData = useMemo(
    () => (previewData ? prepareResumeForPdf(previewData) : null),
    [previewData, revision]
  )

  useEffect(() => {
    if (!preparedData) return

    let cancelled = false
    setLoading(true)
    setError(null)

    pdf(<Resume {...preparedData} />)
      .toBlob()
      .then(blob => {
        if (cancelled) return

        const objectUrl = URL.createObjectURL(blob)
        setUrl(currentUrl => {
          if (currentUrl) URL.revokeObjectURL(currentUrl)
          return objectUrl
        })
        setLoading(false)
      })
      .catch(err => {
        if (cancelled) return

        console.error('PDF preview error:', err)
        setError(
          err instanceof Error ? err.message : 'Failed to generate preview'
        )
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [preparedData, revision])

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [url])

  if (!preparedData) return null

  if (loading) {
    return (
      <div className='flex h-[calc(100vh-10rem)] w-full items-center justify-center rounded-md border border-border text-muted-foreground'>
        Generating preview...
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center gap-2 rounded-md border border-destructive/30 px-4 text-center text-destructive'>
        <p>Failed to generate preview.</p>
        <p className='text-xs text-muted-foreground'>{error}</p>
      </div>
    )
  }

  if (!url) return null

  return (
    <iframe
      src={url}
      title='Resume preview'
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

  return (
    <Drawer open={previewOpen} onOpenChange={setPreviewOpen} direction='right'>
      <DrawerContent className='inset-y-0 h-full w-[50vw] max-w-[50vw] data-[vaul-drawer-direction=right]:w-[50vw] data-[vaul-drawer-direction=right]:max-w-[50vw] data-[vaul-drawer-direction=right]:sm:max-w-[50vw]'>
        <DrawerHeader className='border-b border-border pb-4'>
          <DrawerTitle>Resume Preview</DrawerTitle>
          <DrawerDescription>
            Review your PDF before downloading.
          </DrawerDescription>
        </DrawerHeader>

        <div className='flex min-h-0 flex-1 flex-col px-4'>
          {previewOpen && previewData ? (
            <PdfPreviewFrame revision={previewRevision} />
          ) : null}
        </div>

        <DrawerFooter className='border-t border-border'>
          {preparedData ? (
            <Button className='w-full' asChild>
              <PDFDownloadLink
                document={<Resume {...preparedData} />}
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
