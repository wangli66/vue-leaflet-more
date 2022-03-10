import LDrawLayer from './src/main.vue';

/* istanbul ignore next */
LDrawLayer.install = function(Vue) {
    Vue.component(LDrawLayer.name, LDrawLayer);
};

export default LDrawLayer;