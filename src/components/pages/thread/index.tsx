import CommentInput from '../../views/commentInput'
import CommentThread from '../../views/commentThread'
import './thread.css'

const Thread = () => {
  return (
    <div id="thread-container">
      <CommentInput placeholder="Write a comment..." />
      <CommentThread />
    </div>
  )
}

export default Thread
