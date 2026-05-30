import React, { Fragment } from 'react'
import {
  type Control,
  useFieldArray,
  UseFieldArrayRemove,
  useWatch
} from 'react-hook-form'
import { type InferredResumeSchema } from '@/types'
import { DynamicFormGroup, FormRowGroup } from '@/components/forms'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Button,
  Textarea
} from '@/components/ui'
import { AddLine, CloseLine } from '@/components/icons'

export const Projects: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects'
  })

  return (
    <DynamicFormGroup groupLabel='Project / Portfolio'>
      {fields.map((projectFields, index) => (
        <Project
          key={projectFields.id}
          control={control}
          index={index}
          remove={remove}
        />
      ))}
      <Button
        type='button'
        variant='outline'
        onClick={() =>
          append({
            type: '',
            name: '',
            description: '',
            techStack: [],
            link: { src: '', label: '' }
          })
        }
      >
        <AddLine /> Add Project
      </Button>
    </DynamicFormGroup>
  )
}

const Project: React.FC<{
  control: Control<InferredResumeSchema>
  index: number
  remove: UseFieldArrayRemove
}> = ({ control, index, remove }) => {
  const projectName = useWatch({
    control,
    name: `projects.${index}.name`
  })

  return (
    <DynamicFormGroup
      groupLabel={projectName?.length ? projectName : 'New project'}
      onDelete={() => remove(index)}
    >
      <FormRowGroup>
        <FormField
          name={`projects.${index}.name`}
          control={control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input {...field} placeholder='Name' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`projects.${index}.type`}
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder='Type' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRowGroup>

      <FormRowGroup>
        <FormField
          name={`projects.${index}.link.src`}
          control={control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input {...field} placeholder='Link' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`projects.${index}.link.label`}
          control={control}
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input {...field} placeholder='Label' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormRowGroup>
      <FormField
        name={`projects.${index}.description`}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea {...field} placeholder='Description' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <TechStacks control={control} index={index} />
    </DynamicFormGroup>
  )
}

const TechStacks: React.FC<{
  control: Control<InferredResumeSchema>
  index: number
}> = ({ control, index }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `projects.${index}.techStack`
  })

  return (
    <FormRowGroup>
      {fields.map((techFields, techIndex) => (
        <Fragment key={techFields.id}>
          <FormField
            name={`projects.${index}.techStack.${techIndex}.tech`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder='Tech' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='button'
            variant='ghost'
            className='hover:text-red-500'
            size='icon'
            onClick={() => remove(techIndex)}
          >
            <CloseLine />
          </Button>
        </Fragment>
      ))}
      <Button
        type='button'
        variant='outline'
        onClick={() => append({ tech: '' })}
      >
        <AddLine /> Add Tech
      </Button>
    </FormRowGroup>
  )
}
