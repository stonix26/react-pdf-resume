import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { DeleteBinLine } from '@/components/icons'

export const DynamicFormGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    groupLabel: string
    onDelete?: React.MouseEventHandler<HTMLButtonElement>
  }
>(({ groupLabel, className, children, onDelete, ...props }, ref) => (
  <div ref={ref} className={cn('pl-2', className)} {...props}>
    <div className='flex gap-4 items-center'>
      <p className='text-xs font-medium text-muted-foreground uppercase leading-none my-4'>
        {groupLabel}
      </p>
      {onDelete ? (
        <Button
          type='button'
          onClick={onDelete}
          variant='ghost'
          className='hover:text-red-500'
          size='icon'
        >
          <DeleteBinLine />
        </Button>
      ) : null}
    </div>
    <div className='pl-4 space-y-6'>{children}</div>
  </div>
))
DynamicFormGroup.displayName = 'DynamicFormGroup'
