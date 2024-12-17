import React from 'react'
import type { Control } from 'react-hook-form'
import { InferredResumeSchema } from '@/types'
import { FormRowGroup } from '.'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input
} from '../ui'

export const Header: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => (
  <>
    <FormRowGroup>
      <FormField
        name='header.firstName'
        control={control}
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder='Marc' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name='header.middleName'
        control={control}
        render={({ field }) => (
          <FormItem className='flex-none w-32'>
            <FormLabel>Middle Initial</FormLabel>
            <FormControl>
              <Input {...field} placeholder='A' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name='header.lastName'
        control={control}
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder='Márquez' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormRowGroup>

    <FormRowGroup>
      <FormField
        name='header.profilePicture'
        control={control}
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>Profile URL</FormLabel>
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
        name='header.address'
        control={control}
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input {...field} placeholder='Cervera, Spain' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name='header.mobileNumber'
        control={control}
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input {...field} placeholder='+34 93 99999999' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormRowGroup>
  </>
)
