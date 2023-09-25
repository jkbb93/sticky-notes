import { useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveNote, bringNoteToTop } from "../../notesSlice";
import { useDraggable } from "../../../../hooks/useDraggable";
import useResizable from "../../../../hooks/useResizable";
import useSaveStyles from "./hooks/useSaveStyles";
import useHandleOutsideClick from "./hooks/useHandleOutsideClick";
import ResizeHandle from "../ResizeHandle";
import styles from "./NoteBody.module.css";

const selectNoteStyles = (state, noteId) => {
  const note = state.notes.find((note) => note.id === noteId);
  return note.styles;
};

function NoteBody(props) {
  const {
    noteId,
    isSelected,
    isEditing,
    onToggleSelected: toggleIsSelected,
    onToggleEdit: toggleIsEditing,
    children
  } = props;

  const storedStyles = useSelector((state) => selectNoteStyles(state, noteId));
  const dispatch = useDispatch();
  const noteRef = useRef(null);
  const [grabHandler, draggableStyles, isDragging] = useDraggable(noteRef);
  const [resizeHandler, resizerStyles] = useResizable(noteRef);

  const selectNoteHandler = (event) => {
    if (isEditing) return;

    if (!isSelected) {
      toggleIsSelected();
      dispatch(bringNoteToTop(noteId));
    }

    grabHandler(event);
  };

  const outsideClickCallback = useCallback(() => {
    toggleIsSelected();

    if (isEditing) {
      toggleIsEditing();
    }
  }, [toggleIsSelected, isEditing, toggleIsEditing]);

  useHandleOutsideClick(noteRef, {
    onlyWhen: isSelected,
    callback: outsideClickCallback
  });

  useEffect(() => {
    function saveStylesAfterMoving() {
      const draggableStylesHasTransformValue = !!draggableStyles.transform;
      const transformValueHasChanged =
        draggableStyles.transform !== storedStyles.transform;
      const noteHasBeenMoved =
        draggableStylesHasTransformValue && transformValueHasChanged;
      const noteWasMovedAndReleased = noteHasBeenMoved && !isDragging;

      if (!noteWasMovedAndReleased) return;

      const stylesToSave = {
        ...storedStyles,
        ...draggableStyles
      };

      dispatch(
        saveNote({
          id: noteId,
          styles: stylesToSave
        })
      );
    }
    saveStylesAfterMoving();
  }, [isDragging, storedStyles, draggableStyles, dispatch, noteId]);

  const isSelectedClassName = isSelected ? styles["is-selected"] : "";
  const noteClassNames = `${styles["note-body"]} ${isSelectedClassName}`;

  return (
    <div
      ref={noteRef}
      onPointerDown={selectNoteHandler}
      style={{
        ...storedStyles,
        ...draggableStyles,
        ...resizerStyles
      }}
      className={noteClassNames}
    >
      {children}
      <div onPointerDown={resizeHandler}>{isEditing && <ResizeHandle />}</div>
    </div>
  );
}

export default NoteBody;
