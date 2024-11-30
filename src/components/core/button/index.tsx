import { colors } from '../../../common/values'
import './Button.css'

type ButtonProps = {
  label: string
  type?: "submit" | "reset" | "button"
  textColor?: string
  style?: React.CSSProperties
  onClick: () => void
}

const Button = ({ label, type, textColor, style, onClick }: ButtonProps) => {
  return (
    <button className="custom-button" type={type} style={{color: textColor || colors.white, ...style}} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
