var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import i18next from "i18next";
import { action, computed, makeObservable, override, runInAction } from "mobx";
import URI from "urijs";
import filterOutUndefined from "../../../Core/filterOutUndefined";
import isDefined from "../../../Core/isDefined";
import loadJson from "../../../Core/loadJson";
import replaceUnderscores from "../../../Core/replaceUnderscores";
import runLater from "../../../Core/runLater";
import { networkRequestError } from "../../../Core/TerriaError";
import CatalogMemberMixin from "../../../ModelMixins/CatalogMemberMixin";
import GroupMixin from "../../../ModelMixins/GroupMixin";
import UrlMixin from "../../../ModelMixins/UrlMixin";
import ArcGisMapServerCatalogGroupTraits from "../../../Traits/TraitsClasses/ArcGisMapServerCatalogGroupTraits";
import { InfoSectionTraits } from "../../../Traits/TraitsClasses/CatalogMemberTraits";
import CommonStrata from "../../Definition/CommonStrata";
import CreateModel from "../../Definition/CreateModel";
import createStratumInstance from "../../Definition/createStratumInstance";
import LoadableStratum from "../../Definition/LoadableStratum";
import StratumOrder from "../../Definition/StratumOrder";
import proxyCatalogItemUrl from "../proxyCatalogItemUrl";
import ArcGisMapServerCatalogItem from "./ArcGisMapServerCatalogItem";
/** The ID we add to our "All layers" ArcGisMapServerCatalogItem if MapServer.singleFusedMapCache is true */
const SINGLE_FUSED_MAP_CACHE_ID = "all-layers";
export class MapServerStratum extends LoadableStratum(ArcGisMapServerCatalogGroupTraits) {
    constructor(_catalogGroup, _mapServer) {
        super();
        Object.defineProperty(this, "_catalogGroup", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _catalogGroup
        });
        Object.defineProperty(this, "_mapServer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _mapServer
        });
        makeObservable(this);
    }
    duplicateLoadableStratum(model) {
        return new MapServerStratum(model, this._mapServer);
    }
    /** returns an array of the parent layers id's */
    findParentLayers(layerId) {
        const parentLayerIds = [];
        const layer = this.layers.find((l) => l.id === layerId);
        if (layer !== undefined) {
            parentLayerIds.push(layer.id);
            if (layer.parentLayerId !== -1) {
                parentLayerIds.push(...this.findParentLayers(layer.parentLayerId));
            }
        }
        return parentLayerIds;
    }
    get name() {
        if (this._mapServer.documentInfo &&
            this._mapServer.documentInfo.Title &&
            this._mapServer.documentInfo.Title.length > 0) {
            return replaceUnderscores(this._mapServer.documentInfo.Title);
        }
    }
    get info() {
        return [
            createStratumInstance(InfoSectionTraits, {
                name: i18next.t("models.arcGisMapServerCatalogGroup.serviceDescription"),
                content: this._mapServer.serviceDescription
            }),
            createStratumInstance(InfoSectionTraits, {
                name: i18next.t("models.arcGisMapServerCatalogGroup.dataDescription"),
                content: this._mapServer.description
            }),
            createStratumInstance(InfoSectionTraits, {
                name: i18next.t("models.arcGisMapServerCatalogGroup.copyrightText"),
                content: this._mapServer.copyrightText
            })
        ];
    }
    get dataCustodian() {
        if (this._mapServer.documentInfo &&
            this._mapServer.documentInfo.Author &&
            this._mapServer.documentInfo.Author.length > 0) {
            return this._mapServer.documentInfo.Author;
        }
    }
    static async load(catalogGroup) {
        const uri = new URI(catalogGroup.url).addQuery("f", "json");
        const mapServer = await loadJson(proxyCatalogItemUrl(catalogGroup, uri.toString()));
        // Is this really a MapServer REST response?
        if (!mapServer || (!mapServer.layers && !mapServer.subLayers)) {
            throw networkRequestError({
                title: i18next.t("models.arcGisMapServerCatalogGroup.invalidServiceTitle"),
                message: i18next.t("models.arcGisMapServerCatalogGroup.invalidServiceMessage")
            });
        }
        const stratum = new MapServerStratum(catalogGroup, mapServer);
        return stratum;
    }
    get tilesOnly() {
        var _a;
        return (this._mapServer.singleFusedMapCache &&
            ((_a = this._mapServer.capabilities) === null || _a === void 0 ? void 0 : _a.includes("TilesOnly")));
    }
    get members() {
        if (this.tilesOnly) {
            return [`${this._catalogGroup.uniqueId}/${SINGLE_FUSED_MAP_CACHE_ID}`];
        }
        return filterOutUndefined(this.layers
            .map((layer) => {
            if (!isDefined(layer.id) || layer.parentLayerId !== -1) {
                return undefined;
            }
            return this._catalogGroup.uniqueId + "/" + layer.id;
        })
            .concat(this.subLayers.map((subLayer) => {
            if (!isDefined(subLayer.id)) {
                return undefined;
            }
            return this._catalogGroup.uniqueId + "/" + subLayer.id;
        })));
    }
    get layers() {
        return this._mapServer.layers || [];
    }
    get subLayers() {
        return this._mapServer.subLayers || [];
    }
    createMembersFromLayers() {
        if (this.tilesOnly)
            this.createMemberForSingleFusedMapCache();
        else
            this.layers.forEach((layer) => this.createMemberFromLayer(layer));
    }
    createMemberForSingleFusedMapCache() {
        const id = `${this._catalogGroup.uniqueId}/${SINGLE_FUSED_MAP_CACHE_ID}`;
        let model = this._catalogGroup.terria.getModelById(ArcGisMapServerCatalogItem, id);
        if (model === undefined) {
            model = new ArcGisMapServerCatalogItem(id, this._catalogGroup.terria);
            this._catalogGroup.terria.addModel(model);
        }
        // Replace the stratum inherited from the parent group.
        model.strata.delete(CommonStrata.definition);
        model.setTrait(CommonStrata.definition, "name", i18next
            .t("models.arcGisMapServerCatalogGroup.singleFusedMapCacheLayerName")
            .toString());
        model.setTrait(CommonStrata.definition, "url", this._catalogGroup.url);
    }
    createMemberFromLayer(layer) {
        if (!isDefined(layer.id)) {
            return;
        }
        const id = this._catalogGroup.uniqueId;
        let layerId = id + "/" + layer.id;
        const parentLayers = this.findParentLayers(layer.id);
        if (parentLayers.length > 0) {
            layerId = id + "/" + parentLayers.reverse().join("/");
        }
        let model;
        // Treat layer as a group if it has type "Group Layer" - or has subLayers
        if (layer.type === "Group Layer" ||
            (Array.isArray(layer.subLayerIds) && layer.subLayerIds.length > 0)) {
            const existingModel = this._catalogGroup.terria.getModelById(ArcGisMapServerCatalogGroup, layerId);
            if (existingModel === undefined) {
                model = new ArcGisMapServerCatalogGroup(layerId, this._catalogGroup.terria);
                this._catalogGroup.terria.addModel(model);
            }
            else {
                model = existingModel;
            }
        }
        else {
            const existingModel = this._catalogGroup.terria.getModelById(ArcGisMapServerCatalogItem, layerId);
            if (existingModel === undefined) {
                model = new ArcGisMapServerCatalogItem(layerId, this._catalogGroup.terria);
                this._catalogGroup.terria.addModel(model);
            }
            else {
                model = existingModel;
            }
        }
        // Replace the stratum inherited from the parent group.
        model.strata.delete(CommonStrata.definition);
        model.setTrait(CommonStrata.definition, "name", replaceUnderscores(layer.name));
        const uri = new URI(this._catalogGroup.url).segment(layer.id.toString()); // Convert layer id to string as segment(0) means something different.
        model.setTrait(CommonStrata.definition, "url", uri.toString());
    }
}
Object.defineProperty(MapServerStratum, "stratumName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "mapServer"
});
__decorate([
    computed
], MapServerStratum.prototype, "name", null);
__decorate([
    computed
], MapServerStratum.prototype, "info", null);
__decorate([
    computed
], MapServerStratum.prototype, "dataCustodian", null);
__decorate([
    computed
], MapServerStratum.prototype, "tilesOnly", null);
__decorate([
    computed
], MapServerStratum.prototype, "members", null);
__decorate([
    action
], MapServerStratum.prototype, "createMembersFromLayers", null);
__decorate([
    action
], MapServerStratum.prototype, "createMemberForSingleFusedMapCache", null);
__decorate([
    action
], MapServerStratum.prototype, "createMemberFromLayer", null);
StratumOrder.addLoadStratum(MapServerStratum.stratumName);
class ArcGisMapServerCatalogGroup extends UrlMixin(GroupMixin(CatalogMemberMixin(CreateModel(ArcGisMapServerCatalogGroupTraits)))) {
    constructor(...args) {
        super(...args);
        makeObservable(this);
    }
    get type() {
        return ArcGisMapServerCatalogGroup.type;
    }
    get typeName() {
        return i18next.t("models.arcGisMapServerCatalogGroup.name");
    }
    get cacheDuration() {
        if (isDefined(super.cacheDuration)) {
            return super.cacheDuration;
        }
        return "1d";
    }
    async forceLoadMetadata() {
        const stratum = await MapServerStratum.load(this);
        runInAction(() => {
            this.strata.set(MapServerStratum.stratumName, stratum);
        });
    }
    async forceLoadMembers() {
        const mapServerStratum = this.strata.get(MapServerStratum.stratumName);
        if (mapServerStratum) {
            await runLater(() => mapServerStratum.createMembersFromLayers());
        }
    }
}
Object.defineProperty(ArcGisMapServerCatalogGroup, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "esri-mapServer-group"
});
export default ArcGisMapServerCatalogGroup;
__decorate([
    override
], ArcGisMapServerCatalogGroup.prototype, "cacheDuration", null);
//# sourceMappingURL=ArcGisMapServerCatalogGroup.js.map