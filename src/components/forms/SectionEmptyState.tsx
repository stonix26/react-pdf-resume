import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'

type SectionEmptyStateProps = {
  icon: React.ReactNode
  title: string
  description: string
  ctaLabel: string
  onCta: () => void
  className?: string
}

export function SectionEmptyState({
  icon,
  title,
  description,
  ctaLabel,
  onCta,
  className
}: SectionEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-muted/10 px-6 py-8 text-center',
        className
      )}
    >
      <span className='flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground'>
        {icon}
      </span>
      <div className='space-y-1'>
        <p className='text-sm font-medium'>{title}</p>
        <p className='mx-auto max-w-xs text-xs text-muted-foreground'>
          {description}
        </p>
      </div>
      <Button
        type='button'
        variant='outline'
        className='max-w-fit'
        onClick={onCta}
      >
        {ctaLabel}
      </Button>
    </div>
  )
}
