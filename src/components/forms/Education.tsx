import React from 'react'
import { type InferredResumeSchema } from '@/types'
import { Control, useFieldArray } from 'react-hook-form'
import { DynamicFormGroup } from '@/components/forms/DynamicFormGroup'
import { FormRowGroup } from '@/components/forms/FormRowGroup'
import { OrderControls } from '@/components/forms/OrderControls'
import { getFieldArrayOrderProps } from '@/components/forms/order-controls-utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Button
} from '@/components/ui'
import { AddLine, CloseLine, SparklesLine } from '@/components/icons'
import { SectionEmptyState } from '@/components/forms/SectionEmptyState'

export const Education: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'education'
  })

  return (
    <DynamicFormGroup groupLabel='Education'>
      {fields.length === 0 ? (
        <SectionEmptyState
          icon={<SparklesLine className='size-5' />}
          title='No education yet'
          description='Add your degrees, diplomas, or certifications.'
          ctaLabel='Add your first entry'
          onCta={() =>
            append({
              course: '',
              schoolName: '',
              schoolYear: ''
            })
          }
        />
      ) : (
        <>
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
            </FormRowGroup>
          ))}
          <Button
            type='button'
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
        </>
      )}
    </DynamicFormGroup>
  )
}
