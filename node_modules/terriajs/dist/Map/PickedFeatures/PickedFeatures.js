var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, makeObservable } from "mobx";
import MappableMixin, { ImageryParts } from "../../ModelMixins/MappableMixin";
export function isProviderCoords(obj) {
    if (obj) {
        return (Number.isFinite(obj.x) &&
            Number.isFinite(obj.y) &&
            Number.isFinite(obj.level));
    }
    else
        return false;
}
export function isProviderCoordsMap(obj) {
    return Object.keys(obj).every((url) => isProviderCoords(obj[url]));
}
/**
 * Holds the vector and raster features that the user picked by clicking the mouse on the map.
 */
export default class PickedFeatures {
    constructor() {
        /**
         * Gets or sets a promise that indicates, when it resolves, that all picked features are available in the
         * {@see PickedFeatures#features} array.
         */
        Object.defineProperty(this, "allFeaturesAvailablePromise", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Gets or sets a value indicating whether the list of picked features is still loading.
         */
        Object.defineProperty(this, "isLoading", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /**
         * Gets or sets the ground position that was picked, if any.
         */
        Object.defineProperty(this, "pickPosition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Gets or sets the array of picked features.  The array is observable and may be updated up until the point that
         * {@see PickedFeatures#allFeaturesAvailablePromise} resolves.
         */
        Object.defineProperty(this, "features", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        /**
         * Gets or sets a message describing an error that occurred while picking features.
         * If this property is undefined, no error occurred.
         * @type {String}
         */
        Object.defineProperty(this, "error", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "providerCoords", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        makeObservable(this);
    }
}
__decorate([
    observable
], PickedFeatures.prototype, "isLoading", void 0);
__decorate([
    observable
], PickedFeatures.prototype, "features", void 0);
__decorate([
    observable
], PickedFeatures.prototype, "error", void 0);
export function featureBelongsToCatalogItem(feature, catalogItem) {
    var _a, _b;
    if (feature._catalogItem === catalogItem)
        return true;
    if (!MappableMixin.isMixedInto(catalogItem))
        return;
    const dataSource = (_a = feature.entityCollection) === null || _a === void 0 ? void 0 : _a.owner;
    const imageryProvider = (_b = feature.imageryLayer) === null || _b === void 0 ? void 0 : _b.imageryProvider;
    // Test whether the catalog item has a matching dataSource or an imageryProvider
    const match = catalogItem.mapItems.some((mapItem) => {
        if (dataSource && mapItem === dataSource) {
            return true;
        }
        if (imageryProvider &&
            ImageryParts.is(mapItem) &&
            mapItem.imageryProvider === imageryProvider) {
            return true;
        }
        return false;
    });
    return match;
}
//# sourceMappingURL=PickedFeatures.js.map