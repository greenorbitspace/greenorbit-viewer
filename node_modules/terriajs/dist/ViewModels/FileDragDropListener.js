import CesiumEvent from "terriajs-cesium/Source/Core/Event";
/**
 * Shared instance for managing drag-n-drop file events
 */
const dragDropEvent = new CesiumEvent();
/**
 * Add a new listener for file drag-n-drop events
 *
 * @returns A destroyer function to remove the listener
 */
export function addFileDragDropListener(callback) {
    const destroyer = dragDropEvent.addEventListener(callback);
    return destroyer;
}
/**
 * @private
 * Raises a file drag-n-drop event
 */
export function raiseFileDragDropEvent(parameters) {
    dragDropEvent.raiseEvent(parameters);
}
//# sourceMappingURL=FileDragDropListener.js.map