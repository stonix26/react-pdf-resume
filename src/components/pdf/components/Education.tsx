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
      {items.map((item, i) => (
        <View key={i}>
          <Text style={{ fontWeight: 'bold' }}>{item.course}</Text>
          <Text>{item.schoolName}</Text>
          <Text style={{ color: 'gray', fontSize: 8 }}>{item.schoolYear}</Text>
        </View>
      ))}
    </View>
  )
}

export default Education
