<template>
    <div style="display: none;">
        <slot v-if="ready" />
    </div>
</template>

<script>
    import Options from '../../../mixins/Options.js';
    // import { layerGroup, extend } from 'leaflet';
    import * as L from 'leaflet';
    const layerGroup = L.layerGroup;
    const extend = L.extend;


    export default {
        name: 'LLayerGroup',
        inject: ['lMap'],
        mixins: [Options],
        inheritAttrs: false,
        props: {
            layersArr: {
                type: Array,
                default () {
                    return []
                },
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
                this.self = layerGroup(this.layersArr, this.selfOptions);

                this.initFunction();
            },

        },
        mounted() {
            this.initLeafletObject();
        }
    }
</script>