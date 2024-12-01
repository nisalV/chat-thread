import { useState } from 'react'
import { useThread } from '../../../hooks/commentHooks'
import { ThreadComment } from '../../../types/comments'
import './commentThread.css'
import CommentInput from '../commentInput'
import CommentOptions from './CommentOptions'

type CommentThreadProps = {
  ThreadComment: ThreadComment[]
  depth?: number
}

const CommentThread = ({ ThreadComment, depth = 0 }: CommentThreadProps) => {
  const { voteComment, addComment, toggleCommentCollapse } = useThread()

  const [replyCommentId, setReplyCommentId] = useState<string | undefined>(
    undefined
  )

  const handleReply = (commentId: string, text: string) => {
    if (text && text.trim()) {
      addComment(text, commentId)
      setReplyCommentId(undefined)
    }
  }

  const onReplyClick = (id: string) => {
    if (replyCommentId === id) {
      setReplyCommentId(undefined)
      return
    }

    setReplyCommentId(id)
  }

  const renderComment = (comment: ThreadComment) => {
    return (
      <div key={comment.id} id={`comment-container`}>
        <div>
          <p>{comment.text}</p>
          <CommentOptions
            comment={comment}
            onReplyClick={() => onReplyClick(comment.id)}
            voteComment={voteComment}
            toggleCommentCollapse={toggleCommentCollapse}
          />
        </div>

        {replyCommentId === comment.id && (
          <CommentInput
            placeholder="Write a reply..."
            buttonText="REPLY"
            addRepply={(text) => handleReply(comment.id, text)}
          />
        )}

        {!comment.isCollapsed && comment.replies.length > 0 && (
          <CommentThread ThreadComment={comment.replies} depth={depth + 1} />
        )}
      </div>
    )
  }

  return <div>{ThreadComment.map(renderComment)}</div>
}

export default CommentThread
