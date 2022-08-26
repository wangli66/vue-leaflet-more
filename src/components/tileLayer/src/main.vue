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
        name: 'LTileLayer',
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
                this.selfOptions = extend(this.originOptions, this.options, this.$attrs);
                this.self = tileLayer(this.url, this.selfOptions);

                this.initFunction();
            },

        },
        mounted() {
            this.initLeafletObject();
        }
    }
</script>