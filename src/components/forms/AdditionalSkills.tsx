import React, { Fragment } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import { DynamicFormGroup, FormRowGroup } from '.'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Button
} from '../ui'
import { AddLine, CloseLine } from '../icons'

export const AdditionalSkills: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalSkills'
  })

  return (
    <DynamicFormGroup groupLabel='Additional Skills'>
      <FormRowGroup>
        {fields.map((additionalSkillFields, index) => (
          <Fragment key={additionalSkillFields.id}>
            <FormField
              name={`additionalSkills.${index}.skill`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder='React.js' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant='ghost'
              className='hover:text-red-500'
              size='icon'
              onClick={() => remove(index)}
            >
              <CloseLine />
            </Button>
          </Fragment>
        ))}
      </FormRowGroup>
      <Button
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
