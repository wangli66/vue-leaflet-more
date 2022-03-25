import LMarker from './src/main.vue';

/* istanbul ignore next */
LMarker.install = function(Vue) {
    Vue.component(LMarker.name, LMarker);
};

export default LMarker;