<template>
    <div>
        <slot v-if="ready"></slot>
    </div>
</template>

<script>
    import Options from '../../../mixins/Options.js';
    import { imageOverlay, extend } from 'leaflet';


    export default {
        name: 'LImageOverlay',
        inject: ['lMap'],
        mixins: [Options],
        inheritAttrs: false,
        props: {
            url: {
                type: String,
                default: null,
            },
            bounds: {
                type: [Object, Array]
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
                this.self = imageOverlay(this.url, this.bounds, this.selfOptions)

                this.initFunction();
            },

        },
        mounted() {
            this.initLeafletObject();
        }
    }
</script>