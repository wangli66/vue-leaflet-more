import LWmtsTileLayer from './src/main.vue';

/* istanbul ignore next */
LWmtsTileLayer.install = function(Vue) {
    Vue.component(LWmtsTileLayer.name, LWmtsTileLayer);
};

export default LWmtsTileLayer;