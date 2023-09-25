import { useRef } from "react";
import useDraggable from "../hook";

function Draggable({ children }) {
  const draggableRef = useRef(null);
  const [grabHandler, draggableStyles] = useDraggable(draggableRef);

  return (
    <div
      ref={draggableRef}
      onPointerDown={grabHandler}
      style={{ ...draggableStyles }}
    >
      {children}
    </div>
  );
}

export default Draggable;
