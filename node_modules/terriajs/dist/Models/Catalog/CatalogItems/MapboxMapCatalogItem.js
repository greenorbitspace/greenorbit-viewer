var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, makeObservable } from "mobx";
import MapboxImageryProvider from "terriajs-cesium/Source/Scene/MapboxImageryProvider";
import CatalogMemberMixin from "../../../ModelMixins/CatalogMemberMixin";
import MappableMixin from "../../../ModelMixins/MappableMixin";
import MapboxMapCatalogItemTraits from "../../../Traits/TraitsClasses/MapboxMapCatalogItemTraits";
import CreateModel from "../../Definition/CreateModel";
import proxyCatalogItemUrl from "../proxyCatalogItemUrl";
/**
 *  A raster catalog item representing a layer from the Mapbox server.
 */
class MapboxMapCatalogItem extends CatalogMemberMixin(MappableMixin(CreateModel(MapboxMapCatalogItemTraits))) {
    constructor(...args) {
        super(...args);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: MapboxMapCatalogItem.type
        });
        makeObservable(this);
    }
    get imageryProvider() {
        var _a;
        const mapId = this.mapId;
        const accessToken = this.accessToken;
        if (mapId === undefined || accessToken === undefined) {
            return;
        }
        const url = this.url === undefined ? undefined : proxyCatalogItemUrl(this, this.url);
        const imageryProvider = new MapboxImageryProvider({
            url,
            mapId,
            accessToken,
            credit: this.attribution,
            maximumLevel: (_a = this.maximumLevel) !== null && _a !== void 0 ? _a : 25,
            minimumLevel: this.minimumLevel,
            format: this.format
        });
        return imageryProvider;
    }
    forceLoadMapItems() {
        return Promise.resolve();
    }
    get mapItems() {
        const imageryProvider = this.imageryProvider;
        if (imageryProvider === undefined) {
            return [];
        }
        const imageryPart = {
            imageryProvider,
            show: this.show,
            alpha: this.opacity,
            clippingRectangle: this.clipToRectangle ? this.cesiumRectangle : undefined
        };
        return [imageryPart];
    }
}
Object.defineProperty(MapboxMapCatalogItem, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "mapbox-map"
});
export default MapboxMapCatalogItem;
__decorate([
    computed
], MapboxMapCatalogItem.prototype, "imageryProvider", null);
__decorate([
    computed
], MapboxMapCatalogItem.prototype, "mapItems", null);
//# sourceMappingURL=MapboxMapCatalogItem.js.map