/** Decorator to set traitClass options (eg `description` of the class) */
export function traitClass(options) {
    return function (target) {
        target.description = options.description;
        target.example = options.example;
    };
}
export default class Trait {
    constructor(id, options, parent) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "decoratorForFlattened", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "parent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.name = options.name;
        this.description = options.description;
        this.parent = parent;
    }
}
//# sourceMappingURL=Trait.js.map