import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggable'
import './css/styles.css'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginMessage, setLoginMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

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

  const logout = () => (
    <button type="submit" onClick={logoutUser}>logout</button>
  )

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
        setLoginMessage('Wrong Credentials')
        setTimeout(() => {
          setLoginMessage(null)
        }, 5000)
    }
  }

  const handleMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const createBlog = async (entry) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(entry)
      setBlogs([...blogs, newBlog])
      handleMessage(newBlog.title + ' has been created')
    } catch (e) {
      console.log(e)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )


  return (
    <div>
      <h2>Some Dope Blogs</h2>
      {
        errorMessage === null ?
        <></>
        :
        <p class="user-message">{errorMessage}</p>
      }

      {
        loginMessage === null ?
        <></>
        :
        <p class="login-message">{loginMessage}</p>
      }
      
      {user === null ?
      loginForm() :
      <div>

        <p>{user.name} logged-in {logout()}</p>
        <div>
          {blogForm()}
        </div>

        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />)
          }
        </div>

      </div>
    }
    </div>
  )
}

export default App