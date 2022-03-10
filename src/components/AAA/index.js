import LPolyline from './src/main.vue';

/* istanbul ignore next */
LPolyline.install = function(Vue) {
    Vue.component(LPolyline.name, LPolyline);
};

export default LPolyline;