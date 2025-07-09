var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import ModelTraits from "../ModelTraits";
import primitiveTrait from "../Decorators/primitiveTrait";
export default class SearchProviderTraits extends ModelTraits {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "unknown"
        });
        Object.defineProperty(this, "minCharacters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
__decorate([
    primitiveTrait({
        type: "string",
        name: "Name",
        description: "Name of the search provider."
    })
], SearchProviderTraits.prototype, "name", void 0);
__decorate([
    primitiveTrait({
        type: "number",
        name: "Minimum characters",
        description: "Minimum number of characters required for search to start",
        isNullable: true
    })
], SearchProviderTraits.prototype, "minCharacters", void 0);
//# sourceMappingURL=SearchProviderTraits.js.map