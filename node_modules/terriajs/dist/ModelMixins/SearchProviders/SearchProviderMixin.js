var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, makeObservable } from "mobx";
import { fromPromise } from "mobx-utils";
import SearchProviderResults from "../../Models/SearchProviders/SearchProviderResults";
function SearchProviderMixin(Base) {
    class SearchProviderMixin extends Base {
        constructor(...args) {
            super(...args);
            makeObservable(this);
        }
        search(searchText) {
            const result = new SearchProviderResults(this);
            if (!this.shouldRunSearch(searchText)) {
                result.resultsCompletePromise = fromPromise(Promise.resolve());
                result.message = {
                    content: "translate#viewModels.searchMinCharacters",
                    params: {
                        count: this.minCharacters
                    }
                };
                return result;
            }
            this.logEvent(searchText);
            result.resultsCompletePromise = fromPromise(this.doSearch(searchText, result));
            return result;
        }
        shouldRunSearch(searchText) {
            if (searchText === undefined ||
                /^\s*$/.test(searchText) ||
                (this.minCharacters && searchText.length < this.minCharacters)) {
                return false;
            }
            return true;
        }
        get hasSearchProviderMixin() {
            return true;
        }
    }
    __decorate([
        action
    ], SearchProviderMixin.prototype, "search", null);
    return SearchProviderMixin;
}
(function (SearchProviderMixin) {
    function isMixedInto(model) {
        return model && model.hasSearchProviderMixin;
    }
    SearchProviderMixin.isMixedInto = isMixedInto;
})(SearchProviderMixin || (SearchProviderMixin = {}));
export default SearchProviderMixin;
//# sourceMappingURL=SearchProviderMixin.js.map