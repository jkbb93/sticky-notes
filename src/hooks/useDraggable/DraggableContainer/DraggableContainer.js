import { useRef } from "react";
import DraggableContainerContext from "./DraggableContainerContext";
import styles from "./DraggableContainer.module.css";

function DraggableContainer(props) {
  const containerRef = useRef(null);
  const contextValue = containerRef;

  return (
    <div ref={containerRef} className={styles.container}>
      <DraggableContainerContext.Provider value={contextValue}>
        {props.children}
      </DraggableContainerContext.Provider>
    </div>
  );
}

export default DraggableContainer;
