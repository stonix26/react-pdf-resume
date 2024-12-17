import React from 'react'
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayRemove,
  useWatch
} from 'react-hook-form'
import { type InferredResumeSchema } from '@/types'
import { locationTypeSchema } from '@/schema'
import { DynamicFormGroup, FormRowGroup, Roles } from '.'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input
} from '../ui'

const locationTypeOptions = locationTypeSchema.options

export const Experience: React.FC<{
  control: Control<InferredResumeSchema>
  fields: FieldArrayWithId<InferredResumeSchema>
  index: number
  remove: UseFieldArrayRemove
}> = ({ control, fields, index, remove }) => {
  const companyName = useWatch({
    control,
    name: `experiences.${index}.companyName`
  })

  return (
    <DynamicFormGroup
      key={fields.id}
      groupLabel={companyName.length ? companyName : 'New company'}
      onDelete={() => remove(index)}
    >
      <FormRowGroup>
        <FormField
          name={`experiences.${index}.companyName`}
          control={control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Amazon' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`experiences.${index}.companyLogo`}
          control={control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Company Logo</FormLabel>
              <FormControl>
                <Input
                  // {...field}
                  type='file'
                  accept='image/*'
                  onChange={e => {
                    const file = e.target.files?.[0] || null
                    field.onChange(file)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`experiences.${index}.location`}
          control={control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} placeholder='London, UK' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`experiences.${index}.locationType`}
          control={control}
          render={({ field }) => (
            <FormItem className='flex-none w-32'>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a location type.' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locationTypeOptions.map(option => (
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
      </FormRowGroup>

      {/* Roles */}
      <Roles control={control} experienceIndex={index} />
      {/* --- Roles END --- */}
    </DynamicFormGroup>
  )
}
