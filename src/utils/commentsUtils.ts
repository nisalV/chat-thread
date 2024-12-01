import { ThreadComment } from '../types/comments'

export const updateComments = (
  comments: ThreadComment[],
  id: string,
  updateFn: (comment: ThreadComment) => ThreadComment
): ThreadComment[] => {
  const updatedComments = comments.map((comment) => ({ ...comment }))
  const stack: ThreadComment[] = [...updatedComments]

  while (stack.length > 0) {
    const current = stack.pop()!

    if (current.id === id) {
      Object.assign(current, updateFn(current))
    }

    current.replies = current.replies.map((reply) => ({ ...reply }))
    stack.push(...current.replies)
  }

  return updatedComments
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
