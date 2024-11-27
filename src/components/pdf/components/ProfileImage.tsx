import React from 'react'
import { Image, Text, View } from '@react-pdf/renderer'
import { profileUrlSchema } from '@/schema'

const ProfileImage: React.FC<{
  profileUrl?: string
  firstName: string
  lastName: string
}> = ({ profileUrl, firstName, lastName }) => {
  const isValidUrl = profileUrlSchema.safeParse(profileUrl).success

  if (isValidUrl && profileUrl) {
    return (
      <Image
        src={profileUrl}
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%'
        }}
      />
    )
  }

  if (!profileUrl && !!firstName && !!lastName) {
    const initials = `${firstName[0]?.toUpperCase()}${lastName[0]?.toUpperCase()}`
    return (
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          borderStyle: 'solid',
          borderColor: 'gray',
          borderWidth: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            color: 'gray',
            fontSize: 36,
            fontWeight: 'extrabold'
          }}
        >
          {initials}
        </Text>
      </View>
    )
  }

  return null
}

export default ProfileImage
