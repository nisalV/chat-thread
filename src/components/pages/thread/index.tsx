import { useThread } from '../../../hooks/commentHooks'
import CommentInput from '../../views/commentInput'
import CommentThread from '../../views/commentThread'
import './thread.css'

const Thread = () => {
  const { threadComments } = useThread()

  return (
    <div id="thread-container">
      <CommentInput placeholder="Write a comment..." />
      <CommentThread ThreadComment={threadComments} />
    </div>
  )
}

export default Thread
