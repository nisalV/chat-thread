import { values } from '../common/values'
import { ThreadComment } from '../types/comments'

export const updateComments = (
  comments: ThreadComment[],
  id: string,
  setUpdatedComment: (comment: ThreadComment) => ThreadComment
): ThreadComment[] => {
  return comments.map((comment) => {
    if (comment.id === id) {
      return setUpdatedComment(comment)
    }

    return {
      ...comment,
      replies: updateComments(comment.replies, id, setUpdatedComment),
    }
  })
}

export const sortComments = (comments: ThreadComment[]): ThreadComment[] => {
  const sortedComments = comments.map((comment) => ({ ...comment }))
  const stack: ThreadComment[] = [...sortedComments]

  while (stack.length > 0) {
    const current = stack.pop()!

    current.replies.sort(
      (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
    )

    current.replies = current.replies.map((reply) => ({ ...reply }))
    stack.push(...current.replies)
  }

  return sortedComments
}

export const getDateTime = (milliseconds: number) => {
  const now = new Date()
  const postDate = new Date(milliseconds)

  const formatTime = (date: Date): string => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes.toString().padStart(2, '0')
    return `${formattedHours}:${formattedMinutes} ${ampm}`
  }

  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const postDateOnly = new Date(
    postDate.getFullYear(),
    postDate.getMonth(),
    postDate.getDate()
  )

  const diffInDays = Math.floor(
    (nowDate.getTime() - postDateOnly.getTime()) / (1000 * 60 * 60 * 24)
  )

  switch (true) {
    case diffInDays === 0:
      return formatTime(postDate)

    case diffInDays === 1:
      return `Yesterday at ${formatTime(postDate)}`

    case diffInDays < 7:
      return `${values.daysOfWeek[postDate.getDay()]} at ${formatTime(postDate)}`

    default:
      return postDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
  }
}
