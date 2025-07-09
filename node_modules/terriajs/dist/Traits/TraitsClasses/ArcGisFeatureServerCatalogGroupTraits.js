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
let ArcGisFeatureServerCatalogGroupTraits = class ArcGisFeatureServerCatalogGroupTraits extends mixTraits(GroupTraits, UrlTraits, CatalogMemberTraits, LegendOwnerTraits) {
};
ArcGisFeatureServerCatalogGroupTraits = __decorate([
    traitClass({
        description: `Creates a group that has individual ESRI WFS layers in the given URL as members.

  <strong>Note:</strong> <i>To exclude unwanted layers, specify their <b>names</b> in property <code>excludeMembers</code>.</i>`,
        example: {
            url: "https://services7.arcgis.com/fVJQ0uhT9L4zp35f/arcgis/rest/services/ActivityArea_gdb/FeatureServer",
            type: "esri-featureServer-group",
            excludeMembers: ["BCC SHWEP"],
            name: "Activity Area",
            id: "some id"
        }
    })
], ArcGisFeatureServerCatalogGroupTraits);
export default ArcGisFeatureServerCatalogGroupTraits;
//# sourceMappingURL=ArcGisFeatureServerCatalogGroupTraits.js.map