<template>
    <div class="l-base-layer">
        <template v-if="Array.isArray(currentLayerOptions)">
            <component
                :is="layerComp"
                v-for="(layer, lIndex) in currentLayerOptions"
                :key="randomNum + '-' + lIndex"
                v-bind="layer"
            ></component>
        </template>
        <template v-else-if="typeof currentLayerOptions == 'object'">
            <component
                :is="layerComp"
                v-bind="currentLayerOptions"
                :key="randomNum"
            ></component>
        </template>
        <div
            class="map-type-wrap"
            :style="positionClass"
            v-if="showType && mapTypeList"
        >
            <div class="map-type" @click.stop>
                <div
                    class="map-type-item"
                    v-for="(type, tIndex) of mapTypeList"
                    :key="'map-type-' + tIndex"
                    :class="[
                        type.nameClass,
                        { active: tIndex == visibleIndex },
                        type.customClass,
                    ]"
                    @click="handleChangeType(type, tIndex)"
                >
                    <span>{{ type.name }}</span>
                </div>
            </div>
        </div>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </div>
</template>

<script>
import Options from "../../../mixins/Options.js";

export default {
    name: "LBaseLayer",
    inject: ["lMap"],
    mixins: [Options],
    inheritAttrs: false,
    props: {
        // Distance to border
        dToB: {
            type: [String, Array],
            default: "20px",
        },
        position: {
            type: String,
            default: "topright",
            validator: function (value) {
                return (
                    [
                        "topleft",
                        "topright",
                        "bottomleft",
                        "bottomright",
                    ].indexOf(value) !== -1
                );
            },
        },
        showType: {
            type: Boolean,
            default: true,
        },
        layersOptions: {
            type: [Array, Object],
            default() {
                return [];
                // {
                //     nameClass: 'image',  //瓦片显示出来的名称
                //     name: '影像',  //影像显示的名称
                //     type: '',  //服务类型，是wms、wmts、一般瓦片(默认)等
                //     visible: true,//初始化时是否默认展示，若不设置，默认展示第一个
                //     config: [{
                //         url: '',
                //         options: {},
                //     }]
                // }
            },
        },
    },
    data() {
        return {
            randomNum: Math.random(),
            layerComp: null,
            // layerComp: () => import('../../tileLayer'),
            serviceType: "tileLayer",
            serviceTypeList: [
                "tileLayer",
                "wmsTileLayer",
                "wmtsTileLayer",
                "videoOverlay",
                "imageOverlay",
            ],
            // 矢量 地形 影像 地球/三维
            // typeNameList: ['vector', 'terrain', 'image', 'earth'],
            typeNameObj: {
                vector: "矢量",
                terrain: "地形",
                image: "影像",
                earth: "地球",
            },
            visibleIndex: 0,
            currentLayerOptions: null,
            mapTypeList: null,
        };
    },
    computed: {
        positionClass() {
            let dToB = this.dToB,
                position = this.position;
            dToB = Array.isArray(dToB) ? dToB : dToB.split(" ");
            let x = dToB[0];
            let y = dToB.length == 1 ? x : dToB[1];
            let xClass = position.includes("left") ? "left" : "right";
            let yClass = position.includes("top") ? "top" : "bottom";
            return {
                [xClass]: x,
                [yClass]: y,
            };
        },
    },
    watch: {
        layersOptions: {
            deep: true,
            immediate: true,
            handler(newVal, oldVal) {
                this.dealOptions(true);
                this.getMapTypeList();
            },
        },
    },
    methods: {
        // 改变显示哪一个底图
        /**
         * 在调用组件时，定制化切换按钮图像时，可调用改方法
         * data: object,配置项内内容，一定要包含type属性，即底图服务类型，如{type:wmts}
         * index: 第几个配置项，非必传，主要是节约资源，禁止不必要的渲染、切换
         */
        changeBaseLayer(data, index) {
            debugger;
            if (index != undefined && index === this.visibleIndex) {
                return false;
            }
            let lastType = this.serviceType;
            this.visibleIndex = index;
            if (type.type != this.serviceType) {
                this.getLayerComp();
            }
            this.dealOptions();
            this.$nextTick(() => {
                this.randomNum = Math.random();
                this.$forceUpdate();
            });
        },
        handleChangeType(type, tIndex) {
            if (tIndex === this.visibleIndex) return false;
            let lastType = this.serviceType;
            this.visibleIndex = tIndex;
            if (type.type != this.serviceType) {
                this.getLayerComp();
            }
            this.dealOptions();
            this.$nextTick(() => {
                this.randomNum = Math.random();
                this.$forceUpdate();
            });
            this.$emit("changeType", type, lastType);
        },
        // 处理参数的数据结果，isFirst是否是第一次处理调用
        dealOptions(isFirst = false) {
            let layersOptions = this.layersOptions;
            if (Array.isArray(layersOptions)) {
                if (isFirst) {
                    let visibleIndex = layersOptions.findIndex(
                        (options) => options.visible
                    );
                    visibleIndex = visibleIndex > -1 ? visibleIndex : 0;
                    this.visibleIndex = visibleIndex;
                }
                layersOptions = layersOptions[this.visibleIndex];
            }
            this.currentLayerOptions = layersOptions.config || layersOptions;
            this.getLayerComp();
        },
        getMapTypeList() {
            this.mapTypeList = null;
            let layersOptions = this.layersOptions;
            if (Array.isArray(layersOptions)) {
                let typeNameObj = this.typeNameObj;
                this.mapTypeList = layersOptions.map((item, index) => {
                    let { nameClass, name } = item;
                    if (nameClass && !name && typeNameObj[nameClass]) {
                        name = typeNameObj[nameClass];
                    } else {
                        console.warn(
                            `l-base-layer组件的layersOptions属性的第${index}个参数尚未配置"nameClass"或"name",请补全参数`
                        );
                    }
                    return { nameClass, name, ...item };
                });
            }
        },
        getLayerComp() {
            if (!this.currentLayerOptions) return false;

            let layersOptions = this.layersOptions;
            let serviceType =
                (Array.isArray(layersOptions)
                    ? layersOptions[this.visibleIndex].type
                    : layersOptions.type) || "tileLayer";
            this.serviceType = serviceType;
            let serviceTypeList = this.serviceTypeList;
            // console.log('--serviceType--', serviceType);

            if (serviceTypeList.includes(serviceType)) {
                this.layerComp = require(`../../${serviceType}`).default;
            } else {
                console.error(
                    `该组件不支持您传递的"${serviceType}"服务类型,请检查\n提示：该组件支持的服务类型有:${serviceTypeList}`
                );
            }
        },
        // initLeafletObject() {
        //     // this.selfOptions = extend(this.originOptions, this.options, this.$attrs);
        //     // this.self = featureGroup(this.layersArr, this.selfOptions);

        //     // this.initFunction();
        // },
    },
    mounted() {
        // this.initLeafletObject();
        // this.getLayerComp();
    },
};
</script>

