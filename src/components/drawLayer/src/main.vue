<template>
    <div class="l-draw-layer">
        <div class="map-draw-wrap" :style="positionClass">
            <div class="map-draw" @click.stop @mousemove.stop>
                <div class="map-draw-item" :class="[d.type, { active: d.type == editType }]" @click="handleDrawShape(d)"
                    v-for="(d, i) of drawList" :key="'draw-type-' + i" :title="d.title"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { propsBinder, methodsBinder } from '../../../utils/utils.js'
    import Options from '../../../mixins/Options.js'
    import drawMixin from '../../../mixins/drawMixin.js'
    import { polyline, extend } from 'leaflet'
    import { geojsonToWKT } from '@terraformer/wkt'

    export default {
        name: 'LDrawLayer',
        inject: ['lMap'],
        mixins: [Options, drawMixin],
        inheritAttrs: false,
        props: {
            dToB: {
                type: [String, Array],
                default: '10px 80px',
            },
            position: {
                type: String,
                default: 'topleft',
                validator: function(value) {
                    return (
                        ['topleft', 'topright', 'bottomleft', 'bottomright'].indexOf(
                            value
                        ) !== -1
                    )
                },
            },
            // 是否绘制多个图形
            drawShapeMore: {
                type: Boolean,
                custom: true,
                default: true,
            },
            // 绘制时的参数
            drawOptions: {
                type: [Array, Object],
                default: () => [
                    'marker',
                    'circleMarker',
                    'rectangle',
                    'polygon',
                    'circle',
                    'polyline',
                    'delete',
                ],
                // 校验数据格式
                validator: function(value) {
                    let b = true
                    if (Array.isArray(value)) {
                        b = value.every(
                            (item) => typeof item == 'string' || item.type != undefined
                        )
                    }
                    return b
                },
                // object {type:'',style:{},mode:'',measure:false}
                // array  ['']||[{}]
            },
            commonStyle: {
                type: Object,
                default: () => ({
                    color: '#4c7efd',
                    weight: 1,
                }),
            },
            commonIconStyle: {
                type: Object,
                default: () => ({}),
            },
            // 是否测量绘制面积
            measure: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                // typeArr: ['rectangle', 'polygon', 'circle', 'polyline', 'delete'],
                drawList: [],
                originOptions: {
                    marker: {
                        title: '标记',
                        // style: {},
                    },
                    circleMarker: {
                        title: '圆形标记',
                        // style: {},
                    },
                    rectangle: {
                        title: '绘制矩形',
                        // style: {},
                    },
                    rectangleMeasure: {
                        title: '绘制测量矩形',
                        // style: {},
                    },
                    polygon: {
                        title: '绘制多边形',
                        // style: {},
                    },
                    polygonMeasure: {
                        title: '绘制测量多边形',
                        // style: {},
                    },
                    circle: {
                        title: '绘制圆形',
                    },
                    polyline: {
                        title: '绘制多线段',
                    },
                    polylineMeasure: {
                        title: '绘制测量多线段',
                    },
                    delete: {
                        title: '清除图层',
                    },
                },
                renderDrawObj: {},
                mapObject: null,
                drawLayer: null,
                editable: false,
                // editTypeArr: ['rectangle', 'polygon', 'circle', 'polyline'],
                editType: '', //rectangle
                // drawShapeMore: true, //是否绘制多个图形,默认一次只绘制一个
                isMeasure: this.measure, //是否测量
                // drawStyle: { color: '#4c7efd', weight: 1 }, //绘制时的样式
            }
        },
        watch: {
            drawOptions: {
                deep: true,
                immediate: true,
                handler(newVal, oldVal) {
                    let originOptions = this.originOptions
                    let typeArr = this.typeArr
                    let arr = Array.isArray(newVal) ? newVal : Object.keys(newVal)
                    this.renderDrawObj = {}
                    this.drawList = arr.map((item) => {
                        if (!typeArr.includes(item.type || item)) {
                            console.error(
                                `绘制组件暂不支持"${item}"的绘制类型，请查看文档后重新定义\n支持的绘制类型有：${typeArr}`
                            )
                            return false
                        }
                        let obj = {}
                        let varType = typeof item
                        let curOriginObj = originOptions[item] || originOptions[item.type]
                        if (varType === 'string') {
                            obj.type = item
                            if (newVal[item]) {
                                obj = { ...obj, ...newVal[item] }
                            }
                            obj = { ...curOriginObj, ...obj }
                        } else if (varType === 'object') {
                            obj = { ...curOriginObj, ...item }
                        }
                        this.renderDrawObj[obj.type] = obj
                        return obj
                    })
                    // console.log('---this.drawLis', this.drawList)
                },
            },
        },
        computed: {
            typeArr() {
                return Object.keys(this.originOptions)
            },
            drawStyle() {
                let style = { color: '#4c7efd', weight: 1 }
                let editType = this.editType
                let renderDrawObj = this.renderDrawObj
                let curStyle = renderDrawObj[editType].style || {}
                return { style, ...this.commonStyle, ...curStyle }
            },
            drawIconStyle() {
                let editType = this.editType
                let renderDrawObj = this.renderDrawObj
                let curStyle = renderDrawObj[editType].iconStyle || {}
                return { ...this.commonIconStyle, ...curStyle }
            },
            positionClass() {
                let dToB = this.dToB,
                    position = this.position
                dToB = Array.isArray(dToB) ? dToB : dToB.split(' ')
                let x = dToB[0]
                let y = dToB.length == 1 ? x : dToB[1]
                let xClass = position.includes('left') ? 'left' : 'right'
                let yClass = position.includes('top') ? 'top' : 'bottom'
                return {
                    [xClass]: x,
                    [yClass]: y,
                }
            },
        },
        methods: {
            handleDrawShape(shapeInfo) {
                let { type } = shapeInfo
                this.initDrawShapeStatus(false)
                if (type == 'delete') {
                    this.clearLayers()
                    return false
                }
                if (!this.drawShapeMore) {
                    this.clearLayers(true)
                }
                this.getIsMeasure(shapeInfo)
                let typeSame = this.editType == type
                this.editType = typeSame ? '' : type
                this.setEditable(!typeSame)
                this.$emit('changeType', shapeInfo)
            },
            getIsMeasure(shapeInfo) {
                this.isMeasure =
                    shapeInfo.measure != undefined ? shapeInfo.measure : this.measure
            },
            // 设置是否可编辑  editable为布尔值
            setEditable(editable) {
                this.clearMarker()
                this.editable = editable
            },
            // 清除图层  onlyClear：false->仅清除图层,true->清除图层加还原操作项
            clearLayers(onlyClear = false) {
                if (!onlyClear) {
                    this.editType = ''
                }
                this.setEditable(false)
                this.drawLayer && this.drawLayer.clearLayers()
            },
            //得到绘制图层
            getDrawLayers(type) {
                let drawLayer = this.drawLayer
                // 后续开发此项功能
                if (type && this.typeArr.includes(type)) {
                    // debugger
                    drawLayer.eachLayer((layer) => {
                        console.log(layer)
                    })
                }
                return drawLayer.getLayers()
            },
            // 得到绘制图层
            getDrawLayer() {
                return this.drawLayer
            },
            // 得到所有绘制的feature
            getFeatures() {
                let geoJSON = this.drawLayer.toGeoJSON()
                return geoJSON.features || []
            },
            // 将绘制图形的数据转化为GeometryCollection的wkt格式
            toWKT(geoJSON) {
                if (!geoJSON) {
                    geoJSON = this.getFeatures()
                    let arr = geoJSON.map((item) => item.geometry)
                    geoJSON = {
                        type: 'GeometryCollection',
                        geometries: arr,
                    }
                }
                return geojsonToWKT(geoJSON)
            },
            toWktArray() {
                let geoJSON = this.getFeatures()
                return geoJSON.map((item) => geojsonToWKT(item.geometry))
            },

            // 一个图形绘制结束后，状态初始化，可用来检测图形绘制结束
            // handleInitDrawShapeStatus(tempDrawing) {
            //     let shapeLayer = tempDrawing;
            //     this.$emit('emitDrawShapeFinish', shapeLayer);
            // },
            // 开始绘制
            emitStartDraw(coords) {
                this.$emit('startDraw', coords, this.editType)
            },
            // 正在绘制中
            emitDrawing(tempDrawing, handler, coords) {
                this.$emit('drawing', tempDrawing, handler, coords)
            },
            // 结束绘制
            emitFinishDraw(tempDrawing) {
                if (!this.drawShapeMore) {
                    this.editType = '';
                    this.setEditable(false);
                }
                this.$emit('finishDraw', tempDrawing)
            },
            // 初始化组件对象
            initLeafletObject() {
                this.mapObject = this.lMap.self
                this.drawLayer = L.featureGroup()
                this.mapObject.addLayer(this.drawLayer)

                this.mapObject.on('click', this.onMapClick)
                this.mapObject.on('mousemove', this.onMapMousemove)

                // 响应式参数处理
                propsBinder(this, this.drawLayer, this.$options.props)
                propsBinder(this, this.drawLayer, {}, this.options)

                this.$nextTick(() => {
                    this.ready = true
                    // 是否支持原方法
                    this.useSelfMethods && methodsBinder(this, this.drawLayer)
                    // 监听当前组件实例化后
                    this.$emit('ready', this.mapObject, this.selfOptions)
                })
            },
        },
        mounted() {
            this.initLeafletObject()
        },
    }
