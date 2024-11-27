import React from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import { Button } from '../ui/button'
import AddLine from '../icons/add-line'
import Role from './Role'
import { format } from 'date-fns'

const Roles: React.FC<{
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

export default Roles
