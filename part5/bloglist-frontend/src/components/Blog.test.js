import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { computeHeadingLevel, fireEvent, render } from '@testing-library/react'
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

test('does not render url or likes by default', () => {
  const component = render(
    <Blog blog={defaultBlog} currentUser={defaultCurrentUser} />
  )

  const hiddenContentByDefault = component.container.querySelector('.togglableHiddenContent')

  expect(hiddenContentByDefault).toHaveStyle('display: none')
  expect(hiddenContentByDefault).not.toBeVisible()

})


test('renders the hidden content when view button is pressed', () => {

  const component = render(
    <Blog blog={defaultBlog} currentUser={defaultCurrentUser} />
  )

  const button = component.container.querySelector('button')
  fireEvent.click(button)

  const hiddenContentByDefault = component.container.querySelector('.togglableHiddenContent')

  expect(hiddenContentByDefault).not.toHaveStyle('display: none')
  expect(hiddenContentByDefault).toBeVisible()


  expect(hiddenContentByDefault).toHaveTextContent(defaultBlog.likes)
  expect(hiddenContentByDefault).toHaveTextContent(defaultBlog.url)
})

test('if like button is clicked twice then event handler is clicked twice', () => {
  const likeMockHandler = jest.fn()

  const component = render(
    <Blog blog={defaultBlog} currentUser={defaultCurrentUser} handleLike={likeMockHandler} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeMockHandler.mock.calls).toHaveLength(2)
})


test('blog form is calls event handler it receives as props with correct details when new blog is created', () => {
  const mockAddNewBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={mockAddNewBlog} />
  )

  const authorInput = component.container.querySelector('#author')
  const titleInput = component.container.querySelector('#title')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(authorInput, {
    target: { value: 'author test' }
  })

  fireEvent.change(titleInput, {
    target: { value: 'title test' }
  })

  fireEvent.change(urlInput, {
    target: { value: 'url test' }
  })

  const button = component.getByText('Save')
  fireEvent.click(button)

  expect(mockAddNewBlog.mock.calls).toHaveLength(1)
  expect(mockAddNewBlog.mock.calls[0][0].title).toBe('title test')
  expect(mockAddNewBlog.mock.calls[0][0].author).toBe('author test')
  expect(mockAddNewBlog.mock.calls[0][0].url).toBe('url test')

})