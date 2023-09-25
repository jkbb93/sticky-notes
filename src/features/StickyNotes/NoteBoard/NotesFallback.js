import { useContext } from "react";
import { useDispatch } from "react-redux";
import { DraggableContainerContext } from "../../../hooks/useDraggable/DraggableContainer";
import NoteBoardColorContext from "./NoteBoardColorContext";
import { createNote } from "../notesSlice";
import PlusIcon from "../../../components/UI/Icons/PlusIcon";
import styles from "./NotesFallback.module.css";

function useCreateNoteHandler() {
  const containerRef = useContext(DraggableContainerContext);
  const dispatch = useDispatch();

  const createNoteHandler = () => {
    const locationInContainerX = containerRef.current.offsetWidth / 2;
    const locationInContainerY = containerRef.current.offsetHeight / 3;
    const newNotePositionX = `calc(${locationInContainerX}px - 50%)`;
    const newNotePositionY = `calc(${locationInContainerY}px - 50%)`;
    const translateValue = `translate(${newNotePositionX}, ${newNotePositionY})`;

    const newNotePositionValue = { styles: { transform: translateValue } };
    dispatch(createNote(newNotePositionValue));
  };

  return createNoteHandler;
}

function NotesFallback() {
  const [noteBoardColor] = useContext(NoteBoardColorContext);
  const createNoteHandler = useCreateNoteHandler();

  return (
    <button
      style={{ color: noteBoardColor }}
      className={styles.button}
      onClick={createNoteHandler}
    >
      <span className={styles.icon}>
        <PlusIcon style={{ fill: noteBoardColor }} />
      </span>
      <span className={styles["button-text"]}>ADD NOTES</span>
    </button>
  );
}

export default NotesFallback;
