import React from 'react'
import { View, Image, Text, Link } from '@react-pdf/renderer'

export interface HeaderProps {
  profileUrl: string
  firstName: string
  middleName: string
  lastName: string
  address: string
  mobileNumber: string
  links: {
    text: string
    url: string
  }[]
}

const Header: React.FC<HeaderProps> = ({
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
      <View>
        <Image
          src={profileUrl}
          style={{
            width: 100,
            height: 100
          }}
        />
      </View>
      <View>
        <Text
          style={{
            textTransform: 'uppercase',
            fontSize: 22,
            lineHeight: 1.25
          }}
        >
          {firstName} {middleName}{' '}
          <Text style={{ fontWeight: 'bold' }}>{lastName}</Text>
        </Text>
        <Text>
          {address} | {mobileNumber}
        </Text>
        <Text style={{ width: '78%' }}>
          {links.map((item, index) => (
            <React.Fragment key={index}>
              <Link style={{ textDecoration: 'none' }} src={item.url}>
                {item.text}
              </Link>
              {links.length - 1 !== index ? <Text> | </Text> : null}
            </React.Fragment>
          ))}
        </Text>
      </View>
    </View>
  )
}

export default Header
