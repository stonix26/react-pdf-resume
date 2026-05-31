import React from 'react'
import { View, Text, Link } from '@react-pdf/renderer'
import { InferredHeaderSchema } from '@/types'
import { styles } from '../styles'
import ProfileImage from './ProfileImage'
import Behance from './icons/Behance'
import Bluesky from './icons/Bluesky'
import Discord from './icons/Discord'
import Dribbble from './icons/Dribbble'
import Facebook from './icons/Facebook'
import Github from './icons/Github'
import Gitlab from './icons/Gitlab'
import Instagram from './icons/Instagram'
import LinkedIn from './icons/LinkedIn'
import Mail from './icons/Mail'
import MapPin from './icons/MapPin'
import Medium from './icons/Medium'
import Phone from './icons/Phone'
import ReactIcon from './icons/React'
import StackOverflow from './icons/StackOverflow'
import TerminalBox from './icons/TerminalBox'
import Threads from './icons/Threads'
import Tiktok from './icons/Tiktok'
import TwitterX from './icons/TwitterX'

const Header: React.FC<InferredHeaderSchema> = ({
  profilePicture,
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
        profileUrl={profilePicture}
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
            {links.map(item => {
              let IconComponent: React.ReactNode = null
              switch (item.type) {
                case 'Behance':
                  IconComponent = <Behance />
                  break
                case 'Bluesky':
                  IconComponent = <Bluesky />
                  break
                case 'Discord':
                  IconComponent = <Discord />
                  break
                case 'Dribbble':
                  IconComponent = <Dribbble />
                  break
                case 'Facebook':
                  IconComponent = <Facebook />
                  break
                case 'Github':
                  IconComponent = <Github />
                  break
                case 'Gitlab':
                  IconComponent = <Gitlab />
                  break
                case 'Instagram':
                  IconComponent = <Instagram />
                  break
                case 'LinkedIn':
                  IconComponent = <LinkedIn />
                  break
                case 'Mail':
                  IconComponent = <Mail />
                  break
                case 'Medium':
                  IconComponent = <Medium />
                  break
                case 'React':
                  IconComponent = <ReactIcon />
                  break
                case 'Stack Overflow':
                  IconComponent = <StackOverflow />
                  break
                case 'Terminal':
                  IconComponent = <TerminalBox />
                  break
                case 'Threads':
                  IconComponent = <Threads />
                  break
                case 'Tiktok':
                  IconComponent = <Tiktok />
                  break
                case 'Twitter / X':
                  IconComponent = <TwitterX />
                  break
                default:
                // do nothing, IconComponent remains null
              }
              return (
                <View
                  key={`${item.type}-${item.text}-${item.url ?? 'no-url'}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  {IconComponent}
                  {item.url ? (
                    <Link
                      style={[styles.links, { color: 'gray', fontSize: 8 }]}
                      src={
                        item.type === 'Mail'
                          ? `mailto:${item.url}`
                          : item.url
                      }
                    >
                      {item.text.trim()}
                    </Link>
                  ) : (
                    <Text style={{ color: 'gray', fontSize: 8 }}>
                      {item.text.trim()}
                    </Text>
                  )}
                </View>
              )
            })}
          </View>
        )}
      </View>
    </View>
  )
}

export default Header
