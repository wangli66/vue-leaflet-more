var isRingBbox = function(ring, bbox) {
    if (ring.length !== 4) {
        return false;
    }

    var p,
        sumX = 0,
        sumY = 0;

    for (p = 0; p < 4; p++) {
        if (
            (ring[p].x !== bbox.min.x && ring[p].x !== bbox.max.x) ||
            (ring[p].y !== bbox.min.y && ring[p].y !== bbox.max.y)
        ) {
            return false;
        }

        sumX += ring[p].x;
        sumY += ring[p].y;

        //bins[Number(ring[p].x === bbox.min.x) + 2 * Number(ring[p].y === bbox.min.y)] = 1;
    }

    //check that we have all 4 vertex of bbox in our geometry
    return (
        sumX === 2 * (bbox.min.x + bbox.max.x) &&
        sumY === 2 * (bbox.min.y + bbox.max.y)
    );
};
var ExtendMethods = {
    _toMercGeometry: function(b, isGeoJSON) {
        var res = [];
        var c, r, p, mercComponent, mercRing, coords;

        if (!isGeoJSON) {
            if (!(b[0] instanceof Array)) {
                b = [
                    [b]
                ];
            } else if (!(b[0][0] instanceof Array)) {
                b = [b];
            }
        }

        for (c = 0; c < b.length; c++) {
            mercComponent = [];
            for (r = 0; r < b[c].length; r++) {
                mercRing = [];
                for (p = 0; p < b[c][r].length; p++) {
                    coords = isGeoJSON ?
                        L.latLng(b[c][r][p][1], b[c][r][p][0]) :
                        b[c][r][p];
                    mercRing.push(this._map.project(coords, 0));
                }
                mercComponent.push(mercRing);
            }
            res.push(mercComponent);
        }

        return res;
    },

    //lazy calculation of layer's boundary in map's projection. Bounding box is also calculated
    _getOriginalMercBoundary: function() {
        if (this._mercBoundary) {
            return this._mercBoundary;
        }

        var compomentBbox, c;

        if (L.Util.isArray(this.options.boundary)) {
            //Depricated: just array of coordinates
            this._mercBoundary = this._toMercGeometry(this.options.boundary);
        } else {
            //GeoJSON
            this._mercBoundary = [];
            var processGeoJSONObject = function(obj) {
                if (obj.type === "GeometryCollection") {
                    obj.geometries.forEach(processGeoJSONObject);
                } else if (obj.type === "Feature") {
                    processGeoJSONObject(obj.geometry);
                } else if (obj.type === "FeatureCollection") {
                    obj.features.forEach(processGeoJSONObject);
                } else if (obj.type === "Polygon") {
                    this._mercBoundary = this._mercBoundary.concat(
                        this._toMercGeometry([obj.coordinates], true)
                    );
                } else if (obj.type === "MultiPolygon") {
                    this._mercBoundary = this._mercBoundary.concat(
                        this._toMercGeometry(obj.coordinates, true)
                    );
                }
            }.bind(this);
            processGeoJSONObject(this.options.boundary);
        }

        this._mercBbox = new L.Bounds();
        for (c = 0; c < this._mercBoundary.length; c++) {
            compomentBbox = new L.Bounds(this._mercBoundary[c][0]);
            this._mercBbox.extend(compomentBbox.min);
            this._mercBbox.extend(compomentBbox.max);
        }

        return this._mercBoundary;
    },

    _getClippedGeometry: function(geom, bounds) {
        var clippedGeom = [],
            clippedComponent,
            clippedExternalRing,
            clippedHoleRing,
            iC,
            iR;

        for (iC = 0; iC < geom.length; iC++) {
            clippedComponent = [];
            clippedExternalRing = L.PolyUtil.clipPolygon(geom[iC][0], bounds);
            if (clippedExternalRing.length === 0) {
                continue;
            }

            clippedComponent.push(clippedExternalRing);

            for (iR = 1; iR < geom[iC].length; iR++) {
                clippedHoleRing = L.PolyUtil.clipPolygon(geom[iC][iR], bounds);
                if (clippedHoleRing.length > 0) {
                    clippedComponent.push(clippedHoleRing);
                }
            }
            clippedGeom.push(clippedComponent);
        }

        if (clippedGeom.length === 0) {
            //we are outside of all multipolygon components
            return { isOut: true };
        }

        for (iC = 0; iC < clippedGeom.length; iC++) {
            if (isRingBbox(clippedGeom[iC][0], bounds)) {
                //inside exterior rings and no holes
                if (clippedGeom[iC].length === 1) {
                    return { isIn: true };
                }
            } else {
                //intersects exterior ring
                return { geometry: clippedGeom };
            }

            for (iR = 1; iR < clippedGeom[iC].length; iR++) {
                //inside exterior ring, but have intersection with a hole
                if (!isRingBbox(clippedGeom[iC][iR], bounds)) {
                    return { geometry: clippedGeom };
                }
            }
        }

        //we are inside all holes in geometry
        return { isOut: true };
    },

    // Calculates intersection of original boundary geometry and tile boundary.//计算原始边界几何和tile边界的交集。
    // Uses quadtree as cache to speed-up intersection.
    // Return
    // {isOut: true} if no intersection,
    // {isIn: true} if tile is fully inside layer's boundary//如果qiepian完全在层的边界内
    // {geometry: <LatLng[][][]>} otherwise
    _getTileGeometry: function(x, y, z, skipIntersectionCheck) {
        if (!this.options.boundary) {
            return { isIn: true };
        }

        var cacheID = x + ":" + y + ":" + z,
            zCoeff = Math.pow(2, z),
            parentState,
            cache = this._boundaryCache;

        if (cache[cacheID]) {
            return cache[cacheID];
        }

        var mercBoundary = this._getOriginalMercBoundary(),
            ts = this.options.tileSize,
            tileBbox = new L.Bounds(
                new L.Point((x * ts) / zCoeff, (y * ts) / zCoeff),
                new L.Point(((x + 1) * ts) / zCoeff, ((y + 1) * ts) / zCoeff)
            );

        //fast check intersection
        if (!skipIntersectionCheck && !tileBbox.intersects(this._mercBbox)) {
            return { isOut: true };
        }

        if (z === 0) {
            cache[cacheID] = { geometry: mercBoundary };
            return cache[cacheID];
        }

        parentState = this._getTileGeometry(
            Math.floor(x / 2),
            Math.floor(y / 2),
            z - 1,
            true
        );

        if (parentState.isOut || parentState.isIn) {
            return parentState;
        }

        cache[cacheID] = this._getClippedGeometry(
            parentState.geometry,
            tileBbox
        );
        return cache[cacheID];
    },

    _drawTileInternal: function(canvas, tilePoint, url, callback) {
        var zoom = this._getZoomForUrl(),
            state = this._getTileGeometry(tilePoint.x, tilePoint.y, zoom);

        if (state.isOut) {
            callback();
            return;
        }

        var ts = this.options.tileSize,
            tileX = ts * tilePoint.x,
            tileY = ts * tilePoint.y,
            zCoeff = Math.pow(2, zoom),
            ctx = canvas.getContext("2d"),
            imageObj = new Image(),
            _this = this;

        var setPattern = function() {
            var c, r, p, pattern, geom;

            if (!state.isIn) {
                geom = state.geometry;
                //console.log('geom',geom);
                ctx.beginPath();

                for (c = 0; c < geom.length; c++) {
                    for (r = 0; r < geom[c].length; r++) {
                        if (geom[c][r].length === 0) {
                            continue;
                        }

                        ctx.moveTo(
                            geom[c][r][0].x * zCoeff - tileX,
                            geom[c][r][0].y * zCoeff - tileY
                        );
                        for (p = 1; p < geom[c][r].length; p++) {
                            ctx.lineTo(
                                geom[c][r][p].x * zCoeff - tileX,
                                geom[c][r][p].y * zCoeff - tileY
                            );
                        }
                    }
                }
                ctx.clip();
            }

            pattern = ctx.createPattern(imageObj, "repeat");
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = pattern;
            ctx.fill();
            callback();
        };

        if (this.options.crossOrigin) {
            imageObj.crossOrigin = "";
        }

        imageObj.onload = function() {
            //TODO: implement correct image loading cancelation
            canvas.complete = true; //HACK: emulate HTMLImageElement property to make happy L.TileLayer
            setTimeout(setPattern,
            0); //IE9 bug - black tiles appear randomly if call setPattern() without timeout
        };

        imageObj.src = url;
        //console.log('imageObj.src',imageObj.src);
    }
};

