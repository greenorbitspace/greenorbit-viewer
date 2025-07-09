var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, observable, makeObservable } from "mobx";
import FunctionParameter from "./FunctionParameter";
import LineParameter from "./LineParameter";
import PointParameter from "./PointParameter";
import PolygonParameter from "./PolygonParameter";
import SelectAPolygonParameter from "./SelectAPolygonParameter";
export function isGeoJsonFunctionParameter(fp) {
    return [
        PointParameter.type,
        LineParameter.type,
        PolygonParameter.type,
        GeoJsonParameter.type
    ].includes(fp.type);
}
class GeoJsonParameter extends FunctionParameter {
    constructor(catalogFunction, options) {
        super(catalogFunction, options);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "geojson"
        });
        Object.defineProperty(this, "subtype", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "regionParameter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        makeObservable(this);
        this.regionParameter = options.regionParameter;
    }
    /**
     * Return representation of value as URL argument.
     */
    getProcessedValue(value) {
        if (this.subtype === GeoJsonParameter.PointType) {
            return {
                inputType: "ComplexData",
                inputValue: PointParameter.formatValueForUrl(value)
            };
        }
        if (this.subtype === GeoJsonParameter.PolygonType) {
            return {
                inputType: "ComplexData",
                inputValue: PolygonParameter.formatValueForUrl(value)
            };
        }
        if (this.subtype === GeoJsonParameter.SelectAPolygonType) {
            return {
                inputType: "ComplexData",
                inputValue: SelectAPolygonParameter.formatValueForUrl(value)
            };
        }
    }
    get geoJsonFeature() {
        if (this.subtype === GeoJsonParameter.PointType) {
            return PointParameter.getGeoJsonFeature(this.value);
        }
        if (this.subtype === GeoJsonParameter.PolygonType) {
            return PolygonParameter.getGeoJsonFeature(this.value);
        }
        if (this.subtype === GeoJsonParameter.SelectAPolygonType) {
            return SelectAPolygonParameter.getGeoJsonFeature(this.value);
        }
        return;
        // TODO rest
    }
}
Object.defineProperty(GeoJsonParameter, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "geojson"
});
Object.defineProperty(GeoJsonParameter, "PointType", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "point"
});
Object.defineProperty(GeoJsonParameter, "PolygonType", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "polygon"
});
Object.defineProperty(GeoJsonParameter, "RegionType", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "region"
});
Object.defineProperty(GeoJsonParameter, "SelectAPolygonType", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "selectAPolygon"
});
export default GeoJsonParameter;
__decorate([
    observable
], GeoJsonParameter.prototype, "subtype", void 0);
__decorate([
    computed
], GeoJsonParameter.prototype, "geoJsonFeature", null);
//# sourceMappingURL=GeoJsonParameter.js.map