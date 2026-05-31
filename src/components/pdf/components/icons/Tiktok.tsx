import React from 'react'
import { Path, Svg } from '@react-pdf/renderer'

const Tiktok: React.FC = () => {
  return (
    <Svg style={{ width: 8, height: 8 }} viewBox='0 0 24 24' fill='gray'>
      <Path d='M16 8.24V15.5C16 19.08 13.08 22 9.5 22C5.91 22 3 19.08 3 15.5C3 11.91 5.91 9 9.5 9C10.01 9 10.51 9.06 11 9.17V12.33C10.54 12.12 10.03 12 9.5 12C7.56 12 6 13.56 6 15.5C6 17.43 7.56 19 9.5 19C11.43 19 13 17.43 13 15.5V2H16C16 4.76 18.23 7 21 7V10C19.1 10 17.36 9.34 16 8.24Z' />
    </Svg>
  )
}

export default Tiktok
