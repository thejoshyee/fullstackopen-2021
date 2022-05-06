import { useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'

const BlogDetails = (props) => {
  if (!props.visible) return null

  const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1

  const addedBy = props.blog.user && props.blog.user.name ? props.blog.user.name : 'unknown'

  const createBlog = async (blog) => {
    blogService.create(blog).then(createdBlog => {
      notify(`a new blog '${createdBlog.title}' by ${createdBlog.author} added`)
      props.setBlogs(props.blogs.concat(createdBlog))
      props.blogFormRef.current.toggleVisibility()
    }).catch(error => {
      notify('creating a blog failed: ' + error.response.data.error, 'alert')
    })
  }

  const notify = (message, type='info') => {
    props.setNotification({ message, type })
    setTimeout(() => {
      props.setNotification(null)
    }, 5000)
  }

  const removeBlog = (id) => {
    const toRemove = props.blogs.find(b => b.id === id)

    const ok = window.confirm(`remove '${toRemove.title}' by ${toRemove.author}?`)

    if (!ok) {
      return
    }

    blogService.remove(id).then(() => {
      const updatedBlogs = props.blogs
        .filter(b => b.id!==id)
        .sort(byLikes)
      props.setBlogs(updatedBlogs)
    })
  }

  const likeBlog = async (id) => {
    const toLike = props.blogs.find(b => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes||0) + 1,
      user: toLike.user.id
    }

    blogService.update(liked.id, liked).then(updatedBlog => {
      notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`)
      const updatedBlogs = props.blogs
        .map(b => b.id===id ? updatedBlog : b)
        .sort(byLikes)
      props.setBlogs(updatedBlogs)
    })
  }

  return (
    <div>
      <div>
        <a href={props.blog.url}>{props.blog.url}</a>
      </div>
      <div>
        {props.blog.likes} likes <button onClick={() => likeBlog(props.blog.id)}>like</button>
      </div>
      {addedBy}
      {props.own&&<button onClick={() => removeBlog(props.blog.id)}>
        remove
      </button>}
    </div>
  )
}




const Blog = (props) => {
  const [visible, setVisible] = useState(false)

  const id = useParams().id
  const blog = props.blogs.find((blog) => blog.id === id)

//   if (!blog) {
//     history.push('/blogs')
//     props.setNotification('Blog you tried to access was not found')
//     return null
// }

  const style = {
    padding: 3,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1,
  }

  return (
    <div style={style} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <BlogDetails
        blog={blog}
        blogs={props.blogs}
        visible={visible}
        setNotification={props.setNotification}
        setBlogs={props.setBlogs}
        // likeBlog={likeBlog}
        // removeBlog={removeBlog}
        own={blog.user && props.user.username === blog.user.username}
      />
    </div>
  )
}



export default Blog