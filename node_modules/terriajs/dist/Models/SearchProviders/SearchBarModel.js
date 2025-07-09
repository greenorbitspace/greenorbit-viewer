var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, computed, isObservableArray, makeObservable, observable } from "mobx";
import DeveloperError from "terriajs-cesium/Source/Core/DeveloperError";
import RuntimeError from "terriajs-cesium/Source/Core/RuntimeError";
import Result from "../../Core/Result";
import TerriaError from "../../Core/TerriaError";
import LocationSearchProviderMixin from "../../ModelMixins/SearchProviders/LocationSearchProviderMixin";
import { SearchBarTraits } from "../../Traits/SearchProviders/SearchBarTraits";
import CommonStrata from "../Definition/CommonStrata";
import CreateModel from "../Definition/CreateModel";
import updateModelFromJson from "../Definition/updateModelFromJson";
import SearchProviderFactory from "./SearchProviderFactory";
import upsertSearchProviderFromJson from "./upsertSearchProviderFromJson";
export class SearchBarModel extends CreateModel(SearchBarTraits) {
    constructor(terria) {
        super("search-bar-model", terria);
        Object.defineProperty(this, "terria", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: terria
        });
        Object.defineProperty(this, "locationSearchProviders", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: observable.map()
        });
        Object.defineProperty(this, "catalogSearchProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        makeObservable(this);
    }
    updateModelConfig(config) {
        if (config) {
            updateModelFromJson(this, CommonStrata.definition, config);
        }
        return this;
    }
    initializeSearchProviders(searchProviders) {
        const errors = [];
        if (!isObservableArray(searchProviders)) {
            errors.push(new TerriaError({
                sender: SearchProviderFactory,
                title: "SearchProviders",
                message: { key: "searchProvider.noSearchProviders" }
            }));
        }
        searchProviders === null || searchProviders === void 0 ? void 0 : searchProviders.forEach((searchProvider) => {
            const loadedModel = upsertSearchProviderFromJson(SearchProviderFactory, this.terria, CommonStrata.definition, searchProvider).pushErrorTo(errors);
            if (LocationSearchProviderMixin.isMixedInto(loadedModel)) {
                loadedModel.showWarning();
            }
        });
        return new Result(undefined, TerriaError.combine(errors, "An error occurred while loading search providers"));
    }
    /**
     * Add new SearchProvider to the list of SearchProviders.
     */
    addSearchProvider(model) {
        if (model.uniqueId === undefined) {
            throw new DeveloperError("A SearchProvider without a `uniqueId` cannot be added.");
        }
        if (this.locationSearchProviders.has(model.uniqueId)) {
            throw new RuntimeError("A SearchProvider with the specified ID already exists.");
        }
        if (!LocationSearchProviderMixin.isMixedInto(model)) {
            throw new RuntimeError("SearchProvider must be a LocationSearchProvider.");
        }
        this.locationSearchProviders.set(model.uniqueId, model);
    }
    get locationSearchProvidersArray() {
        return [...this.locationSearchProviders.entries()]
            .filter((entry) => {
            return LocationSearchProviderMixin.isMixedInto(entry[1]);
        })
            .map(function (entry) {
            return entry[1];
        });
    }
}
__decorate([
    observable
], SearchBarModel.prototype, "catalogSearchProvider", void 0);
__decorate([
    action
], SearchBarModel.prototype, "addSearchProvider", null);
__decorate([
    computed
], SearchBarModel.prototype, "locationSearchProvidersArray", null);
//# sourceMappingURL=SearchBarModel.js.map