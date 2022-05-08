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
        <div>
        <TextField 
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id='username'
          label="username" />

        </div>
        <div>
        <TextField 
          label="password" 
          type='password' 
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id="password"
          />

        </div>
        <Button id="login-button" variant="contained" color="primary" type="submit">
          Login
        </Button>

      </form>
      <div>Forgot your password? <Togglable buttonLabel='Click Here' closeLabel="X" ref={blogFormRef}>Too bad! Make a new account!</Togglable></div>
    </div>
  )
}

export default LoginForm