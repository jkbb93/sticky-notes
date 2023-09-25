import { useState, useEffect, useContext } from "react";
import { DraggableContainerContext } from "../DraggableContainer";
import useDraggableStyles from "./useDraggableStyles";
import usePreventTouchscreenScroll from "./usePreventTouchscreenScroll";
import { throwContainerRefError, getNewTranslateValue } from "./utils";

function useDraggable(elementRef) {
  const containerRef = useContext(DraggableContainerContext);
  const [isDragging, setIsDragging] = useState(false);
  const [elementStyles, updateElementStyles] = useDraggableStyles();
  usePreventTouchscreenScroll();

  const grabHandler = (event) => {
    setIsDragging(true);
    updateElementStyles.applyGrabStyles();
  };

  useEffect(() => {
    if (!containerRef) throwContainerRefError();
    if (!isDragging) return;

    let grabPoint = { x: null, y: null };

    const moveHandler = (event) => {
      const elementNode = elementRef.current;
      const containerNode = containerRef.current;

      const translateValue = getNewTranslateValue(
        elementNode,
        containerNode,
        event,
        grabPoint
      );
      if (!translateValue) return;

      updateElementStyles.applyMoveStyles(translateValue);
    };

    const releaseHandler = () => {
      setIsDragging(false);
      updateElementStyles.applyReleaseStyles();
    };

    window.addEventListener("pointermove", moveHandler);
    window.addEventListener("pointerup", releaseHandler);
    return () => {
      window.removeEventListener("pointermove", moveHandler);
      window.removeEventListener("pointerup", releaseHandler);
    };
  }, [isDragging, elementRef, containerRef, updateElementStyles]);
  /*
  elementRef and containerRef, as refs, don't need to be in the dep array
  they are included because Linter gives warning otherwise
  */

  return [grabHandler, elementStyles, isDragging];
}

export default useDraggable;
