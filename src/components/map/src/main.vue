<template>
    <div :id="id" class="leaflet-map-container" :style="customStyle" :class="customClass">
        <slot v-if="ready"></slot>
    </div>
</template>

<script>
    import Options from '../../../mixins/Options.js';
    import { propsBinder, methodsBinder } from '../../../utils/utils.js';
    import { wktToGeoJSON, geojsonToWKT } from "@terraformer/wkt"
    // import { CRS, DomEvent, map, extend, latLngBounds, latLng } from 'leaflet';
    import * as L from 'leaflet';
    const CRS = L.CRS;
    const DomEvent = L.DomEvent;
    const map = L.map;
    const extend = L.extend;
    const latLngBounds = L.latLngBounds;
    const latLng = L.latLng;

    export default {
        name: 'LMap',
        mixins: [Options],
        inheritAttrs: false,
        provide: function() {
            return {
                lMap: this
            }
        },
        props: {
            id: {
                type: String,
                default: 'map',
                require: true,
            },
            customStyle: {
                type: Object,
                default () {
                    return {
                        'height': '100%',
                        'width': '100%',
                        'min-height': '100px',
                        'border': '1 px solid# ccc',
                    }
                }
            },
            customClass: {
                type: [String, Object, Array]
            },
            crs: {
                type: [Object, String],
                validator: function(value) {
                    if (typeof value == 'string') {
                        return CRS[value]
                    } else {
                        return value;
                    }
                },
            }
        },
        data() {
            return {
                originOptions: {
                    // crs: CRS.EPSG4326,
                    // CRS.EPSG3857 默认
                    zoomControl: false,
                    attributionControl: false,
                    // center: [36.982253, 106.1312172],
                    center: [29.726219990152643, 114.43604336967388],
                    zoom: 4,
                    minZoom: 1,
                    maxZoom: 14,
                },
                map: null,
                // 确保dom节点存在
                timer: null,
                timerNum: 0
            };
        },
        methods: {
            geojsonToWKT(geoJSON) {
                return geojsonToWKT(geoJSON);
            },
            wktToGeoJSON(wkt) {
                return wktToGeoJSON(wkt);
            },
            // 使用过程中，
            getMap() {
                return this.map;
            },
            // 确定map的容器存在
            ensureMapDom() {
                let mapDom = document.getElementById(this.id);
                if (mapDom) {
                    this.initMap();
                } else {
                    this.$nextTick(() => {
                        try {
                            if (this.timerNum >= 10) {
                                throw Error('您的map承载容器的id未找到，请传入正确的id。');
                            }
                            this.timer = setTimeout(() => {
                                this.ensureMapDom();
                                this.timerNum++;
                            }, 100);
                        } catch (err) {
                            throw Error(err);
                        }
                    });
                }
            },
            // 初始化map
            initMap() {
                let crs = this.crs;
                let crsObj = crs ? { crs: (typeof crs == 'string' ? CRS[crs] : crs) } : {};
                this.selfOptions = extend(this.originOptions, this.options, this.$attrs, crsObj);

                this.map = map(this.$el, this.selfOptions);
                this.self = this.map;

                DomEvent.on(this.self, this.$listeners);
                // propsBinder(this, this.map, this.$attrs);
                propsBinder(this, this.map, this.$options.props);
                propsBinder(this, this.map, {}, this.options);

                this.$nextTick(() => {
                    this.ready = true;
                    this.useSelfMethods && methodsBinder(this, this.self);
                    // 监听当前组件实例化后
                    this.$emit('ready', this.map, this.selfOptions);
                });
            },
        },
        mounted() {
            this.ensureMapDom();
        },
        // beforeDestroy() {
        //     this.map && this.map.remove();
        // },
    }
</script>

<style>
    .leaflet-map-container * {
        box-sizing: border-box;
    }
</style>