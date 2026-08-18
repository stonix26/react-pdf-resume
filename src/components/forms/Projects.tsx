import React, { Fragment } from 'react'
import {
  type Control,
  useFieldArray,
  UseFieldArrayMove,
  UseFieldArrayRemove,
  useWatch
} from 'react-hook-form'
import { type InferredResumeSchema } from '@/types'
import { DynamicFormGroup } from '@/components/forms/DynamicFormGroup'
import { FormRowGroup } from '@/components/forms/FormRowGroup'
import { OrderControls } from '@/components/forms/OrderControls'
import { getFieldArrayOrderProps } from '@/components/forms/order-controls-utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Button,
  Textarea
} from '@/components/ui'
import { AddLine, CloseLine, SparklesLine } from '@/components/icons'
import { SectionEmptyState } from '@/components/forms/SectionEmptyState'

export const Projects: React.FC<{
  control: Control<InferredResumeSchema>
}> = ({ control }) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'projects'
  })

  return (
    <DynamicFormGroup groupLabel='Project / Portfolio'>
      {fields.length === 0 ? (
        <SectionEmptyState
          icon={<SparklesLine className='size-5' />}
          title='No projects yet'
          description='Showcase portfolio highlights and side projects.'
          ctaLabel='Add your first project'
          onCta={() =>
            append({
              type: '',
              name: '',
              description: '',
              techStack: [],
              link: { src: '', label: '' }
            })
          }
        />
      ) : (
        <>
          {fields.map((projectFields, index) => (
            <Project
              key={projectFields.id}
              control={control}
              index={index}
              totalCount={fields.length}
              remove={remove}
              move={move}
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
        </>
      )}
    </DynamicFormGroup>
  )
}

const Project: React.FC<{
  control: Control<InferredResumeSchema>
  index: number
  totalCount: number
  remove: UseFieldArrayRemove
  move: UseFieldArrayMove
}> = ({ control, index, totalCount, remove, move }) => {
  const projectName = useWatch({
    control,
    name: `projects.${index}.name`
  })

  const orderProps = getFieldArrayOrderProps(index, totalCount, move)

  return (
    <DynamicFormGroup
      groupLabel={projectName?.length ? projectName : 'New project'}
      onDelete={() => remove(index)}
      {...orderProps}
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
  const { fields, append, remove, move } = useFieldArray({
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
          <OrderControls
            {...getFieldArrayOrderProps(techIndex, fields.length, move)}
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
