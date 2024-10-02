import React from 'react'
import { View, Text } from '@react-pdf/renderer'

const BulletText: React.FC<{ text: string | React.ReactNode }> = ({ text }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 4
      }}
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
