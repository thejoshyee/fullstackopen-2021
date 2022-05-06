import React from 'react'
import { Link, useParams } from 'react-router-dom'


const User = (props) => {

    const id = useParams().id

    const user = props.allUsers.find((user) => user.id === id)

    return (
        <div>
            <h2>Blogs added by {user.name} </h2>
            <div>
                {user.blogs.map((blog) => {
                    return (
                        <Link key={blog.id} to={'/blogs/' + blog.id}>
                            <p>{blog.title}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
export default User