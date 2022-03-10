import { propsBinder, methodsBinder, addToParentElement } from '../utils/utils.js';
import { DomEvent } from 'leaflet';

export default {
    props: {
        // 初始化组件的参数
        options: {
            type: Object,
            default: () => ({})
        },
        // 添加到根节点,true添加到map实例化对象总，false添加到父级元素中
        addToMap: {
            type: Boolean,
            default: true
        },
        // 是否使用leaflet相关对象的方法，默认false，性能优化；true使用，可以this.$refs['组件refName'].XXX直接调用
        useSelfMethods: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            // 当前组件是否已经准备好，是否已经加载完毕
            ready: false,
            // 当个组件的初始化参数
            selfOptions: {},
            // 指向leaflet中的组件，map组件的self指向L.map对象,tileLayer组件的self指向L.tileLayer对象
            self: null,
        }
    },
    methods: {
        getOptions() {
            return this.selfOptions;
        },
        getSelf() {
            return this.self;
        },
        // 初始化共有功能
        initFunction() {
            if (!this.self) return false;

            // 当前leaflet对象加入父级或根map中
            addToParentElement(this, this.lMap);

            // 继承当前leaflet对象的方法
            DomEvent.on(this.self, this.$listeners);

            // 响应式参数处理
            propsBinder(this, this.self, this.$options.props);
            propsBinder(this, this.self, {}, this.options);

            this.$nextTick(() => {
                this.ready = true;
                // 是否支持原方法
                this.useSelfMethods && methodsBinder(this, this.self);
                // 监听当前组件实例化后
                this.$emit('ready', this.map, this.selfOptions);
            });
        }
    }
};