import { Link } from 'react-router-dom'
import BlogForm from './NewBlogForm'
import Togglable from './Toggable'
import React from 'react'


const BlogList = (props) => {
    if (!props.user) {
        return null
    }
    return (
        <div>
        <h2 className="text-4xl">Blogs</h2>
        <Togglable buttonLabel="Add Blog">
            <BlogForm />
        </Togglable>
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