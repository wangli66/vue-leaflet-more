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
                this.selfOptions = extend(this.originOptions, this.options, this.$attrs);
                this.self = WMTS(this.url, this.selfOptions)

                this.initFunction();
            },
        },
        mounted() {
            this.initLeafletObject();
        }

    }
</script>