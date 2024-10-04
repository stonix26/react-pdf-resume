import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import SkillIcon from '../atoms/SkillIcon'
import { sortStringsAlphabetically } from '../../utils'

const Skills: React.FC<{
  content: string[]
}> = ({ content }) => {
  const sorted = sortStringsAlphabetically(content)
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 3,
        marginTop: 3,
        marginLeft: -2.7
      }}
    >
      <SkillIcon />
      <Text style={{ width: '90%' }}>{sorted.join(' · ')}</Text>
    </View>
  )
}

export default Skills
