import { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')


  const addNewBlog = async (event) => {
    event.preventDefault()
    createBlog({ title: title, author: author, url: url })
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <form onSubmit={addNewBlog}>

      <p>title: <input
        id='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      </p>

      <p>author: <input
        id='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      </p>

      <p>url: <input
        id='url'
        value={url}
        onChange={({ target }) => setURL(target.value)}
      />
      </p>

      <button type="submit">Save</button>
    </form>

  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm