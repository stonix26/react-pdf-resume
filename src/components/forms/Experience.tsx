import React from 'react'
import {
  Control,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  useWatch
} from 'react-hook-form'
import { type InferredResumeSchema } from '@/types'
import { locationTypeSchema } from '@/schema'
import {
  DynamicFormGroup,
  FormRowGroup,
  Roles,
  getFieldArrayOrderProps
} from '@/components/forms'
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
} from '@/components/ui'

const locationTypeOptions = locationTypeSchema.options

export const Experience: React.FC<{
  control: Control<InferredResumeSchema>
  index: number
  totalCount: number
  remove: UseFieldArrayRemove
  move: UseFieldArrayMove
}> = ({ control, index, totalCount, remove, move }) => {
  const companyName = useWatch({
    control,
    name: `experiences.${index}.companyName`
  })

  const orderProps = getFieldArrayOrderProps(index, totalCount, move)

  return (
    <DynamicFormGroup
      groupLabel={companyName?.length ? companyName : 'New company'}
      onDelete={() => remove(index)}
      {...orderProps}
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
              <Select onValueChange={field.onChange} value={field.value}>
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

      <Roles control={control} experienceIndex={index} />
    </DynamicFormGroup>
  )
}
