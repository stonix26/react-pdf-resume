import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import Resume from './components/organisms/Resume'
import { styles } from './components/styles'

// Load local data temporarily. To be fetched in the db in the future
import { data } from './data'

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* PDF Preview (Full-screen) */}
      <div style={{ flex: 1 }}>
        <PDFViewer style={styles.viewer}>
          <Resume {...data} />
        </PDFViewer>
      </div>

      {/* PDF Download Button */}
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <PDFDownloadLink
          document={<Resume {...data} />}
          fileName={`${data.header.firstName}${data.header.lastName}-resume.pdf`}
        >
          Download PDF
        </PDFDownloadLink>
      </div>
    </div>
  )
}

export default App
