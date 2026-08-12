import { useRef, useState } from 'react'
import type { Control } from 'react-hook-form'
import { useResumeForm } from '@/contexts/resume-form-context'
import type { SaveState } from '@/hooks/useResume'
import type { InferredResumeSchema } from '@/types'
import {
  EyeLine,
  FilePdfLine,
  ExportLine,
  ImportLine,
  DeleteBinLine,
  SparklesLine,
  Github
} from '@/components/icons'
import { ThemeSwitcher } from '@/components/theme-switcher'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Form,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  ScrollArea,
  Separator
} from '@/components/ui'
import {
  Header,
  HeaderLinks,
  Summary,
  Experiences,
  AdditionalSkills,
  Education,
  Projects,
  References,
  FormStepper,
  FORM_STEPS
} from '@/components/forms'

function StepPanel({
  stepId,
  control
}: {
  stepId: string
  control: Control<InferredResumeSchema>
}) {
  switch (stepId) {
    case 'profile':
      return (
        <div className='space-y-6'>
          <Header control={control} />
          <Separator />
          <HeaderLinks control={control} />
        </div>
      )
    case 'summary':
      return <Summary control={control} />
    case 'experience':
      return <Experiences control={control} />
    case 'skills':
      return <AdditionalSkills control={control} />
    case 'education':
      return <Education control={control} />
    case 'projects':
      return <Projects control={control} />
    case 'references':
      return <References control={control} />
    default:
      return null
  }
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

function MainForm() {
  const {
    form,
    onSubmit,
    handleExport,
    handleImport,
    handleResetData,
    handleLoadSample,
    openPreviewFromForm,
    saveState,
    lastSavedAt,
    formRef,
    storedData
  } = useResumeForm()
  const { control } = form
  const [currentStep, setCurrentStep] = useState(0)
  const [stepErrors, setStepErrors] = useState<Record<number, boolean>>({})
  const [resetConfirm, setResetConfirm] = useState('')
  const [importError, setImportError] = useState<{
    title: string
    details: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const step = FORM_STEPS[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === FORM_STEPS.length - 1

  const goToStep = (nextStep: number) => {
    setCurrentStep(nextStep)
  }

  const handleNext = async () => {
    if (step.fields?.length && !step.optional) {
      const valid = await form.trigger(step.fields)
      if (!valid) {
        setStepErrors(prev => ({ ...prev, [currentStep]: true }))
        return
      }
    }
    setStepErrors(prev => ({ ...prev, [currentStep]: false }))
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => setCurrentStep(currentStep - 1)

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    const result = await handleImport(file)

    if (!result.ok) {
      setImportError({ title: result.title, details: result.details })
      return
    }

    setCurrentStep(0)
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex h-full w-full flex-col'
      >
        <header className='flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4'>
          <Button variant='secondary' asChild>
            <a
              href='https://github.com/stonix26/react-pdf-resume'
              target='_blank'
              rel='noreferrer'
            >
              <Github /> Source Code
            </a>
          </Button>
          <div className='flex flex-wrap items-center gap-2'>
            <ThemeSwitcher />
            <AlertDialog
              onOpenChange={open => {
                if (!open) setResetConfirm('')
              }}
            >
              <AlertDialogTrigger asChild>
                <Button type='button' variant='destructive'>
                  <DeleteBinLine /> Reset Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. It will permanently delete
                    your resume data stored in this browser. Please export your
                    data first before continuing.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                  value={resetConfirm}
                  onChange={e => setResetConfirm(e.target.value)}
                  placeholder='Type "reset" to confirm'
                  aria-label='Type reset to confirm'
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={resetConfirm.trim().toLowerCase() !== 'reset'}
                    onClick={() => {
                      setResetConfirm('')
                      handleResetData()
                    }}
                  >
                    Reset everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button type='button' onClick={() => void handleExport()} variant='secondary'>
              <ExportLine />
              Export Data
            </Button>
            <Button
              type='button'
              onClick={handleImportClick}
              variant='secondary'
            >
              <ImportLine />
              Import Data
            </Button>
            <input
              ref={fileInputRef}
              type='file'
              accept='application/json,.json'
              className='hidden'
              aria-label='Import resume JSON file'
              onChange={handleFileChange}
            />
            <AlertDialog
              open={importError !== null}
              onOpenChange={open => {
                if (!open) setImportError(null)
              }}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{importError?.title}</AlertDialogTitle>
                  <AlertDialogDescription className='whitespace-pre-wrap font-mono text-xs'>
                    {importError?.details}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => setImportError(null)}>
                    Close
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </header>

        <div className='flex min-h-0 flex-1 flex-col gap-6 overflow-hidden p-6'>
          <FormStepper
            steps={FORM_STEPS}
            currentStep={currentStep}
            onStepChange={goToStep}
            stepErrors={stepErrors}
          />

          {!storedData && currentStep === 0 ? (
            <Card>
              <CardContent className='flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <p className='text-sm font-medium'>New here?</p>
                  <p className='text-xs text-muted-foreground'>
                    Start from a sample resume and preview the PDF right away,
                    then make it your own.
                  </p>
                </div>
                <Button
                  type='button'
                  variant='secondary'
                  className='max-w-fit'
                  onClick={() => {
                    handleLoadSample()
                    setCurrentStep(0)
                  }}
                >
                  <SparklesLine /> Load sample resume
                </Button>
              </CardContent>
            </Card>
          ) : null}

          <Card className='flex min-h-0 flex-1 flex-col gap-0 py-0'>
            <CardHeader className='shrink-0 border-b border-border'>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <ScrollArea className='min-h-0 flex-1'>
              <CardContent className='pt-6'>
                <StepPanel stepId={step.id} control={control} />
              </CardContent>
            </ScrollArea>
          </Card>
        </div>

        <footer className='flex shrink-0 items-center justify-between gap-4 border-t border-border px-6 py-4'>
          <div className='flex flex-col gap-0.5'>
            <p className='text-xs text-muted-foreground'>
              Step {currentStep + 1} of {FORM_STEPS.length}
            </p>
            <SaveStatus saveState={saveState} lastSavedAt={lastSavedAt} />
          </div>
          <div className='flex gap-2'>
            <Button type='button' variant='outline' onClick={() => void openPreviewFromForm()}>
              <EyeLine />
              Preview
            </Button>
            <Button
              type='button'
              variant='outline'
              disabled={isFirstStep}
              onClick={handleBack}
            >
              Back
            </Button>
            {isLastStep ? (
              <Button type='submit'>
                <FilePdfLine />
                Preview PDF
              </Button>
            ) : (
              <Button type='button' onClick={() => void handleNext()}>
                Next step
              </Button>
            )}
          </div>
        </footer>
      </form>
    </Form>
  )
}

export default MainForm