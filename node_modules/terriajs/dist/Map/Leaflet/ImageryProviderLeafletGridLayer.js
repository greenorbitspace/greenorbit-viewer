var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import L from "leaflet";
import { autorun, computed, observable, makeObservable } from "mobx";
import Cartographic from "terriajs-cesium/Source/Core/Cartographic";
import CesiumEvent from "terriajs-cesium/Source/Core/Event";
import CesiumMath from "terriajs-cesium/Source/Core/Math";
import SplitDirection from "terriajs-cesium/Source/Scene/SplitDirection";
export const isImageryProviderGridLayer = (obj) => {
    return typeof obj.requestImageForCanvas === "function";
};
export default class ImageryProviderLeafletGridLayer extends L.GridLayer {
    constructor(leaflet, imageryProvider, options) {
        super(Object.assign(options, { async: true, tileSize: 256 }));
        Object.defineProperty(this, "leaflet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: leaflet
        });
        Object.defineProperty(this, "imageryProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: imageryProvider
        });
        Object.defineProperty(this, "errorEvent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new CesiumEvent()
        });
        Object.defineProperty(this, "initialized", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_usable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_delayedUpdate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "_zSubtract", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_previousCredits", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "splitDirection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: SplitDirection.NONE
        });
        Object.defineProperty(this, "splitPosition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0.5
        });
        makeObservable(this);
        // Handle splitter rection (and disposing reaction)
        let disposeSplitterReaction;
        this.on("add", () => {
            if (!disposeSplitterReaction) {
                disposeSplitterReaction = this._reactToSplitterChange();
            }
        });
        this.on("remove", () => {
            if (disposeSplitterReaction) {
                disposeSplitterReaction();
                disposeSplitterReaction = undefined;
            }
        });
    }
    _reactToSplitterChange() {
        return autorun(() => {
            const container = this.getContainer();
            if (container === null) {
                return;
            }
            if (this.splitDirection === SplitDirection.LEFT) {
                const { left: clipLeft } = this._clipsForSplitter;
                container.style.clip = clipLeft;
            }
            else if (this.splitDirection === SplitDirection.RIGHT) {
                const { right: clipRight } = this._clipsForSplitter;
                container.style.clip = clipRight;
            }
            else {
                container.style.clip = "auto";
            }
        });
    }
    get _clipsForSplitter() {
        let clipLeft = "";
        let clipRight = "";
        let clipPositionWithinMap;
        let clipX;
        if (this.leaflet.size && this.leaflet.nw && this.leaflet.se) {
            clipPositionWithinMap = this.leaflet.size.x * this.splitPosition;
            clipX = Math.round(this.leaflet.nw.x + clipPositionWithinMap);
            clipLeft =
                "rect(" +
                    [this.leaflet.nw.y, clipX, this.leaflet.se.y, this.leaflet.nw.x].join("px,") +
                    "px)";
            clipRight =
                "rect(" +
                    [this.leaflet.nw.y, this.leaflet.se.x, this.leaflet.se.y, clipX].join("px,") +
                    "px)";
        }
        return {
            left: clipLeft,
            right: clipRight,
            clipPositionWithinMap: clipPositionWithinMap,
            clipX: clipX
        };
    }
    createTile(tilePoint, done) {
        const canvas = L.DomUtil.create("canvas", "leaflet-tile");
        const size = this.getTileSize();
        canvas.width = size.x;
        canvas.height = size.y;
        const n = this.imageryProvider.tilingScheme.getNumberOfXTilesAtLevel(tilePoint.z);
        this.imageryProvider
            .requestImageForCanvas(CesiumMath.mod(tilePoint.x, n), tilePoint.y, tilePoint.z, canvas)
            .then(function (canvas) {
            done(undefined, canvas);
        });
        return canvas; // Not yet drawn on, but Leaflet requires the tile
    }
    getFeaturePickingCoords(map, longitudeRadians, latitudeRadians) {
        const ll = new Cartographic(CesiumMath.negativePiToPi(longitudeRadians), latitudeRadians, 0.0);
        const level = Math.round(map.getZoom());
        const tilingScheme = this.imageryProvider.tilingScheme;
        const coords = tilingScheme.positionToTileXY(ll, level);
        return {
            x: coords.x,
            y: coords.y,
            level: level
        };
    }
    pickFeatures(x, y, level, longitudeRadians, latitudeRadians) {
        return this.imageryProvider.pickFeatures(x, y, level, longitudeRadians, latitudeRadians);
    }
}
__decorate([
    observable
], ImageryProviderLeafletGridLayer.prototype, "splitDirection", void 0);
__decorate([
    observable
], ImageryProviderLeafletGridLayer.prototype, "splitPosition", void 0);
__decorate([
    computed
], ImageryProviderLeafletGridLayer.prototype, "_clipsForSplitter", null);
//# sourceMappingURL=ImageryProviderLeafletGridLayer.js.map