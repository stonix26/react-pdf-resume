import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { sortStringsAlphabetically } from '@/utils'
import { styles } from '../styles'

const KeySkills: React.FC<{ skills: (string | undefined)[] }> = ({
  skills
}) => {
  const sortedSkills = sortStringsAlphabetically(skills)
  return (
    <View wrap={false} style={styles.section}>
      <Text style={styles.subHeader}>Key Skills</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 4
        }}
      >
        {sortedSkills.map(skill => (
          <View
            key={skill}
            style={{
              backgroundColor: '#f0f0f0',
              fontSize: 8,
              padding: '1pt 4pt',
              borderRadius: 5,
              textAlign: 'center'
            }}
          >
            <Text style={{ fontSize: 8 }}>{skill}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default KeySkills
