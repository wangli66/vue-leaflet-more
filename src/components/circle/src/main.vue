<template>
    <div v-if="ready" />
</template>

<script>
    import Options from '../../../mixins/Options.js';
    import { circle, extend } from 'leaflet';


    export default {
        name: 'LCircle',
        inject: ['lMap'],
        mixins: [Options],
        inheritAttrs: false,
        props: {
            latlng: {
                type: [Array, Object],
                default: null,
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
            initLeafletObject() {
                this.selfOptions = extend(this.originOptions, this.options, this.$attrs);
                this.self = circle(this.latlng, this.selfOptions);

                this.initFunction();

                this.$nextTick(() => {
                    this.isFitBounds && this.lMap.self.fitBounds(this.self.getBounds());
                });
            },

        },
        mounted() {
            this.initLeafletObject();
        }
    }
</script>