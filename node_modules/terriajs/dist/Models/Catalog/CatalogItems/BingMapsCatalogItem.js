var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, observable, makeObservable, runInAction } from "mobx";
import Credit from "terriajs-cesium/Source/Core/Credit";
import BingMapsImageryProvider from "terriajs-cesium/Source/Scene/BingMapsImageryProvider";
import CatalogMemberMixin from "../../../ModelMixins/CatalogMemberMixin";
import MappableMixin from "../../../ModelMixins/MappableMixin";
import BingMapsCatalogItemTraits from "../../../Traits/TraitsClasses/BingMapsCatalogItemTraits";
import CreateModel from "../../Definition/CreateModel";
class BingMapsCatalogItem extends MappableMixin(CatalogMemberMixin(CreateModel(BingMapsCatalogItemTraits))) {
    constructor(...args) {
        super(...args);
        Object.defineProperty(this, "_imageryProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        makeObservable(this);
    }
    get type() {
        return BingMapsCatalogItem.type;
    }
    async forceLoadMapItems() {
        const provider = await BingMapsImageryProvider.fromUrl("//dev.virtualearth.net", {
            mapStyle: this.mapStyle,
            key: this.key,
            culture: this.culture
        });
        runInAction(() => {
            this._imageryProvider = provider;
        });
    }
    get mapItems() {
        const imageryProvider = this._createImageryProvider();
        if (imageryProvider === undefined)
            return [];
        return [
            {
                imageryProvider,
                show: this.show,
                alpha: this.opacity,
                clippingRectangle: this.clipToRectangle
                    ? this.cesiumRectangle
                    : undefined
            }
        ];
    }
    _createImageryProvider() {
        const result = this._imageryProvider;
        if (result === undefined)
            return result;
        if (this.attribution) {
            result._credit = this.attribution;
        }
        else {
            // open in a new window
            result._credit = new Credit('<a href="http://www.bing.com" target="_blank">Bing</a>');
        }
        return result;
    }
}
Object.defineProperty(BingMapsCatalogItem, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "bing-maps"
});
export default BingMapsCatalogItem;
__decorate([
    observable
], BingMapsCatalogItem.prototype, "_imageryProvider", void 0);
__decorate([
    computed
], BingMapsCatalogItem.prototype, "mapItems", null);
//# sourceMappingURL=BingMapsCatalogItem.js.map