<template>
    <div>
        <slot v-if="ready"></slot>
    </div>
</template>

<script>
    import Options from '../../../mixins/Options.js';
    import { WMTS } from '../../../mapPlugin/WMTS.js';
    // import { DomEvent, extend } from 'leaflet';
    import * as L from 'leaflet';
    const DomEvent = L.DomEvent;
    const extend = L.extend;


    export default {
        name: 'LWmtsTileLayer',
        inject: ['lMap'],
        mixins: [Options],
        inheritAttrs: false,
        props: {
            url: {
                type: String,
                default: null,
            }
        },
        data() {
            return {
                originOptions: {}
            };
        },
        methods: {
            initLeafletObject() {
                let crs = this.lMap.crs;
				// matrixIdsObj一定要放在this.options之前，确保配置出来的优先级最高
				let matrixIdsObj = {};
				if(crs=='EPSG3857'){
					var matrixIds3857 = new Array(22);
					for (var i = 0; i < 22; i++) {
						matrixIds3857[i] = {
								identifier:i,
								topLeftCorner: new L.LatLng(20037508.39, -20037508.39)
						};
					}
					matrixIdsObj = {matrixIds: matrixIds3857}
				}
                this.selfOptions = extend(this.originOptions, matrixIdsObj, this.options, this.$attrs);
                this.self = WMTS(this.url, this.selfOptions);

                this.initFunction();
            },
        },
        mounted() {
            this.initLeafletObject();
        }

    }
</script>