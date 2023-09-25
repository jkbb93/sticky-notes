import { useState, useEffect } from "react";
import usePreventTouchscreenScroll from "../useDraggable/hook/usePreventTouchscreenScroll";
import getNewWidthAndHeightValues from "./utils";

function useResizable(elementRef) {
  const [isResizing, setIsResizing] = useState(false);
  const [elementStyles, setElementStyles] = useState(null);
  usePreventTouchscreenScroll();

  const pointerDownHandler = () => setIsResizing(true);

  useEffect(() => {
    if (!isResizing) return;

    // Disable text selection on document while resizing
    document.documentElement.style.userSelect = "none";

    let grabPoint = { fromRight: null, fromBottom: null };

    const pointerMoveHandler = (event) => {
      const elementNode = elementRef.current;

      const { width, height } = getNewWidthAndHeightValues(
        elementNode,
        event,
        grabPoint
      );

      setElementStyles({
        width: width + "px",
        height: height + "px"
      });
    };

    const pointerUpHandler = () => {
      setIsResizing(false);
    };

    window.addEventListener("pointermove", pointerMoveHandler);
    window.addEventListener("pointerup", pointerUpHandler);
    return () => {
      // Re-enable text selection
      document.documentElement.style.userSelect = "auto";

      window.removeEventListener("pointermove", pointerMoveHandler);
      window.removeEventListener("pointerup", pointerUpHandler);
    };
  }, [elementRef, isResizing]);

  return [pointerDownHandler, elementStyles, isResizing];
}

export default useResizable;
