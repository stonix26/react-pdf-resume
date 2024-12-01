import React, { memo } from 'react'
import { Document, Page, View, Text } from '@react-pdf/renderer'
import { InferredResumeSchema } from '@/types'
import Header from './components/Header'
import Summary from './components/Summary'
import Education from './components/Education'
import KeySkills from './components/KeySkills'
import Portfolio from './components/Portfolio'
import Reference from './components/Reference'
import Experience from './components/Experience'
import { styles } from './styles'

const Resume: React.FC<InferredResumeSchema> = ({
  header,
  summary,
  experiences,
  additionalSkills = [],
  education,
  portfolio,
  reference
}) => {
  // Extract all skills from the roles
  const allSkills = experiences.flatMap(experience =>
    experience.roles.flatMap(role => role.skills?.map(i => i.skill))
  )

  // Remove duplicates using Set
  const uniqueSkills = [
    ...new Set([...allSkills, ...additionalSkills.map(i => i.skill)])
  ]

  const metadata = {
    title: `${header.firstName} ${header.lastName} - Resume`,
    author: `${header.firstName} ${header.lastName}`,
    subject: `${header.firstName} ${header.lastName} - Resume`,
    keywords: uniqueSkills.sort().join(', '),
    creator: `react-pdf-resume app`,
    producer: 'Ruston Emperua'
  }

  return (
    <Document {...metadata}>
      <Page
        wrap={true}
        style={{
          padding: 30,
          fontFamily: 'Open Sans',
          fontSize: 10,
          fontWeight: 'normal',
          position: 'relative'
        }}
      >
        {header && <Header {...header} />}

        {summary && <Summary content={summary} />}

        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.subHeader, { marginBottom: 4 }]}>
              Work Experience
            </Text>
            {experiences.map((item, index) => (
              <Experience key={index} {...item} />
            ))}
          </View>
        )}

        {uniqueSkills.length > 0 && <KeySkills skills={uniqueSkills} />}

        {education.length > 0 && <Education items={education} />}

        {portfolio !== undefined && portfolio.length > 0 ? (
          <Portfolio links={portfolio} />
        ) : null}

        {reference !== undefined && reference.length > 0 && (
          <Reference data={reference} />
        )}
        <Text
          style={{
            position: 'absolute',
            fontSize: 8,
            bottom: 22,
            right: 32,
            textAlign: 'center',
            color: 'grey'
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}

export default memo(Resume)
