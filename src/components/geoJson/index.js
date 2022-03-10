import LGeoJson from './src/main.vue';

/* istanbul ignore next */
LGeoJson.install = function(Vue) {
    Vue.component(LGeoJson.name, LGeoJson);
};

export default LGeoJson;