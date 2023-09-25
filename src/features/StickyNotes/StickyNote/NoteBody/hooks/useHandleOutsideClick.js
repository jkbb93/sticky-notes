import { useEffect } from "react";

function useHandleOutsideClick(elementRef, options) {
  const { onlyWhen: shouldRun, callback } = options;

  useEffect(() => {
    if (!shouldRun) return;

    const handleOutsideClick = (event) => {
      const clickWasWithinElement = elementRef.current.contains(event.target);
      if (clickWasWithinElement) return;

      callback();
    };

    window.addEventListener("pointerdown", handleOutsideClick);
    return () => window.removeEventListener("pointerdown", handleOutsideClick);
  }, [elementRef, shouldRun, callback]);
}

export default useHandleOutsideClick;
