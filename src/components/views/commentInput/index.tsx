import React, { useEffect, useRef, useState } from 'react'
import './commentInput.css'
import { ButtonBase } from '../../core/button'
import TextArea from '../../core/textArea'
import { useThread } from '../../../hooks/commentHooks'
import Text from '../../core/text'
import { spaces, values } from '../../../common/values'
import { textStyles } from '../../../common/commonStyles'

const styles: Record<string, React.CSSProperties> = {
  commentLength: {
    marginLeft: spaces.small,
    ...textStyles.extraSmall,
  },
}

type CommentInputProps = {
  placeholder: string
  buttonText?: string
  addRepply?: (reply: string) => void
}

const CommentInput = ({
  placeholder,
  buttonText,
  addRepply,
}: CommentInputProps) => {
  const [commentText, setCommentText] = useState('')
  const { addComment } = useThread()
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
    textAreaRef.current?.focus()
  }

  const onSubmit = () => {
    if (addRepply) {
      addRepply(commentText)
      setCommentText('')
      return
    }
    if (commentText.trim()) {
      addComment(commentText)
      setCommentText('')
    }
  }

  return (
    <form id="comment-input-container" onSubmit={handleFormSubmit}>
      <TextArea
        ref={textAreaRef}
        isRequired={true}
        value={commentText}
        placeholder={placeholder}
        maxLength={values.commentMAxLength}
        onChange={setCommentText}
        onSubmit={onSubmit}
      />
      <div id="submit-container">
        <Text
          text={`${commentText.length}/${values.commentMAxLength}`}
          style={styles.commentLength}
        />
        <ButtonBase
          label={buttonText || 'COMMENT'}
          type="submit"
          onClick={() => {}}
        />
      </div>
    </form>
  )
}

export default CommentInput
