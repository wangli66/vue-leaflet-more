<template>
    <div v-if="ready">
        <slot></slot>
    </div>
</template>

<script>
    import Options from '../../../mixins/Options.js';
    import { marker, icon, extend } from 'leaflet';
    import iconUrl from 'leaflet/dist/images/marker-icon.png';
    import iconShadow from 'leaflet/dist/images/marker-shadow.png';

    export default {
        name: 'LMarker',
        inject: ['lMap'],
        mixins: [Options],
        inheritAttrs: false,
        props: {
            latlng: {
                type: [Array, Object],
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
                if(this.selfOptions.icon==undefined){
                    this.selfOptions.icon =  icon({
                        iconUrl: iconUrl,
                        shadowUrl: iconShadow,
                        iconAnchor: [12, 38],
                    });
                }
                this.self = marker(this.latlng, this.selfOptions);

                this.initFunction();
            },

        },
        mounted() {
            this.initLeafletObject();
        }
    }
</script>