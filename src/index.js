import LMap from './components/map';
import LTileLayer from './components/tileLayer';
import LWmsTileLayer from './components/wmsTileLayer';
import LWmtsTileLayer from './components/wmtsTileLayer';
import LImageOverlay from './components/imageOverlay';
import LVideoOverlay from './components/videoOverlay';
import LBaseLayer from './components/baseLayer';
import LDrawLayer from './components/drawLayer';

import LLayerGroup from './components/layerGroup';
import LFeatureGroup from './components/featureGroup';
import LGeoJson from './components/geoJson';

import LPolyline from './components/polyline';
import LPolygon from './components/polygon';
import LRectangle from './components/rectangle';
import LCircle from './components/circle';
import LCircleMarker from './components/circleMarker';

import "leaflet/dist/leaflet.css";


const components = [
    LMap,
    LTileLayer,
    LWmsTileLayer,
    LImageOverlay,
    LVideoOverlay,
    LWmtsTileLayer,
    LLayerGroup,
    LFeatureGroup,
    LGeoJson,
    LBaseLayer,
    LDrawLayer,
    LPolyline,
    LPolygon,
    LRectangle,
    LCircle,
    LCircleMarker
];

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    LMap,
    LTileLayer,
    LWmsTileLayer,
    LImageOverlay,
    LVideoOverlay,
    LWmtsTileLayer,
    LLayerGroup,
    LFeatureGroup,
    LGeoJson,
    LBaseLayer,
    LDrawLayer,
    LPolyline,
    LPolygon,
    LRectangle,
    LCircle,
    LCircleMarker
}