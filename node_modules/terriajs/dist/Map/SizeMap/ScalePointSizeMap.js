import PointSizeMap from "./PointSizeMap";
export default class ScalePointSizeMap extends PointSizeMap {
    constructor(minimum, maximum, nullSize, sizeFactor, sizeOffset) {
        super();
        Object.defineProperty(this, "minimum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: minimum
        });
        Object.defineProperty(this, "maximum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: maximum
        });
        Object.defineProperty(this, "nullSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: nullSize
        });
        Object.defineProperty(this, "sizeFactor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: sizeFactor
        });
        Object.defineProperty(this, "sizeOffset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: sizeOffset
        });
    }
    mapValueToPointSize(value) {
        if (value === undefined || value === null) {
            return this.nullSize;
        }
        else if (this.maximum === this.minimum) {
            return this.sizeOffset;
        }
        else {
            const normalizedValue = (value - this.minimum) / (this.maximum - this.minimum);
            return normalizedValue * this.sizeFactor + this.sizeOffset;
        }
    }
}
//# sourceMappingURL=ScalePointSizeMap.js.map