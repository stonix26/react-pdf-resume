import React, { Fragment } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import DynamicFormGroup from './DynamicFormGroup'
import FormRowGroup from './FormRowGroup'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import AddLine from '../icons/add-line'
import CloseLine from '../icons/close-line'

const AdditionalSkills: React.FC<{
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

export default AdditionalSkills
