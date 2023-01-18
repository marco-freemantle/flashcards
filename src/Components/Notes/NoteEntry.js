import { CloseButton } from "react-bootstrap";
import "./NoteEntry.css";

function NoteEntry(props) {
  function removeNote() {
    let noteObject = {
      phrase: props.phrase,
      translation: props.translation,
      notes: props.notes,
    };
    props.removeNote(noteObject);
  }
  return (
    <tr key={Math.random()}>
      <td>{props.phrase}</td>
      <td>{props.translation}</td>
      <td>
        {props.notes}
        <CloseButton className="noteRemove" onClick={() => removeNote()} />
      </td>
    </tr>
  );
}

export default NoteEntry;
