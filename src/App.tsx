import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import Resume from './components/organisms/Resume'
import { styles } from './components/styles'

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ textAlign: 'center' }}>My Resume</h1>

      {/* PDF Preview (Full-screen) */}
      <div style={{ flex: 1 }}>
        <PDFViewer style={styles.viewer}>
          <Resume />
        </PDFViewer>
      </div>

      {/* PDF Download Button */}
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <PDFDownloadLink document={<Resume />} fileName='resume.pdf'>
          {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  )
}

export default App
