import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { CheckLine } from '@/components/icons'
import type { FormStep } from '@/components/forms/form-steps'

type FormStepperProps = {
  steps: FormStep[]
  currentStep: number
  onStepChange: (step: number) => void
  stepErrors?: Record<number, boolean>
}

export function FormStepper({
  steps,
  currentStep,
  onStepChange,
  stepErrors
}: FormStepperProps) {
  return (
    <nav aria-label='Resume form progress' className='w-full'>
      <ScrollArea className='w-full pb-1'>
        <ol className='flex w-max min-w-full gap-1'>
          {steps.map((step, index) => {
            const isComplete = index < currentStep
            const isCurrent = index === currentStep
            const hasError = Boolean(stepErrors?.[index])

            return (
              <li key={step.id} className='flex min-w-0 flex-1 items-center'>
                <button
                  type='button'
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`${step.title}${hasError ? ' (has errors)' : ''}`}
                  onClick={() => onStepChange(index)}
                  className={cn(
                    'flex min-w-[8.5rem] flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors',
                    isCurrent && 'border-primary bg-primary/5 text-foreground',
                    isComplete &&
                      !isCurrent &&
                      'border-border bg-muted/40 text-foreground hover:bg-muted/60',
                    hasError &&
                      !isCurrent &&
                      'border-destructive/50 bg-destructive/5 text-destructive hover:bg-destructive/10',
                    !isCurrent &&
                      !isComplete &&
                      !hasError &&
                      'border-transparent text-muted-foreground hover:border-border hover:bg-muted/40'
                  )}
                >
                  <span
                    className={cn(
                      'flex size-6 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-medium',
                      isCurrent && 'bg-primary text-primary-foreground',
                      isComplete &&
                        !isCurrent &&
                        'bg-foreground text-background',
                      hasError &&
                        !isCurrent &&
                        'bg-destructive text-destructive-foreground',
                      !isCurrent &&
                        !isComplete &&
                        !hasError &&
                        'bg-muted text-muted-foreground'
                    )}
                  >
                    {isCurrent || (!isComplete && !hasError) ? (
                      index + 1
                    ) : isComplete ? (
                      <CheckLine className='size-3' />
                    ) : (
                      '!'
                    )}
                  </span>
                  <span className='min-w-0'>
                    <span className='block truncate text-xs font-medium'>
                      {step.title}
                    </span>
                    <span
                      className={cn(
                        'hidden truncate text-[0.625rem] sm:block',
                        hasError && !isCurrent
                          ? 'text-destructive'
                          : 'text-muted-foreground'
                      )}
                    >
                      {hasError && !isCurrent
                        ? 'Needs attention'
                        : step.description}
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