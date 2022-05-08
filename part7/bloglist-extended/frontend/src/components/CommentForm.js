import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'


const CommentForm = ({ blogs, createComment, setBlogs }) => {

  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  const [newComment, setNewComment] = useState("");

  
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = (event) => {
    event.preventDefault();
    createComment(blog.id, newComment);
    setNewComment("");
  };

  return (
    <div className="comment-wrapper">
      <h3 className='add-comment-title'>Add a Comment</h3>
      <form onSubmit={addComment}>
        <p>
          <input value={newComment} onChange={handleCommentChange} />
        </p>
        <button className='like-btn button-18' type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default CommentForm;