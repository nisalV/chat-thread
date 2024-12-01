import { useState } from 'react'
import { useThread } from '../../../hooks/commentHooks'
import { ThreadComment, VoteType } from '../../../types/comments'
import './commentThread.css'

type CommentThreadProps = {
  ThreadComment: ThreadComment[]
  depth?: number
}

const CommentThread = ({ ThreadComment, depth = 0 }: CommentThreadProps) => {
  const { voteComment, addComment, toggleCommentCollapse } = useThread()

  const [replyText, setReplyText] = useState<{ [key: string]: string }>({})

  const handleReply = (commentId: string) => {
    const text = replyText[commentId]
    if (text && text.trim()) {
      addComment(text, commentId)
      setReplyText((prev) => ({ ...prev, [commentId]: '' }))
    }
  }

  const renderComment = (comment: ThreadComment) => {
    const isReplyInputOpen = replyText[comment.id] !== undefined

    return (
      <div
      key={comment.id}
        id={`comment-container`}
        style={{
          marginLeft: `${depth * 20}px`,
        }}
      >
        <div className="comment-content">
          <p>{comment.text}</p>
          <div className="comment-actions">
            <button onClick={() => voteComment(comment.id, VoteType.UPVOTE)}>
              ▲ Upvote ({comment.upvotes})
            </button>
            <button onClick={() => voteComment(comment.id, VoteType.DOWNVOTE)}>
              ▼ Downvote ({comment.downvotes})
            </button>
            <button onClick={() => toggleCommentCollapse(comment.id)}>
              {comment.isCollapsed ? 'Expand' : 'Collapse'} Replies
            </button>
          </div>
        </div>

        <div className="reply-section">
          <button
            onClick={() =>
              setReplyText((prev) => ({ ...prev, [comment.id]: '' }))
            }
          >
            Reply
          </button>

          {isReplyInputOpen && (
            <div>
              <textarea
                value={replyText[comment.id] || ''}
                onChange={(e) =>
                  setReplyText((prev) => ({
                    ...prev,
                    [comment.id]: e.target.value,
                  }))
                }
                placeholder="Write a reply..."
              />
              <button onClick={() => handleReply(comment.id)}>
                Submit Reply
              </button>
            </div>
          )}
        </div>

        {!comment.isCollapsed && comment.replies.length > 0 && (
          <CommentThread ThreadComment={comment.replies} depth={depth + 1} />
        )}
      </div>
    )
  }

  return <div id="thread-cotainer">{ThreadComment.map(renderComment)}</div>
}

export default CommentThread
