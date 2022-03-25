import LPopup from './src/main.vue';

/* istanbul ignore next */
LPopup.install = function(Vue) {
    Vue.component(LPopup.name, LPopup);
};

export default LPopup;