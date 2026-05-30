import { lazy, Suspense } from 'react'
import MainForm from '@/components/MainForm'
import { ResumeFormProvider } from '@/contexts/resume-form-context'

const Previewer = lazy(() => import('@/components/Previewer'))

function App() {
  return (
    <ResumeFormProvider>
      <div className='flex w-full h-screen'>
        <MainForm />
        <Suspense fallback={null}>
          <Previewer />
        </Suspense>
      </div>
    </ResumeFormProvider>
  )
}

export default App
