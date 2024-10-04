import React from 'react'
import { Document, Page, View, Text } from '@react-pdf/renderer'
import Header, { HeaderProps } from '../atoms/Header'
import Summary from '../atoms/Summary'
import Education, { EducationProps } from '../atoms/Education'
import KeySkills from '../atoms/KeySkills'
import Portfolio, { PortfolioProps } from '../atoms/Portfolio'
import Experience, { ExperienceProps } from '../cells/Experience'
import { styles } from '../styles'

export interface ResumeProps {
  header: HeaderProps
  summary: string
  experiences: ExperienceProps[]
  education: EducationProps
  portfolio: PortfolioProps['links']
}

const Resume: React.FC<ResumeProps> = ({
  header,
  summary,
  experiences,
  education,
  portfolio
}) => {
  // Extract all skills from the roles
  const allSkills = experiences.flatMap(
    experience =>
      Array.isArray(experience.roles) // Check if roles is an array
        ? experience.roles.flatMap(role => role.skills)
        : experience.roles.skills // For single roles, directly access skills
  )

  // Remove duplicates using Set
  const uniqueSkills = [...new Set(allSkills)]

  const metadata = {
    title: `${header.firstName} ${header.lastName}'s Resume`,
    author: `${header.firstName} ${header.lastName}`,
    subject: `${header.firstName} ${header.lastName}'s Resume`,
    keywords: uniqueSkills.sort().join(', '),
    creator: `Ruston Emperua's react-pdf-resume app`,
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
          fontWeight: 'normal'
        }}
      >
        <Header {...header} />

        <Summary content={summary} />

        <View style={styles.section}>
          <Text style={styles.subHeader}>Work Experience</Text>

          {experiences.map((item, index) => (
            <Experience key={index} {...item} />
          ))}
        </View>

        <KeySkills skills={uniqueSkills} />

        <Education {...education} />

        <Portfolio links={portfolio} />
      </Page>
    </Document>
  )
}

export default Resume
