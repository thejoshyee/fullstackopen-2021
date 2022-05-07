import React, { useState } from "react";
import { useParams } from 'react-router-dom'


const CommentForm = ({ blogs, setBlogs, createComment }) => {

  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  const [newComment, setNewComment] = useState("");

  // CHANGE HANDLERS
  const handleCommentChange = (event) => {
    console.log(event.target.value);
    setNewComment(event.target.value);
  };

  // CREATING Comment
  const addComment = (event) => {
    event.preventDefault();
    
    createComment(blog.id, newComment.value);
    setNewComment("");
    
  };

  return (
    <div className="formDiv">
      <h3>Add a comment</h3>
      <form onSubmit={addComment}>
        <p>
          <input value={newComment} onChange={handleCommentChange} />
        </p>
        <button type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default CommentForm;