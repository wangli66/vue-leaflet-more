import { mapConfig, mapBaseLayerOption } from "../mapPlugin/provideBaseLayer.js";
import { WMTS } from '../mapPlugin/WMTS.js';
import { WMS } from '../mapPlugin/WMS.js';

export default {
    data() {
        return {
            parentRef: null,
            parentMap: null,
            baseLayer: null,
        }
    },
    methods: {
        getWmts() {
            return WMTS(mapConfig[baseType].url, mapConfig[baseType].opt);
        },
        changeBaseType(baseType) {
            this.baseLayer.clearLayers();
            if (mapConfig[baseType]) {
                let wmtsLayer = WMTS(mapConfig[baseType].url, mapConfig[baseType].opt);
                this.baseLayer.addLayer(wmtsLayer);
            }
            if (mapConfig[baseType + '1']) {
                let by = baseType + '1';
                let wmtsLayer = WMTS(mapConfig[by].url, mapConfig[by].opt);
                this.baseLayer.addLayer(wmtsLayer);
            }
            if (mapConfig[baseType + '2']) {
                let by = baseType + '2';
                let wmtsLayer = WMTS(mapConfig[by].url, mapConfig[by].opt);
                this.baseLayer.addLayer(wmtsLayer);
            }
        },
        // 自定义的wmts服务  configObj  = {}
        setWmtsService(configObj) {
            let wmtsLayerArr = [];
            let keysArr = Object.keys(configObj) || [];
            keysArr.forEach(k => {
                let config = configObj[k];
                let wmtsLayer = WMTS(config.url, config.opt);
                this.baseLayer.addLayer(wmtsLayer);
                wmtsLayerArr.push(wmtsLayer);
            });
            return wmtsLayerArr;
        },
        setWmsService(configObj) {
            let wmsLayerArr = [];
            //  = L.tileLayer.wms(
            //     'http://172.16.67.148:8080/rsmse/zujian/%E5%9B%9B%E5%B7%9D%E5%BD%B1%E5%83%8F%E5%BA%95%E5%9B%BE/wms?tk=eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNo8yksKgCAURuG9_GMHPu5VczeCQgZFlEIg7j0H0fA7nI7Y6orQURICYtrLAYF25-vnENhqmVTEbMhqqYmldIsjmm-JFUFZw15ZJi-Qn_MLPBc_XgAAAP__.Von5XzzQcVjGRd3rbHA1uYAzXdjbPh_eoM9kfPA3x1M', {
            //         layers: `四川影像底图`,
            //     });
            // debugger
            let keysArr = Object.keys(configObj) || [];
            keysArr.forEach(k => {
                let config = configObj[k];
                let wmsLayer = L.tileLayer.wms(config.url, config.opt);
                this.baseLayer.addLayer(wmsLayer);
                wmsLayerArr.push(wmsLayer);
            });
            // this.baseLayer.addLayer(wmsLayer);
            return wmsLayerArr;
        },
    },
    mounted() {
        this.parentRef = this.$parent;
        this.parentMap = this.$parent.getMap();
        // this.baseLayer = this.parentRef.getBaseLayer();
        // 编辑图层
        // this.baseLayer = L.featureGroup();
        this.baseLayer = L.layerGroup();
        this.parentMap.addLayer(this.baseLayer);
    }
}