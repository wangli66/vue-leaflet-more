import LMap from './src/main.vue';

/* istanbul ignore next */
LMap.install = function(Vue) {
    Vue.component(LMap.name, LMap);
};

export default LMap;