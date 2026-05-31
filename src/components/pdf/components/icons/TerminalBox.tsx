import React from 'react'
import { Svg, Path } from '@react-pdf/renderer'

const TerminalBox: React.FC = () => {
  return (
    <Svg style={{ width: 8, height: 8 }} viewBox='0 0 24 24' fill='gray'>
      <Path d='M3 3H21C21.55 3 22 3.44 22 4V20C22 20.55 21.55 21 21 21H3C2.44 21 2 20.55 2 20V4C2 3.44 2.44 3 3 3ZM12 15V17H18V15H12ZM8.41 12L5.58 14.82L7 16.24L11.24 12L7 7.75L5.58 9.17L8.41 12Z' />
    </Svg>
  )
}

export default TerminalBox
