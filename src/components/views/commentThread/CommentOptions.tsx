import { ThreadComment, VoteType } from '../../../types/comments'
import { ButtonClear } from '../../core/button'
import './commentThread.css'

interface CommentOptionsProps {
  comment: ThreadComment
  isReplying: boolean
  onReplyClick: () => void
  voteComment: (id: string, voteType: VoteType) => void
  toggleCommentCollapse: (id: string, isCollapsed: boolean) => void
}

const Devider = () => <div id="option-devider" />

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
        label={`📝 ${isReplying ? 'Close' : 'Reply'}`}
        onClick={onReplyClick}
      />
      <Devider />
      <ButtonClear
        label={`👍 ${comment.upvotes}`}
        onClick={() => voteComment(comment.id, VoteType.UPVOTE)}
      />
      <Devider />
      <ButtonClear
        label={`👎 ${comment.downvotes}`}
        onClick={() => voteComment(comment.id, VoteType.DOWNVOTE)}
      />
      {comment.replies.length !== 0 && (
        <>
          <Devider />
          <ButtonClear
            label={`${comment.isCollapsed ? 'Expand' : 'Collapse'}`}
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
