import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import { InferredExperienceSchema } from '@/types'
import { formatDateRange } from '@/utils'
import CompanyLogo from './CompanyLogo'
import Skills from './Skills'
import RoleDescription from './RoleDescription'

const Experience: React.FC<InferredExperienceSchema> = ({
  companyName,
  companyLogo,
  location,
  locationType,
  roles
}) => {
  // For single role
  if (roles.length === 1) {
    const { formattedStartDate, formattedEndDate, timeDifference } =
      formatDateRange(roles[0].startDate, roles[0].endDate)

    return (
      <View
        wrap={false}
        style={{
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          gap: 10
        }}
      >
        <View style={{ width: 30, height: '100%' }}>
          <CompanyLogo src={companyLogo} />
        </View>
        <View>
          <Text style={{ fontWeight: 'bold' }}>{roles[0].role}</Text>
          <Text>
            {companyName} · {roles[0].employmentType}
          </Text>
          <Text style={{ color: 'gray', fontSize: 8 }}>
            {formattedStartDate} - {formattedEndDate} · {timeDifference}
          </Text>
          <Text style={{ color: 'gray', fontSize: 8 }}>
            {location} · {locationType}
          </Text>
          <RoleDescription data={roles[0].descriptions} />
          {!roles[0].skills ? null : (
            <Skills content={roles[0].skills.map(i => i.skill)} />
          )}
        </View>
      </View>
    )
  }

  // For multiple roles
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
      <View style={{ width: 30, height: '100%' }}>
        <CompanyLogo src={companyLogo} />
      </View>
      <View>
        <View style={{ paddingBottom: 5 }}>
          <Text style={{ fontWeight: 'bold' }}>{companyName}</Text>
          {timeDiffInGrouped ? (
            <Text style={{ fontSize: 8 }}>
              {timeDiffInGrouped.timeDifference}
            </Text>
          ) : null}
          <Text style={{ color: 'gray', fontSize: 8 }}>
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
              wrap={false}
              style={{
                position: 'relative',
                paddingLeft: 15,
                paddingBottom: roles.length - 1 !== index ? 5 : 0
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
                    top: 12.5,
                    left: 2,
                    height: '90%',
                    width: 1,
                    backgroundColor: 'gray'
                  }}
                />
              ) : null}

              <Text style={{ fontWeight: 'bold' }}>{item.role}</Text>
              <Text style={{ fontSize: 8 }}>{item.employmentType}</Text>
              <Text style={{ color: 'gray', fontSize: 8 }}>
                {formattedStartDate} - {formattedEndDate} · {timeDifference}
              </Text>
              <RoleDescription data={item.descriptions} />
              {!item.skills ? null : (
                <Skills content={item.skills.map(i => i.skill)} />
              )}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default Experience
