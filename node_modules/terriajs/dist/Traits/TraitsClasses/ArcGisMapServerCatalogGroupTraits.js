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
let ArcGisMapServerCatalogGroupTraits = class ArcGisMapServerCatalogGroupTraits extends mixTraits(GroupTraits, UrlTraits, CatalogMemberTraits, LegendOwnerTraits) {
};
ArcGisMapServerCatalogGroupTraits = __decorate([
    traitClass({
        description: `Creates a group that has individual ESRI WMS layers in the given URL as members in the catalog.`,
        example: {
            type: "esri-mapServer-group",
            name: "Catchment Scale Land Use",
            id: "354db2f2",
            url: "https://www.asris.csiro.au/arcgis/rest/services/abares/clum_50m_2018/MapServer"
        }
    })
], ArcGisMapServerCatalogGroupTraits);
export default ArcGisMapServerCatalogGroupTraits;
//# sourceMappingURL=ArcGisMapServerCatalogGroupTraits.js.map