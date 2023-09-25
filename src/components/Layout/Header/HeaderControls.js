import BackgroundColorPicker from "./BackgroundColorPicker";
import QuestionMarkIcon from "../../UI/Icons/QuestionMarkIcon";
import styles from "./HeaderControls.module.css";

function HeaderActions() {
  return (
    <div className={styles["header-controls"]}>
      <BackgroundColorPicker />
      <button className={styles["help-button"]}>
        <QuestionMarkIcon />
      </button>
    </div>
  );
}

export default HeaderActions;
