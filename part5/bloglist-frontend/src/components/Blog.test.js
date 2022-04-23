import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const defaultCurrentUser = {
  username: 'testusername',
  name: 'test name'
}

const defaultBlog = {
  title: 'blog title',
  author: 'author name',
  likes: 7,
  url: 'urladdress/url',
  user: defaultCurrentUser
}

test('renders title and author', () => {
  const component = render(
    <Blog blog={defaultBlog} currentUser={defaultCurrentUser} />
  )

  expect(component.container).toHaveTextContent(defaultBlog.title)
  expect(component.container).toHaveTextContent(defaultBlog.author)
})

