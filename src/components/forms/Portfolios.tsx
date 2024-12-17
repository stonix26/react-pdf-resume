import React from 'react'
import { type Control, useFieldArray } from 'react-hook-form'
import { type InferredResumeSchema } from '@/types'
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

export const Portfolios: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'portfolio'
  })
  return (
    <DynamicFormGroup groupLabel='Projects / Portfolios'>
      {fields.map((portfolioFields, index) => (
        <FormRowGroup key={portfolioFields.id}>
          <FormField
            name={`portfolio.${index}.src`}
            control={control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <Input {...field} placeholder='URL' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`portfolio.${index}.text`}
            control={control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormControl>
                  <Input {...field} placeholder='Text' />
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
            src: '',
            text: ''
          })
        }
      >
        <AddLine />
        Add project / portfolio
      </Button>
    </DynamicFormGroup>
  )
}
