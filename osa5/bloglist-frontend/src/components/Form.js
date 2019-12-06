import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

// form for creating new blog
const CreateForm = ({ blogs, setBlogs, setErrorMessage, setInfoMessage, createBlogVisible, setCreateBlogVisible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      const updatedBlogs = blogs.concat(blog)
      updatedBlogs.sort((a, b) => { return b.likes - a.likes })
      setBlogs(updatedBlogs)
      setInfoMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => setInfoMessage(null), 3000)
    } catch (exception) {
      setErrorMessage('Failed to create blog')
      setTimeout(() => setErrorMessage(null), 3000)
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
            title: <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
          </div>
          <div>
            author: <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
          </div>
          <div>
            url: <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
          </div>
          <button type="submit">create</button>
        </form>
        <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

// Form for log in
const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username <input type="text" value={username} name="Username" onChange={handleUsernameChange} />
        </div>
        <div>
          password <input type="password" value={password} name="Password" onChange={handlePasswordChange} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export { CreateForm, LoginForm }