import React from 'react'
import filterInvalidDOMProps from 'filter-invalid-dom-props'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { loginAsUser } from '../reducers/loginReducer'
import loginService from '../services/login'

const LoginForm = ({username, password, ...props}) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })
      props.loginAsUser(user)
      username.reset()
      password.reset()
    } catch (error) {
      props.setNotification('wrong username or password', 'error', 3)
    }
  }

  return (
    <div>
      <form className="loginForm" onSubmit={handleLogin}>
        <div>
          username <input {...filterInvalidDOMProps(username)} />
        </div>
        <div>
          password <input {...filterInvalidDOMProps(password)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setNotification, loginAsUser })(LoginForm)