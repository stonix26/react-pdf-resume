import React from 'react'
import { Svg, Path } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types'

const CornerDownRight: React.FC<{ style?: Style }> = ({ style }) => {
  return (
    <Svg
      style={[{ width: 8, height: 8 }, style ?? {}]}
      viewBox='0 0 24 24'
      fill='gray'
    >
      <Path d='M4.99 13.99L4.99 5L6.99 4.99L6.99 11.99L17.17 12L13.22 8.05L14.63 6.63L21 13L14.63 19.36L13.22 17.94L17.17 14L4.99 13.99Z' />
    </Svg>
  )
}

export default CornerDownRight
