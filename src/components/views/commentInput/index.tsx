import React, { useEffect, useRef, useState } from 'react'
import './commentInput.css'
import Button from '../../core/button'
import TextArea from '../../core/textArea'
import { useThread } from '../../../hooks/commentHooks'

const CommentInput = () => {
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
        placeholder="Write a comment..."
        onChange={setCommentText}
        onSubmit={onSubmit}
      />
      <div id="submit-container">
        <Button label="COMMENT" type="submit" onClick={() => {}} />
      </div>
    </form>
  )
}

export default CommentInput
