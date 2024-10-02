import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { styles } from '../styles'

const Summary: React.FC<{ content: string }> = ({ content }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.subHeader}>Summary of Qualifications</Text>
      <View>
        <Text>{content}</Text>
      </View>
    </View>
  )
}

export default Summary
