<template>
    <div style="display: none">
        <slot v-if="ready" />
    </div>
</template>

<script>
    import Options from "../../../mixins/Options.js";
    // import { featureGroup, extend } from "leaflet";
    import * as L from 'leaflet';
    const featureGroup = L.featureGroup;
    const extend = L.extend;

    export default {
        name: "LFeatureGroup",
        inject: ["lMap"],
        mixins: [Options],
        inheritAttrs: false,
        props: {
            layersArr: {
                type: Array,
                default () {
                    return [];
                },
            },
        },
        data() {
            return {
                originOptions: {},
            };
        },
        methods: {
            initLeafletObject() {
                this.selfOptions = extend(this.originOptions, this.options, this.$attrs);
                this.self = featureGroup(this.layersArr, this.selfOptions);

                this.initFunction();
            },
        },
        mounted() {
            this.initLeafletObject();
        },
    };
</script>