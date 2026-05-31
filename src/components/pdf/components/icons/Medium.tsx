import React from 'react'
import { Path, Svg } from '@react-pdf/renderer'

const Medium: React.FC = () => {
  return (
    <Svg style={{ width: 8, height: 8 }} viewBox='0 0 24 24' fill='gray'>
      <Path d='M13.4 12C13.4 15.45 10.63 18.25 7.2 18.25C3.77 18.25 1 15.45 1 12C1 8.55 3.77 5.76 7.2 5.76C10.63 5.76 13.4 8.55 13.4 12ZM20.21 12C20.21 15.25 18.82 17.88 17.11 17.88C15.4 17.88 14.01 15.25 14.01 12C14.01 8.75 15.4 6.12 17.11 6.12C18.82 6.12 20.21 8.75 20.21 12ZM23 12C23 14.91 22.51 17.27 21.9 17.27C21.3 17.27 20.81 14.91 20.81 12C20.81 9.09 21.3 6.73 21.9 6.73C22.51 6.73 23 9.09 23 12Z' />
    </Svg>
  )
}

export default Medium
