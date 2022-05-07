import { Link } from 'react-router-dom'
import Togglable from './Toggable'
import React from 'react'
import { useState, useRef } from 'react'
import blogService from '../services/blogs'


const BlogList = (props) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const blogFormRef = useRef()

    const onCreate = async (entry) => {
        try {
          blogFormRef.current.toggleVisibility()
          const newBlog = await blogService.create(entry)
          props.notify(newBlog.title + ' has been created')
          props.setBlogs(props.blogs.concat(newBlog))

        } catch (e) {
          console.log(e)
        }
      }

    const handleSubmit = (event) => {
        event.preventDefault()
        onCreate({ title, author, url, likes: 0 })
        setAuthor('')
        setTitle('')
        setUrl('')
      }
    
    const blogForm = () => (
        <Togglable buttonLabel='Add Blog' closeLabel="Cancel" ref={blogFormRef}>
                <div>
                <h2>Create new</h2>

                <form onSubmit={handleSubmit}>
                <div>
                    title
                    <input
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    id='title'
                    placeholder='title of the blog'
                    />
                </div>
                <div>
                    author
                    <input
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                    id='author'
                    placeholder='author of the blog'
                    />
                </div>
                <div>
                    url
                    <input
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                    id='url'
                    placeholder='url of the blog'
                    />
                </div>
                <button id='create-button' type='submit'>
                    create
                </button>
                </form>
            </div>
        </Togglable>
    )


    if (!props.user) {
        return null
    }

    return (
        <div>
        <h2>Blogs</h2>

        {blogForm()}

        <div>
            {props.blogs.map((blog) => {
                console.log(blog)
                return (
                    <Link key={blog.id} to={'/blogs/' + blog.id}>
                        <p>{blog.title}</p> <p>{blog.likes} likes</p>
                    </Link>
                )
            })}
        </div>
    </div>
    )
}

export default BlogList