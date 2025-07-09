import FunctionParameter from "./FunctionParameter";
class StringParameter extends FunctionParameter {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "string"
        });
    }
}
Object.defineProperty(StringParameter, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "string"
});
export default StringParameter;
//# sourceMappingURL=StringParameter.js.map