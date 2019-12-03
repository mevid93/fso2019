import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import { ErrorNotification, InfoNotification } from './components/Notification'

const CreateForm = ({ blogs, setBlogs, setErrorMessage, setInfoMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(blog))
      setInfoMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => setInfoMessage(null), 3000)
    } catch (exception) {
      setErrorMessage('Failed to create blog')
      setTimeout(() => setErrorMessage(null), 3000)
    }
  }

  return (
    <div>
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
    </div>
  )
}

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => { setErrorMessage(null) }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {user !== null ? <h2>blogs</h2> : <h2>log in to application</h2>}
      {errorMessage !== null && <ErrorNotification msg={errorMessage} />}
      {infoMessage !== null && <InfoNotification msg={infoMessage} />}
      {user == null && loginForm()}
      {user !== null && <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>}
      {user !== null && <CreateForm blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} setInfoMessage={setInfoMessage} />}
      {user !== null && blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App;