</script>

<style>
    .my-measure-icon {
        border: none;
    }

    .my-measure-icon .tips {
        display: inline-block;
        padding: 6px 12px;
        border: 1px solid #cccccc;
        box-shadow: 0 0 3px #cccccc;
        background-color: #ffffff;
        white-space: nowrap;
        font-size: 14px;
        line-height: 1.5;
        transform: translateX(-50%);
    }

    .my-measure-icon .tips-top {
        position: relative;
        top: -38px;
    }
</style>

<style scoped>
    .map-draw-wrap {
        position: absolute;
        /* top: 20px; */
        /* right: 20px; */
        z-index: 999;
    }

    .map-draw-wrap .map-draw {
        width: 34px;
        background-color: rgba(255, 255, 255, 1);
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }

    .map-draw-wrap .map-draw-item {
        width: 100%;
        height: 34px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        position: relative;
        cursor: pointer;
        background-size: 18px 18px;
        background-repeat: no-repeat;
        background-position: center;
    }

    .map-draw-wrap .map-draw-item.active,
    .map-draw-wrap .map-draw-item:hover {
        /* background-color: #f4f4f4; */
        box-shadow: inset 0 -1px 5px 2px rgb(199 199 199);
    }

    .map-draw-wrap .map-draw-item:last-child {
        border-bottom: none;
    }

    .map-draw-wrap .map-draw-item.polyline {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNOS4xNjUgMTkuNDJsOS4yNTYtOS4yNTVhMy41IDMuNSAwIDExMS40MTQgMS40MTRsLTkuMjU2IDkuMjU2YTMuNSAzLjUgMCAxMS0xLjQxNC0xLjQxNHpNMjEuNSAxMGExLjUgMS41IDAgMTAwLTMgMS41IDEuNSAwIDAwMCAzem0tMTQgMTRhMS41IDEuNSAwIDEwMC0zIDEuNSAxLjUgMCAwMDAgM3oiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMyAtMykiPjxtYXNrIGlkPSJiIiBmaWxsPSIjZmZmIj48dXNlIHhsaW5rOmhyZWY9IiNhIi8+PC9tYXNrPjx1c2UgZmlsbD0iIzVCNUI1QiIgZmlsbC1ydWxlPSJub256ZXJvIiB4bGluazpocmVmPSIjYSIvPjxnIGZpbGw9IiM1QjVCNUIiIG1hc2s9InVybCgjYikiPjxwYXRoIGQ9Ik0wIDBoMzB2MzBIMHoiLz48L2c+PC9nPjwvc3ZnPg==);
    }

    .map-draw-wrap .map-draw-item.rectangle {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNMjMgMTAuOTY1djguMDdBMy41IDMuNSAwIDExMTkuMDM1IDIzaC04LjA3QTMuNSAzLjUgMCAxMTcgMTkuMDM1di04LjA3QTMuNSAzLjUgMCAxMTEwLjk2NSA3aDguMDdBMy41IDMuNSAwIDExMjMgMTAuOTY1em0tMi0uMzAyQTMuNTE0IDMuNTE0IDAgMDExOS4zMzcgOWgtOC42NzRBMy41MTQgMy41MTQgMCAwMTkgMTAuNjYzdjguNjc0QTMuNTE0IDMuNTE0IDAgMDExMC42NjMgMjFoOC42NzRBMy41MTQgMy41MTQgMCAwMTIxIDE5LjMzN3YtOC42NzR6TTcuNSA5YTEuNSAxLjUgMCAxMDAtMyAxLjUgMS41IDAgMDAwIDN6bTE1IDBhMS41IDEuNSAwIDEwMC0zIDEuNSAxLjUgMCAwMDAgM3ptMCAxNWExLjUgMS41IDAgMTAwLTMgMS41IDEuNSAwIDAwMCAzem0tMTUgMGExLjUgMS41IDAgMTAwLTMgMS41IDEuNSAwIDAwMCAzeiIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zIC0zKSI+PG1hc2sgaWQ9ImIiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2EiLz48L21hc2s+PHVzZSBmaWxsPSIjNUI1QjVCIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHhsaW5rOmhyZWY9IiNhIi8+PGcgZmlsbD0iIzVCNUI1QiIgbWFzaz0idXJsKCNiKSI+PHBhdGggZD0iTTAgMGgzMHYzMEgweiIvPjwvZz48L2c+PC9zdmc+);
    }

    .map-draw-wrap .map-draw-item.polygon {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNMTkuNDIgOS4xNjVhMy41IDMuNSAwIDExMy41OCAxLjh2OC4wN0EzLjUgMy41IDAgMTExOS4wMzUgMjNoLTguMDdhMy41IDMuNSAwIDExLTEuOC0zLjU4TDE5LjQyMSA5LjE2NnptMS40MTUgMS40MTRMMTAuNTc5IDIwLjgzNWMuMDMuMDU0LjA1OC4xMS4wODQuMTY1aDguNjc0QTMuNTE0IDMuNTE0IDAgMDEyMSAxOS4zMzd2LTguNjc0YTMuNDg4IDMuNDg4IDAgMDEtLjE2NS0uMDg0ek0yMi41IDlhMS41IDEuNSAwIDEwMC0zIDEuNSAxLjUgMCAwMDAgM3ptMCAxNWExLjUgMS41IDAgMTAwLTMgMS41IDEuNSAwIDAwMCAzem0tMTUgMGExLjUgMS41IDAgMTAwLTMgMS41IDEuNSAwIDAwMCAzeiIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zIC0zKSI+PG1hc2sgaWQ9ImIiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2EiLz48L21hc2s+PHVzZSBmaWxsPSIjNUI1QjVCIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHhsaW5rOmhyZWY9IiNhIi8+PGcgZmlsbD0iIzVCNUI1QiIgbWFzaz0idXJsKCNiKSI+PHBhdGggZD0iTTAgMGgzMHYzMEgweiIvPjwvZz48L2c+PC9zdmc+);
    }

    .map-draw-wrap .map-draw-item.circle {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGQ9Ik0xOC4yOSA2Ljc4NmEzLjUgMy41IDAgMDE0LjkyNCA0LjkyNEE5LjQ2OCA5LjQ2OCAwIDAxMjQgMTUuNSA5LjUgOS41IDAgMTExNC41IDZjMS4zNDcgMCAyLjYyOS4yOCAzLjc5Ljc4NnptLTEuMTQgMS42OTZhNy41IDcuNSAwIDEwNC4zNjggNC4zNjggMy41IDMuNSAwIDAxLTQuMzY4LTQuMzY4ek0xNC41IDE3YTEuNSAxLjUgMCAxMTAtMyAxLjUgMS41IDAgMDEwIDN6bTYtNmExLjUgMS41IDAgMTAwLTMgMS41IDEuNSAwIDAwMCAzeiIgaWQ9ImEiLz48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTMpIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxtYXNrIGlkPSJiIiBmaWxsPSIjZmZmIj48dXNlIHhsaW5rOmhyZWY9IiNhIi8+PC9tYXNrPjx1c2UgZmlsbD0iIzVCNUI1QiIgZmlsbC1ydWxlPSJub256ZXJvIiB4bGluazpocmVmPSIjYSIvPjxnIG1hc2s9InVybCgjYikiIGZpbGw9IiM1QjVCNUIiPjxwYXRoIGQ9Ik0wIDBoMzB2MzBIMHoiLz48L2c+PC9nPjwvc3ZnPg==);
    }

    .map-draw-wrap .map-draw-item.delete {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGQ9Ik0xNy43ODcgMTguNDgxbC02LjEzOS01LjEzMS01LjI0MyA2LjAzMiA0LjE0OSAzLjYwNmgzLjMxNWwzLjkxOC00LjUwN3ptLTEuMjggNC41MDdIMjZ2Mkg5LjgwN2wtNC43MTQtNC4wOTdhMiAyIDAgMDEtLjE5OC0yLjgyMkwxNi4wNDggNS4yNGEyIDIgMCAwMTIuODIyLS4xOTdsNi4wMzcgNS4yNDlhMiAyIDAgMDEuMTk4IDIuODIxbC04LjU5OCA5Ljg3NnoiIGlkPSJhIi8+PC9kZWZzPjx1c2UgZmlsbD0iIzVCNUI1QiIgZmlsbC1ydWxlPSJub256ZXJvIiB4bGluazpocmVmPSIjYSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTMpIi8+PC9zdmc+);
    }

    .map-draw-wrap .map-draw-item.marker {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGQ9Ik0xNS41IDI0Ljg3OGMtLjIxIDAtLjMyNi0uMDMxLS44NC0uNjQzQzEwLjIyIDE5LjQxMiA4IDE1LjUwMSA4IDEyLjUwNUE3LjUwMiA3LjUwMiAwIDAxMTUuNSA1YzQuMTQyIDAgNy41IDMuMzYgNy41IDcuNTA0IDAgNC40OTYtNC43MTIgOS40MjMtNi42NjYgMTEuNzQtLjUxMi42MDYtLjYyNS42MzUtLjgzNC42MzR6bTAtOS4zNDVjMS43NzUgMCAzLjIxNC0xLjQxNSAzLjIxNC0zLjE2cy0xLjQzOS0zLjE2LTMuMjE0LTMuMTYtMy4yMTQgMS40MTUtMy4yMTQgMy4xNiAxLjQzOSAzLjE2IDMuMjE0IDMuMTZ6IiBpZD0iYSIvPjwvZGVmcz48dXNlIGZpbGw9IiM1QjVCNUIiIGZpbGwtcnVsZT0ibm9uemVybyIgeGxpbms6aHJlZj0iI2EiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zIC0zKSIvPjwvc3ZnPg==);
    }

    .map-draw-wrap .map-draw-item.circleMarker {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2U9IiM1QjVCNUIiIHN0cm9rZS13aWR0aD0iOCIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzUiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzIiBmaWxsPSIjNUI1QjVCIi8+PC9zdmc+);
    }

    /* <svg t="1645500066812" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3425" width="200" height="200"><path d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z" p-id="3426"></path><path d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z" p-id="3427"></path><path d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z" p-id="3428"></path><path d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z" p-id="3429"></path></svg> */

    /* .'rectangle', 'polygon', 'circle', 'polyline', 'delete' */
</style>