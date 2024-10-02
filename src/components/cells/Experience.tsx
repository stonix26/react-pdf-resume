import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import CompanyLogo from '../atoms/CompanyLogo'
import Skills from '../molecules/Skills'
import BulletText from '../atoms/BulletText'
import { formatDateRange } from '../../utils'

interface Role {
  role: string
  employmentType:
    | 'Full-time'
    | 'Part-time'
    | 'Self-employed'
    | 'Freelance'
    | 'Contract'
    | 'Internship'
    | 'Apprenticeship'
    | 'Seasonal'
  startDate: string
  endDate?: string
  descriptions: string | string[]
  skills?: string[]
}

export interface ExperienceProps {
  companyName: string
  companyLogo?: string
  location: string
  locationType: 'On-site' | 'Hybrid' | 'Remote'
  roles: Role | Role[]
}

const Experience: React.FC<ExperienceProps> = ({
  companyName,
  companyLogo,
  location,
  locationType,
  roles
}) => {
  if (!Array.isArray(roles)) {
    const { formattedStartDate, formattedEndDate, timeDifference } =
      formatDateRange(roles.startDate, roles.endDate)

    return (
      <View
        style={{
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          gap: 10
        }}
      >
        <CompanyLogo src={companyLogo} />
        <View>
          <Text style={{ fontWeight: 'bold' }}>{roles.role}</Text>
          <Text>
            {companyName} · {roles.employmentType}
          </Text>
          <Text style={{ color: 'gray' }}>
            {formattedStartDate} - {formattedEndDate} · {timeDifference}
          </Text>
          <Text style={{ color: 'gray' }}>
            {location} · {locationType}
          </Text>
          {!Array.isArray(roles.descriptions) ? (
            <Text style={{ width: '90%' }}>{roles.descriptions}</Text>
          ) : (
            roles.descriptions.map((i, k) => <BulletText key={k} text={i} />)
          )}
          {!roles.skills ? null : <Skills content={roles.skills.join(' · ')} />}
        </View>
      </View>
    )
  }

  const timeDiffInGrouped =
    roles.length > 0
      ? formatDateRange(roles[roles.length - 1].startDate, roles[0].endDate)
      : null

  return (
    <View
      style={{
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
      }}
    >
      <CompanyLogo src={companyLogo} />
      <View>
        <View style={{ paddingBottom: 5 }}>
          <Text style={{ fontWeight: 'bold' }}>{companyName}</Text>
          {timeDiffInGrouped ? (
            <Text>{timeDiffInGrouped.timeDifference}</Text>
          ) : null}
          <Text style={{ color: 'gray' }}>
            {location} · {locationType}
          </Text>
        </View>

        {/* Positions */}
        {roles.map((item, index) => {
          const { formattedStartDate, formattedEndDate, timeDifference } =
            formatDateRange(item.startDate, item.endDate)

          return (
            <View
              key={index}
              style={{
                position: 'relative',
                paddingLeft: 15,
                paddingBottom: 5
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 5,
                  left: 0,
                  width: 5,
                  height: 5,
                  backgroundColor: 'gray',
                  borderRadius: '50%'
                }}
              />

              {roles.length - 1 !== index ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 2,
                    height: '90%',
                    width: 1,
                    backgroundColor: 'gray'
                  }}
                />
              ) : null}

              <Text style={{ fontWeight: 'bold' }}>{item.role}</Text>
              <Text>{item.employmentType}</Text>
              <Text style={{ color: 'gray' }}>
                {formattedStartDate} - {formattedEndDate} · {timeDifference}
              </Text>
              {!Array.isArray(item.descriptions) ? (
                <Text style={{ width: '90%' }}>{item.descriptions}</Text>
              ) : (
                item.descriptions.map((i, k) => <BulletText key={k} text={i} />)
              )}
              {!item.skills ? null : (
                <Skills content={item.skills.join(' · ')} />
              )}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default Experience
