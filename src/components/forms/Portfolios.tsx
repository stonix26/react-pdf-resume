import { InferredResumeSchema } from '@/types'
import React from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import DynamicFormGroup from './DynamicFormGroup'
import FormRowGroup from './FormRowGroup'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import DeleteBinLine from '../icons/delete-bin-line'
import AddLine from '../icons/add-line'

const Portfolios: React.FC<{ control: Control<InferredResumeSchema> }> = ({
  control
}) => {
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
            <DeleteBinLine />
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

export default Portfolios
