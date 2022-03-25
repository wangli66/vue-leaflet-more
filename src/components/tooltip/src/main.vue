<template>
    <div><slot></slot></div>
</template>

<script>
    import { propsBinder, methodsBinder,findRealParent } from '../../../utils/utils.js';
    import Options from '../../../mixins/Options.js';
    import {DomEvent, tooltip, latLng, extend } from 'leaflet';

    export default {
        name: 'LTooltip',
        inject: ['lMap'],
        mixins: [Options],
        inheritAttrs: false,
        props: {
            addToMap:{
                type: Boolean,
                default: false
            },
            content:{
                custom:true,
                type: [Object, String, Function]
            }
        },
        data() {
            return {
                originOptions: {},
                parentDom: null
            };
        },
        methods: {
            setContent(newVal) {
                if (this.self && newVal !== null && newVal !== undefined) {
                    this.self.setContent(newVal);
                }
            },
            // 初始化共有功能
            initFunction() {
                if (!this.self) return false;

                // 当前leaflet对象加入父级或根map中
                let parentDom = this.addToMap?this.lMap:this.$parent;
                if(!parentDom.self){
                    parentDom = findRealParent(this);
                }
                this.parentDom = parentDom;
                this.self.setContent(this.content ||  this.$el);
                parentDom.self.bindTooltip(this.self);
               
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
                    this.$emit('ready', this.self, this.selfOptions);
                });
            },
            initLeafletObject() {
                this.selfOptions = extend(this.originOptions, this.options, this.$attrs);
                this.self = tooltip(this.selfOptions,this.layer);
                
                this.initFunction();
            },
        },
        mounted() {
            this.initLeafletObject();
        },
        beforeDestroy() {
            if (this.parentDom) {
                if (this.parentDom.unbindTooltip) {
                    this.parentDom.unbindTooltip();
                } else if (
                    this.parentDom.self &&
                    this.parentDom.self.unbindTooltip
                ) {
                    this.parentDom.self.unbindTooltip();
                }
            }
        },
    }
</script>