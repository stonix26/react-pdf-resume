import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import type { ComponentProps } from 'react'

export type AppIconProps = Omit<ComponentProps<typeof HugeiconsIcon>, 'icon'>

export function createIcon(icon: IconSvgElement) {
  const Icon = (props: AppIconProps) => (
    <HugeiconsIcon icon={icon} strokeWidth={2} {...props} />
  )

  return Icon
}
