import React, { useState } from 'react'
import './commentInput.css'
import Button from '../../core/button'
import TextArea from '../../core/textArea'

const CommentInput = () => {
  const [commentText, setCommentText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      setCommentText('')
    }
  }

  return (
    <form id="comment-input-container" onSubmit={handleSubmit}>
      <TextArea
        isRequired={true}
        autofocus={true}
        value={commentText}
        onChange={setCommentText}
        placeholder="Write a comment..."
      />

      
      <div id="submit-container">
        <Button label="COMMENT" type="submit" onClick={() => {}} />
      </div>
    </form>
  )
}

export default CommentInput
