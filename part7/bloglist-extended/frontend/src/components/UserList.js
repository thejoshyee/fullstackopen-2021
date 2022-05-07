import React from 'react'
import { Link } from 'react-router-dom'


const UserList = (props) => {
    return (
        <div>
            <h2>Users</h2>
            {props.users.map(user => (
                <div key={user.id}>
                    <Link to={'/users/' + user.id}>{user.name}</Link>
                    <p>{user.blogs.length} Blogs</p>
                </div>
                ))}
        </div>
    )
} 
export default UserList


