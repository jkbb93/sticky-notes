import { useContext, useId } from "react";
import { NoteBoardColorContext } from "../../../features/StickyNotes/NoteBoard";
import ColorPicker from "../../UI/ColorPicker";
import styles from "./BackgroundColorPicker.module.css";

function BackgroundColorPicker() {
  const [noteBoardColor, updateNoteBoardColor] = useContext(
    NoteBoardColorContext
  );
  const colorPickerId = useId();

  const selectColorHandler = (event) =>
    updateNoteBoardColor(event.target.value);

  return (
    <div className={styles.wrapper}>
      <label htmlFor={colorPickerId}>Background</label>
      <ColorPicker
        id={colorPickerId}
        value={noteBoardColor}
        onChange={selectColorHandler}
      />
    </div>
  );
}

export default BackgroundColorPicker;
