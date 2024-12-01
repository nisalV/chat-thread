import { forwardRef } from 'react'
import './textArea.css'

type TextAreaProps = {
  value: string
  placeholder: string
  isRequired?: boolean
  style?: React.CSSProperties
  onChange: (v: string) => void
  onSubmit?: () => void
}
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { value, placeholder, isRequired, style, onChange, onSubmit },
    forwardRef
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!onSubmit) return

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        onSubmit?.()
      }
    }

    return (
      <textarea
        ref={forwardRef}
        required={isRequired}
        style={style}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    )
  }
)

export default TextArea
