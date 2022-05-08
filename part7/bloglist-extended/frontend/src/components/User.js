import React from 'react'
import { Link, useParams } from 'react-router-dom'


const User = (props) => {

    const id = useParams().id

    const user = props.allUsers.find((user) => user.id === id)

    if (!user) {
        return null
      }

    return (
        <div>
            <h2>Blogs added by {user.name} </h2>
            <div>
                {user.blogs.map((blog) => {
                    return (
                        <li key={blog.id}>
                        <Link to={'/blogs/' + blog.id}>
                            {blog.title}
                        </Link>
                        </li>
                    )
                })}
            </div>
        </div>
    )
}
export default User