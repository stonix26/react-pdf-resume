import React from 'react'
import { View, Text, Link } from '@react-pdf/renderer'
import { InferredPortfolioSchema } from '@/types'
import ExternalLink from './icons/ExternalLink'
import { styles } from '../styles'

const Portfolio: React.FC<{ links: InferredPortfolioSchema[] | undefined }> = ({
  links
}) => {
  return (
    <View wrap={false} style={styles.section}>
      <Text style={styles.subHeader}>Projects / Portfolio</Text>
      {links?.map((link, index) => (
        <View
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Link style={[styles.links, { fontSize: 10 }]} src={link.src}>
            {link.text}
          </Link>
          <ExternalLink />
        </View>
      ))}
    </View>
  )
}

export default Portfolio
