import React from 'react'
import { type Control, useFieldArray } from 'react-hook-form'
import { type InferredResumeSchema } from '@/types'
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

export const References: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'reference'
  })

  return (
    <DynamicFormGroup groupLabel='References'>
      {fields.length === 0 ? (
        <SectionEmptyState
          icon={<SparklesLine className='size-5' />}
          title='No references yet'
          description='Add people who can vouch for you and your work.'
          ctaLabel='Add your first reference'
          onCta={() =>
            append({
              name: '',
              company: '',
              role: '',
              contactNumber: ''
            })
          }
        />
      ) : (
        <>
          {fields.map((referenceFields, index) => (
            <FormRowGroup key={referenceFields.id}>
              <FormField
                name={`reference.${index}.name`}
                control={control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <Input {...field} placeholder='Name' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`reference.${index}.company`}
                control={control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <Input {...field} placeholder='Company' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`reference.${index}.role`}
                control={control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <Input {...field} placeholder='Role / Position' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`reference.${index}.contactNumber`}
                control={control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <Input {...field} placeholder='Contact Number' />
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
                name: '',
                company: '',
                role: '',
                contactNumber: ''
              })
            }
          >
            <AddLine />
            Add reference
          </Button>
        </>
      )}
    </DynamicFormGroup>
  )
}
