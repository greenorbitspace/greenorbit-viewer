var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { makeObservable, override } from "mobx";
import CatalogMemberMixin from "../../ModelMixins/CatalogMemberMixin";
import ResultPendingCatalogItemTraits from "../../Traits/TraitsClasses/ResultPendingCatalogItemTraits";
import CreateModel from "../Definition/CreateModel";
export default class ResultPendingCatalogItem extends CatalogMemberMixin(CreateModel(ResultPendingCatalogItemTraits)) {
    constructor(...args) {
        super(...args);
        Object.defineProperty(this, "loadPromise", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Promise.resolve()
        });
        makeObservable(this);
    }
    get disableAboutData() {
        var _a;
        return (_a = super.disableAboutData) !== null && _a !== void 0 ? _a : true;
    }
    forceLoadMetadata() {
        return this.loadPromise;
    }
}
__decorate([
    override
], ResultPendingCatalogItem.prototype, "disableAboutData", null);
//# sourceMappingURL=ResultPendingCatalogItem.js.map