import LTooltip from './src/main.vue';

/* istanbul ignore next */
LTooltip.install = function(Vue) {
    Vue.component(LTooltip.name, LTooltip);
};

export default LTooltip;