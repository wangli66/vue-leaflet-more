// import vueLeafletMore from '../../src/index.js';

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
    isServer, // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
    if (isServer) {
        Vue.mixin({
            mounted() {
                import('../../src/index.js').then(module => {
                    Vue.use(module.default);
                }).catch(err => {
                    console.log(err);
                });
            },
        })
    } else {
        import('../../src/index.js').then(module => {
            Vue.use(module.default);
        }).catch(err => {
            console.log(err);
        });
    }
};