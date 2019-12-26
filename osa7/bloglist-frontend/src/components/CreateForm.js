import React from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks'
import filterInvalidDOMProps from 'filter-invalid-dom-props'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

// form for creating new blog
const CreateForm = ({ blogs, setBlogs, createBlogVisible, setCreateBlogVisible, ...props }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({ title: title.value, author: author.value, url: url.value })
      title.reset()
      author.reset()
      url.reset()
      const updatedBlogs = blogs.concat(blog)
      updatedBlogs.sort((a, b) => { return b.likes - a.likes })
      setBlogs(updatedBlogs)
      props.setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'info', 3)
    } catch (exception) {
      props.setNotification('Failed to create blog', 'error', 3)
    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateBlogVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            title: <input {...filterInvalidDOMProps(title)} />
          </div>
          <div>
            author: <input {...filterInvalidDOMProps(author)} />
          </div>
          <div>
            url: <input {...filterInvalidDOMProps(url)} />
          </div>
          <button type="submit">create</button>
        </form>
        <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default connect(null, { setNotification })(CreateForm)