import CesiumEvent from "terriajs-cesium/Source/Core/Event";
export default class LeafletScene {
    constructor(map) {
        Object.defineProperty(this, "map", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "featureClicked", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new CesiumEvent()
        });
        Object.defineProperty(this, "featureMousedown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new CesiumEvent()
        });
        this.map = map;
    }
}
//# sourceMappingURL=LeafletScene.js.map