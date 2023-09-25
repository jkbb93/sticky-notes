import { useState, useCallback } from "react";

function useSaveStyles(noteId) {
  const [saveRequired, setSaveRequired] = useState(false);

  const markSaveRequired = useCallback(() => setSaveRequired(true), []);

  const saveStyles = () => {
    if (!saveRequired) return;
  };

  return { markSaveRequired, saveStyles };
}

export default useSaveStyles;
