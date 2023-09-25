import { useContext } from "react";
import { NoteBoardColorContext } from "../../../features/StickyNotes/NoteBoard";
import styles from "./Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [backgroundColor] = useContext(NoteBoardColorContext);

  return (
    <footer className={styles.footer}>
      <span style={{ color: backgroundColor }}>© Jake Betts {currentYear}</span>
    </footer>
  );
}

export default Footer;
