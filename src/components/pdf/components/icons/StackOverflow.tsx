import React from 'react'
import { Path, Svg } from '@react-pdf/renderer'

const StackOverflow: React.FC = () => {
  return (
    <Svg style={{ width: 8, height: 8 }} viewBox='0 0 24 24' fill='gray'>
      <Path d='M18 20V14.66H20V22H4V14.66H6V20H18ZM7.59 14.73L7.91 12.75L16.75 14.45L16.63 16.04L7.59 14.73ZM8.79 10.2L9.53 8.6L17.52 12.33L16.79 13.93L8.79 10.2ZM11.06 6.27L12.19 4.93L18.99 10.6L17.86 11.93L11.06 6.27ZM15.39 2.14L20.66 9.2L19.26 10.27L13.99 3.2L15.39 2.14ZM7.33 18.66V16.66H16.66V18.66H7.33Z' />
    </Svg>
  )
}

export default StackOverflow
