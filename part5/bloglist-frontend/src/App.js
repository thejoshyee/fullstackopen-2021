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
  const [added, setAdded] = useState(false)

  const blogFormRef = useRef()

  const sortedBlogs = blogs.sort((a,b) => {
    return b.likes - a.likes
  })

  useEffect(() => {
    const fetchData = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchData()
  }, [added])

  
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
      handleMessage(newBlog.title + ' has been created')
      setBlogs(blogs.concat(newBlog))
      setAdded(true)
      setAdded(false)
    } catch (e) {
      console.log(e)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='Add Blog' closeLabel="Cancel" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const handleLike = async (post) => {
    try {
      post.likes += 1
      const response = await blogService.update(post.id, post)
      const newBlogs = blogs.map(item => {
        return item.id === post.id ? response : item
      })

    } catch (e) {
      console.log(e)
    }
  }

  const handleDelete = async (post) => {
    try {
      window.confirm(`Do you really want to delete ${post.title}?`)
      await blogService.remove(post.id)
      const remainingBlogs = blogs.filter(item => item.id !== post.id)
      setBlogs(remainingBlogs)
    } catch (e) {
        console.log(e)
    }
  }

  return (
    <div>
      <h2>Some Dope Blogs</h2>
      {
        errorMessage === null ?
        <></>
        :
        <p className="user-message">{errorMessage}</p>
      }

      {
        loginMessage === null ?
        <></>
        :
        <p className="login-message">{loginMessage}</p>
      }
      
      {user === null ?
      loginForm() :
      <div>

        <div>{user.name} logged-in {logout()}</div>
        <div>
          {blogForm()}
        </div>

        <div>
          {sortedBlogs.map(blog =>
            <Blog 
              key={blog.id} 
              blog={blog} 
              currentUser={user} 
              handleLike={handleLike} 
              handleDelete={handleDelete} 
            />)
          }
        </div>

      </div>
    }
    </div>
  )
}

export default App