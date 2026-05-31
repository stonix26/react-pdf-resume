import React from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { linkTypeSchema } from '@/schema'
import { InferredResumeSchema } from '@/types'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  Input
} from '@/components/ui'
import { AddLine, CloseLine } from '@/components/icons'
import { DynamicFormGroup, FormRowGroup, OrderControls, getFieldArrayOrderProps } from '@/components/forms'

const linkTypeOptions = linkTypeSchema.options

export const HeaderLinks: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => {
  const {
    fields,
    append: appendLink,
    remove: removeLink,
    move: moveLink
  } = useFieldArray({
    control,
    name: 'header.links'
  })

  return (
    <DynamicFormGroup groupLabel='Header Links'>
      {fields.map((headerLinkFields, headerLinksIndex) => (
        <FormRowGroup key={headerLinkFields.id}>
          <FormField
            name={`header.links.${headerLinksIndex}.text`}
            control={control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Link Text</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Link Text' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`header.links.${headerLinksIndex}.url`}
            control={control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='URL' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`header.links.${headerLinksIndex}.type`}
            control={control}
            render={({ field }) => (
              <FormItem className='flex-none w-32'>
                <FormLabel>Icon</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a link type for the icon.' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {linkTypeOptions.map(option => (
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
          <OrderControls
            className='flex items-center self-end'
            {...getFieldArrayOrderProps(
              headerLinksIndex,
              fields.length,
              moveLink
            )}
          />
          <Button
            type='button'
            variant='ghost'
            className='self-end hover:text-red-500'
            size='icon'
            onClick={() => removeLink(headerLinksIndex)}
          >
            <CloseLine />
          </Button>
        </FormRowGroup>
      ))}

      <Button
        type='button'
        variant='outline'
        onClick={() => appendLink({ text: '', url: '', type: 'Mail' })}
      >
        <AddLine />
        Add header link
      </Button>
    </DynamicFormGroup>
  )
}
