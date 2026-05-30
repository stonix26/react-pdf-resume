import { createContext, useContext, type ReactNode } from 'react'
import useResume, { type UseResumeReturnType } from '@/hooks/useResume'

const ResumeFormContext = createContext<UseResumeReturnType | null>(null)

export function ResumeFormProvider({ children }: { children: ReactNode }) {
  const value = useResume()

  return (
    <ResumeFormContext.Provider value={value}>
      {children}
    </ResumeFormContext.Provider>
  )
}

export function useResumeForm() {
  const context = useContext(ResumeFormContext)

  if (!context) {
    throw new Error('useResumeForm must be used within ResumeFormProvider')
  }

  return context
}
