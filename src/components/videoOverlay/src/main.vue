<template>
    <div>
        <slot v-if="ready"></slot>
    </div>
</template>

<script>
    import Options from '../../../mixins/Options.js';
    import { videoOverlay, extend } from 'leaflet';


    export default {
        name: 'LVideoOverlay',
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
                this.self = videoOverlay(this.url, this.bounds, this.selfOptions)

                this.initFunction();
            }
        },
        mounted() {
            this.initLeafletObject();
        }
    }
</script>