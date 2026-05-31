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
