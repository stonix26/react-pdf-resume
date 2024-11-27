import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'

const BulletText: React.FC<{
  text: string | React.ReactNode
  style?: Style
}> = ({ text, style }) => {
  return (
    <View
      style={[
        {
          display: 'flex',
          flexDirection: 'row',
          gap: 4
        },
        style ?? {}
      ]}
    >
      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
          top: 5.5
        }}
      />
      <Text style={{ width: '90%' }}>{text}</Text>
    </View>
  )
}

export default BulletText
