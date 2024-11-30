import { useEffect, useRef } from 'react'
import './textArea.css'

type TextAreaProps = {
  value: string
  placeholder: string
  autofocus?: boolean
  isRequired?: boolean
  style?: React.CSSProperties
  onChange: (v: string) => void
}
const TextArea = ({
  value,
  placeholder,
  autofocus,
  isRequired,
  style,
  onChange,
}: TextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (autofocus && textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [autofocus])

  return (
    <textarea
      ref={textAreaRef}
      required={isRequired}
      style={style}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}
export default TextArea
