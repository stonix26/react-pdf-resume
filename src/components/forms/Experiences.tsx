import React from 'react'
import { type Control, useFieldArray } from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import { Button } from '../ui'
import { AddLine } from '../icons'
import { Experience } from '.'

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
          key={experienceIndex}
          control={control}
          fields={expFields}
          index={experienceIndex}
          remove={remove}
        />
      ))}

      <Button
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
