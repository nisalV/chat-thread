import { imagePaths } from '../../../common/values'
import './image.css'

type AvatarProps = {
  width: number
  height: number
  src?: string
}

const Avatar = ({ width, height, src }: AvatarProps) => {
  return (
    <img
      id="avatar-img"
      src={src || imagePaths.userFallBack}
      style={{ width, height }}
    />
  )
}

export default Avatar
