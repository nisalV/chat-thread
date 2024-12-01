import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CommentInput from '../src/components/views/commentInput/index'
import { ThreadProvider } from '../src/contexts/commentContext'

describe('CommentInput Component', () => {
  it('clears text on submit for non-empty string', () => {
    render(
      <ThreadProvider>
        <CommentInput />
      </ThreadProvider>
    )

    const textArea = screen.getByPlaceholderText('Write a comment...')
    const button = screen.getByText('COMMENT')

    fireEvent.change(textArea, { target: { value: 'Test comment' } })
    expect((textArea as HTMLTextAreaElement).value.trim()).toBe('Test comment')

    fireEvent.click(button)
    expect((textArea as HTMLTextAreaElement).value).toBe('')
  })

  it('does not clear the text if comment is empty', () => {
    render(
      <ThreadProvider>
        <CommentInput />
      </ThreadProvider>
    )

    const textArea = screen.getByPlaceholderText('Write a comment...')
    const button = screen.getByText('COMMENT')

    fireEvent.change(textArea, { target: { value: '   ' } })
    fireEvent.click(button)

    expect((textArea as HTMLTextAreaElement).value.trim()).toBe('')
  })
})
