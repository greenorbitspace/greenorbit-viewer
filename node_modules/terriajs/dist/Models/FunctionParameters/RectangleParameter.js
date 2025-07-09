import defaultValue from "terriajs-cesium/Source/Core/defaultValue";
import FunctionParameter from "./FunctionParameter";
import Reproject from "../../Map/Vector/Reproject";
class RectangleParameter extends FunctionParameter {
    constructor(catalogFunction, options) {
        super(catalogFunction, options);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "rectangle"
        });
        Object.defineProperty(this, "crs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.crs = defaultValue(options.crs, Reproject.TERRIA_CRS);
    }
}
Object.defineProperty(RectangleParameter, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "rectangle"
});
export default RectangleParameter;
//# sourceMappingURL=RectangleParameter.js.map