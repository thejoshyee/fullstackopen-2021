import { useState } from 'react'

const BlogDetails = ({ blog, visible, likeBlog, removeBlog, own }) => {
  if (!visible) return null

  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'

  return (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      {addedBy}
      {own&&<button onClick={() => removeBlog(blog.id)}>
        remove
      </button>}
    </div>
  )
}

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

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
        visible={visible}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        own={blog.user && user.username===blog.user.username}
      />
    </div>
  )
}



export default Blog