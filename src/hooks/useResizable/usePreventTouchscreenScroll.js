import { useEffect } from "react";

function usePreventTouchscreenScroll() {
  useEffect(() => {
    const clientHasTouchScreen = navigator.maxTouchPoints > 0;
    if (!clientHasTouchScreen) return;

    // Disable overscroll - can interfere with dragging otherwise
    document.documentElement.style.overscrollBehavior = "none";

    /* 
    Default behaviour of touchmove on touchscreens is to scroll;
    need to prevent this because scroll interferes with dragging
    */
    const preventTouchMoveDefault = (event) => event.preventDefault();

    /*
     Event listener needs the passive option to be able to call 
     preventDefault for touchmove on the window object in some browsers.
     To do with optimisation for scroll behaviour. 
     */
    const passiveFalse = { passive: false };
    window.addEventListener("touchmove", preventTouchMoveDefault, passiveFalse);

    return () => {
      document.documentElement.style.overscrollBehavior = "auto";

      window.removeEventListener(
        "touchmove",
        preventTouchMoveDefault,
        passiveFalse
      );
    };
  }, []);
}

export default usePreventTouchscreenScroll;
