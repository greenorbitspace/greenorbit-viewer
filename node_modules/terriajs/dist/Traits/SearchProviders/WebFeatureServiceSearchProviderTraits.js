var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import primitiveTrait from "../Decorators/primitiveTrait";
import mixTraits from "../mixTraits";
import LocationSearchProviderTraits from "./LocationSearchProviderTraits";
export default class WebFeatureServiceSearchProviderTraits extends mixTraits(LocationSearchProviderTraits) {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "searchPropertyName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "searchPropertyTypeName", {
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
        name: "Search property name",
        description: "Which property to look for the search text in"
    })
], WebFeatureServiceSearchProviderTraits.prototype, "searchPropertyName", void 0);
__decorate([
    primitiveTrait({
        type: "string",
        name: "Search property type name",
        description: "Type of the properties to search"
    })
], WebFeatureServiceSearchProviderTraits.prototype, "searchPropertyTypeName", void 0);
//# sourceMappingURL=WebFeatureServiceSearchProviderTraits.js.map