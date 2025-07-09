var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { traitClass } from "../Trait";
import mixTraits from "../mixTraits";
import CatalogMemberTraits from "./CatalogMemberTraits";
import GroupTraits from "./GroupTraits";
import LegendOwnerTraits from "./LegendOwnerTraits";
import UrlTraits from "./UrlTraits";
let ArcGisCatalogGroupTraits = class ArcGisCatalogGroupTraits extends mixTraits(GroupTraits, UrlTraits, CatalogMemberTraits, LegendOwnerTraits) {
};
ArcGisCatalogGroupTraits = __decorate([
    traitClass({
        description: `Creates a group that has individual ESRI services ("MapServer" or "FeatureServer") in the given URL as members (subgroups) in the catalog.`,
        example: {
            type: "esri-group",
            name: "Sydney",
            url: "https://services1.arcgis.com/cNVyNtjGVZybOQWZ/arcgis/rest/services",
            id: "some id"
        }
    })
], ArcGisCatalogGroupTraits);
export default ArcGisCatalogGroupTraits;
//# sourceMappingURL=ArcGisCatalogGroupTraits.js.map