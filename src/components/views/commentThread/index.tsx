import { useState, useMemo } from 'react'
import { useThread } from '../../../hooks/commentHooks'
import { ThreadComment } from '../../../types/comments'
import './commentThread.css'
import CommentInput from '../commentInput'
import CommentOptions from './CommentOptions'

const CommentThread = () => {
  const { threadComments, voteComment, addComment, toggleCommentCollapse } =
    useThread()

  const [replyCommentId, setReplyCommentId] = useState<string | null>(null)

  const handleReply = (commentId: string, text: string) => {
    if (text && text.trim()) {
      addComment(text, commentId)
      setReplyCommentId(null)
    }
  }

  const onReplyClick = (id: string) => {
    setReplyCommentId(replyCommentId === id ? null : id)
  }

  const parsedComments = useMemo(() => {
    const parseComments = (comments: ThreadComment[], index = 1) => {
      const flatList: { comment: ThreadComment; index: number }[] = []
      comments.forEach((comment) => {
        flatList.push({ comment, index })
        if (!comment.isCollapsed && comment.replies.length > 0) {
          flatList.push(...parseComments(comment.replies, index + 1))
        }
      })
      return flatList
    }
    return parseComments(threadComments)
  }, [threadComments])

  return (
    <div>
      {parsedComments.map(({ comment, index }) => (
        <div
          key={comment.id}
          id={`comment-container`}
          style={{ marginLeft: index * 20 }}
        >
          <div>
            <p>{comment.text}</p>
            <CommentOptions
              isReplying={replyCommentId === comment.id}
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
        </div>
      ))}
    </div>
  )
}

export default CommentThread
