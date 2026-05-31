import React from 'react'
import { Button } from '@/components/ui'
import { ArrowDownLine, ArrowUpLine } from '@/components/icons'

type OrderControlsProps = {
  canMoveUp: boolean
  canMoveDown: boolean
  onMoveUp: () => void
  onMoveDown: () => void
  className?: string
}

export const OrderControls: React.FC<OrderControlsProps> = ({
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  className
}) => (
  <div className={className ?? 'flex items-center'}>
    <Button
      type='button'
      variant='ghost'
      size='icon'
      disabled={!canMoveUp}
      aria-label='Move up'
      onClick={onMoveUp}
    >
      <ArrowUpLine />
    </Button>
    <Button
      type='button'
      variant='ghost'
      size='icon'
      disabled={!canMoveDown}
      aria-label='Move down'
      onClick={onMoveDown}
    >
      <ArrowDownLine />
    </Button>
  </div>
)

export function getFieldArrayOrderProps(
  index: number,
  total: number,
  move: (from: number, to: number) => void
) {
  return {
    canMoveUp: index > 0,
    canMoveDown: index < total - 1,
    onMoveUp: () => move(index, index - 1),
    onMoveDown: () => move(index, index + 1)
  }
}
