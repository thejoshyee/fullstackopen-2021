import { Button } from '@mui/material'


const LoggedIn = ({user, logout}) => {
    return (
      <div>
      {/* {user.name} is logged in */}
      <Button variant='contained' color='primary' id='logout-btn' onClick={logout}>logout</Button>
    </div>
    )
  }

  export default LoggedIn