import FunctionParameter from "./FunctionParameter";
class RegionParameter extends FunctionParameter {
    constructor(catalogFunction, options) {
        super(catalogFunction, options);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "region"
        });
        Object.defineProperty(this, "regionProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.regionProvider = options.regionProvider;
    }
}
Object.defineProperty(RegionParameter, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "region"
});
export default RegionParameter;
//# sourceMappingURL=RegionParameter.js.map