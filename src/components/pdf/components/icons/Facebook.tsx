import React from 'react'
import { Path, Svg } from '@react-pdf/renderer'

const Facebook: React.FC = () => {
  return (
    <Svg style={{ width: 8, height: 8 }} viewBox='0 0 24 24' fill='gray'>
      <Path d='M15.4 21V14.03H17.73L18.08 11.32H15.4V9.59C15.4 8.81 15.62 8.27 16.74 8.27L18.17 8.27V5.85C17.93 5.82 17.07 5.75 16.08 5.75C14.02 5.75 12.6 7.01 12.6 9.32V11.32H10.26V14.03H12.6V21H4C3.44 21 3 20.55 3 20V4C3 3.44 3.44 3 4 3H20C20.55 3 21 3.44 21 4V20C21 20.55 20.55 21 20 21H15.4Z' />
    </Svg>
  )
}

export default Facebook
