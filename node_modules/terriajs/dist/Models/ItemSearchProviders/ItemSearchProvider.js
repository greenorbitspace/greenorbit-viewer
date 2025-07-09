/**
 * An ItemSearchProvider provides an API for searching within an item.
 *
 */
export default class ItemSearchProvider {
    constructor(options, parameterOptions) {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "parameterOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: parameterOptions
        });
        /**
         * An optional hook to receive a hint that the user might search the parameter with `parameterId`.
         *
         * If indexes for parameters takes too long to load, implementing this method can
         * improve search time by pre-emptively loading the index. This hook is called
         * while the user is inputing value for the parameter. It can be called
         * multiple times, so the implementation must take care not to make
         * duplicate requests.
         */
        Object.defineProperty(this, "loadParameterHint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
//# sourceMappingURL=ItemSearchProvider.js.map