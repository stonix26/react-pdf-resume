import React from 'react'
import { View, Text, Link } from '@react-pdf/renderer'
import { InferredHeaderSchema } from '@/types'
import { styles } from '../styles'
import LinkedIn from './icons/LinkedIn'
import Github from './icons/Github'
import MapPin from './icons/MapPin'
import Phone from './icons/Phone'
import Mail from './icons/Mail'
import TerminalBox from './icons/TerminalBox'
import ProfileImage from './ProfileImage'

const Header: React.FC<InferredHeaderSchema> = ({
  profileUrl,
  firstName,
  middleName,
  lastName,
  address,
  mobileNumber,
  links
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        marginBottom: 10
      }}
    >
      <ProfileImage
        profileUrl={profileUrl}
        firstName={firstName}
        lastName={lastName}
      />
      <View>
        <Text
          style={{
            textTransform: 'uppercase',
            fontSize: 22,
            lineHeight: 1.25
          }}
        >
          {firstName} {middleName.trim() ? middleName.trim()[0] + '.' : null}{' '}
          <Text style={{ fontWeight: 'bold' }}>{lastName.trim()}</Text>
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8
          }}
        >
          {address && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4
              }}
            >
              <MapPin />
              <Text>{address.trim()}</Text>
            </View>
          )}
          {mobileNumber && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Phone />
              <Text>{mobileNumber.trim()}</Text>
            </View>
          )}
        </View>

        {links && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              columnGap: 8,
              width: '90%',
              padding: '0 1pt 0 1pt'
            }}
          >
            {links.map((item, index) => (
              <View
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                {item.type === 'email' ? (
                  <Mail />
                ) : item.type === 'linked-in' ? (
                  <LinkedIn />
                ) : item.type === 'github' ? (
                  <Github />
                ) : item.type === 'storybook' ? (
                  <TerminalBox />
                ) : null}

                <Link
                  style={[styles.links, { color: 'gray', fontSize: 8 }]}
                  src={item.type === 'email' ? `mailto: ${item.url}` : item.url}
                >
                  {item.text.trim()}
                </Link>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

export default Header
