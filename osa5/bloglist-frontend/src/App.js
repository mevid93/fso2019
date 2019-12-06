import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import { ErrorNotification, InfoNotification } from './components/Notification'
import { LoginForm, CreateForm } from './components/Form'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
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

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  return (
    <div>
      {user !== null ? <h2>blogs</h2> : <h2>log in to application</h2>}
      {errorMessage !== null && <ErrorNotification msg={errorMessage} />}
      {infoMessage !== null && <InfoNotification msg={infoMessage} />}
      {user == null &&
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      }
      {user !== null && <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>}
      {user !== null &&
        <CreateForm
          blogs={blogs}
          setBlogs={setBlogs}
          setErrorMessage={setErrorMessage}
          setInfoMessage={setInfoMessage}
          createBlogVisible={createBlogVisible}
          setCreateBlogVisible={setCreateBlogVisible}
        />
      }
      {user !== null && blogs.map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>)}
    </div>
  )
}

export default App;
