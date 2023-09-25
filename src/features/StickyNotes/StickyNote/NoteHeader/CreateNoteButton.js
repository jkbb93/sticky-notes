import { useContext } from "react";
import { DraggableContainerContext } from "../../../../hooks/useDraggable/DraggableContainer";
import { useDispatch } from "react-redux";
import { createNote } from "../../notesSlice";
import NoteActionButton from "./NoteActionButton";
import PlusIcon from "../../../../components/UI/Icons/PlusIcon";
import styles from "./CreateNoteButton.module.css";

function CreateNoteButton({
  noteIsSelected,
  isEditing,
  onToggleSelected: toggleIsSelected,
  onToggleEdit: toggleIsEditing
}) {
  const containerRef = useContext(DraggableContainerContext);
  const dispatch = useDispatch();

  const createNoteHandler = (event) => {
    /* Get the click position relative to the DraggableContainer,
    use it to provide position value for new note */
    const containerNode = containerRef.current;

    const {
      x: containerClientX,
      y: containerClientY
    } = containerNode.getBoundingClientRect();

    const { clientX: cursorClientX, clientY: cursorClientY } = event;
    const { pageXOffset: scrollAmountX, pageYOffset: scrollAmountY } = window;

    const containerPageX = containerClientX + scrollAmountX;
    const containerPageY = containerClientY + scrollAmountY;
    const cursorPageX = cursorClientX + scrollAmountX;
    const cursorPageY = cursorClientY + scrollAmountY;

    const x = cursorPageX - containerPageX;
    const y = cursorPageY - containerPageY;

    const options = { styles: { transform: `translate(${x}px, ${y}px)` } };

    dispatch(createNote(options));
    if (noteIsSelected) toggleIsSelected();
    if (isEditing) toggleIsEditing();
  };

  return (
    <NoteActionButton fadeWhen={!noteIsSelected} onClick={createNoteHandler}>
      <PlusIcon className={styles.icon} />
    </NoteActionButton>
  );
}

export default CreateNoteButton;
