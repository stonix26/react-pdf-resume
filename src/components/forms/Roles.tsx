import React from 'react'
import { type Control, useFieldArray } from 'react-hook-form'
import { format } from 'date-fns'
import { type InferredResumeSchema } from '@/types'
import { Button } from '@/components/ui'
import { AddLine } from '@/components/icons'
import { Role } from '@/components/forms'

export const Roles: React.FC<{
  control: Control<InferredResumeSchema>
  experienceIndex: number
}> = ({ control, experienceIndex }) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `experiences.${experienceIndex}.roles`
  })

  return (
    <>
      {fields.map((roleFields, roleIndex) => (
        <Role
          key={roleFields.id}
          control={control}
          experienceIndex={experienceIndex}
          roleIndex={roleIndex}
          totalCount={fields.length}
          remove={remove}
          move={move}
        />
      ))}

      <Button
        type='button'
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