L.TileLayer.GISHOMEWMS = L.TileLayer.WMS.extend({
    defaultWmsParams: {
        service: "WMS",
        request: "GetMap",
        layers: "",
        styles: "",
        format: "image/jpeg",
        transparent: false,
        version: "1.3.0",
        boundary: null
        // service: "WMS",
        // request: "GetMap",
        // layers: "四川影像底图_R4_川东北影像,四川影像底图_R5_川东南影像,四川影像底图_R6_川南影像,四川影像底图_R7_川西北影像,四川影像底图_R8_川西南影像",
        // styles: "",
        // format: "image/jpeg",
        // transparent: false,
        // tk:"eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNo8yksKgCAURuG9_GMHXp9XdyMoZFBEKQTh3hOCht_hPEi9LYgPakZEylvdIdCvcv4cAmurk2QsaReYOXgptVVSzremhkhOG3ZsFQmU-_hCIPKKxgsAAP__.Bp5kIRSW6guOVyXj8_Nri4Js3m93Reqqh-CmZCnXrNU",
        // version: "1.3.0",
        // CRS: "EPSG:4326"
        // width: 256,
        // HEIGHT: 256
    },
    options: {
        crs: null,
        uppercase: true
    },
    includes: ExtendMethods,

    initialize: function(url, options) {
        this._url = url;
        var wmsParams = L.extend({}, this.defaultWmsParams);
        // all keys that are not TileLayer options go to WMS params
        for (var i in options) {
            if (!(i in this.options)) {
                wmsParams[i] = options[i];
            }
        }
        // options = setOptions(this, options);
        var realRetina = options.detectRetina && L.Browser.retina ? 2 : 1;
        var tileSize = this.getTileSize();
        wmsParams.width = tileSize.x * realRetina;
        wmsParams.height = tileSize.y * realRetina;
        this.wmsParams = wmsParams;
        //编辑
        L.TileLayer.prototype.initialize.call(this, url, options);
        this._boundaryCache = {}; //cache index "x:y:z"
        this._mercBoundary = null;
        this._mercBbox = null;

        options = L.setOptions(this, options);
    },
    onAdd: function(map) {
        this._crs = this.options.crs || map.options.crs;
        this._wmsVersion = parseFloat(this.wmsParams.version);

        var projectionKey = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[projectionKey] = this._crs.code;

        //L.TileLayer.prototype.onAdd.call(this, map);
        (L.TileLayer.Canvas || L.TileLayer).prototype.onAdd.call(this, map);
    },
    getTileUrl: function(coords) {
        let tileBounds = this._tileCoordsToNwSe(coords);
        let crs = this._crs;
        let bounds = L.bounds(
            crs.project(tileBounds[0]),
            crs.project(tileBounds[1])
        );
        let min = bounds.min;
        let max = bounds.max;
        let bbox = (this._wmsVersion >= 1.3 && this._crs.code === "EPSG:4326" ?
            [min.y, min.x, max.y, max.x] :
            [min.x, min.y, max.x, max.y]
        ).join(",");
        let url = this._url;
        url = url.replace("{bbox}", bbox);
        return url;
        // return (
        //     url +
        //     //url + getParamString(this.wmsParams, url, this.options.uppercase)
        //     (this.options.uppercase ? "&BBOX=" : "&bbox=") +
        //     bbox
        // );
    },
    //编辑
    createTile: function(coords, done) {
        var tile = document.createElement("canvas"),
            url = this.getTileUrl(coords);
        tile.width = tile.height = this.options.tileSize;
        this._drawTileInternal(
            tile,
            coords,
            url,
            L.bind(done, null, null, tile)
        );

        return tile;
    }
});

export function WMS(url, options) {
    return new L.TileLayer.GISHOMEWMS(url, options);
}