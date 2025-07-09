var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, makeObservable } from "mobx";
import Ellipsoid from "terriajs-cesium/Source/Core/Ellipsoid";
import CesiumMath from "terriajs-cesium/Source/Core/Math";
import Rectangle from "terriajs-cesium/Source/Core/Rectangle";
import CommonStrata from "../../Models/Definition/CommonStrata";
import SearchProviderMixin from "./SearchProviderMixin";
function LocationSearchProviderMixin(Base) {
    class LocationSearchProviderMixin extends SearchProviderMixin(Base) {
        constructor(...args) {
            super(...args);
            makeObservable(this);
        }
        get hasLocationSearchProviderMixin() {
            return true;
        }
        toggleOpen(stratumId = CommonStrata.user) {
            this.setTrait(stratumId, "isOpen", !this.isOpen);
        }
        showWarning() { }
    }
    __decorate([
        action
    ], LocationSearchProviderMixin.prototype, "toggleOpen", null);
    __decorate([
        action
    ], LocationSearchProviderMixin.prototype, "showWarning", null);
    return LocationSearchProviderMixin;
}
export function getMapCenter(terria) {
    const view = terria.currentViewer.getCurrentCameraView();
    if (view.position !== undefined) {
        const cameraPositionCartographic = Ellipsoid.WGS84.cartesianToCartographic(view.position);
        return {
            longitude: CesiumMath.toDegrees(cameraPositionCartographic.longitude),
            latitude: CesiumMath.toDegrees(cameraPositionCartographic.latitude)
        };
    }
    else {
        const center = Rectangle.center(view.rectangle);
        return {
            longitude: CesiumMath.toDegrees(center.longitude),
            latitude: CesiumMath.toDegrees(center.latitude)
        };
    }
}
(function (LocationSearchProviderMixin) {
    function isMixedInto(model) {
        return model && model.hasLocationSearchProviderMixin;
    }
    LocationSearchProviderMixin.isMixedInto = isMixedInto;
})(LocationSearchProviderMixin || (LocationSearchProviderMixin = {}));
export default LocationSearchProviderMixin;
//# sourceMappingURL=LocationSearchProviderMixin.js.map