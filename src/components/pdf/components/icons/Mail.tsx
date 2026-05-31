import React from 'react'
import { Svg, Path } from '@react-pdf/renderer'

const Mail: React.FC = () => {
  return (
    <Svg style={{ width: 8, height: 8 }} viewBox='0 0 24 24' fill='gray'>
      <Path d='M3 3H21C21.55 3 22 3.44 22 4V20C22 20.55 21.55 21 21 21H3C2.44 21 2 20.55 2 20V4C2 3.44 2.44 3 3 3ZM20 7.23L12.07 14.33L4 7.21V19H20V7.23ZM4.51 5L12.06 11.66L19.5 5H4.51Z' />
    </Svg>
  )
}

export default Mail
