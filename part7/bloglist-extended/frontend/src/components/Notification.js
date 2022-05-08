import { Alert} from '@mui/material'


const Notification = ({ notification }) => {
    if (notification === null) {
      return null
    }
  
    const style = {
      color: notification.type === 'alert' ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  
    return (
        <div id='notification'>
        {(notification.type === 'alert' ?
          <Alert severity="error">
            {notification.message}
          </Alert>
          :
          <Alert severity="success">
          {notification.message}
        </Alert>
        )}
        </div>
    )
  }
  
  export default Notification