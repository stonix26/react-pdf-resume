import React from 'react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import Resume from './components/organisms/Resume'

// Load local data temporarily. To be fetched in the db in the future
import { data } from './data'

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* PDF Preview (Full-screen) */}
      <div style={{ flex: 1 }}>
        <PDFViewer
          style={{
            width: '100%',
            height: '95vh',
            border: 'none'
          }}
        >
          <Resume {...data} />
        </PDFViewer>
      </div>

      {/* PDF Download Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <PDFDownloadLink
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            lineHeight: 0,
            gap: '5px',
            backgroundColor: 'white',
            color: 'black',
            padding: '8pt 10pt',
            borderRadius: 5,
            textDecoration: 'none',
            textTransform: 'uppercase'
          }}
          document={<Resume {...data} />}
          fileName={`${data.header.firstName}${data.header.lastName}-resume.pdf`}
        >
          <DownloadIcon /> Download PDF
        </PDFDownloadLink>

        <a
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            lineHeight: 0,
            gap: '5px',
            backgroundColor: 'white',
            color: 'black',
            padding: '8pt 10pt',
            borderRadius: 5,
            textDecoration: 'none',
            textTransform: 'uppercase'
          }}
          href='https://github.com/stonix26/react-pdf-resume'
          target='_blank'
        >
          <GithubIcon /> Source Code
        </a>
      </div>
    </div>
  )
}

export default App

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={15}
    height={15}
    viewBox='0 0 15 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z'
      fill='currentColor'
      fillRule='evenodd'
      clipRule='evenodd'
    />
  </svg>
)

const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={15}
    height={15}
    viewBox='0 0 15 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z'
      fill='currentColor'
      fillRule='evenodd'
      clipRule='evenodd'
    />
  </svg>
)
