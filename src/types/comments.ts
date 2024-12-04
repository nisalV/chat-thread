import { ReactNode } from 'react'

export enum VoteType {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
}

export enum SortType {
  UPVOTES = 'upvotes',
  DOWNVOTES = 'downvotes',
  DEFAULT = 'default',
}

export type ThreadComment = {
  id: string
  text: string
  author: string
  timestamp: number
  upvotes: number
  downvotes: number
  replies: ThreadComment[]
  isCollapsed?: boolean
}

export type CommentContextType = {
  threadComments: ThreadComment[]
  sortBy: string
  addComment: (text: string, parentId?: string) => void
  voteComment: (
    id: string,
    voteType: VoteType.UPVOTE | VoteType.DOWNVOTE
  ) => void
  toggleCommentCollapse: (id: string, isCollapsed: boolean) => void
  sortCommentsByUpvotes: () => void
  sortCommentsByDownvotes: () => void
  setSortToDefault: () => void
}

export type CommentProviderProps = {
  children: ReactNode
}
