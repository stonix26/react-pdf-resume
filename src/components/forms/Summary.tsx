import React from 'react'
import { Control } from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../ui/form'
import { Textarea } from '../ui/textarea'

const Summary: React.FC<{ control: Control<InferredResumeSchema> }> = ({
  control
}) => (
  <FormField
    name='summary'
    control={control}
    render={({ field }) => (
      <FormItem className='flex-1'>
        <FormLabel>Summary</FormLabel>
        <FormControl>
          <Textarea
            {...field}
            className='min-h-32'
            placeholder='Tell us a little bit about yourself...'
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export default Summary
