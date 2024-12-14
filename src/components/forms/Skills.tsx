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

const Skills: React.FC<{
  control: Control<InferredResumeSchema>
  experienceIndex: number
  roleIndex: number
}> = ({ control, experienceIndex, roleIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `experiences.${experienceIndex}.roles.${roleIndex}.skills`
  })
  return (
    <DynamicFormGroup groupLabel='Role Skills'>
      <FormRowGroup>
        {fields.map((skillFields, skillIndex) => (
          <Fragment key={skillFields.id}>
            <FormField
              name={`experiences.${experienceIndex}.roles.${roleIndex}.skills.${skillIndex}.skill`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder='Vue.js' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant='ghost'
              className='hover:text-red-500'
              size='icon'
              onClick={() => remove(skillIndex)}
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

export default Skills
