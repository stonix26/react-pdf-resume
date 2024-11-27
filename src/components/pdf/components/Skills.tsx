import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { sortStringsAlphabetically } from '@/utils'
import CornerDownRight from './icons/CornerDownRight'

const Skills: React.FC<{
  content: (string | undefined)[]
}> = ({ content }) => {
  const sorted = sortStringsAlphabetically(content)
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        marginTop: 3
      }}
    >
      <CornerDownRight style={{ marginTop: 2 }} />
      <Text style={{ width: '90%', fontSize: 8, color: 'gray' }}>
        {sorted.join(' · ')}
      </Text>
    </View>
  )
}

export default Skills
