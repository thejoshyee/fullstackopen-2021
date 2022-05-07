import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { nanoid } from 'nanoid'
import blogs from '../services/blogs'
import CommentForm from './CommentForm'

const Blog = (props) => {
  
  const id = useParams().id
  const blog = props.blogs.find((blog) => blog.id === id)
  const navigate = useNavigate()

  if (!blog) {
    props.setNotification('Blog you tried to access was not found')
    return null
}

  const handleDelete = async (post) => {
    try {
      window.confirm(`Do you really want to delete ${post.title}?`)
      await blogService.remove(post.id)
      props.notify(post.title + ' has been deleted')
      const remainingBlogs = props.blogs.filter(item => item.id !== post.id)
      props.setBlogs(remainingBlogs)
      navigate('/blogs')
    } catch (e) {
      console.log(e)
    }
  }

  const handleLike = async (blog) => {
    try {
      blog.likes += 1
      const likedBlog = await blogService.update(blog.id, blog)
      props.setBlogs(props.blogs.map(blog =>
        blog.id === likedBlog.id ?
          { ...blog, likes: likedBlog.likes }
          : blog
      ))
    } catch (e) {
      console.log(e)
    }
  }
  console.log(blog)

  return (
    <div id='blogWrapper'>
      <div id='blogTitle'>{blog.title} by {blog.author}
      </div>

        <div>{blog.url}</div>
        <div>
          <p id='likesCount'>Likes: {blog.likes}</p>
          <button id='likeButton' onClick={() => handleLike(blog)}>
                Like
          </button>
          <div>Added by {blog.user.name} ({blog.user.username})</div>
        </div>

        {blog.user.username === props.user.username ?  (
          <button
            id='deleteButton'
            onClick={() => handleDelete(blog)}
          >
                Delete
          </button>
        ) : (
          ''
        )}

        <h3>Comments</h3>
        <CommentForm createComment={props.createComment} blogs={props.blogs} setBlogs={props.setBlogs} />
        <ul>
        
        {blog.comments.map(comment => {
          return <li key={nanoid()}>{comment}</li>
        })}
        </ul>



    </div>
  )
}



export default Blog