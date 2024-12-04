import { getDateTime } from '../../../utils/commentsUtils'
import Avatar from '../../core/image'
import Text from '../../core/text'
import avatar from '../../../../src/assets/images/avatar.png'
import { ThreadComment } from '../../../types/comments'
import { sizes, spaces } from '../../../common/values'
import { textStyles } from '../../../common/commonStyles'

const styles: Record<string, React.CSSProperties> = {
  commentUserName: {
    marginLeft: spaces.small,
    ...textStyles.oneLineClip,
    ...textStyles.smallBold,
  },
  commentTime: {
    marginLeft: spaces.small,
    ...textStyles.oneLineClip,
    ...textStyles.extraSmall,
  },
}

type CommentUserProps = {
  comment: ThreadComment
}
const CommentUser = ({ comment }: CommentUserProps) => {
  return (
    <div id="comment">
      <div id="comment-user">
        <Avatar
          src={avatar}
          alt={comment.author?.[0] || ''}
          width={sizes.avatar.small}
          height={sizes.avatar.small}
        />
        <Text
          id="comment-user-name"
          style={styles.commentUserName}
          text={comment.author}
        />
        <Text
          id="comment-post-date"
          style={styles.commentTime}
          text={getDateTime(comment.timestamp)}
        />
      </div>
    </div>
  )
}

export default CommentUser
