import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'
import './index.css'
import '@/components/pdf/styles'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <App />
      <Analytics debug={false} />
    </ThemeProvider>
  </StrictMode>
)
