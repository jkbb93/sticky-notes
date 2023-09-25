function throwContainerRefError() {
  throw new Error(
    "Container attributes not available. Components calling useDraggable must be children of a DraggableContainer."
  );
}

function getNewPositionValues(elementNode, containerNode, event, grabPoint) {
  const {
    x: elementClientX,
    y: elementClientY,
    width: elementWidth,
    height: elementHeight
  } = elementNode.getBoundingClientRect();

  const {
    x: containerClientX,
    y: containerClientY,
    width: containerWidth,
    height: containerHeight
  } = containerNode.getBoundingClientRect();

  // Cursor position relative to viewport
  const { clientX: cursorClientX, clientY: cursorClientY } = event;

  // Window scroll amount
  const { pageXOffset: scrollAmountX, pageYOffset: scrollAmountY } = window;

  // Get positions of element, container & cursor, relative to edge of document
  const elementPageX = elementClientX + scrollAmountX;
  const elementPageY = elementClientY + scrollAmountY;
  const containerPageX = containerClientX + scrollAmountX;
  const containerPageY = containerClientY + scrollAmountY;
  const cursorPageX = cursorClientX + scrollAmountX;
  const cursorPageY = cursorClientY + scrollAmountY;

  // Set grabPoint on first pointermove
  const isGrabPoint = grabPoint.x !== null && grabPoint.y !== null;
  if (!isGrabPoint) {
    // Position of cursor relative to left and top edges of element
    const cursorXFromElementLeft = cursorPageX - elementPageX;
    const cursorYFromElementTop = cursorPageY - elementPageY;
    grabPoint.x = cursorXFromElementLeft;
    grabPoint.y = cursorYFromElementTop;
  }

  const newElementPageX = cursorPageX - grabPoint.x;
  const newElementPageY = cursorPageY - grabPoint.y;
  const newElementContainerX = newElementPageX - containerPageX;
  const newElementContainerY = newElementPageY - containerPageY;

  const maxX = containerWidth - elementWidth;
  const maxY = containerHeight - elementHeight;

  return {
    x: newElementContainerX,
    y: newElementContainerY,
    maxX,
    maxY
  };
}

function validateNewPosition(newPositionValues) {
  const { x, y, maxX, maxY } = newPositionValues;
  if (x < 0) return false;
  if (y < 0) return false;
  if (x > maxX) return false;
  if (y > maxY) return false;
  return true;
}

function getNewTranslateValue(elementNode, containerNode, event, grabPoint) {
  const newPositionValues = getNewPositionValues(
    elementNode,
    containerNode,
    event,
    grabPoint
  );

  const isValidPosition = validateNewPosition(newPositionValues);
  if (!isValidPosition) return;

  const { x, y } = newPositionValues;
  const translateValue = { x, y };

  return translateValue;
}

export { throwContainerRefError, getNewTranslateValue };
