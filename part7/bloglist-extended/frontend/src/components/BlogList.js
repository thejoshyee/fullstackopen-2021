import { Link } from 'react-router-dom'
import Togglable from './Toggable'
import React from 'react'
import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import { Button, TableContainer, Table, TableRow, TableBody, TableCell, Paper, TextField } from '@mui/material'
import styled from 'styled-components';



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
          props.setBlogs(prevblogs => prevblogs.concat(newBlog))

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
        <Togglable className="add-blog-btn" buttonLabel='Add Blog' closeLabel="Cancel" ref={blogFormRef}>
                <div>
                <h2>Add New Blog</h2>

                <form onSubmit={handleSubmit}>
                <div className="text-field">
                    <TextField
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    id='title'
                    label='Title'
                    />
                </div>
                <div className="text-field">
                    <TextField
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                    id='author'
                    label='Author'
                    />
                </div>
                <div className="text-field">
                    <TextField
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                    id='url'
                    label='Blog URL'
                    />
                </div>
                <button className='add-btn button-18' type='submit'>
                    Add
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
        <h2 className="blog-list">Blogs</h2>

        {blogForm()}

        <div>
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                {props.blogs.map(blog => (
                    <TableRow key={blog.id}>
                    <TableCell>
                        <Link className='blog-name-list' to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </TableCell>
                    <TableCell>
                        <div className='blog-list-likes'>Likes: {blog.likes}</div>
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