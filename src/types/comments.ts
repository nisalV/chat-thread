import { ReactNode } from 'react'

export enum VoteType {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
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
  addComment: (text: string, parentId?: string) => void
  voteComment: (
    id: string,
    voteType: VoteType.UPVOTE | VoteType.DOWNVOTE
  ) => void
  toggleCommentCollapse: (id: string, isCollapsed: boolean) => void
}

export type CommentProviderProps = {
  children: ReactNode
}
