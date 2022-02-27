import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])


  const notesToShow = showAll
    ? notes 
    : notes.filter(note => note.important)
  
  
  const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
  }
  
  const addNote = (event) => {
      event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        }
        // setNotes(notes.concat(noteObject))
        // setNewNote("")
        axios
          .post('http://localhost:3001/notes', noteObject)
          .then(response => {
            setNotes(notes.concat(response.data))
            setNewNote('')
          })
  }


  const toggleImportanceOf = (id) => {
    //url of the note of the id from user clicked
    const url = `http://localhost:3001/notes/${id}`
    // find the note that use clicked id with the id of the note in the notes array
    const note = notes.find(n => n.id === id)
    //new note object with prev and changed property
    const changedNote = { ...note, important: !note.important}

    axios.put(url, changedNote).then(response => {
      console.log(response.data)
      setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
  }

  
  return (
   <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
            Show {showAll ? "Important" : "All"}
        </button>
      </div>
      
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
            
            />
        )}
      </ul>
        <form onSubmit={addNote}>
            <input 
                value={newNote}
                onChange={handleNoteChange}
            />
            <button type="submit">Save</button>
        </form>
      
    </div>
  )
}

export default App

  