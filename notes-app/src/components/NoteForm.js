import { useState } from 'react' 

const NoteForm = ({ createNewNote }) => {
  const [newNote, setNewNote] = useState('') 

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNewNote = (event) => {
    event.preventDefault()
    createNewNote({
      content: newNote,
      important: Math.random() > 0.5,
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNewNote}>
        <input
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm