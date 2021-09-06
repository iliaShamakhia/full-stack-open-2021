import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders title & author', () => {
  const blog = {
    title:'test blog',
    author:'tester',
    url:'www.test.com',
    likes:9
  }

  const component = render(
    <Blog blog={blog} />
  )
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'test blog tester view'
  )
})

test('does not render url & likes', () => {
  const blog = {
    title:'test blog',
    author:'tester',
    url:'www.test.com',
    likes:9
  }

  const component = render(
    <Blog blog={blog} />
  )
  const div = component.container.querySelector('.blog')
  expect(div).not.toHaveTextContent(
    'test blog tester www.test.com view'
  )
})

test('blog\'s url and number of likes are shown when view button is clicked', () => {
  const blog = {
    title:'test blog',
    author:'tester',
    url:'www.test.com',
    likes:9,
    user:{
      name:'test'
    }
  }

  const component = render(
    <Blog blog={blog} user={{ name:'test' }} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'test blog tester hidewww.test.comLikes 9liketestremove'
  )
})

test('clicking the like button twice calls event handler twice', () => {
  const blog = {
    title:'test blog',
    author:'tester',
    url:'www.test.com',
    likes:9,
    user:{
      name:'test'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={{ name:'test' }} handleLike={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeBtn = component.getByText('like')
  fireEvent.click(likeBtn)
  fireEvent.click(likeBtn)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> calls the event handler it received as props with the right details when a new blog is created', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm handleCreate={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'test title' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'test author' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'test url' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('test url')
})