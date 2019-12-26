import React from 'react'
import PropTypes from 'prop-types'
import filterInvalidDOMProps from 'filter-invalid-dom-props'

// Form for log in
const LoginForm = ({ handleLogin, username, password }) => {
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm