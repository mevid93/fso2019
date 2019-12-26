import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import { useField } from './hooks'
import { connect } from 'react-redux'

function App(props) {
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      initialBlogs.sort((a, b) => { return b.likes - a.likes })
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
      const user = await loginService.login({ username: username.value, password: password.value })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification('wrong username or password', 'error', 3)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      {user !== null ? <h2>blogs</h2> : <h2>log in to application</h2>}
      <Notification />
      {user === null &&
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      }
      {user !== null && <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>}
      {user !== null &&
        <CreateForm
          blogs={blogs}
          setBlogs={setBlogs}
          createBlogVisible={createBlogVisible}
          setCreateBlogVisible={setCreateBlogVisible}
        />
      }
      {user !== null && blogs.map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />)}
    </div>
  )
}

export default connect(null, { setNotification })(App)
