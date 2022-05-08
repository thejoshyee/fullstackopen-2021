import React from 'react'
import { Link } from 'react-router-dom'
import { TableContainer, Table, TableRow, TableBody, TableCell, Paper } from '@mui/material'


const UserList = (props) => {

    if (!props.users) {
        return null
    }

    return (
        <div>
            <h2 className="user-list">Users</h2>

            <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                            {props.users.map(user => (
                                <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </TableCell>
                                <TableCell>
                                    Blogs: {user.blogs.length}
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
            </TableContainer>




        </div>
    )
} 
export default UserList


