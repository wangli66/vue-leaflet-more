<template>
    <div style="display: none;"></div>
</template>

<script>
    import Options from '../../../mixins/Options.js';
    import { geoJSON, extend } from 'leaflet';


    export default {
        name: 'LGeoJson',
        inject: ['lMap'],
        mixins: [Options],
        inheritAttrs: false,
        props: {
            geojson: {
                type: [Array, Object],
                default: () => ({})
            },
            isFitBounds: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                originOptions: {}
            };
        },
        methods: {
            addData(data) {
                this.self.addData(data);
            },
            resetStyle(layer) {
                this.self.resetStyle(layer);
            },
            setStyle(style) {
                this.self.setStyle(style);
            },
            initLeafletObject() {
                this.selfOptions = extend(this.originOptions, this.options, this.$attrs);
                this.self = geoJSON(this.geojson, this.selfOptions);

                this.initFunction();

                this.$nextTick(() => {
                    this.isFitBounds && this.lMap.self.fitBounds(this.self.getBounds());
                });
            }
        },
        mounted() {
            this.initLeafletObject();
        }
    }
</script>