import type { SaveState } from '@/hooks/useResume'
import { EyeLine, FilePdfLine } from '@/components/icons'
import { Button } from '@/components/ui'

type MainFormFooterProps = {
  currentStep: number
  totalSteps: number
  isFirstStep: boolean
  isLastStep: boolean
  progressPercent: number
  saveState: SaveState
  lastSavedAt: Date | null
  onBack: () => void
  onNext: () => void
  onPreview: () => void
}

function SaveStatus({
  saveState,
  lastSavedAt
}: {
  saveState: SaveState
  lastSavedAt: Date | null
}) {
  if (saveState === 'saving') return <p className='text-xs text-muted-foreground'>Saving…</p>

  if (saveState === 'saved' && lastSavedAt) {
    const isRecent = Date.now() - lastSavedAt.getTime() < 30_000
    return (
      <p className='text-xs text-emerald-500'>
        {isRecent ? 'Saved just now' : `Saved ${lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
      </p>
    )
  }

  return null
}

export function MainFormFooter({
  currentStep,
  totalSteps,
  isFirstStep,
  isLastStep,
  progressPercent,
  saveState,
  lastSavedAt,
  onBack,
  onNext,
  onPreview
}: MainFormFooterProps) {
  return (
    <footer className='flex shrink-0 items-center justify-between gap-4 border-t border-border px-6 py-4'>
      <div className='flex min-w-0 flex-1 flex-col gap-1.5'>
        <div className='flex items-center gap-3'>
          <p className='shrink-0 text-xs text-muted-foreground'>
            Step {currentStep + 1} of {totalSteps}
          </p>
          <div
            aria-hidden
            className='h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-foreground/10'
          >
            <div
              className='h-full rounded-full bg-primary transition-[width] duration-300'
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className='shrink-0 text-xs tabular-nums text-muted-foreground'>
            {progressPercent}%
          </p>
        </div>
        <SaveStatus saveState={saveState} lastSavedAt={lastSavedAt} />
      </div>
      <div className='flex gap-2'>
        <Button type='button' variant='outline' onClick={() => void onPreview()}>
          <EyeLine />
          Preview
        </Button>
        <Button
          type='button'
          variant='outline'
          disabled={isFirstStep}
          onClick={onBack}
        >
          Back
        </Button>
        {isLastStep ? (
          <Button type='submit'>
            <FilePdfLine />
            Preview PDF
          </Button>
        ) : (
          <Button type='button' onClick={() => void onNext()}>
            Next step
          </Button>
        )}
      </div>
    </footer>
  )
}