import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
    return (
        <div>
            <h2>Users</h2>
            <div>
                {users.map(user => (
                            <Link key={user.id} to={'/users/' + user.id}>
                                <p>{user.name} {user.blogs.length} Blogs</p>
                            </Link>
                ))}
            </div>
        </div>
    )
} 

export default UserList