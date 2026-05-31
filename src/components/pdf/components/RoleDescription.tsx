import React from 'react'
import { InferredDescriptionSchema } from '@/types'
import BulletText from './BulletText'

const RoleDescription: React.FC<{
  data: InferredDescriptionSchema[]
}> = ({ data }) => {
  return data.map(desc => (
    <BulletText key={desc.description} text={desc.description} />
  ))
}

export default RoleDescription
