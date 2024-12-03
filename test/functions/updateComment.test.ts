import { ThreadComment } from '../../src/types/comments'
import { describe, it, expect } from 'vitest'
import { updateComments } from '../../src/utils/commentsUtils'

const mockComments: ThreadComment[] = [
  {
    id: '1',
    text: 'Parent comment',
    replies: [
      {
        id: '2',
        text: 'Child comment 1',
        replies: [],
        isCollapsed: false,
        author: '',
        timestamp: 0,
        upvotes: 0,
        downvotes: 0,
      },
      {
        id: '3',
        text: 'Child comment 2',
        replies: [],
        isCollapsed: false,
        author: '',
        timestamp: 0,
        upvotes: 0,
        downvotes: 0,
      },
    ],
    isCollapsed: false,
    author: '',
    timestamp: 0,
    upvotes: 0,
    downvotes: 0,
  },
]

describe('updateComments', () => {
  it('updates a top-level comment', () => {
    const updatedComments = updateComments(mockComments, '1', (comment) => ({
      ...comment,
      text: 'Updated Parent comment',
    }))

    expect(updatedComments[0].text).toBe('Updated Parent comment')
    expect(updatedComments[0].replies).toEqual(mockComments[0].replies)
  })

  it('updates a nested comment', () => {
    const updatedComments = updateComments(mockComments, '2', (comment) => ({
      ...comment,
      text: 'Updated Child comment 1',
    }))

    expect(updatedComments[0].replies[0].text).toBe('Updated Child comment 1')
    expect(updatedComments[0].replies[1].text).toBe('Child comment 2')
  })
})
