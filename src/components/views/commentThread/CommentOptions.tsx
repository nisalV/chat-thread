import { ThreadComment, VoteType } from '../../../types/comments'
import { ButtonClear } from '../../core/button'

const isLargeScreen = window.innerWidth > 500

const Devider = () => <div id="option-devider" />

interface CommentOptionsProps {
  comment: ThreadComment
  isReplying: boolean
  onReplyClick: () => void
  voteComment: (id: string, voteType: VoteType) => void
  toggleCommentCollapse: (id: string, isCollapsed: boolean) => void
}

const CommentOptions = ({
  comment,
  isReplying,
  onReplyClick,
  voteComment,
  toggleCommentCollapse,
}: CommentOptionsProps) => {
  return (
    <div id="comment-data">
      <ButtonClear
        label={`📝${isLargeScreen ? (isReplying ? 'Close' : 'Reply') : ''}`}
        onClick={onReplyClick}
      />
      <Devider />
      <ButtonClear
        label={`👍${isLargeScreen ? comment.upvotes : ''}`}
        onClick={() => voteComment(comment.id, VoteType.UPVOTE)}
      />
      <Devider />
      <ButtonClear
        label={`👎${isLargeScreen ? comment.downvotes : ''}`}
        onClick={() => voteComment(comment.id, VoteType.DOWNVOTE)}
      />
      {comment.replies.length !== 0 && (
        <>
          <Devider />
          <ButtonClear
            label={`${comment.isCollapsed ? `↗️${isLargeScreen ? 'Expand' : ''}` : `↗️${isLargeScreen ? 'Collapse' : ''}`}`}
            onClick={() =>
              toggleCommentCollapse(comment.id, !comment.isCollapsed)
            }
          />
        </>
      )}
    </div>
  )
}

export default CommentOptions
