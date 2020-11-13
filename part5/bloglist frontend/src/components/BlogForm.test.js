import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

describe('Display blog form', () => {
  test('<BlogForm /> updates parent state and calls onSubmit ' , () => {
    const addBlog = jest.fn()

    const { container } = render(
      <BlogForm createBlog={addBlog} />
    )
    // const title = container.querySelector('#title')
    // const author = container.querySelector('#author')
    // const url = container.querySelector('#url')
    const form = container.querySelector('form')

    fireEvent.change(container.querySelector('#title'), {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.change(container.querySelector('#author'), {
      target: { value: 'echo' }
    })
    fireEvent.change(container.querySelector('#url'), {
      target: { value: 'www.gov' }
    })
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
    expect(addBlog.mock.calls[0][0].author).toBe('echo' )
    expect(addBlog.mock.calls[0][0].url).toBe('www.gov' )
  })
})
