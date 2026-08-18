import { lazy, Suspense } from 'react'
import MainForm from '@/components/MainForm'
import { ResumeAssistant } from '@/components/ResumeAssistant'
import { ResumeFormProvider } from '@/contexts/resume-form-context'
import { Toaster } from '@/components/ui'

const Previewer = lazy(() => import('@/components/Previewer'))

function App() {
  return (
    <ResumeFormProvider>
      <div className='flex h-screen w-full'>
        <MainForm />
      </div>
      <Suspense fallback={null}>
        <Previewer />
      </Suspense>
      <ResumeAssistant />
      <Toaster position='bottom-right' />
    </ResumeFormProvider>
  )
}

export default App
