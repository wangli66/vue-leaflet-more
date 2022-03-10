import { imageOption } from "../map/provideBaseLayer.js";

export default {
    data() {
        return {
            originOptions: {
                crs: L.CRS.EPSG4326,
                zoomControl: false,
                attributionControl: false,
                center: [36.982253, 106.1312172],
                zoom: 4,
                minZoom: 1,
                maxZoom: 14,
                doubleClickZoom: false,
                // doubleClickZoom: false,
            },
            options: {},
            // 定时器，保证标签元素加载进来后再进行地图的初始化
            timer: null,
            timerNum: 0,
            // 地图的图层，基础底图，编辑图层
            mymap: null,
            baseLayer: null,
            editLayer: null,
        }
    },
    methods: {
        initMap() {
            let id = this.id;
            this.mymap = L.map(id, this.options);

            // 底图
            this.baseLayer = L.featureGroup();
            this.mymap.addLayer(this.baseLayer);

            // 编辑图层
            this.editLayer = L.featureGroup();
            this.mymap.addLayer(this.editLayer);
        },
        // 确定map的容器存在
        ensureMapDom() {
            let idName = this.id;
            let mapDom = document.getElementById(idName);
            if (mapDom) {
                this.initMap();
            } else {
                this.$nextTick(() => {
                    if (this.timerNum >= 10) return false;
                    this.timer(() => {
                        this.ensureMapDom();
                        this.timerNum++;
                    }, 100);
                });
            }
        }
    },
    mounted() {
        this.options = L.extend({}, this.originOptions, this.mapOptions, this.$attrs);
        this.ensureMapDom();
    },
    beforeDestroy() {
        this.timer && clearTimeout(this.timer);
        this.mymap && this.mymap.remove();
    }
}