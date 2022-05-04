import React from 'react'

const User = ({ user }) => {
  
 
    return (
        <div>
            <div>{user.name}</div>
            <div>{user.blogs.length}</div>

        </div>
    )

}

export default User