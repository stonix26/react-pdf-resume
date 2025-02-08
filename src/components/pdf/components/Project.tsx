import { Link, Text, View } from '@react-pdf/renderer'
import React from 'react'
import { styles } from '../styles'
import { InferredProjectSchema } from '@/types'
import ExternalLink from './icons/ExternalLink'

const Project: React.FC<{
  projects: InferredProjectSchema[]
}> = ({ projects }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.subHeader}>Project / Portfolio</Text>
      {projects.map((project, index) => {
        const techStackNames = project.techStack.map(i => i.tech)

        return (
          <View key={index} style={styles.section}>
            <View
              wrap={false}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>{project.name}</Text>
              <Text style={{ color: 'gray', fontSize: 8 }}>
                — {project.type}
              </Text>
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
            <Text
              style={{
                marginTop: 4
              }}
            >
              {project.description}
            </Text>
            {project.techStack.length ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 3,
                  marginTop: 4
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 8 }}>
                  Tech Stack:
                </Text>
                <Text style={{ width: '90%', fontSize: 8, color: 'gray' }}>
                  {techStackNames.join(' · ')}
                </Text>
              </View>
            ) : null}
          </View>
        )
      })}
    </View>
  )
}

export default Project
