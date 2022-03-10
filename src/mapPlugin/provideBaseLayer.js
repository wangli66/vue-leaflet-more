import { WMTS } from './WMTS';


// 5f62055ba4a942589b724283706c399a

// ef6151d9f0386f3b2a2fdf1d58fe9b32
// 3133b000f831d898dc3a8f9bcff6ddf4

// 14fb3df8ff54c41a88e8abd658197582

const mapConfig = {
    //地图 - 矢量
    skymapVec1: {
        url: "http://t0.tianditu.gov.cn/vec_c/wmts?tk=3133b000f831d898dc3a8f9bcff6ddf4",
        opt: {
            layer: "vec",
            tileMatrixSet: "c",
            format: "tiles",
            style: "default",
            type: "baseLayer",
        }
    },
    skymapVec2: {
        url: "http://t0.tianditu.gov.cn/cva_c/wmts?tk=3133b000f831d898dc3a8f9bcff6ddf4",
        opt: {
            layer: "cva",
            tileMatrixSet: "c",
            format: "tiles",
            style: "default",
            type: "baseLayer",
        }
    },
    // 天地图 = 地形
    skymapTopography1: {
        url: "http://t0.tianditu.gov.cn/ter_c/wmts?tk=5f62055ba4a942589b724283706c399a",
        opt: {
            layer: "ter",
            tileMatrixSet: "c",
            format: "tiles",
            style: "default",
            type: "baseLayer"
        }
    },
    skymapTopography2: {
        url: "http://t0.tianditu.gov.cn/cta_c/wmts?tk=5f62055ba4a942589b724283706c399a",
        opt: {
            layer: "cta",
            tileMatrixSet: "c",
            format: "tiles",
            style: "default",
            type: "baseLayer"
        }
    },
    // 天地图 - 影像
    skymapImage1: {
        url: "http://t0.tianditu.gov.cn/img_c/wmts?tk=5f62055ba4a942589b724283706c399a",
        opt: {
            layer: "img",
            tileMatrixSet: "c",
            format: "tiles",
            style: "default",
            type: "baseLayer"
        },
    },
    skymapImage2: {
        url: "http://t0.tianditu.gov.cn/cia_c/wmts?tk=5f62055ba4a942589b724283706c399a",
        opt: {
            layer: "cia",
            tileMatrixSet: "c",
            format: "tiles",
            style: "default",
            type: "baseLayer"
        },
    }
};

let mapBaseLayerOption = {};
Object.keys(mapConfig).forEach(item => {
    mapBaseLayerOption[item] = WMTS(mapConfig[item].url, mapConfig[item].opt);
});

export {
    mapConfig,
    mapBaseLayerOption
};