const Notification = ({ message }) => {

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

    if (message === null) {
      return null
    }
  
    return (
      <div style={updateMessage} className='error'>
        {message}
      </div>
    )
  }

  export default Notification