import React from 'react'
import { type InferredResumeSchema } from '@/types'
import { Control, useFieldArray } from 'react-hook-form'
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

export const Education: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education'
  })
  return (
    <DynamicFormGroup groupLabel='Education'>
      {fields.map((educationFields, index) => (
        <FormRowGroup key={educationFields.id}>
          <FormField
            name={`education.${index}.course`}
            control={control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <Input {...field} placeholder='Course' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`education.${index}.schoolName`}
            control={control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <Input {...field} placeholder='School Name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`education.${index}.schoolYear`}
            control={control}
            render={({ field }) => (
              <FormItem className='flex-none w-32'>
                <FormControl>
                  <Input {...field} placeholder='School Year' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`education.${index}.gpa`}
            control={control}
            render={({ field }) => (
              <FormItem className='flex-none w-32'>
                <FormControl>
                  <Input {...field} placeholder='GPA' />
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
        </FormRowGroup>
      ))}
      <Button
        variant='outline'
        onClick={() =>
          append({
            course: '',
            schoolName: '',
            schoolYear: ''
          })
        }
      >
        <AddLine />
        Add education
      </Button>
    </DynamicFormGroup>
  )
}
