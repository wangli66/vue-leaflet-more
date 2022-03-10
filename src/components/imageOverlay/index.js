import LImageOverlay from './src/main.vue';

/* istanbul ignore next */
LImageOverlay.install = function(Vue) {
    Vue.component(LImageOverlay.name, LImageOverlay);
};

export default LImageOverlay;