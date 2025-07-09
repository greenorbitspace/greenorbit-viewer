var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, makeObservable } from "mobx";
import isDefined from "../../Core/isDefined";
import FunctionParameter from "./FunctionParameter";
class LineParameter extends FunctionParameter {
    constructor(...args) {
        super(...args);
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "line"
        });
        makeObservable(this);
    }
    static formatValueForUrl(value) {
        return JSON.stringify({
            type: "FeatureCollection",
            features: [LineParameter.getGeoJsonFeature(value)]
        });
    }
    /**
     * Process value so that it can be used in an URL.
     */
    static getGeoJsonFeature(value) {
        return {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: value
            },
            properties: {}
        };
    }
    get geoJsonFeature() {
        if (isDefined(this.value)) {
            return LineParameter.getGeoJsonFeature(this.value);
        }
    }
}
Object.defineProperty(LineParameter, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "line"
});
export default LineParameter;
__decorate([
    computed
], LineParameter.prototype, "geoJsonFeature", null);
//# sourceMappingURL=LineParameter.js.map