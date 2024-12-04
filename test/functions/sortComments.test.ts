import { SortType, ThreadComment } from '../../src/types/comments'
import { describe, it, expect } from 'vitest'
import { sortCommentsFirstLayer } from '../../src/utils/commentsUtils'

const mockComments: ThreadComment[] = [
  {
    id: '1',
    text: 'Comment 1',
    author: 'Author 1',
    timestamp: 1650000000000,
    upvotes: 11,
    downvotes: 2,
    replies: [],
  },
  {
    id: '2',
    text: 'Comment 2',
    author: 'Author 2',
    timestamp: 1650100000000,
    upvotes: 5,
    downvotes: 9,
    replies: [],
  },
  {
    id: '3',
    text: 'Comment 3',
    author: 'Author 3',
    timestamp: 1650050000000,
    upvotes: 15,
    downvotes: 5,
    replies: [],
  },
]

describe('sortCommentsFirstLayer', () => {
  it('should sort comments by upvotes', () => {
    const sortedComments = sortCommentsFirstLayer(
      mockComments,
      SortType.UPVOTES
    )
    const upvotes = sortedComments.map((comment) => comment.upvotes)
    expect(upvotes).toEqual([15, 11, 5])
  })

  it('should sort comments by downvotes', () => {
    const sortedComments = sortCommentsFirstLayer(
      mockComments,
      SortType.DOWNVOTES
    )
    const downvotes = sortedComments.map((comment) => comment.downvotes)
    expect(downvotes).toEqual([9, 5, 2])
  })

  it('should sort comments by timestamp', () => {
    const sortedComments = sortCommentsFirstLayer(
      mockComments,
      SortType.DEFAULT
    )
    const timestamps = sortedComments.map((comment) => comment.timestamp)
    expect(timestamps).toEqual([1650100000000, 1650050000000, 1650000000000])
  })
})
