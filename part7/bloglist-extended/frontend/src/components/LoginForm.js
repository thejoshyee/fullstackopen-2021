import { useState, useRef } from 'react'
import Togglable from './Toggable'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <div>
      <h2>Please login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
      <div>Forgot your password? <Togglable buttonLabel='Click Here' closeLabel="X" ref={blogFormRef}>Too bad! Make a new account!</Togglable></div>
    </div>
  )
}

export default LoginForm