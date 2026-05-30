import React, { Fragment } from 'react'
import { type Control, useFieldArray } from 'react-hook-form'
import { type InferredResumeSchema } from '@/types'
import { DynamicFormGroup, FormRowGroup } from '@/components/forms'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Button
} from '@/components/ui'
import { AddLine, CloseLine } from '@/components/icons'

export const Skills: React.FC<{
  control: Control<InferredResumeSchema>
  experienceIndex: number
  roleIndex: number
}> = ({ control, experienceIndex, roleIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `experiences.${experienceIndex}.roles.${roleIndex}.skills`
  })

  return (
    <DynamicFormGroup groupLabel='Role Skills'>
      <FormRowGroup>
        {fields.map((skillFields, skillIndex) => (
          <Fragment key={skillFields.id}>
            <FormField
              name={`experiences.${experienceIndex}.roles.${roleIndex}.skills.${skillIndex}.skill`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder='Vue.js' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='button'
              variant='ghost'
              className='hover:text-red-500'
              size='icon'
              onClick={() => remove(skillIndex)}
            >
              <CloseLine />
            </Button>
          </Fragment>
        ))}
      </FormRowGroup>
      <Button
        type='button'
        variant='outline'
        onClick={() =>
          append({
            skill: ''
          })
        }
      >
        <AddLine />
        Add skill
      </Button>
    </DynamicFormGroup>
  )
}
