import { connect } from "react-redux";
import { createNote } from '../reducers/noteReducer'

const NewNote = props => {

    const addNote = async e => {
        e.preventDefault();
        const content = e.target.note.value;
        e.target.note.value = '';
        props.createNote(content)
    }

    return (
        <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">add</button>
        </form>
    )
}

export default connect(
    null,
    { createNote }
)(NewNote)