import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { DeleteBinLine } from '@/components/icons'
import { OrderControls } from '@/components/forms/OrderControls'

export const DynamicFormGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    groupLabel: string
    onDelete?: React.MouseEventHandler<HTMLButtonElement>
    canMoveUp?: boolean
    canMoveDown?: boolean
    onMoveUp?: () => void
    onMoveDown?: () => void
  }
>(
  (
    {
      groupLabel,
      className,
      children,
      onDelete,
      canMoveUp,
      canMoveDown,
      onMoveUp,
      onMoveDown,
      ...props
    },
    ref
  ) => {
    const showOrderControls =
      onMoveUp !== undefined && onMoveDown !== undefined

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-border bg-muted/20 p-4 space-y-4',
          className
        )}
        {...props}
      >
        <div className='flex items-center justify-between gap-4'>
          <p className='text-xs font-medium uppercase tracking-wide text-foreground'>
            {groupLabel}
          </p>
          <div className='flex items-center'>
            {showOrderControls ? (
              <OrderControls
                canMoveUp={canMoveUp ?? false}
                canMoveDown={canMoveDown ?? false}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
              />
            ) : null}
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
        </div>
        <div className='space-y-4'>{children}</div>
      </div>
    )
  }
)
DynamicFormGroup.displayName = 'DynamicFormGroup'
