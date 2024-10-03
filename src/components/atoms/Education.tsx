import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { styles } from '../styles'

export interface EducationProps {
  course: string
  schoolName: string
  schoolYear: string
}

const Education: React.FC<EducationProps> = ({
  course,
  schoolName,
  schoolYear
}) => {
  return (
    <View wrap={false} style={styles.section}>
      <Text style={styles.subHeader}>Education</Text>
      <Text style={{ fontWeight: 'bold' }}>{course}</Text>
      <Text>{schoolName}</Text>
      <Text style={{ color: 'gray' }}>{schoolYear}</Text>
    </View>
  )
}

export default Education
