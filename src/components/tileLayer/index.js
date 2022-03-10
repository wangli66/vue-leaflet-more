import LTileLayer from './src/main.vue';

/* istanbul ignore next */
LTileLayer.install = function(Vue) {
    Vue.component(LTileLayer.name, LTileLayer);
};

export default LTileLayer;