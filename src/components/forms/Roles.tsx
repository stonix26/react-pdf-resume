import React from 'react'
import { type Control, useFieldArray } from 'react-hook-form'
import { format } from 'date-fns'
import { type InferredResumeSchema } from '@/types'
import { Button } from '../ui'
import { AddLine } from '../icons'
import { Role } from '.'

export const Roles: React.FC<{
  control: Control<InferredResumeSchema>
  experienceIndex: number
}> = ({ control, experienceIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `experiences.${experienceIndex}.roles`
  })

  return (
    <>
      {fields.map((roleFields, roleIndex) => (
        <Role
          key={roleIndex}
          control={control}
          fields={roleFields}
          experienceIndex={experienceIndex}
          roleIndex={roleIndex}
          remove={remove}
        />
      ))}

      <Button
        variant='outline'
        onClick={() =>
          append({
            role: '',
            employmentType: 'Full-time',
            startDate: format(new Date(), 'yyyy-MM-dd'),
            endDate: undefined,
            descriptions: [],
            skills: undefined
          })
        }
      >
        <AddLine />
        Add role
      </Button>
    </>
  )
}
