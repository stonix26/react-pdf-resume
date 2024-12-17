import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '../ui/select'
import React from 'react'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Descriptions, DynamicFormGroup, FormRowGroup, Skills } from '.'
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayRemove,
  useWatch
} from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import { employmentTypeSchema } from '@/schema'

const employmentTypeOptions = employmentTypeSchema.options

export const Role: React.FC<{
  control: Control<InferredResumeSchema>
  fields: FieldArrayWithId<InferredResumeSchema>
  experienceIndex: number
  roleIndex: number
  remove: UseFieldArrayRemove
}> = ({ control, fields, experienceIndex, roleIndex, remove }) => {
  const roleName = useWatch({
    control,
    name: `experiences.${experienceIndex}.roles.${roleIndex}.role`
  })

  return (
    <DynamicFormGroup
      key={fields.id}
      groupLabel={roleName.length ? roleName : 'New role'}
      onDelete={() => remove(roleIndex)}
    >
      <FormRowGroup>
        <FormField
          name={`experiences.${experienceIndex}.roles.${roleIndex}.role`}
          control={control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Role / Position</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Front-end Developer' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`experiences.${experienceIndex}.roles.${roleIndex}.employmentType`}
          control={control}
          render={({ field }) => (
            <FormItem className='flex-none w-32'>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select an employment type.' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employmentTypeOptions.map(option => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`experiences.${experienceIndex}.roles.${roleIndex}.startDate`}
          control={control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input {...field} placeholder='2024-01-31' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`experiences.${experienceIndex}.roles.${roleIndex}.endDate`}
          control={control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={e =>
                    field.onChange(
                      e.target.value === '' ? undefined : e.target.value
                    )
                  }
                  value={field.value}
                  placeholder='2024-02-29'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRowGroup>
      <Descriptions
        control={control}
        experienceIndex={experienceIndex}
        roleIndex={roleIndex}
      />
      <Skills
        control={control}
        experienceIndex={experienceIndex}
        roleIndex={roleIndex}
      />
    </DynamicFormGroup>
  )
}
