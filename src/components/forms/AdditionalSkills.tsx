import React, { Fragment } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
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

export const AdditionalSkills: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'additionalSkills'
  })

  return (
    <DynamicFormGroup groupLabel='Additional Skills'>
      {fields.length === 0 ? (
        <SectionEmptyState
          icon={<SparklesLine className='size-5' />}
          title='No skills yet'
          description='Add the skills you bring to the table, like React.js or TypeScript.'
          ctaLabel='Add your first skill'
          onCta={() => append({ skill: '' })}
        />
      ) : (
        <>
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
        </>
      )}
    </DynamicFormGroup>
  )
}
