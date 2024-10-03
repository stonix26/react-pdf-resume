import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import SkillIcon from '../atoms/SkillIcon'

const Skills: React.FC<{
  content: string
}> = ({ content }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        marginTop: 3
      }}
    >
      <SkillIcon />
      <Text style={{ width: '90%' }}>{content}</Text>
    </View>
  )
}

export default Skills