<style scoped>
.rel {
    position: relative;
}

.map-type-wrap {
    position: absolute;
    /* top: 20px; */
    /* right: 20px; */
    z-index: 999;
}

.map-type {
    display: flex;
    padding: 7px 4px 8px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 6px #cccccc;
}

.map-type-item {
    width: 68px;
    height: 63px;
    position: relative;
    margin: 0 4px;
    border: 2px solid rgba(0, 0, 0, 0);
    border-radius: 2px;
    background-repeat: no-repeat;
}

.map-type-item.vector,
.map-type-item.terrain,
.map-type-item.image,
.map-type-item.earth {
    /* background-image: url('./../../../../image/icon.png'); */
    background-image: url("./icon.png");
}

/* 'vector', 'terrain', 'image', 'earth' */
.map-type-item.vector {
    background-position: -240px -53px;
}

.map-type-item.terrain {
    background-position: -84px -53px;
}

.map-type-item.image {
    background-position: -162px -53px;
}

.map-type-item.earth {
    background-position: -6px -53px;
}

.map-type-item span {
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    padding: 3px 6px 2px 5px;
    font-size: 12px;
    height: 17px;
    line-height: 12px;
    color: #fff;
    border-top-right-radius: 2px;
    background-color: rgba(0, 0, 0, 0.6);
}

.map-type-item.active {
    border: 2px solid #1890ff;
}

.map-type-item:hover span,
.map-type-item.active span {
    background-color: #1890ff;
}
</style>
