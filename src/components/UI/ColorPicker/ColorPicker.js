import styles from "./ColorPicker.module.css";

function ColorPicker({ id, value, onChange: changeHandler }) {
  return (
    <div style={{ backgroundColor: value }} className={styles["color-picker"]}>
      <input id={id} type="color" value={value} onChange={changeHandler} />
    </div>
  );
}

export default ColorPicker;
