import React from 'react'
import { InferredDescriptionSchema } from '@/types'
import BulletText from './BulletText'

const RoleDescription: React.FC<{
  data: InferredDescriptionSchema[]
}> = ({ data }) => {
  return data.map((desc, index) => (
    <BulletText key={index} text={desc.description} />
  ))
}

export default RoleDescription
