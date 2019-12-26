import React from 'react'
import { useField } from '../hooks'
import filterInvalidDOMProps from 'filter-invalid-dom-props'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const CreateForm = ({ createBlogVisible, setCreateBlogVisible, ...props }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      props.createBlog(title.value, author.value, url.value)
      title.reset()
      author.reset()
      url.reset()
      props.setNotification(`a new blog ${title.value} by ${author.value} added`, 'info', 3)
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

export default connect(null, { setNotification, createBlog })(CreateForm)