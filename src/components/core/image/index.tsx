import fallback from '../../../../src/assets/images/fallback-user.png'
import './image.css'

type AvatarProps = {
  width: number
  height: number
  src: string
  alt?: string
}

const Avatar = ({ width, height, src, alt }: AvatarProps) => {
  return (
    <img
      id="avatar-img"
      src={src || fallback}
      style={{ width, height }}
      alt={alt || 'user'}
    />
  )
}

export default Avatar
