import { useDispatch } from "react-redux";
import { deleteNote } from "../../notesSlice";
import NoteActionButton from "./NoteActionButton";
import CreateNoteButton from "./CreateNoteButton";
import EditIcon from "../../../../components/UI/Icons/EditIcon";
import SaveIcon from "../../../../components/UI/Icons/SaveIcon";
import DeleteIcon from "../../../../components/UI/Icons/DeleteIcon";
import styles from "./NoteHeader.module.css";

function StickyNoteHeader(props) {
  const dispatch = useDispatch();
  const {
    noteId,
    noteIsSelected,
    editIsInProgress,
    onToggleSelected: toggleIsSelected,
    onToggleEdit: toggleIsEditing
  } = props;

  const createNoteButton = (
    <CreateNoteButton
      noteIsSelected={noteIsSelected}
      isEditing={editIsInProgress}
      onToggleSelected={toggleIsSelected}
      onToggleEdit={toggleIsEditing}
    />
  );

  const deleteNoteHandler = () => {
    dispatch(deleteNote(noteId));
  };

  const actionButtonList = [
    {
      key: "edit",
      show: !editIsInProgress,
      clickHandler: toggleIsEditing,
      icon: <EditIcon />
    },
    {
      key: "save",
      show: editIsInProgress,
      clickHandler: toggleIsEditing,
      icon: <SaveIcon />
    },
    {
      key: "delete",
      show: true,
      clickHandler: deleteNoteHandler,
      icon: <DeleteIcon />
    }
  ];

  const actionButtonsToDisplay = actionButtonList.filter(
    (button) => button.show
  );

  const actionButtons = actionButtonsToDisplay.map((button) => (
    <NoteActionButton
      key={button.key}
      fadeWhen={!noteIsSelected}
      onClick={button.clickHandler}
    >
      {button.icon}
    </NoteActionButton>
  ));

  return (
    <header className={styles.header}>
      <div className={styles["new-note-button-wrapper"]}>
        {createNoteButton}
      </div>
      <div className={styles["action-buttons-group"]}>{actionButtons}</div>
    </header>
  );
}

export default StickyNoteHeader;
