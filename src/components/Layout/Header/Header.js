import HeaderControls from "./HeaderControls";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Sticky Notes</h1>
      <HeaderControls />
    </header>
  );
}

export default Header;
