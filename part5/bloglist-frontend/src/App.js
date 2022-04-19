import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


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
      //set token
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
        setErrorMessage('Wrong Credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  const handleMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  
  const blogForm = () => (

    <form onSubmit={handleSave}>
      
      <p>title: <input
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      </p>

      <p>author: <input
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      </p>

      <p>url: <input
        value={url}
        onChange={({ target }) => setURL(target.value)}
      />
      </p>

      <button type="submit">Save</button>
    </form>  
  )

  const handleSave = async (event) => {
    event.preventDefault()
    createBlog({ title: title, author: author, url: url })
  }

  const createBlog = async (entry) => {
    try {
      const newBlog = await blogService.create(entry)
      setBlogs([...blogs, newBlog])
      handleMessage(newBlog.title + 'has been created')
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div>
      <h2>Dope Blogs</h2>
      <h2>{errorMessage}</h2>
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