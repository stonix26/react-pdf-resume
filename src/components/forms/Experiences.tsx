import React from 'react'
import { type Control, useFieldArray } from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import { Button } from '@/components/ui'
import { AddLine, SparklesLine } from '@/components/icons'
import { SectionEmptyState } from '@/components/forms/SectionEmptyState'
import { Experience } from '@/components/forms'

export const Experiences: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'experiences'
  })

  return (
    <div className='space-y-4'>
      {fields.length === 0 ? (
        <SectionEmptyState
          icon={<SparklesLine className='size-5' />}
          title='No work experience yet'
          description='Add your first company, role, and key accomplishments to get started.'
          ctaLabel='Add your first company'
          onCta={() =>
            append({
              companyName: '',
              location: '',
              locationType: 'Remote',
              roles: []
            })
          }
        />
      ) : null}

      {fields.map((expFields, experienceIndex) => (
        <Experience
          key={expFields.id}
          control={control}
          index={experienceIndex}
          totalCount={fields.length}
          remove={remove}
          move={move}
        />
      ))}

      {fields.length > 0 ? (
        <Button
          type='button'
          variant='outline'
          className='max-w-fit'
          onClick={() =>
            append({
              companyName: '',
              location: '',
              locationType: 'Remote',
              roles: []
            })
          }
        >
          <AddLine />
          Add company
        </Button>
      ) : null}
    </div>
  )
}
