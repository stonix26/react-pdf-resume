import { useCallback, useEffect, useState } from 'react'
import { type Control, useWatch } from 'react-hook-form'
import { useResumeForm } from '@/contexts/resume-form-context'
import type { InferredResumeSchema } from '@/types'
import { MainFormHeader } from '@/components/MainFormHeader'
import { MainFormFooter } from '@/components/MainFormFooter'
import { SampleBanner } from '@/components/SampleBanner'
import { Form, Card, CardContent, CardDescription, CardHeader, CardTitle, ScrollArea } from '@/components/ui'
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

function MainForm() {
  const {
    form,
    onSubmit,
    handleExport,
    handleImport,
    handleResetData,
    handleLoadSample,
    openPreviewFromForm,
    flushSave,
    saveState,
    lastSavedAt,
    formRef,
    storedData
  } = useResumeForm()
  const { control } = form
  const [currentStep, setCurrentStep] = useState(0)
  const [stepErrors, setStepErrors] = useState<Record<number, boolean>>({})

  const step = FORM_STEPS[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === FORM_STEPS.length - 1

  const goToStep = useCallback((nextStep: number) => {
    setCurrentStep(nextStep)
  }, [])

  const handleNext = useCallback(async () => {
    if (step.fields?.length && !step.optional) {
      const valid = await form.trigger(step.fields)
      if (!valid) {
        setStepErrors(prev => ({ ...prev, [currentStep]: true }))
        return
      }
    }
    setStepErrors(prev => ({ ...prev, [currentStep]: false }))
    setCurrentStep(currentStep + 1)
  }, [step, form, currentStep])

  const handleBack = useCallback(
    () => setCurrentStep(currentStep - 1),
    [currentStep]
  )

  const handleImported = useCallback(() => {
    setCurrentStep(0)
  }, [])

  const [profileFirst, profileLast, summary, experiences, additionalSkills, education, projects, reference] =
    useWatch({
      control,
      name: [
        'header.firstName',
        'header.lastName',
        'summary',
        'experiences',
        'additionalSkills',
        'education',
        'projects',
        'reference'
      ]
    })

  const completedCount = [
    Boolean(profileFirst?.trim() && profileLast?.trim()),
    Boolean(summary?.trim()),
    Array.isArray(experiences) && experiences.length > 0,
    Array.isArray(additionalSkills) && additionalSkills.length > 0,
    Array.isArray(education) && education.length > 0,
    Array.isArray(projects) && projects.length > 0,
    Array.isArray(reference) && reference.length > 0
  ].filter(Boolean).length
  const progressPercent = Math.round((completedCount / FORM_STEPS.length) * 100)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifier = event.metaKey || event.ctrlKey

      if (modifier && event.key.toLowerCase() === 's') {
        event.preventDefault()
        flushSave()
        return
      }

      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault()
        if (isLastStep) {
          formRef.current?.requestSubmit()
        } else {
          void handleNext()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [flushSave, isLastStep, handleNext, formRef])

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex h-full w-full flex-col'
      >
        <MainFormHeader
          onReset={handleResetData}
          onExport={handleExport}
          onImport={handleImport}
          onImported={handleImported}
        />

        <div className='flex min-h-0 flex-1 flex-col gap-6 overflow-hidden p-6'>
          <FormStepper
            steps={FORM_STEPS}
            currentStep={currentStep}
            onStepChange={goToStep}
            stepErrors={stepErrors}
          />

          {!storedData && currentStep === 0 ? (
            <SampleBanner onLoadSample={handleLoadSample} />
          ) : null}

          <Card className='flex min-h-0 flex-1 flex-col gap-0 py-0'>
            <CardHeader className='shrink-0 border-b border-border'>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <ScrollArea className='min-h-0 flex-1'>
              <CardContent className='pt-6'>
                <div
                  key={step.id}
                  className='panel-in'
                >
                  <StepPanel stepId={step.id} control={control} />
                </div>
              </CardContent>
            </ScrollArea>
          </Card>
        </div>

        <MainFormFooter
          currentStep={currentStep}
          totalSteps={FORM_STEPS.length}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          progressPercent={progressPercent}
          saveState={saveState}
          lastSavedAt={lastSavedAt}
          onBack={handleBack}
          onNext={handleNext}
          onPreview={openPreviewFromForm}
        />
      </form>
    </Form>
  )
}

export default MainForm
