var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import CatalogMemberFactory from "../../Models/Catalog/CatalogMemberFactory";
import modelReferenceArrayTrait from "../Decorators/modelReferenceArrayTrait";
import primitiveArrayTrait from "../Decorators/primitiveArrayTrait";
import primitiveTrait from "../Decorators/primitiveTrait";
import mixTraits from "../mixTraits";
import { ItemPropertiesTraits } from "./ItemPropertiesTraits";
export default class GroupTraits extends mixTraits(ItemPropertiesTraits) {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "excludeMembers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "includeMembersRegex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isOpen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "mergeGroupsByName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "sortMembersBy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "members", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "displayGroup", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
__decorate([
    primitiveArrayTrait({
        name: "Exclude members",
        type: "string",
        description: `An array of strings of excluded group and item names (or ids). A group or item name (or id) that appears in this list will not be shown to the user. This is case-insensitive and will also apply to all child/nested groups`
    })
], GroupTraits.prototype, "excludeMembers", void 0);
__decorate([
    primitiveTrait({
        name: "Include members by regular expression",
        type: "string",
        description: `A regular expression that is matched against the member names and ids. Only members (groups and items) that match against the regular expression will be shown to the user. This is case-insensitive and will only apply to the first level of members (not in nested groups). This is applied before excludeMembers.`
    })
], GroupTraits.prototype, "includeMembersRegex", void 0);
__decorate([
    primitiveTrait({
        name: "Is Open",
        description: "True if this group is open and its contents are visible; otherwise, false.",
        type: "boolean"
    })
], GroupTraits.prototype, "isOpen", void 0);
__decorate([
    primitiveTrait({
        name: "Merge by name",
        description: "Merge member groups by name.",
        type: "boolean"
    })
], GroupTraits.prototype, "mergeGroupsByName", void 0);
__decorate([
    primitiveTrait({
        name: "Sort members by",
        description: "Sort members by the given property/trait. For example `name`, will sort all members by alphabetically",
        type: "string"
    })
], GroupTraits.prototype, "sortMembersBy", void 0);
__decorate([
    modelReferenceArrayTrait({
        name: "Members",
        description: "The members of this group.",
        factory: CatalogMemberFactory
    })
], GroupTraits.prototype, "members", void 0);
__decorate([
    primitiveTrait({
        name: "Display group",
        description: "Allow adding all members to the workbench with one click. Show Add All / Remove All button",
        type: "boolean"
    })
], GroupTraits.prototype, "displayGroup", void 0);
//# sourceMappingURL=GroupTraits.js.map