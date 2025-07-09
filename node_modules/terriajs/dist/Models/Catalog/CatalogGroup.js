import CatalogMemberMixin from "../../ModelMixins/CatalogMemberMixin";
import GroupMixin from "../../ModelMixins/GroupMixin";
import CatalogGroupTraits from "../../Traits/TraitsClasses/CatalogGroupTraits";
import CreateModel from "../Definition/CreateModel";
class CatalogGroup extends GroupMixin(CatalogMemberMixin(CreateModel(CatalogGroupTraits))) {
    get type() {
        return CatalogGroup.type;
    }
    forceLoadMembers() {
        return Promise.resolve();
    }
}
Object.defineProperty(CatalogGroup, "type", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "group"
});
export default CatalogGroup;
//# sourceMappingURL=CatalogGroup.js.map