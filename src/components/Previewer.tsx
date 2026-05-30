import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import { useResumeForm } from '@/contexts/resume-form-context'
import { Download } from '@/components/icons'
import { Button } from '@/components/ui'
import Resume from '@/components/pdf/Resume'

function Previewer() {
  const { storedData } = useResumeForm()

  return (
    <div className='relative flex-1 h-screen'>
      {storedData ? (
        <PDFViewer className='w-full h-full'>
          <Resume {...storedData} />
        </PDFViewer>
      ) : null}

      {storedData ? (
        <Button
          className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4'
          asChild
        >
          <PDFDownloadLink
            document={<Resume {...storedData} />}
            fileName={`${storedData.header.firstName.toUpperCase()} ${storedData.header.lastName.toUpperCase()} - RESUME.pdf`}
          >
            <Download /> Download PDF
          </PDFDownloadLink>
        </Button>
      ) : (
        <Button
          className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4'
          disabled
        >
          <Download /> Download PDF
        </Button>
      )}
    </div>
  )
}

export default Previewer
