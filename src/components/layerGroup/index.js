import LLayerGroup from './src/main.vue';

/* istanbul ignore next */
LLayerGroup.install = function(Vue) {
    Vue.component(LLayerGroup.name, LLayerGroup);
};

export default LLayerGroup;