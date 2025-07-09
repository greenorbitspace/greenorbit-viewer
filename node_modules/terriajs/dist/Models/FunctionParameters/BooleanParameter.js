var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, makeObservable } from "mobx";
import FunctionParameter from "./FunctionParameter";
class BooleanParameter extends FunctionParameter {
    /**
     * Gets a value indicating whether this parameter has names for its "true" and "false" states.
     */
    get hasNamedStates() {
        return (typeof this.trueName === "string" && typeof this.falseName === "string");
    }
    constructor(catalogFunction, options) {
        super(catalogFunction, options);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "boolean"
        });
        Object.defineProperty(this, "trueName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "trueDescription", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "falseName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "falseDescription", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        makeObservable(this);
        this.trueName = options.trueName;
        this.trueDescription = options.trueDescription;
        this.falseName = options.falseName;
        this.falseDescription = options.falseDescription;
    }
}
Object.defineProperty(BooleanParameter, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "boolean"
});
export default BooleanParameter;
__decorate([
    computed
], BooleanParameter.prototype, "hasNamedStates", null);
//# sourceMappingURL=BooleanParameter.js.map