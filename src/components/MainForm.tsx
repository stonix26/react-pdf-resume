import { useRef, useState } from 'react'
import type { Control } from 'react-hook-form'
import { useResumeForm } from '@/contexts/resume-form-context'
import type { InferredResumeSchema } from '@/types'
import {
  FilePdfLine,
  ExportLine,
  ImportLine,
  DeleteBinLine,
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
    case 'skills-education':
      return (
        <div className='space-y-8'>
          <AdditionalSkills control={control} />
          <Separator />
          <Education control={control} />
        </div>
      )
    case 'projects-references':
      return (
        <div className='space-y-8'>
          <Projects control={control} />
          <Separator />
          <References control={control} />
        </div>
      )
    default:
      return null
  }
}

function MainForm() {
  const {
    form,
    onSubmit,
    handleExport,
    handleImport,
    handleResetData,
    storedData,
    openPreview
  } = useResumeForm()
  const { control } = form
  const [currentStep, setCurrentStep] = useState(0)
  const [importError, setImportError] = useState<{
    title: string
    details: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const step = FORM_STEPS[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === FORM_STEPS.length - 1

  const goToStep = async (nextStep: number) => {
    if (nextStep < currentStep) {
      setCurrentStep(nextStep)
      return
    }

    if (nextStep > currentStep) {
      const fields = step.fields
      if (fields?.length && !step.optional) {
        const valid = await form.trigger(fields)
        if (!valid) return
      }
    }

    setCurrentStep(nextStep)
  }

  const handleNext = () => goToStep(currentStep + 1)
  const handleBack = () => goToStep(currentStep - 1)

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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type='button' variant='destructive'>
                  <DeleteBinLine /> Reset Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your data in localStorage. Please export your data first
                    before continuing.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetData}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button type='button' onClick={handleExport} variant='secondary'>
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
            {storedData ? (
              <Button type='button' variant='secondary' onClick={openPreview}>
                <FilePdfLine />
                Open Preview
              </Button>
            ) : null}
          </div>
        </header>

        <div className='flex min-h-0 flex-1 flex-col gap-6 overflow-hidden px-6 py-6'>
          <FormStepper
            steps={FORM_STEPS}
            currentStep={currentStep}
            onStepChange={goToStep}
          />

          <Card className='flex min-h-0 flex-1 flex-col'>
            <CardHeader className='border-b border-border'>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent className='flex-1 overflow-auto pt-6'>
              <StepPanel stepId={step.id} control={control} />
            </CardContent>
          </Card>
        </div>

        <footer className='flex shrink-0 items-center justify-between gap-4 border-t border-border px-6 py-4'>
          <p className='text-xs text-muted-foreground'>
            Step {currentStep + 1} of {FORM_STEPS.length}
          </p>
          <div className='flex gap-2'>
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
              <Button type='button' onClick={handleNext}>
                Continue
              </Button>
            )}
          </div>
        </footer>
      </form>
    </Form>
  )
}

export default MainForm
