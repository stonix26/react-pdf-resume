import React from 'react'
import { type Control, useFieldArray } from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import { Button } from '@/components/ui'
import { AddLine } from '@/components/icons'
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
        <p className='text-xs text-muted-foreground'>
          No work experience added yet. Add your first company to get started.
        </p>
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
    </div>
  )
}
