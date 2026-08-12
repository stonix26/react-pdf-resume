import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui'
import { CheckLine, ChevronDownLine } from '@/components/icons'
import type { FormStep } from '@/components/forms/form-steps'

type FormStepperProps = {
  steps: FormStep[]
  currentStep: number
  onStepChange: (step: number) => void
  stepErrors?: Record<number, boolean>
}

function StepBadge({
  index,
  isCurrent,
  isComplete,
  hasError
}: {
  index: number
  isCurrent: boolean
  isComplete: boolean
  hasError: boolean
}) {
  return (
    <span
      className={cn(
        'flex size-6 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-medium',
        isCurrent && 'bg-primary text-primary-foreground',
        isComplete && !isCurrent && 'bg-foreground text-background',
        hasError && !isCurrent && 'bg-destructive text-destructive-foreground',
        !isCurrent && !isComplete && !hasError && 'bg-muted text-muted-foreground'
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
  )
}

function MobileStepPicker({
  steps,
  currentStep,
  onStepChange,
  stepErrors
}: FormStepperProps) {
  const current = steps[currentStep]
  const progress = currentStep / steps.length

  return (
    <div className='block space-y-2 sm:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type='button'
            aria-label={`Step picker. Current step: ${current.title}. Step ${currentStep + 1} of ${steps.length}`}
            className='flex w-full flex-col gap-2 rounded-lg border border-border bg-muted/20 px-3 py-2 text-left transition-colors hover:bg-muted/40'
          >
            <span className='flex min-w-0 items-center gap-2'>
              <StepBadge
                index={currentStep}
                isCurrent
                isComplete={false}
                hasError={false}
              />
              <span className='min-w-0 flex-1'>
                <span className='block truncate text-xs font-medium'>
                  {current.title}
                </span>
                <span className='block truncate text-[0.625rem] text-muted-foreground'>
                  Step {currentStep + 1} of {steps.length}
                </span>
              </span>
              <ChevronDownLine className='size-4 shrink-0 text-muted-foreground' />
            </span>
            <span
              aria-hidden
              className='h-1 w-full overflow-hidden rounded-full bg-foreground/10'
            >
              <span
                className='block h-full rounded-full bg-primary transition-[width] duration-200'
                style={{ width: `${progress * 100}%` }}
              />
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {steps.map((step, index) => {
            const isCurrent = index === currentStep
            const isComplete = index < currentStep
            const hasError = Boolean(stepErrors?.[index])

            return (
              <DropdownMenuItem
                key={step.id}
                onClick={() => onStepChange(index)}
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  isCurrent && 'bg-primary/10 focus:bg-primary/10'
                )}
              >
                <StepBadge
                  index={index}
                  isCurrent={isCurrent}
                  isComplete={isComplete}
                  hasError={hasError}
                />
                <span className='min-w-0 flex-1'>
                  <span className='block truncate'>
                    {step.title}
                    {step.optional ? ' (optional)' : ''}
                  </span>
                </span>
                <span
                  className={cn(
                    'text-[0.625rem]',
                    hasError && !isCurrent
                      ? 'text-destructive'
                      : isComplete
                        ? 'text-muted-foreground'
                        : 'text-muted-foreground/70'
                  )}
                >
                  {isCurrent
                    ? 'Current'
                    : hasError
                      ? 'Needs attention'
                      : isComplete
                        ? 'Complete'
                        : ''}
                </span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function FormStepper({
  steps,
  currentStep,
  onStepChange,
  stepErrors
}: FormStepperProps) {
  return (
    <>
      <MobileStepPicker
        steps={steps}
        currentStep={currentStep}
        onStepChange={onStepChange}
        stepErrors={stepErrors}
      />

      <nav
        aria-label='Resume form progress'
        className='hidden w-full sm:block'
      >
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
                    <StepBadge
                      index={index}
                      isCurrent={isCurrent}
                      isComplete={isComplete}
                      hasError={hasError}
                    />
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
                        index < currentStep
                          ? 'bg-foreground/30'
                          : 'bg-border'
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
    </>
  )
}