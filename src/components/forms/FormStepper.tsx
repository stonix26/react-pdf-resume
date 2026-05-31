import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { FormStep } from '@/components/forms/form-steps'

type FormStepperProps = {
  steps: FormStep[]
  currentStep: number
  onStepChange: (step: number) => void
}

export function FormStepper({
  steps,
  currentStep,
  onStepChange
}: FormStepperProps) {
  return (
    <nav aria-label='Resume form progress' className='w-full'>
      <ScrollArea className='w-full pb-1'>
        <ol className='flex w-max min-w-full gap-1'>
        {steps.map((step, index) => {
          const isComplete = index < currentStep
          const isCurrent = index === currentStep
          const isClickable = index <= currentStep

          return (
            <li key={step.id} className='flex min-w-0 flex-1 items-center'>
              <button
                type='button'
                disabled={!isClickable}
                onClick={() => isClickable && onStepChange(index)}
                className={cn(
                  'flex min-w-[8.5rem] flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors',
                  isCurrent &&
                    'border-primary bg-primary/5 text-foreground',
                  isComplete &&
                    !isCurrent &&
                    'border-border bg-muted/40 text-foreground hover:bg-muted/60',
                  !isCurrent &&
                    !isComplete &&
                    'border-transparent text-muted-foreground',
                  !isClickable && 'cursor-not-allowed opacity-60'
                )}
              >
                <span
                  className={cn(
                    'flex size-6 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-medium',
                    isCurrent && 'bg-primary text-primary-foreground',
                    isComplete && !isCurrent && 'bg-foreground text-background',
                    !isCurrent && !isComplete && 'bg-muted text-muted-foreground'
                  )}
                >
                  {index + 1}
                </span>
                <span className='min-w-0'>
                  <span className='block truncate text-xs font-medium'>
                    {step.title}
                  </span>
                  <span className='hidden truncate text-[0.625rem] text-muted-foreground sm:block'>
                    {step.description}
                  </span>
                </span>
              </button>
              {index < steps.length - 1 ? (
                <div
                  aria-hidden
                  className={cn(
                    'mx-1 hidden h-px w-4 shrink-0 sm:block',
                    index < currentStep ? 'bg-foreground/30' : 'bg-border'
                  )}
                />
              ) : null}
            </li>
          )
        })}
        </ol>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </nav>
  )
}
