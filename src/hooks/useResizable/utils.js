function getNewWidthAndHeightValues(elementNode, event, grabPoint) {
  const {
    x: elementClientX,
    y: elementClientY,
    width: elementWidth,
    height: elementHeight
  } = elementNode.getBoundingClientRect();

  const { clientX: cursorClientX, clientY: cursorClientY } = event;

  // Window scroll amount
  const { pageXOffset: scrollAmountX, pageYOffset: scrollAmountY } = window;

  // Position of element & cursor relative to edge of document
  const elementPageX = elementClientX + scrollAmountX;
  const elementPageY = elementClientY + scrollAmountY;
  const cursorPageX = cursorClientX + scrollAmountX;
  const cursorPageY = cursorClientY + scrollAmountY;

  //   // Position of cursor relative to left and top edges of element
  const cursorXFromElementLeft = cursorPageX - elementPageX;
  const cursorYFromElementTop = cursorPageY - elementPageY;

  const isGrabPoint =
    grabPoint.fromRight !== null && grabPoint.fromBottom !== null;
  if (!isGrabPoint) {
    const fromCursorToElementRight = elementWidth - cursorXFromElementLeft;
    const fromCursorToElementBottom = elementHeight - cursorYFromElementTop;
    grabPoint.fromRight = fromCursorToElementRight;
    grabPoint.fromBottom = fromCursorToElementBottom;
  }

  const newElementRightEdge = cursorPageX + grabPoint.fromRight;
  const newElementBottomEdge = cursorPageY + grabPoint.fromBottom;
  const newWidth = newElementRightEdge - elementPageX;
  const newHeight = newElementBottomEdge - elementPageY;

  return {
    width: newWidth,
    height: newHeight
  };
}

export default getNewWidthAndHeightValues;
