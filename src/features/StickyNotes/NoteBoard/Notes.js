import { useSelector, shallowEqual } from "react-redux";
import StickyNote from "../StickyNote";
import NotesFallback from "./NotesFallback";

const selectNoteIds = (state) => state.notes.map((note) => note.id);

function Notes() {
  const noteIds = useSelector(selectNoteIds, shallowEqual);
  const foundSomeNotes = noteIds.length > 0;

  let content;
  if (foundSomeNotes) {
    content = noteIds.map((noteId, index) => {
      const isLastInNotesArray = index === noteIds.length - 1;
      return (
        <StickyNote
          key={noteId}
          id={noteId}
          isInitiallySelected={isLastInNotesArray}
        />
      );
    });
  } else {
    content = <NotesFallback />;
  }

  return <>{content}</>;
}

export default Notes;
