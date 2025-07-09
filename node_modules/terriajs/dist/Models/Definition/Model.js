export class BaseModel {
    constructor(uniqueId, terria, 
    /**
     * The model whose {@link ReferenceMixin} references this model.
     * This instance will also be that model's {@link ReferenceMixin#target}
     * property. If undefined, this model is not the target of a reference.
     */
    sourceReference) {
        Object.defineProperty(this, "uniqueId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: uniqueId
        });
        Object.defineProperty(this, "terria", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: terria
        });
        Object.defineProperty(this, "sourceReference", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: sourceReference
        });
    }
    dispose() { }
}
//# sourceMappingURL=Model.js.map