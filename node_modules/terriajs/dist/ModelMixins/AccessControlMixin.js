var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, computed, observable, makeObservable } from "mobx";
import { BaseModel } from "../Models/Definition/Model";
/**
 * API for setting an access type for the model. Note that the intended use of
 * this mixin is just to flag public and private models differently in the UI
 * and does not provide any security guarantees.
 *
 * The implementation is a bit fluid and maybe that makes it a bit hard to
 * reason about because we are not strongly typing the possible values for
 * `accessType`. For use in frontend, we formally recognizes only one acessType
 * which is "public". All other access type values are treated as "private". The
 * models overriding this mixin are free to choose any other string valued
 * access type for their own purpose.
 */
function AccessControlMixin(Base) {
    class _AccessControlMixin extends Base {
        constructor(...args) {
            super(...args);
            Object.defineProperty(this, "_accessType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            makeObservable(this);
        }
        get hasAccessControlMixin() {
            return true;
        }
        /**
         * Resolve accessType for this model in the following order:
         *  1. Return the access type that was set on this model by explicitly calling setAccessType()
         *  2. If this model is referenced by another, return the access type of the referrer
         *  3. Return the access type of a parent with valid access type
         *  4. If none of the above works - return "public"
         */
        get accessType() {
            // Return the explicitly set accessType
            if (this._accessType) {
                return this._accessType;
            }
            // Return the accessType of the referrer.
            if (AccessControlMixin.isMixedInto(this.sourceReference)) {
                return this.sourceReference.accessType;
            }
            // Try and return any ancestor's accessType
            if (this.knownContainerUniqueIds.length > 0) {
                const parentId = this.knownContainerUniqueIds[0];
                const parent = parentId && this.terria.getModelById(BaseModel, parentId);
                if (AccessControlMixin.isMixedInto(parent)) {
                    return parent.accessType;
                }
            }
            // Default
            return "public";
        }
        setAccessType(accessType) {
            this._accessType = accessType;
        }
        /**
         * Returns true if this model public.
         */
        get isPublic() {
            return this.accessType === "public";
        }
        /**
         * Returns true if this model is private.
         *
         * Note that any accessType other than "public" is treated as private.
         */
        get isPrivate() {
            return this.accessType !== "public";
        }
    }
    __decorate([
        observable
    ], _AccessControlMixin.prototype, "_accessType", void 0);
    __decorate([
        computed
    ], _AccessControlMixin.prototype, "accessType", null);
    __decorate([
        action
    ], _AccessControlMixin.prototype, "setAccessType", null);
    __decorate([
        computed
    ], _AccessControlMixin.prototype, "isPublic", null);
    __decorate([
        computed
    ], _AccessControlMixin.prototype, "isPrivate", null);
    return _AccessControlMixin;
}
(function (AccessControlMixin) {
    function isMixedInto(model) {
        return model && model.hasAccessControlMixin;
    }
    AccessControlMixin.isMixedInto = isMixedInto;
})(AccessControlMixin || (AccessControlMixin = {}));
export default AccessControlMixin;
//# sourceMappingURL=AccessControlMixin.js.map