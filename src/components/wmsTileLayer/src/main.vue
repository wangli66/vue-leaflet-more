<template>
    <div>
        <slot v-if="ready"></slot>
    </div>
</template>

<script>
    import Options from '../../../mixins/Options.js';
    // import { tileLayer, extend } from 'leaflet';
    import * as L from 'leaflet';
    const tileLayer = L.tileLayer;
    const extend = L.extend;


    export default {
        name: 'LWmsTileLayer',
        inject: ['lMap'],
        mixins: [Options],
        inheritAttrs: false,
        props: {
            url: {
                type: String,
                default: null,
            },
            params: {
                type: Object,
                default () {
                    return {
                        format: 'image/png',
                        transparent: true,
                    }
                }
            }
        },
        data() {
            return {
                originOptions: {}
            };
        },
        methods: {
            setOptions(newVal, oldVal) {

            },
            initLeafletObject() {
                this.selfOptions = extend(this.originOptions, this.options, this.params, this.$attrs);
                this.self = tileLayer.wms(this.url, this.selfOptions);

                this.initFunction();
            },

        },
        mounted() {
            this.initLeafletObject();
        }
    }
</script>