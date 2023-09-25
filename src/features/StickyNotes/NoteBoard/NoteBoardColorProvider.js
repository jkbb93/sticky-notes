import { useState, useCallback } from "react";
import NoteBoardColorContext from "./NoteBoardColorContext";

function NoteBoardColorProvider({ children }) {
  const [color, setColor] = useState("#FA8072");

  const updateColor = useCallback((newColor) => {
    setColor(newColor);
  }, []);

  const contextValue = [color, updateColor];

  return (
    <NoteBoardColorContext.Provider value={contextValue}>
      {children}
    </NoteBoardColorContext.Provider>
  );
}

export default NoteBoardColorProvider;
