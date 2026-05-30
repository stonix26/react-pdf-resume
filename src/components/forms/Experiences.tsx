import React from 'react'
import { type Control, useFieldArray } from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import { Button } from '@/components/ui'
import { AddLine } from '@/components/icons'
import { Experience } from '@/components/forms'

export const Experiences: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences'
  })

  return (
    <>
      {fields.map((expFields, experienceIndex) => (
        <Experience
          key={expFields.id}
          control={control}
          index={experienceIndex}
          remove={remove}
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
        Add experience
      </Button>
    </>
  )
}
