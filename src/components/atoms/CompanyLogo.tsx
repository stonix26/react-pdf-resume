import React from 'react'
import { View, Image } from '@react-pdf/renderer'

const CompanyLogo: React.FC<{
  src?: string
}> = ({ src }) => {
  if (!src || src === undefined) {
    return (
      <View
        style={{
          width: 30,
          height: 30,
          border: '1px solid gray',
          borderRadius: 2,
          padding: 2
        }}
      >
        <View
          style={{
            width: 10,
            height: 10,
            border: '1px solid gray',
            borderRadius: 2
          }}
        />
      </View>
    )
  }

  return <Image src={src} style={{ width: 30, height: 30 }} />
}

export default CompanyLogo
