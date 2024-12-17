import React from 'react'
import { type Control, useFieldArray } from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Button
} from '../ui'
import { CloseLine, AddLine } from '../icons'
import { DynamicFormGroup, FormRowGroup } from '.'

export const Descriptions: React.FC<{
  control: Control<InferredResumeSchema>
  experienceIndex: number
  roleIndex: number
}> = ({ control, experienceIndex, roleIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `experiences.${experienceIndex}.roles.${roleIndex}.descriptions`
  })

  return (
    <DynamicFormGroup groupLabel='Role Descriptions'>
      {fields.map((descriptionFields, descriptionIndex) => (
        <FormRowGroup key={descriptionFields.id}>
          <FormField
            name={`experiences.${experienceIndex}.roles.${roleIndex}.descriptions.${descriptionIndex}.description`}
            control={control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <Input {...field} placeholder='Lorem Ipsum...' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant='ghost'
            className='self-end hover:text-red-500'
            size='icon'
            onClick={() => remove(descriptionIndex)}
          >
            <CloseLine />
          </Button>
        </FormRowGroup>
      ))}

      <Button
        variant='outline'
        onClick={() =>
          append({
            description: ''
          })
        }
      >
        <AddLine />
        Add description
      </Button>
    </DynamicFormGroup>
  )
}
