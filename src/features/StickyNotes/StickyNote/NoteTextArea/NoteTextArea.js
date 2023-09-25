import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveNote } from "../../notesSlice";
import styles from "./NoteTextArea.module.css";

function selectNoteContent(state, noteId) {
  const note = state.notes.find((note) => note.id === noteId);
  return note.content;
}

function NoteTextArea({ noteId, editIsInProgress }) {
  const initialContent = useSelector((state) =>
    selectNoteContent(state, noteId)
  );
  const dispatch = useDispatch();
  const textAreaRef = useRef(null);

  useEffect(() => {
    function focusWhenEditStarts() {
      if (!editIsInProgress) return;

      // focus() on mobile doesn't work very well, so return early if touchscreen device
      const clientHasTouchScreen = navigator.maxTouchPoints > 0;
      if (clientHasTouchScreen) return;

      const textArea = textAreaRef.current;
      textArea.focus();
      textArea.selectionStart = textArea.value.length;
    }
    focusWhenEditStarts();
  }, [editIsInProgress]);

  useEffect(() => {
    function saveAfterEditing() {
      if (editIsInProgress) return;

      const noteContent = textAreaRef.current.value;
      const contentHasBeenEdited = noteContent !== initialContent;
      if (!contentHasBeenEdited) return;

      dispatch(
        saveNote({
          id: noteId,
          content: noteContent
        })
      );
    }
    saveAfterEditing();
  }, [editIsInProgress, initialContent, noteId, dispatch]);

  return (
    <textarea
      ref={textAreaRef}
      defaultValue={initialContent}
      readOnly={!editIsInProgress}
      className={styles.textarea}
      spellCheck={false}
    />
  );
}

export default NoteTextArea;
