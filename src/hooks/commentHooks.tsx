import { useContext } from 'react'
import { CommentContextType } from '../types/comments'
import { ThreadContext } from '../contexts/commentContext'

export const useThread = (): CommentContextType => {
  const context = useContext(ThreadContext)

  if (!context) {
    throw new Error('useThread must be used within a ThreadProvider')
  }
  return context
}
