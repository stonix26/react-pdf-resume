import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import Resume from './components/pdf/Resume'
import { Button } from './components/ui/button'
import MainForm from './components/forms'
import useResume from './hooks/useResume'
import Download from './components/icons/download'

function App() {
  const { storedData, ...rest } = useResume()
  return (
    <div className='flex w-full h-screen'>
      <MainForm {...rest} />
      <div className='relative flex-1 h-screen'>
        {!storedData ? null : (
          <PDFViewer className='w-full h-full'>
            <Resume {...storedData} />
          </PDFViewer>
        )}

        {!storedData ? (
          <Button
            className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4'
            disabled
          >
            <Download /> Download PDF
          </Button>
        ) : (
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
        )}
      </div>
    </div>
  )
}

export default App
