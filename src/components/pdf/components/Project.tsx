import { Link, Text, View } from '@react-pdf/renderer'
import React from 'react'
import { styles } from '../styles'
import { InferredProjectSchema } from '@/types'
import ExternalLink from './icons/ExternalLink'
import { ServerStack } from './icons'
import { sortStringsAlphabetically } from '@/utils'

const Project: React.FC<{
  projects: InferredProjectSchema[]
}> = ({ projects }) => {
  return (
    <View style={[styles.section, { marginTop: 20.7 }]}>
      <Text style={styles.subHeader}>Project / Portfolio</Text>
      {projects.map((project, index) => (
        <View wrap={false} key={index} style={styles.section}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{project.name}</Text>
            <Text style={{ color: 'gray', fontSize: 8 }}>— {project.type}</Text>
          </View>

          <View
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Link
              style={[styles.links, { fontSize: 8 }]}
              src={project.link?.src}
            >
              {project.link?.label}
            </Link>
            <ExternalLink />
          </View>
          <Text>{project.description}</Text>
          {project.techStack.length ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4
              }}
            >
              <ServerStack />
              <Text style={{ width: '90%', fontSize: 8, color: 'gray' }}>
                {sortStringsAlphabetically(
                  project.techStack.map(i => i.tech)
                ).join(' · ')}
              </Text>
            </View>
          ) : null}
        </View>
      ))}
    </View>
  )
}

export default Project
