const DeleteNotif = ({ deleteMessage }) => {

    const deletedMessageStyle = {
      color: "red",
      fontStyle: "italic",
      fontSize: 16,
      background: "lightgrey",
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    if (deleteMessage === null) {
      return null
    }
  
    return (
      <div style={deletedMessageStyle} className='error'>
        {deleteMessage}
      </div>
    )
  }

  export default DeleteNotif