import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { InferredEducationSchema } from '@/types'
import { styles } from '../styles'

const Education: React.FC<{ items: InferredEducationSchema[] }> = ({
  items
}) => {
  return (
    <View wrap={false} style={styles.section}>
      <Text style={styles.subHeader}>Education</Text>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item, i) => (
          <View key={i}>
            <Text style={{ fontWeight: 'bold' }}>{item.course}</Text>
            <Text>{item.schoolName}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 8
              }}
            >
              {item.gpa
                ? `${item.gpa} GPA | ${item.schoolYear}`
                : item.schoolYear}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Education
