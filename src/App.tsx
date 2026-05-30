import { lazy, Suspense } from 'react'
import MainForm from '@/components/MainForm'
import { ResumeFormProvider } from '@/contexts/resume-form-context'

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
    </ResumeFormProvider>
  )
}

export default App
