import React, { Fragment } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import { DynamicFormGroup, FormRowGroup, OrderControls, getFieldArrayOrderProps } from '@/components/forms'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Button
} from '@/components/ui'
import { AddLine, CloseLine } from '@/components/icons'

export const AdditionalSkills: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => {
  const { fields, append, remove, move } = useFieldArray({
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
            <OrderControls
              {...getFieldArrayOrderProps(index, fields.length, move)}
            />
            <Button
              type='button'
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
