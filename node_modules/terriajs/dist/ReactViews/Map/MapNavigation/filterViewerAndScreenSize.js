import isDefined from "../../../Core/isDefined";
export function filterViewerAndScreenSize(item, viewState) {
    var _a;
    const currentViewer = viewState.terria.mainViewer.viewerMode;
    const screenSize = (_a = item.screenSize) !== null && _a !== void 0 ? _a : "any";
    if (viewState.useSmallScreenInterface) {
        return ((!isDefined(item.controller.viewerMode) ||
            item.controller.viewerMode === currentViewer) &&
            (screenSize === "any" || item.screenSize === "small"));
    }
    else {
        return ((!isDefined(item.controller.viewerMode) ||
            item.controller.viewerMode === currentViewer) &&
            (screenSize === "any" || item.screenSize === "medium"));
    }
}
//# sourceMappingURL=filterViewerAndScreenSize.js.map