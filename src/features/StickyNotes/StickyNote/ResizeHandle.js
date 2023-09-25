import { useState, useEffect } from "react";
import ResizeHandleIcon from "../../../components/UI/Icons/ResizeHandleIcon";
import styles from "./ResizeHandle.module.css";

function ResizeHandle({ onResize: resizeHandler }) {
  const [isResizing, setIsResizing] = useState(false);

  const pointerDownHandler = () => setIsResizing(true);

  useEffect(() => {
    const pointerMoveHandler = (event) => {};

    const pointerUpHandler = () => setIsResizing(false);

    window.addEventListener("pointermove", pointerMoveHandler);
    window.removeEventListener("pointerup", pointerUpHandler);
    return () => {
      window.removeEventListener("pointermove", pointerMoveHandler);
      window.removeEventListener("pointerup", pointerUpHandler);
    };
  }, [isResizing]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      <div
        className={styles["resize-handle"]}
        onPointerDown={pointerDownHandler}
      >
        <ResizeHandleIcon />
      </div>
    </div>
  );
}

export default ResizeHandle;
