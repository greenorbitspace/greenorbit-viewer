var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, makeObservable, observable } from "mobx";
import ArcGISTiledElevationTerrainProvider from "terriajs-cesium/Source/Core/ArcGISTiledElevationTerrainProvider";
import Credit from "terriajs-cesium/Source/Core/Credit";
import MappableMixin from "../../../ModelMixins/MappableMixin";
import CatalogMemberMixin from "../../../ModelMixins/CatalogMemberMixin";
import UrlMixin from "../../../ModelMixins/UrlMixin";
import ArcGisTerrainCatalogItemTraits from "../../../Traits/TraitsClasses/ArcGisTerrainCatalogItemTraits";
import CreateModel from "../../Definition/CreateModel";
class ArcGisTerrainCatalogItem extends UrlMixin(MappableMixin(CatalogMemberMixin(CreateModel(ArcGisTerrainCatalogItemTraits)))) {
    constructor(...args) {
        super(...args);
        Object.defineProperty(this, "_private_terrainProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        makeObservable(this);
    }
    get type() {
        return ArcGisTerrainCatalogItem.type;
    }
    get mapItems() {
        const provider = this._private_terrainProvider;
        if (provider) {
            // ArcGISTiledElevationTerrainProvider has no official way to override the
            // credit, so we write directly to the private field here.
            if (this.attribution)
                provider._credit = new Credit(this.attribution);
            return [provider];
        }
        else {
            return [];
        }
    }
    forceLoadMapItems() {
        if (this.url === undefined)
            return Promise.resolve();
        return ArcGISTiledElevationTerrainProvider.fromUrl(this.url).then((terrainProvider) => {
            this._private_terrainProvider = terrainProvider;
        });
    }
}
Object.defineProperty(ArcGisTerrainCatalogItem, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "arcgis-terrain"
});
export default ArcGisTerrainCatalogItem;
__decorate([
    observable
], ArcGisTerrainCatalogItem.prototype, "_private_terrainProvider", void 0);
__decorate([
    computed
], ArcGisTerrainCatalogItem.prototype, "mapItems", null);
//# sourceMappingURL=ArcGisTerrainCatalogItem.js.map