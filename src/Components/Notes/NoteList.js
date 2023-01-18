import "./NoteList.css";
import Table from "react-bootstrap/Table";
import NoteEntry from "./NoteEntry";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import * as utilities from "../../Utilities/FirestoreUtilities";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [rowPhrase, setRowPhrase] = useState("");
  const [rowTranslation, setRowTranslation] = useState("");
  const [rowNotes, setRowNotes] = useState("");

  useEffect(() => {
    utilities.getNotes().then((notes) => {
      setNotes(notes);
    });
  }, []);

  function addNewNote(event) {
    event.preventDefault();
    let newNote = {
      phrase: rowPhrase,
      translation: rowTranslation,
      notes: rowNotes,
    };

    let newNotesList = [...notes, newNote];
    setNotes(newNotesList);
    utilities.updateNotes(newNotesList);
    document.getElementById("newNoteForm").reset();
  }

  function removeNote(noteObject) {
    let copyNotes = notes.filter(
      (note) =>
        !(
          note.phrase === noteObject.phrase &&
          note.translation === noteObject.translation &&
          note.notes === noteObject.notes
        )
    );
    setNotes(copyNotes);
    utilities.updateNotes(copyNotes);
  }
  return (
    <div>
      <h2 style={{ marginTop: "25px" }}>Notes</h2>
      <Form onSubmit={addNewNote} id="newNoteForm" className="newNoteForm">
        <Form.Control
          type="text"
          placeholder="Phrase"
          onChange={(e) => setRowPhrase(e.target.value)}
          min={1}
        />
        <Form.Control
          type="text"
          placeholder="Translation"
          onChange={(e) => setRowTranslation(e.target.value)}
          min={1}
        />
        <Form.Control
          type="text"
          placeholder="Notes"
          onChange={(e) => setRowNotes(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Table striped bordered hover size="sm" className="notesTable">
        <thead>
          <tr>
            <th>Phrase</th>
            <th>Translation</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <NoteEntry
              key={Math.random()}
              phrase={note.phrase}
              translation={note.translation}
              notes={note.notes}
              removeNote={removeNote}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default NoteList;
