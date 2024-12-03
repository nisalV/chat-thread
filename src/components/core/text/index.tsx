import React from 'react'

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string
  style?: React.CSSProperties
  id?: string
}

const Text = ({ text, style, id, ...props }: TextProps) => {
  return (
    <p style={style} id={id} {...props}>
      {text}
    </p>
  )
}

export default Text
