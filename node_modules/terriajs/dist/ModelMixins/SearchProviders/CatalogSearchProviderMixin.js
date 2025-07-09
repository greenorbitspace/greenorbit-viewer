var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, makeObservable } from "mobx";
import { fromPromise } from "mobx-utils";
import isDefined from "../../Core/isDefined";
import SearchProviderMixin from "./SearchProviderMixin";
function CatalogSearchProviderMixin(Base) {
    class CatalogSearchProviderMixin extends SearchProviderMixin(Base) {
        constructor(...args) {
            super(...args);
            makeObservable(this);
        }
        get resultsAreReferences() {
            var _a;
            return (isDefined((_a = this.terria.catalogIndex) === null || _a === void 0 ? void 0 : _a.loadPromise) &&
                fromPromise(this.terria.catalogIndex.loadPromise).state === "fulfilled");
        }
        get hasCatalogSearchProviderMixin() {
            return true;
        }
    }
    __decorate([
        computed
    ], CatalogSearchProviderMixin.prototype, "resultsAreReferences", null);
    return CatalogSearchProviderMixin;
}
(function (CatalogSearchProviderMixin) {
    function isMixedInto(model) {
        return model && model.hasCatalogSearchProviderMixin;
    }
    CatalogSearchProviderMixin.isMixedInto = isMixedInto;
})(CatalogSearchProviderMixin || (CatalogSearchProviderMixin = {}));
export default CatalogSearchProviderMixin;
//# sourceMappingURL=CatalogSearchProviderMixin.js.map