import React, { useState } from 'react'
import Togglable from './Toggable'

const Blog = ({ blog, loggedUser, handleLike, handleDelete }) => {

  
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
    <div style={blogStyle}> 

        <div style={viewStyle}>{blog.title} by {blog.author} 

          <Togglable closeLabel="hide" buttonLabel="view" >
            <div>{blog.url}</div>
            <div>
              <p style={likesStyle}>Likes: {blog.likes}</p> 
              <button className="likebutton" onClick={() => handleLike(blog)}>
                Like
              </button>
              <div>Added by {blog.user.name} ({blog.user.username})</div>
            </div>

            {blog.user.username === loggedUser.username ? (
            <button
                onClick={() => handleDelete(blog)}
              >
                Delete
              </button>
            ) : (
              ''
            )}

          </Togglable> 

        </div>

    </div>
  )
}

export default Blog