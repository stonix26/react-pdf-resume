import React from 'react'
import { Svg, Path } from '@react-pdf/renderer'

const ExternalLink: React.FC = () => {
  return (
    <Svg style={{ width: 8, height: 8 }} viewBox='0 0 24 24' fill='gray'>
      <Path d='M10 6V8H5V19H16V14H18V20C18 20.55 17.55 21 17 21H4C3.44 21 3 20.55 3 20V7C3 6.44 3.44 6 4 6H10ZM21 3V11H19L18.99 6.41L11.2 14.2L9.79 12.79L17.58 5H13V3H21Z' />
    </Svg>
  )
}

export default ExternalLink
