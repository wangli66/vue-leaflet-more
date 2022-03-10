import LPolygon from './src/main.vue';

/* istanbul ignore next */
LPolygon.install = function(Vue) {
    Vue.component(LPolygon.name, LPolygon);
};

export default LPolygon;