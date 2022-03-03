const Notification = ({ message, setUpdateMessage, isDeleted, setIsDeleted }) => {

    const updateMessage = {
        color: "green",
        fontStyle: "italic",
        fontSize: 16,
        background: "lightgrey",
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const deletedMessage = {
      color: "red",
      fontStyle: "italic",
      fontSize: 16,
      background: "lightgrey",
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    if (message === null) {
      return null
    }
  
    return (
      <div style={isDeleted ? deletedMessage : updateMessage} className='error'>
        {message}
      </div>
    )
  }

  export default Notification