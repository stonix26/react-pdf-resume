import React from 'react'
import { View, Text, Link } from '@react-pdf/renderer'
import { InferredHeaderSchema } from '@/types'
import { styles } from '../styles'
import ProfileImage from './ProfileImage'
import {
  Behance,
  Bluesky,
  Discord,
  Dribbble,
  Facebook,
  Github,
  Gitlab,
  Instagram,
  LinkedIn,
  Mail,
  MapPin,
  Medium,
  Phone,
  React as ReactIcon,
  StackOverflow,
  TerminalBox,
  Threads,
  Tiktok,
  TwitterX
} from './icons'

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
                {item.type === 'Behance' ? (
                  <Behance />
                ) : item.type === 'Bluesky' ? (
                  <Bluesky />
                ) : item.type === 'Discord' ? (
                  <Discord />
                ) : item.type === 'Dribbble' ? (
                  <Dribbble />
                ) : item.type === 'Facebook' ? (
                  <Facebook />
                ) : item.type === 'Github' ? (
                  <Github />
                ) : item.type === 'Gitlab' ? (
                  <Gitlab />
                ) : item.type === 'Instagram' ? (
                  <Instagram />
                ) : item.type === 'LinkedIn' ? (
                  <LinkedIn />
                ) : item.type === 'Mail' ? (
                  <Mail />
                ) : item.type === 'Medium' ? (
                  <Medium />
                ) : item.type === 'React' ? (
                  <ReactIcon />
                ) : item.type === 'Stack Overflow' ? (
                  <StackOverflow />
                ) : item.type === 'Terminal' ? (
                  <TerminalBox />
                ) : item.type === 'Threads' ? (
                  <Threads />
                ) : item.type === 'Tiktok' ? (
                  <Tiktok />
                ) : item.type === 'Twitter / X' ? (
                  <TwitterX />
                ) : null}

                <Link
                  style={[styles.links, { color: 'gray', fontSize: 8 }]}
                  src={item.type === 'Mail' ? `mailto: ${item.url}` : item.url}
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
