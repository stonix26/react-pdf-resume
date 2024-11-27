import React from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '../ui/select'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import DynamicFormGroup from './DynamicFormGroup'
import FormRowGroup from './FormRowGroup'
import Roles from './Roles'
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayRemove,
  useWatch
} from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import { locationTypeSchema } from '@/schema'

const locationTypeOptions = locationTypeSchema.options

const Experience: React.FC<{
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
      groupLabel={companyName.length ? companyName : 'New company'}
      key={fields.id}
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
                <Input {...field} placeholder='https://logo.com/pic' />
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

export default Experience
