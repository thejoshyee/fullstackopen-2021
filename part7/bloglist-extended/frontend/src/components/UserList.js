import React from 'react'
import { Link } from 'react-router-dom'
import { Button, TableContainer, Table, TableRow, TableBody, TableCell, Paper, TextField } from '@mui/material'


const UserList = (props) => {

    if (!props.users) {
        return null
    }

    return (
        <div>
            <h2>Users</h2>

            <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                            {props.users.map(user => (
                                <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`/blogs/${user.id}`}>{user.name}</Link>
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


