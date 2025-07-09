var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { isEqual } from "lodash-es";
import { action, computed, observable, reaction, runInAction, untracked, makeObservable } from "mobx";
import { fromPromise, FULFILLED } from "mobx-utils";
import CesiumEvent from "terriajs-cesium/Source/Core/Event";
import Rectangle from "terriajs-cesium/Source/Core/Rectangle";
import CatalogMemberMixin from "../ModelMixins/CatalogMemberMixin";
import CameraView from "../Models/CameraView";
import NoViewer from "../Models/NoViewer";
import ViewerMode from "../Models/ViewerMode";
// Async loading of Leaflet and Cesium
const leafletFromPromise = computed(() => fromPromise(import("../Models/Leaflet").then((Leaflet) => Leaflet.default)), { keepAlive: true });
const cesiumFromPromise = computed(() => fromPromise(import("../Models/Cesium").then((Cesium) => Cesium.default)), { keepAlive: true });
const viewerOptionsDefaults = {
    useTerrain: true
};
/**
 * A class that deals with initialising, destroying and switching between viewers
 * Each map-view should have it's own TerriaViewer (main viewer, preview map, etc.)
 */
export default class TerriaViewer {
    get baseMap() {
        return this._baseMap;
    }
    async setBaseMap(baseMap) {
        var _a;
        if (!baseMap)
            return;
        const result = await baseMap.loadMapItems();
        if (result.error) {
            result.raiseError(this.terria, {
                title: {
                    key: "models.terria.loadingBaseMapErrorTitle",
                    parameters: {
                        name: (_a = (CatalogMemberMixin.isMixedInto(baseMap)
                            ? baseMap.name
                            : baseMap.uniqueId)) !== null && _a !== void 0 ? _a : "Unknown item"
                    }
                }
            });
        }
        else {
            runInAction(() => (this._baseMap = baseMap));
        }
    }
    get homeCamera() {
        return this._homeCamera;
    }
    set homeCamera(cameraView) {
        if (isEqual(this._homeCamera.rectangle, Rectangle.MAX_VALUE)) {
            this.currentViewer.zoomTo(cameraView, 0.0);
        }
        this._homeCamera = cameraView;
    }
    constructor(terria, items) {
        Object.defineProperty(this, "terria", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_baseMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // This is a "view" of a workbench/other
        Object.defineProperty(this, "items", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "viewerMode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ViewerMode.Cesium
        });
        // Set by UI
        Object.defineProperty(this, "viewerOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: viewerOptionsDefaults
        });
        // Disable all mouse (& keyboard) interaction
        Object.defineProperty(this, "disableInteraction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_homeCamera", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new CameraView(Rectangle.MAX_VALUE)
        });
        Object.defineProperty(this, "mapContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The distance between two pixels at the bottom center of the screen.
         * Set in lib/ReactViews/Map/Legend/DistanceLegend.jsx
         */
        Object.defineProperty(this, "scale", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "beforeViewerChanged", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new CesiumEvent()
        });
        Object.defineProperty(this, "afterViewerChanged", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new CesiumEvent()
        });
        Object.defineProperty(this, "_lastViewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "viewerChangeTracker", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        makeObservable(this);
        this.terria = terria;
        this.items = items;
        if (!this.viewerChangeTracker) {
            this.viewerChangeTracker = reaction(() => this.currentViewer, () => {
                this.afterViewerChanged.raiseEvent();
            });
        }
    }
    get attached() {
        return this.mapContainer !== undefined;
    }
    /**
     * Promise for async loading of current `viewerMode`
     * Starts when TerriaViewer is attached to a div and `viewerMode` is set
     */
    get viewerLoadPromise() {
        return Promise.resolve(this._currentViewerConstructorPromise).then(() => { });
    }
    /**
     * Get a mobx-utils promise to a constructor for currentViewer. Start loading
     * Leaflet or Cesium depending on `viewerMode` if attached to a div
     */
    get _currentViewerConstructorPromise() {
        let viewerFromPromise = fromPromise.resolve(NoViewer);
        if (this.attached && this.viewerMode === ViewerMode.Leaflet) {
            viewerFromPromise = leafletFromPromise.get();
        }
        else if (this.attached && this.viewerMode === ViewerMode.Cesium) {
            viewerFromPromise = cesiumFromPromise.get();
        }
        return viewerFromPromise;
    }
    get currentViewer() {
        // Use untracked on everything to ensure the viewer isn't recreated
        //  except when the viewer is required to change, the currently required
        //  viewer class finishes loading from an async chunk or the map container
        //  is changed
        const currentView = untracked(() => this.destroyCurrentViewer());
        let newViewer;
        try {
            // If a div is attached and a viewer is ready, use it
            if (this.attached &&
                this._currentViewerConstructorPromise.state === FULFILLED) {
                const SomeViewer = this._currentViewerConstructorPromise.value;
                newViewer = untracked(() => new SomeViewer(this, this.mapContainer));
            }
            else {
                newViewer = untracked(() => new NoViewer(this));
            }
        }
        catch (error) {
            // Switch viewerMode inside computed. Could change viewers to
            //  guarantee no throw in constructor and instead have a `start()`
            //  method that can throw. Then call that `start()` method inside
            //  a reaction (reaction would also deal with viewer fallback).
            // Using this approach might remove the need for `untracked`
            setTimeout(action(() => {
                this.terria.raiseErrorToUser(error);
                this.viewerMode =
                    this.viewerMode === ViewerMode.Cesium
                        ? ViewerMode.Leaflet
                        : undefined;
            }), 0);
            newViewer = untracked(() => new NoViewer(this));
        }
        this._lastViewer = newViewer;
        newViewer.zoomTo(currentView || untracked(() => this.homeCamera), 0.0);
        return newViewer;
    }
    // Pull out attaching logic into it's own step. This allows constructing a TerriaViewer
    // before its UI element is mounted in React to set basemap, items, viewermode
    attach(mapContainer) {
        this.mapContainer = mapContainer;
    }
    detach() {
        // Detach from a container
        this.mapContainer = undefined;
        this.destroyCurrentViewer();
    }
    destroy() {
        this.detach();
    }
    destroyCurrentViewer() {
        let currentView;
        if (this._lastViewer !== undefined) {
            this.beforeViewerChanged.raiseEvent();
            currentView = this._lastViewer.getCurrentCameraView();
            this._lastViewer.destroy();
            this._lastViewer = undefined;
        }
        return currentView;
    }
}
__decorate([
    observable
], TerriaViewer.prototype, "_baseMap", void 0);
__decorate([
    observable
], TerriaViewer.prototype, "viewerMode", void 0);
__decorate([
    observable
], TerriaViewer.prototype, "viewerOptions", void 0);
__decorate([
    observable
], TerriaViewer.prototype, "disableInteraction", void 0);
__decorate([
    computed
], TerriaViewer.prototype, "homeCamera", null);
__decorate([
    observable
], TerriaViewer.prototype, "mapContainer", void 0);
__decorate([
    observable
], TerriaViewer.prototype, "scale", void 0);
__decorate([
    computed
], TerriaViewer.prototype, "viewerLoadPromise", null);
__decorate([
    computed
], TerriaViewer.prototype, "_currentViewerConstructorPromise", null);
__decorate([
    computed({
        keepAlive: true
    })
], TerriaViewer.prototype, "currentViewer", null);
__decorate([
    action
], TerriaViewer.prototype, "attach", null);
__decorate([
    action
], TerriaViewer.prototype, "detach", null);
//# sourceMappingURL=TerriaViewer.js.map