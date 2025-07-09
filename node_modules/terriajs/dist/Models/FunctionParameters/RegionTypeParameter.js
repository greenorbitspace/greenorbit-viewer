import FunctionParameter from "./FunctionParameter";
class RegionTypeParameter extends FunctionParameter {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "regionType"
        });
    }
}
Object.defineProperty(RegionTypeParameter, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "regionType"
});
export default RegionTypeParameter;
//# sourceMappingURL=RegionTypeParameter.js.map