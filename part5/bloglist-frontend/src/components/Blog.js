import React from 'react'
import Togglable from './Toggable'


const Blog = ({ blog, handleLike, handleDelete }) => {


  const blogStyle = {
    display: 'block',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    margin: 0,
    marginTop: 10,
  }

  const likesStyle = {
    display: 'inline',
    padding: 0
  }

  const viewStyle = {
    display: 'inline',
    padding: 0,
    margin: 0
  }

  return (
    <div id='blogWrapper' style={blogStyle}>

      <div id='blogTitle' style={viewStyle}>{blog.title} by {blog.author}
      </div>

      <Togglable closeLabel="hide" buttonLabel="view" >
        <div>{blog.url}</div>
        <div>
          <p id='likesCount' style={likesStyle}>Likes: {blog.likes}</p>
          <button id='likeButton' onClick={() => handleLike(blog)}>
                Like
          </button>
          <div>Added by {blog.user.name} ({blog.user.username})</div>
        </div>

        {/* {blog.user.username === loggedUser.username ? ( */}


        {blog.user.username ? (
          <button
            id='deleteButton'
            onClick={() => handleDelete(blog)}
          >
                Delete
          </button>
        ) : (
          ''
        )}

      </Togglable>



    </div>
  )
}


export default Blog