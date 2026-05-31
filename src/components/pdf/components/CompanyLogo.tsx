import React from 'react'
import { Image, Svg, Path } from '@react-pdf/renderer'

const CompanyLogo: React.FC<{
  src?: string | File
}> = ({ src }) => {
  if (typeof src !== 'string' || src.length === 0) {
    return (
      <Svg style={{ width: 30, height: 30 }} viewBox='0 0 24 24' fill='gray'>
        <Path d='M21 19H23V21H1V19H3V4C3 3.44 3.44 3 4 3H14C14.55 3 15 3.44 15 4V19H19V11H17V9H20C20.55 9 21 9.44 21 10V19ZM5 5V19H13V5H5ZM7 11H11V13H7V11ZM7 7H11V9H7V7Z' />
      </Svg>
    )
  }

  return <Image src={src} style={{ width: 30, height: 30 }} />
}

export default CompanyLogo
