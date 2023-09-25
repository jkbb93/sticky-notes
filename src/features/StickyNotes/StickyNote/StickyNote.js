import { useState, useCallback } from "react";
import NoteBody from "./NoteBody";
import NoteHeader from "./NoteHeader";
import NoteTextArea from "./NoteTextArea";

function StickyNote({ id: noteId, isInitiallySelected }) {
  const [isSelected, setIsSelected] = useState(isInitiallySelected);
  const [isEditing, setIsEditing] = useState(false);

  const toggleIsSelected = useCallback(() => {
    setIsSelected((prev) => !prev);
  }, []);

  const toggleIsEditing = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  return (
    <NoteBody
      noteId={noteId}
      isSelected={isSelected}
      isEditing={isEditing}
      onToggleSelected={toggleIsSelected}
      onToggleEdit={toggleIsEditing}
    >
      <NoteHeader
        noteId={noteId}
        noteIsSelected={isSelected}
        editIsInProgress={isEditing}
        onToggleSelected={toggleIsSelected}
        onToggleEdit={toggleIsEditing}
      />
      <NoteTextArea noteId={noteId} editIsInProgress={isEditing} />
    </NoteBody>
  );
}

export default StickyNote;
