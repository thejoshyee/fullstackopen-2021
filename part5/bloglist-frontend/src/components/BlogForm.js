import { useState } from 'react' 

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
}

export default BlogForm