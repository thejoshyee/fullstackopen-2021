import { useState, useRef } from 'react'
import Togglable from './Toggable'
import { Button, TextField } from '@mui/material'


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
        <div className="text-field">
        <TextField 
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id='username'
          label="username" />

        </div>
        <div className="text-field">
        <TextField 
          label="password" 
          type='password' 
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id="password"
          />

        </div>
        <button className='login-btn button-18' id="login-button" variant="contained" color="primary" type="submit">
          Login
        </button>

      </form>
      <div className="forgot-pw-wrapper">

        <i>Forgot your password? </i>
        <div className="forgot-pw">
          <Togglable className="cancel-btn-pw" buttonLabel='Click Here' closeLabel="Close" ref={blogFormRef}>
            <span className='forgot-pw'>Too bad! Make a new account!</span>
          </Togglable>
        </div>

      </div>
    </div>
  )
}

export default LoginForm