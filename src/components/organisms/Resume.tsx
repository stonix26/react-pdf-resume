import { Document, Page, View, Text } from '@react-pdf/renderer'
import { styles } from '../styles'
import Summary from '../atoms/Summary'
import Header from '../atoms/Header'
import Experience from '../cells/Experience'
import { data } from '../../data'
import Education from '../atoms/Education'
import Portfolio from '../atoms/Portfolio'
import KeySkills from '../atoms/KeySkills'

// Extract all skills from the roles
const allSkills = data.experiences.flatMap(
  experience =>
    Array.isArray(experience.roles) // Check if roles is an array
      ? experience.roles.flatMap(role => role.skills)
      : experience.roles.skills // For single roles, directly access skills
)

// Remove duplicates using Set
const uniqueSkills = [...new Set(allSkills)]

const Resume = () => {
  return (
    <Document>
      <Page style={styles.page}>
        <Header {...data.header} />

        <Summary content={data.summary} />

        <View style={styles.section}>
          <Text style={styles.subHeader}>Work Experience</Text>

          {data.experiences.map((item, index) => (
            <Experience key={index} {...item} />
          ))}
        </View>

        <KeySkills skills={uniqueSkills} />

        <Education {...data.education} />

        <Portfolio links={data.portfolio} />
      </Page>
    </Document>
  )
}

export default Resume
