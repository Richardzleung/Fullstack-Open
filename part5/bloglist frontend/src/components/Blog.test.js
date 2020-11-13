import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './BlogAPI'
import DisplayBlog from './DisplayBlog'

describe('blog test' , () => {
  const obj = {
    title: 'Component testing is done with react-testing-library',
    author: 'Richard',
    url: 'www.fullstackopem.com',
    likes: 1000,
    user: {
      username: 'ROOT'
    },
  }
  const user = {
    username: 'ROOT'
  }

  test('renders default content', () => {
    const component = render(
      <Blog blog={obj} user={user}/>
    )
    expect(component.container).not.toHaveTextContent(
      'www.fullstackopem.com 1000'
    )
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library Richard'
    )

  })

  test('renders content when button controlling details has been clicked', () => {

    const component = render(
      <Blog blog={obj} user={user} />
    )

    const button = component.getByText('View')
    const leftClick = { button: 0 }
    fireEvent.click(button, leftClick)

    expect(component.container).toHaveTextContent(
      'www.fullstackopem.com 1000'
    )
  })

  test('renders content when like button clicked twice', () => {
    const mockHandler = jest.fn()

    const component = render(
      <DisplayBlog blog={obj} user={user} addLike={mockHandler} visibility={true}/>
    )
    const leftClick = { button: 0 }


    const likeButton = component.getByText('like')
    fireEvent.click(likeButton, leftClick)
    fireEvent.click(likeButton, leftClick)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
