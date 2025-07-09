var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import primitiveTrait from "../Decorators/primitiveTrait";
import mixTraits from "../mixTraits";
import LocationSearchProviderTraits, { SearchProviderMapCenterTraits } from "./LocationSearchProviderTraits";
export default class BingMapsSearchProviderTraits extends mixTraits(LocationSearchProviderTraits, SearchProviderMapCenterTraits) {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "https://dev.virtualearth.net/"
        });
        Object.defineProperty(this, "key", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "primaryCountry", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Australia"
        });
        Object.defineProperty(this, "culture", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "en-au"
        });
        Object.defineProperty(this, "maxResults", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 5
        });
    }
}
__decorate([
    primitiveTrait({
        type: "string",
        name: "Key",
        description: "The Bing Maps key."
    })
], BingMapsSearchProviderTraits.prototype, "key", void 0);
__decorate([
    primitiveTrait({
        type: "string",
        name: "Primary country",
        description: "Name of the country to prioritize the search results."
    })
], BingMapsSearchProviderTraits.prototype, "primaryCountry", void 0);
__decorate([
    primitiveTrait({
        type: "string",
        name: "Culture",
        description: `Use the culture parameter to specify a culture for your request.
    The culture parameter provides the result in the language of the culture.
    For a list of supported cultures, see [Supported Culture Codes](https://docs.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/supported-culture-codes)`
    })
], BingMapsSearchProviderTraits.prototype, "culture", void 0);
__decorate([
    primitiveTrait({
        type: "number",
        name: "Max results",
        description: "The maximum number of results to return."
    })
], BingMapsSearchProviderTraits.prototype, "maxResults", void 0);
//# sourceMappingURL=BingMapsSearchProviderTraits.js.map