import { createContext, useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  ThreadComment,
  CommentContextType,
  CommentProviderProps,
  VoteType,
  SortType,
} from '../types/comments'
import { sortCommentsFirstLayer, updateComments } from '../utils/commentsUtils'
import { storage } from '../common/values'

export const ThreadContext = createContext<CommentContextType | undefined>(
  undefined
)

export const ThreadProvider = ({ children }: CommentProviderProps) => {
  const [threadComments, setThreadComments] = useState<ThreadComment[]>(() => {
    const savedComments = localStorage.getItem(storage.comments)
    return savedComments ? JSON.parse(savedComments) : []
  })
  const [sortBy, setSortBy] = useState<string>(() => {
    const savedState = localStorage.getItem(storage.commentSortState)
    if (!savedState) {
      localStorage.setItem(storage.commentSortState, SortType.DEFAULT)
      return SortType.DEFAULT
    }
    return savedState
  })

  const saveThreadComments = useCallback((newComments: ThreadComment[]) => {
    localStorage.setItem(storage.comments, JSON.stringify(newComments))
    setThreadComments(newComments)
  }, [])

  const saveSortBy = useCallback((option: SortType) => {
    localStorage.setItem(storage.commentSortState, option)
  }, [])

  const addComment = useCallback(
    (text: string, parentId?: string) => {
      const newComment: ThreadComment = {
        id: uuidv4(),
        text,
        author: 'Nisal Perera',
        timestamp: Date.now(),
        upvotes: 0,
        downvotes: 0,
        replies: [],
        isCollapsed: false,
      }

      const newComments = parentId
        ? updateComments(threadComments, parentId, (comment) => ({
            ...comment,
            replies: [newComment, ...comment.replies],
          }))
        : [newComment, ...threadComments]

      saveThreadComments(newComments)
    },
    [threadComments, saveThreadComments]
  )

  const voteComment = useCallback(
    (id: string, voteType: VoteType.UPVOTE | VoteType.DOWNVOTE) => {
      const newComments = updateComments(threadComments, id, (comment) => ({
        ...comment,
        upvotes:
          voteType === VoteType.UPVOTE ? comment.upvotes + 1 : comment.upvotes,
        downvotes:
          voteType === VoteType.DOWNVOTE
            ? comment.downvotes + 1
            : comment.downvotes,
      }))

      saveThreadComments(newComments)
    },
    [threadComments, saveThreadComments]
  )

  const toggleCommentCollapse = useCallback(
    (id: string, isCollapsed: boolean) => {
      const newComments = updateComments(threadComments, id, (comment) => ({
        ...comment,
        isCollapsed: isCollapsed,
      }))

      saveThreadComments(newComments)
    },
    [threadComments, saveThreadComments]
  )

  const sortCommentsByUpvotes = useCallback(() => {
    const newComments = sortCommentsFirstLayer(threadComments, SortType.UPVOTES)
    setSortBy(SortType.UPVOTES)
    saveSortBy(SortType.UPVOTES)
    saveThreadComments(newComments)
  }, [threadComments, saveThreadComments, saveSortBy])

  const sortCommentsByDownvotes = useCallback(() => {
    const newComments = sortCommentsFirstLayer(
      threadComments,
      SortType.DOWNVOTES
    )
    setSortBy(SortType.DOWNVOTES)
    saveSortBy(SortType.DOWNVOTES)
    saveThreadComments(newComments)
  }, [threadComments, saveThreadComments, saveSortBy])

  const setSortToDefault = useCallback(() => {
    const newComments = sortCommentsFirstLayer(threadComments, SortType.DEFAULT)
    setSortBy(SortType.DEFAULT)
    saveThreadComments(newComments)
  }, [threadComments, saveThreadComments])

  return (
    <ThreadContext.Provider
      value={{
        sortBy,
        threadComments,
        addComment,
        voteComment,
        toggleCommentCollapse,
        sortCommentsByUpvotes,
        sortCommentsByDownvotes,
        setSortToDefault,
      }}
    >
      {children}
    </ThreadContext.Provider>
  )
}
