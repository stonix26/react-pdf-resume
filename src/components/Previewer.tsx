import React from 'react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import useResume from '@/hooks/useResume'
import { Download } from './icons'
import { Button } from './ui'
import Resume from './pdf/Resume'

const Previewer: React.FC = () => {
  const { storedData } = useResume()
  return (
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
  )
}

export default Previewer
