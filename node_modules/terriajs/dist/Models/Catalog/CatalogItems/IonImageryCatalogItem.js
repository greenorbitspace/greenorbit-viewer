var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, makeObservable, observable, runInAction } from "mobx";
import IonImageryProvider from "terriajs-cesium/Source/Scene/IonImageryProvider";
import isDefined from "../../../Core/isDefined";
import CatalogMemberMixin from "../../../ModelMixins/CatalogMemberMixin";
import MappableMixin from "../../../ModelMixins/MappableMixin";
import IonImageryCatalogItemTraits from "../../../Traits/TraitsClasses/IonImageryCatalogItemTraits";
import CreateModel from "../../Definition/CreateModel";
class IonImageryCatalogItem extends MappableMixin(CatalogMemberMixin(CreateModel(IonImageryCatalogItemTraits))) {
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
        return IonImageryCatalogItem.type;
    }
    forceLoadMapItems() {
        if (!isDefined(this.ionAssetId))
            return Promise.resolve();
        const attribution = this.attribution;
        return IonImageryProvider.fromAssetId(this.ionAssetId, {
            accessToken: this.ionAccessToken ||
                this.terria.configParameters.cesiumIonAccessToken,
            server: this.ionServer
        })
            .then((imageryProvider) => {
            if (attribution) {
                imageryProvider._credit = attribution;
            }
            runInAction(() => {
                this._imageryProvider = imageryProvider;
            });
        })
            .catch((e) => {
            this._imageryProvider = undefined;
            throw e;
        });
    }
    get mapItems() {
        if (!isDefined(this._imageryProvider)) {
            return [];
        }
        return [
            {
                show: this.show,
                alpha: this.opacity,
                imageryProvider: this._imageryProvider,
                clippingRectangle: this.clipToRectangle
                    ? this.cesiumRectangle
                    : undefined
            }
        ];
    }
}
Object.defineProperty(IonImageryCatalogItem, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "ion-imagery"
});
export default IonImageryCatalogItem;
__decorate([
    observable
], IonImageryCatalogItem.prototype, "_imageryProvider", void 0);
__decorate([
    computed
], IonImageryCatalogItem.prototype, "mapItems", null);
//# sourceMappingURL=IonImageryCatalogItem.js.map