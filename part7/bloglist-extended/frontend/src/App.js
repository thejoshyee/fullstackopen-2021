import React from 'react'
import { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom"
import { Container, AppBar, Button, Toolbar, IconButton } from '@mui/material'


import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Home from './components/Home'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoggedIn from './components/LoggedIn'
import User from './components/User'
import Register from './components/Register'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const blogFormRef = useRef()
  const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(byLikes) )
    )
  }, [])

  useEffect(() => {
    userService.getAll().then(users =>
      setAllUsers(users)
    )
  }, [allUsers])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      setUser(userFromStorage)
    }
  }, [])

  const login = async (username, password) => {
    loginService.login({
      username, password,
    }).then(user => {
      setUser(user)
      userService.setUser(user)
      notify(`${user.name} logged in!`)
    }).catch(() => {
      notify('wrong username/password', 'alert')
    })
  }

  const logout = () => {
    setUser(null)
    userService.clearUser()
    notify('good bye!')
  }



  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }


  const padding = {
    padding: 5
  }

  if (user === null) {
    return <>
    <Container>
      <Notification notification={notification} />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to='/'>
              Login
            </Button>
            <Button component={Link} to='/register' color="inherit">
              Register
            </Button>
          </Toolbar>
        </AppBar>



        <h1>Welcome to Awesome Blogs</h1>

        <Routes>
          <Route path="/" element={<LoginForm onLogin={login}/>} />
          <Route path="/register" element={<Register allUsers={setAllUsers} notify={notify} />} />
        </Routes>
      </Router>
      </Container>
    </>
  }

  return (
    <Container>
      <Notification notification={notification} />
      <Router>
        <AppBar position="static">
          <Toolbar>

            <Button color="inherit" component={Link} to='/'>
              Home
            </Button>

            <Button color="inherit" component={Link} to='/blogs'>
              Blogs
            </Button>

            <Button color="inherit" component={Link} to='/users'>
              Users
            </Button>  

            <Button color="inherit">
              {user
                ? <em>{user.name} is logged in</em>

                : <Link to="/login">Login</Link>
              }

            </Button>  

              {user
                ? <em><LoggedIn user={user} logout={logout}/> </em>

                : <Link to="/login">Login</Link>
              }

          </Toolbar>
        </AppBar>

        <h1>Awesome Blogs</h1>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/users" element={<UserList users={allUsers} />} />
          <Route path="/blogs" element={<BlogList setAllUsers={setAllUsers} allUsers={allUsers} blogs={blogs} user={user} notify={notify} setBlogs={setBlogs} />} />
          <Route path="/blogs/:id" element={<Blog blogs={blogs} user={user} blogFormRef={blogFormRef} setBlogs={setBlogs} notify={notify} />} />
          <Route path="/users/:id" element={<User allUsers={allUsers} />} />        
        </Routes>
      </Router>
      <div>
        <i>Bloglist App 2022</i>
      </div>
    </Container>
  );
}

export default App;
