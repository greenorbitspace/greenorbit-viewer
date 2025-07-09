var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, makeObservable } from "mobx";
import isDefined from "../../Core/isDefined";
import FunctionParameter from "./FunctionParameter";
class PolygonParameter extends FunctionParameter {
    constructor(...args) {
        super(...args);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "polygon"
        });
        makeObservable(this);
    }
    static formatValueForUrl(value) {
        return JSON.stringify({
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: value
                    }
                }
            ]
        });
    }
    static getGeoJsonFeature(value) {
        return {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: value
            },
            properties: {}
        };
    }
    get geoJsonFeature() {
        if (isDefined(this.value)) {
            return PolygonParameter.getGeoJsonFeature(this.value);
        }
    }
}
Object.defineProperty(PolygonParameter, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "polygon"
});
export default PolygonParameter;
__decorate([
    computed
], PolygonParameter.prototype, "geoJsonFeature", null);
//# sourceMappingURL=PolygonParameter.js.map