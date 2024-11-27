import React from 'react'
import { cn } from '@/lib/utils'

export const FormRowGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-4 flex-wrap', className)}
    {...props}
  >
    {children}
  </div>
))
FormRowGroup.displayName = 'FormRowGroup'

export default FormRowGroup
