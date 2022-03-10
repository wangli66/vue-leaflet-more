import LVideoOverlay from './src/main.vue';

/* istanbul ignore next */
LVideoOverlay.install = function(Vue) {
    Vue.component(LVideoOverlay.name, LVideoOverlay);
};

export default LVideoOverlay;