import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import { useField } from './hooks'

function App(props) {
  const username = useField('text')
  const password = useField('password')
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUser()
  }, [])

  const handleLogout = () => {
    props.logoutUser()
  }

  return (
    <div>
      {props.user !== null ? <h2>blogs</h2> : <h2>log in to application</h2>}
      <Notification />
      {props.user === null && <LoginForm username={username} password={password} />}
      {props.user !== null && <p>{props.user.name} logged in <button onClick={handleLogout}>logout</button></p>}
      {props.user !== null &&
        <CreateForm
          createBlogVisible={createBlogVisible}
          setCreateBlogVisible={setCreateBlogVisible}
        />
      }
      {props.user !== null && <BlogList />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setNotification, initializeBlogs, initializeUser, logoutUser })(App)
