import ColorMap from "./ColorMap";
import isDefined from "../../Core/isDefined";
export default class ConstantColorMap extends ColorMap {
    constructor(options) {
        super();
        Object.defineProperty(this, "color", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "nullColor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.color = options.color;
        this.title = options.title;
        this.nullColor = options.nullColor;
    }
    mapValueToColor(value) {
        if (this.nullColor && (value === null || !isDefined(value)))
            return this.nullColor;
        return this.color;
    }
}
//# sourceMappingURL=ConstantColorMap.js.map