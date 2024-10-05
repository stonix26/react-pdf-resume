import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { styles } from '../styles'

export interface ReferenceProp {
  data: {
    name: string
    company: string
    role: string
    contactNumber?: string
  }[]
}

const Reference: React.FC<ReferenceProp> = ({ data }) => {
  return (
    <View wrap={false} style={styles.section}>
      <Text style={styles.subHeader}>Reference</Text>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {data.map(item => (
          <View key={item.name}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.role}</Text>
            <Text style={{ color: 'gray', fontSize: 8 }}>{item.company}</Text>
            <Text style={{ color: 'gray', fontSize: 8 }}>
              {item.contactNumber}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Reference
