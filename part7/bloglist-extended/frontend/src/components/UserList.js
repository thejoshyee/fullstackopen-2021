import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
    return (
        <div>
            <h2>Users</h2>
            <div>
                {users.map(user => (
                                <p key={user.id}>{user.name} {user.blogs.length} Blogs</p>
                ))}
            </div>
        </div>
    )
} 

export default UserList