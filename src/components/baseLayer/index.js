import LBaseLayer from './src/main.vue';

/* istanbul ignore next */
LBaseLayer.install = function(Vue) {
    Vue.component(LBaseLayer.name, LBaseLayer);
};

export default LBaseLayer;