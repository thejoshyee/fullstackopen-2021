import { useState } from 'react'
import userService from '../services/users'
import { Button, TextField } from '@mui/material'

const Register = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onRegister(username, name, password)
  }

  const onRegister = async (username, name, password) => {
    try {
        await userService.registerUser({
          username, password, name
        })
        setUsername('')
        setPassword('')
        setName('')
        props.notify('User created, please log in now.')
    } catch (e) {
        props.notify('Username is already taken. Try again.', 'alert')
      
    }
  }

  return (
    <div>
      <h2>Register a New Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="text-field">
        <TextField 
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id='username'
            label='Username'
          />
        </div>
        <div className="text-field">
          <TextField
            type="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            id="name"
            label='Name'
          />
        </div>
        <div className="text-field">
          <TextField
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
            label='Password'
          />
        </div>
        <button className="button-18 register-btn" type="submit">
          Create Account
        </button>
      </form>
    </div>
  )
}

export default Register