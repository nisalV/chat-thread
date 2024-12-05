import React from 'react'
import { colors } from '../../../common/values'

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string
  style?: React.CSSProperties
  id?: string
}

const Text = ({ text, style, id, ...props }: TextProps) => {
  return (
    <p style={{color: colors.black, ...style}} id={id} {...props}>
      {text}
    </p>
  )
}

export default Text
