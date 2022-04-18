import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )


  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
        setErrorMessage('Wrong Credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }
console.log(user)
  return (
    <div>
      <h2>Dope Blogs</h2>
      
      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    }


    </div>
  )
}

export default App