import { useRef, useState, useContext, useLayoutEffect } from "react";
import NoteBoardColorContext from "./NoteBoardColorContext";
import { DraggableContainer } from "../../../hooks/useDraggable";
import Notes from "./Notes";
import styles from "./NoteBoard.module.css";

function getElementPageOffsetY(element) {
  const { y: elementY } = element.getBoundingClientRect();
  return window.scrollY + elementY;
}

function NoteBoard() {
  const boardRef = useRef();
  const [heightStyle, setHeightStyle] = useState(null);
  const [backgroundColor] = useContext(NoteBoardColorContext);

  useLayoutEffect(() => {
    const calculateAndSetBoardHeight = () => {
      const elementPageOffsetY = getElementPageOffsetY(boardRef.current);
      const newHeightStyle = window.innerHeight - elementPageOffsetY + "px";
      setHeightStyle(newHeightStyle);
    };

    calculateAndSetBoardHeight();

    window.addEventListener("resize", calculateAndSetBoardHeight);
    return () =>
      window.removeEventListener("resize", calculateAndSetBoardHeight);
  }, []);

  return (
    // <>
    //   <div
    //     style={{ display: "grid", gridTemplateColumns: "500px 100vw 100px" }}
    //   >
    //     <div></div>
    //     <div style={{ height: "100px" }}></div>
    //     <div></div>
    //     <div></div>
    <main
      ref={boardRef}
      className={styles["note-board"]}
      style={{ backgroundColor, height: heightStyle }}
    >
      <DraggableContainer>
        <Notes />
      </DraggableContainer>
    </main>
    //     <div></div>
    //     <div></div>
    //     <div style={{ height: "100px" }}></div>
    //     <div></div>
    //   </div>
    // </>
  );
}

export default NoteBoard;
