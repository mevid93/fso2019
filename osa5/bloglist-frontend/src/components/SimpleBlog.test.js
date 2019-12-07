import React from 'react'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  const blog = {
    title: 'TestiBlogi',
    author: 'Haamukirjoittaja',
    url: 'http://404.com',
    likes: 26
  }

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} />
    )
  })


  test('renders title', () => {
    expect(component.container).toHaveTextContent(
      blog.title
    )
  })

  test('renders auhtor', () => {
    expect(component.container).toHaveTextContent(
      blog.author
    )
  })

  test('renders likes', () => {
    expect(component.container).toHaveTextContent(
      `blog has ${blog.likes} likes` 
    )
  })
})