import React from 'react'
import { View, Text, Link } from '@react-pdf/renderer'
import { styles } from '../styles'

export interface PortfolioProps {
  links: { src: string; text: string }[]
}

const Portfolio: React.FC<PortfolioProps> = ({ links }) => {
  return (
    <View wrap={false} style={styles.section}>
      <Text style={styles.subHeader}>Portfolio</Text>
      {links.map((link, index) => (
        <Link style={{ textDecoration: 'none' }} src={link.src} key={index}>
          {link.text}
        </Link>
      ))}
    </View>
  )
}

export default Portfolio
