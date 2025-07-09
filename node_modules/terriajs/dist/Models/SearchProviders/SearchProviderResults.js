var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { makeObservable, observable } from "mobx";
import { fromPromise } from "mobx-utils";
export default class SearchProviderResults {
    constructor(searchProvider) {
        Object.defineProperty(this, "searchProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: searchProvider
        });
        Object.defineProperty(this, "results", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isCanceled", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "resultsCompletePromise", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: fromPromise(Promise.resolve())
        });
        makeObservable(this);
    }
    get isSearching() {
        return this.resultsCompletePromise.state === "pending";
    }
}
__decorate([
    observable
], SearchProviderResults.prototype, "results", void 0);
__decorate([
    observable
], SearchProviderResults.prototype, "message", void 0);
//# sourceMappingURL=SearchProviderResults.js.map