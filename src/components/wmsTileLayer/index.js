import LWmsTileLayer from './src/main.vue';

/* istanbul ignore next */
LWmsTileLayer.install = function(Vue) {
    Vue.component(LWmsTileLayer.name, LWmsTileLayer);
};

export default LWmsTileLayer;