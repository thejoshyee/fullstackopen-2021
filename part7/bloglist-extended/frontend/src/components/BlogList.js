import { Link } from 'react-router-dom'
import Togglable from './Toggable'
import React from 'react'
import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import { Button, TableContainer, Table, TableRow, TableBody, TableCell, Paper, TextField } from '@mui/material'



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
                    <TextField
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    id='title'
                    label='Title'
                    />
                </div>
                <div>
                    <TextField
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                    id='author'
                    label='Author'
                    />
                </div>
                <div>
                    <TextField
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                    id='url'
                    label='Blog URL'
                    />
                </div>
                <Button variant="contained" color="primary" id='create-button' type='submit'>
                    Add
                </Button>
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
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                {props.blogs.map(blog => (
                    <TableRow key={blog.id}>
                    <TableCell>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                    <TableCell>
                        Likes: {blog.likes}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    </div>
    )
}

export default BlogList