import styles from "./NoteActionButton.module.css";

function NoteActionButton(props) {
  const { fadeWhen: isFaded, onClick: clickHandler, children } = props;

  // Button is lower opacity when not active (but default is active)
  const fadedClassName = isFaded ? styles.faded : "";
  const buttonClassNames = `${styles.button} ${fadedClassName}`;

  return (
    <button type="button" onClick={clickHandler} className={buttonClassNames}>
      {children}
    </button>
  );
}

export default NoteActionButton;
