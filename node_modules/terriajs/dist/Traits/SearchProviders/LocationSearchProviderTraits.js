var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import primitiveTrait from "../Decorators/primitiveTrait";
import mixTraits from "../mixTraits";
import ModelTraits from "../ModelTraits";
import SearchProviderTraits from "./SearchProviderTraits";
export default class LocationSearchProviderTraits extends mixTraits(SearchProviderTraits) {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "recommendedListLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 5
        });
        Object.defineProperty(this, "flightDurationSeconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1.5
        });
        Object.defineProperty(this, "isOpen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
}
__decorate([
    primitiveTrait({
        type: "string",
        name: "URL",
        description: "The URL of search provider."
    })
], LocationSearchProviderTraits.prototype, "url", void 0);
__decorate([
    primitiveTrait({
        type: "number",
        name: "recommendedListLength",
        description: "Maximum amount of entries in the suggestion list."
    })
], LocationSearchProviderTraits.prototype, "recommendedListLength", void 0);
__decorate([
    primitiveTrait({
        type: "number",
        name: "URL",
        description: "Time to move to the result location.",
        isNullable: true
    })
], LocationSearchProviderTraits.prototype, "flightDurationSeconds", void 0);
__decorate([
    primitiveTrait({
        type: "boolean",
        name: "Is open",
        description: "True if the search results of this search provider are visible; otherwise, false.",
        isNullable: true
    })
], LocationSearchProviderTraits.prototype, "isOpen", void 0);
export class SearchProviderMapCenterTraits extends ModelTraits {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "mapCenter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
}
__decorate([
    primitiveTrait({
        type: "boolean",
        name: "Map center",
        description: "Whether the current location of the map center is supplied with search request"
    })
], SearchProviderMapCenterTraits.prototype, "mapCenter", void 0);
//# sourceMappingURL=LocationSearchProviderTraits.js.map