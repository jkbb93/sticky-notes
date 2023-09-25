import { useReducer, useMemo } from "react";

const actionTypes = {
  grab: "GRAB",
  release: "RELEASE",
  move: "MOVE"
};

function reducer(state, action) {
  let newStyles;

  switch (action.type) {
    case actionTypes.grab:
      /*
      Prevent text selection when attempting to drag.
      Otherwise dragging the element can sometimes select any text within it
      */
      newStyles = {
        // userSelect: "none"
        // pointerEvents: "none"
      };
      break;
    case actionTypes.release:
      /* 
      Re-enable text selection once element is released
      */
      newStyles = {
        // userSelect: "auto"
        // pointerEvents: "auto"
      };
      break;
    case actionTypes.move:
      const { x, y } = action.payload;
      // Clear any position values so that position is only determined by transform: translate
      newStyles = {
        left: "0",
        top: "0",
        right: "auto",
        bottom: "auto",
        transform: `translate(${x}px, ${y}px)`
      };
      break;
    default:
      newStyles = state;
  }

  // Return previous styles plus new/overwritten ones
  return {
    ...state,
    ...newStyles
  };
}

/* 
Draggable elements are moved via transform: translate
We have to give them absolute position so that they don't displace one another in the container
*/
const elementStylesInitState = {
  position: "absolute"
};

function useDraggableStyles() {
  const [elementStyles, dispatch] = useReducer(reducer, elementStylesInitState);

  // Memoized object so that we can use it in useEffect as an interface for calling the different dispatches
  const updateElementStyles = useMemo(() => {
    return {
      applyGrabStyles: () =>
        dispatch({
          type: actionTypes.grab
        }),
      applyReleaseStyles: () =>
        dispatch({
          type: actionTypes.release
        }),
      applyMoveStyles: (payload) =>
        dispatch({
          type: actionTypes.move,
          payload
        })
    };
  }, []);

  return [elementStyles, updateElementStyles];
}

export default useDraggableStyles;
