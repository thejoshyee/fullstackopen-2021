import { useState } from 'react'
import userService from '../services/users'

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
      if (e.response.data.message) {
        props.notify(e.response.data.message)
      }
      console.log(e)
    }
  }

  return (
    <div>
      <h2>Register a New Account</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
        </div>
        <div>
          Name:
          <input
            type="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            id="name"
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          Create Account
        </button>
      </form>
    </div>
  )
}

export default Register