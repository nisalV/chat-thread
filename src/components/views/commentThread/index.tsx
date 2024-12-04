import { useState, useMemo } from 'react'
import { useThread } from '../../../hooks/commentHooks'
import { SortType, ThreadComment } from '../../../types/comments'
import './commentThread.css'
import CommentInput from '../commentInput'
import CommentOptions from './CommentOptions'
import { sizes, spaces } from '../../../common/values'
import Avatar from '../../core/image'
import Text from '../../core/text'
import { textStyles } from '../../../common/commonStyles'
import { getDateTime } from '../../../utils/commentsUtils'
import avatar from '../../../../src/assets/images/avatar.png'
import DropdownMenu from '../../core/menuDrop'

const styles: Record<string, React.CSSProperties> = {
  commentUserName: {
    marginLeft: spaces.small,
    ...textStyles.smallBold,
  },
  commentTime: {
    marginLeft: spaces.small,
    ...textStyles.extraSmall,
  },
}

const sortByOptions = [SortType.UPVOTES, SortType.DOWNVOTES]

const CommentThread = () => {
  const {
    threadComments,
    sortBy,
    voteComment,
    addComment,
    toggleCommentCollapse,
    sortCommentsByUpvotes,
    sortCommentsByDownvotes,
    setSortToDefault,
  } = useThread()

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

  const onSelectSortOption = (option: string) => {
    if (sortBy === option) {
      setSortToDefault()
      return
    }

    switch (option) {
      case SortType.UPVOTES: {
        sortCommentsByUpvotes()
        break
      }
      case SortType.DOWNVOTES: {
        sortCommentsByDownvotes()
        break
      }
      default: {
        setSortToDefault()
        return
      }
    }
  }

  return (
    <div>
      <DropdownMenu
        label="Sort"
        options={sortByOptions}
        selectedOption={sortBy}
        onSelect={onSelectSortOption}
      />
      {parsedComments.map(({ comment, index }) => (
        <div
          key={comment.id}
          id={`comment-container`}
          style={{ marginLeft: index * spaces.medium }}
        >
          <div id="comment">
            <div id="comment-user">
              <Avatar
                src={avatar}
                alt={comment.author?.[0] || ''}
                width={sizes.avatar.small}
                height={sizes.avatar.small}
              />
              <Text style={styles.commentUserName} text={comment.author} />
              <Text
                style={styles.commentTime}
                text={getDateTime(comment.timestamp)}
              />
            </div>
          </div>
          <Text text={comment.text} />
          <CommentOptions
            isReplying={replyCommentId === comment.id}
            comment={comment}
            onReplyClick={() => onReplyClick(comment.id)}
            voteComment={voteComment}
            toggleCommentCollapse={toggleCommentCollapse}
          />

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
