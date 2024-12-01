import { colors } from '../../../common/values'
import './button.css'

type ButtonProps = {
  label: string
  type?: 'submit' | 'reset' | 'button'
  textColor?: string
  style?: React.CSSProperties
  onClick: () => void
}

export const ButtonBase = ({
  label,
  type,
  textColor,
  style,
  onClick,
}: ButtonProps) => {
  return (
    <button
      id="button-base"
      type={type}
      style={{ color: textColor || colors.white, ...style }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export const ButtonClear = ({
  label,
  type,
  textColor,
  style,
  onClick,
}: ButtonProps) => {
  return (
    <button
      id="button-clear"
      type={type}
      style={{ color: textColor || colors.white, ...style }}
      onClick={onClick}
    >
      <p id="button-clear-text">{label}</p>
    </button>
  )
}
