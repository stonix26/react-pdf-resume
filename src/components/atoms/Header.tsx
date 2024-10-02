import React from 'react'
import { View, Image, Text, Link } from '@react-pdf/renderer'
import { styles } from '../styles'
import ProfilePic from '../../assets/circle-profile-ruston.png'

export interface HeaderProps {
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
  firstName,
  middleName,
  lastName,
  address,
  mobileNumber,
  links
}) => {
  return (
    <View style={styles.header}>
      <Image src={ProfilePic} style={styles.profilePic} />
      <View>
        <Text style={styles.nameWrapper}>
          {firstName} {middleName}{' '}
          <Text style={styles.lastName}>{lastName}</Text>
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
