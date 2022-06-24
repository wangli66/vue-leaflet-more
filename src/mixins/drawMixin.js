import * as turf from '@turf/turf'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export default {
    data() {
        return {
            marker: {
                move: null, //开始的点，也就是随着鼠标移动的点
                num: [], //最后一个点之前的点
            }, //用于标记
            // markerFeatureGroup: null,
            markerTips: '开始',
            markerTipsStart: '开始',
            markerTipsGoon: '绘制',
            markerTipsEnd: '结束',
            markerTipsPlohgonEnd: '单击任意节点或双击结束绘制',
            coordinateArr: [], //用于存放坐标
            tempCoordinateArr: [], //存储临时图形的坐标
            // goalDrawing: null, //绘制的目标图形
            tempDrawing: null, //存放绘制时的临时图形
            drawingStatus: '', //start开始，end结束
            measureMarker: null, //计算marker
        };
    },
    computed: {
        coordinateArrLen() {
            return this.coordinateArr.length;
        }
    },
    methods: {
        // 初始化绘制图形的状态
        initDrawShapeStatus(isFinish = true) {
            // this.handleInitDrawShapeStatus(this.tempDrawing);
            if (isFinish) {
                this.emitFinishDraw(this.tempDrawing);
            }
            this.coordinateArr = [];
            this.tempDrawing = null;
            this.measureMarker = null;

            this.clearMarker();
        },
        onMapClick(e) {
            // 可编辑
            if (this.editable) {
                let latlng = e.latlng;
                let latlngCoor = [latlng.lat, latlng.lng];
                let editType = this.editType;
                // debugger 
                if (editType == 'marker') { //标记
                    this.dealDrawMarker(latlngCoor);
                    this.emitStartDraw(latlngCoor);
                } else if (editType == 'circleMarker') { //圆形标记
                    this.dealDrawCircleMarker(latlngCoor);
                    this.emitStartDraw(latlngCoor);
                } else if (editType === 'rectangle') { //矩形  
                    if (this.coordinateArrLen >= 1) {
                        this.finishDrawRectangle();
                    } else {
                        this.drawMarkerNum(0, latlng);
                        this.dealDrawRectangle(latlngCoor);
                        this.emitStartDraw(latlngCoor);
                    }
                } else if (editType === 'polygon') { //多边形
                    this.dealDrawPolygon(latlngCoor);
                    let coordinateArrLen = this.coordinateArrLen;
                    this.drawMarkerNum(coordinateArrLen - 1, latlng);
                    if (coordinateArrLen == 1) {
                        this.emitStartDraw(latlngCoor);
                        this.marker.move.setTooltipContent(this.markerTipsGoon);
                    } else if (coordinateArrLen > 3) {
                        this.marker.move.setTooltipContent(this.markerTipsPlohgonEnd);
                    }
                } else if (editType === 'circle') { //圆形
                    this.dealDrawCircle(latlngCoor);
                    this.clearMarker();
                } else if (editType === 'polyline') { //线段
                    this.dealDrawPolyline(latlngCoor, 'click');
                }
            }
        },
        onMapMousemove(e) {
            // 可编辑
            if (this.editable) {
                let latlng = e.latlng;
                let latlngCoor = [latlng.lat, latlng.lng];
                let editType = this.editType;
                if (this.coordinateArr.length > 0) {
                    if (editType === 'rectangle') { //矩形  
                        this.drawMarker(latlng);
                        this.dealDrawRectangle(latlngCoor, 'move');
                    } else if (editType === 'polygon') { //多边形
                        this.drawMarker(latlng);
                        this.dealDrawPolygon(latlngCoor, 'move');
                    } else if (editType === 'circle') { //圆
                        this.drawMarker(latlng, false);
                        this.marker.move.setTooltipContent(this.markerTipsEnd);
                        this.dealDrawCircle(latlngCoor, 'move');
                    } else if (editType === 'polyline') { //线段
                        this.drawMarker(latlng);
                        this.dealDrawPolyline(latlngCoor, 'move');
                    }
                } else {
                    if (editType == 'marker') {
                        this.dealDrawMarker(latlngCoor, 'move');
                    } else if (editType == 'circleMarker') {
                        this.dealDrawCircleMarker(latlngCoor, 'move');
                    } else {
                        this.drawMarker(latlng);
                    }
                }
            }
        },
        /**
         * 点标记
         * @param {*} latlngCoor 
         * @param {*} handleType 
         */
        dealDrawMarker(latlngCoor, handleType) {
            if (handleType == 'move') {
                if (this.marker.move) {
                    this.marker.move.setLatLng(latlngCoor);
                } else {
                    this.marker.move = this.drawSelfMarker(latlngCoor);
                }
            } else {
                this.tempDrawing = this.drawSelfMarker(latlngCoor);
                this.initDrawShapeStatus();
            }
        },
        drawSelfMarker(latlngCoor) {
            let drawStyle = {
                icon: L.icon({
                    iconUrl: icon,
                    shadowUrl: iconShadow,
                    iconAnchor: [12, 38],
                }),
                ...this.drawStyle
            };
            return L.marker(latlngCoor, drawStyle).addTo(this.drawLayer);
        },
        // 
        /**
         * 圆形标记
         * @param {*} latlngCoor 
         * @param {*} handleType 
         */
        dealDrawCircleMarker(latlngCoor, handleType) {
            if (handleType == 'move') {
                if (this.marker.move) {
                    this.marker.move.setLatLng(latlngCoor);
                } else {
                    this.marker.move = this.drawCircleMarker(latlngCoor);
                }
            } else {
                this.tempDrawing = this.drawCircleMarker(latlngCoor);
                this.initDrawShapeStatus();
            }
        },
        drawCircleMarker(latlngCoor) {
            let drawStyle = { radius: 10, ...this.drawStyle };
            return L.circleMarker(latlngCoor, drawStyle).addTo(this.drawLayer);
        },
        /**
         * 绘制处理矩形、多边形
         */
        // 矩形
        dealDrawRectangle(latlngCoor, handleType = 'click') {
            if (handleType === 'move') {
                this.marker.move.setTooltipContent(this.markerTipsEnd);
                let firstPont = this.coordinateArr[0] ? this.coordinateArr[0] : this.coordinateArr[
                    1];
                // let point1 = [firstPont[0], latlng.lng]; //垂直第一个点
                // let point2 = [latlng.lat, firstPont[1]]; //水平第二个点
                let point1 = [firstPont[0], latlngCoor[1]]; //垂直第一个点
                let point2 = [latlngCoor[0], firstPont[1]]; //水平第二个点
                this.drawMarkerNum(1, point1);
                this.drawMarkerNum(2, point2);

            }
            if (this.coordinateArr.length == 0) {
                this.coordinateArr.push(latlngCoor);
            } else {
                this.coordinateArr[1] = latlngCoor;
                let bounds = this.coordinateArr;
                if (this.tempDrawing) {
                    this.tempDrawing.setBounds(bounds);
                    this.emitDrawing(this.tempDrawing, handleType, bounds);
                } else {
                    this.tempDrawing = this.drawRectangle(bounds);
                }
                this.getMeasure('area', 2);
            }
        },
        drawRectangle(bounds) {
            let drawStyle = this.drawStyle;
            return L.rectangle(bounds, drawStyle).addTo(this.drawLayer);
        },
        // 结束绘制矩形
        finishDrawRectangle() {
            // this.drawLayer = this.tempDrawing;
            this.initDrawShapeStatus();
        },
        /**
         * 绘制多边形
         */
        // latlngCoor经纬度    handleType时间类型move click等
        dealDrawPolygon(latlngCoor, handleType) {
            // debugger
            let bounds = this.coordinateArr;
            if (handleType === 'move') {
                let i = this.marker.num && this.marker.num.length;
                if(i>2){i = i-1;}
                this.coordinateArr[i] = latlngCoor;
            } else {
                this.coordinateArr.push(latlngCoor);
            }
            bounds = this.coordinateArr;
            if (this.tempDrawing) {
                this.tempDrawing.setLatLngs(bounds);
                this.emitDrawing(this.tempDrawing, handleType, bounds);
            } else {
                this.tempDrawing = this.drawPolygon(bounds);
            }
            this.getMeasure();
        },
        drawPolygon(bounds) {
            let drawStyle = this.drawStyle;
            return L.polygon(bounds, drawStyle).addTo(this.drawLayer);
        },
        // 结束绘制多边形
        finishDrawPolygon() {
            // 结束绘制
            let bounds = this.coordinateArr;
            bounds.pop();
            this.tempDrawing.setLatLngs(bounds);
            // this.drawLayer = this.tempDrawing;
            this.initDrawShapeStatus();
        },
        /**
         * 绘制圆形
         */
        dealDrawCircle(latlngCoor, handleType) {
            if (handleType == 'move') { //移动
                let centerPoint = this.coordinateArr[0];
                let dist = L.latLng(centerPoint).distanceTo(latlngCoor);
                // this.drawMarkerNum(0, latlngCoor, false);
                if (this.tempDrawing) {
                    this.tempDrawing.setRadius(dist);
                    this.emitDrawing(this.tempDrawing, handleType, centerPoint);
                } else {
                    this.emitStartDraw(latlngCoor);
                    this.tempDrawing = this.drawCircle(centerPoint, dist);
                }
                this.getMeasure('circle', { center: centerPoint, radius: dist })
            } else { //点击
                if (this.coordinateArrLen >= 1) { //结束绘制
                    this.finishDrawCircle();
                } else { //开始绘制
                    if (this.coordinateArr.length == 0) {
                        this.coordinateArr.push(latlngCoor);
                    }
                }
            }
        },
        // 处理两点之间的距离
        dealDistTwoPoing(point1) {
            return L.latLng(point1).distanceTo(point2);
        },
        drawCircle(centerPoint, radius) {
            let drawStyle = this.drawStyle;
            return L.circle(centerPoint, radius, drawStyle).addTo(this.drawLayer);
        },
        finishDrawCircle() {
            // this.drawLayer = this.tempDrawing;
            this.initDrawShapeStatus();
        },
        /**
         * 绘制线段
         */
        dealDrawPolyline(latlngCoor, handleType) {
            let bounds = this.coordinateArr;
            if (handleType === 'move') {
                let i = this.marker.num && this.marker.num.length;
                this.coordinateArr[i] = latlngCoor;
            } else {
                this.coordinateArr.push(latlngCoor);
            }
            bounds = this.coordinateArr;
            if (this.tempDrawing) {
                this.tempDrawing.setLatLngs(bounds);
                this.emitDrawing(this.tempDrawing, handleType, bounds);
            } else {
                this.emitStartDraw(latlngCoor);
                this.tempDrawing = this.drawPolyline(bounds);
            }
            if (handleType === 'click') {
                let coordinateArrLen = this.coordinateArrLen;
                this.drawMarkerNum(coordinateArrLen - 1, latlngCoor);
                if (coordinateArrLen == 1) {
                    this.marker.move.setTooltipContent(this.markerTipsGoon);
                } else if (coordinateArrLen > 3) {
                    this.marker.move.setTooltipContent(this.markerTipsPlohgonEnd);
                }
            }
            this.getMeasure('length');
        },
        drawPolyline(bounds) {
            let drawStyle = this.drawStyle;
            return L.polyline(bounds, drawStyle).addTo(this.drawLayer);
        },
        finishDrawPolyline() {
            // 结束绘制
            let bounds = this.coordinateArr;
            bounds.pop();
            this.tempDrawing.setLatLngs(bounds);
            // this.drawLayer = this.tempDrawing;
            this.initDrawShapeStatus();
        },
        /**
         * 计算面积或者长度     
         * checksNum 
         *          默认是3->多边形,2->矩形,
         *          object {center, radius} 圆形   
         */
        getMeasure(type = 'area', checksNum = 3) {
            if (this.isMeasure && this.tempDrawing) {
                let bounds = this.coordinateArr;
                let len = bounds.length;
                if (type == 'area' && len >= checksNum) {
                    this.dealMeasure(type);
                } else if (type == 'circle') {
                    this.dealMeasure(type, checksNum);
                } else if (type == 'length' && len > 1) {
                    this.dealMeasure(type);
                }
            }
        },
        dealMeasure(type, options) {
            let center = options == undefined && this.tempDrawing.getCenter();
            let geojson = this.tempDrawing.toGeoJSON();
            var measure = 0;
            let other = '';
            let originMeasure; //计算出来的原始尺寸
            if (type == 'length') {
                let bounds = this.coordinateArr;
                center = bounds[bounds.length - 1];
                measure = turf.length(geojson, { units: 'miles' });
                originMeasure = measure;
                measure = '长度：' + measure + ' m';
                other = 'tips-top';
            } else if (type == 'circle') {
                center = options.center;
                let { radius } = options
                // let params = { units: 'kilometers' };
                // measure = turf.circle(center, radius, params);
                measure = Math.PI * radius * radius;
                originMeasure = measure;
                measure = '面积：' + measure + ' ㎡';
            } else {
                measure = turf.area(geojson);
                originMeasure = measure;
                measure = '面积：' + measure + ' ㎡';
            }
            if(this.measureFormat && typeof this.measureFormat == 'function'){
                measure = this.measureFormat(type, originMeasure);
            }
            var myIcon = L.divIcon({
                className: 'my-measure-icon',
                html: '<span class="tips ' + other + '">' + measure + '</span>'
            });
            if (this.measureMarker) {
                this.measureMarker.setLatLng(center).setIcon(myIcon);
            } else {
                this.measureMarker = L.marker(center, { icon: myIcon }).addTo(this.drawLayer);
            }
        },
        /**
         * 处理Icon
         */
        // 绘制标记点
        drawMarker(latlng, isShowIcon = true) {
            if (this.marker.move) {
                this.marker.move.setLatLng(latlng);
            } else {
                let style = {};
                if (!isShowIcon) {
                    style = { 'display': 'none' }
                }
                this.marker.move = L.marker(latlng, {
                    icon: this.drawIcon(style),
                    zIndexOffset: 99
                }).bindTooltip(this.markerTips, {
                    permanent: true,
                    direction: 'bottom',
                    offset: L.point(0, 9),
                }).openTooltip().addTo(this.lMap.self);
                this.marker.move.on('dblclick', (e) => {
                    // console.log('dblclick----icon----');
                    if (this.editType == 'polygon' && this.coordinateArrLen > 3) {
                        this.finishDrawPolygon();
                    } else if (this.editType == 'polyline' && this.coordinateArrLen > 2) {
                        this.finishDrawPolyline();
                    }
                    return false;
                });
            };
        },
        // 修改确定的标记点
        drawMarkerNum(index, latlng, isShowIcon = true) {
            let curIndex = this.marker.num[index];
            if (curIndex) {
                curIndex.remove();
            }
            let style = {};
            if (!isShowIcon) {
                style = { 'display': 'none' }
            }
            curIndex = L.marker(latlng, {
                icon: this.drawIcon(style),
                zIndexOffset: 99
            }).addTo(this.lMap.self);
            this.marker.num[index] = curIndex;
            this.marker.num[index].on('click', (e) => {
                // console.log('click----icon----');
                if (this.editType == 'polygon' && this.coordinateArrLen > 3) {
                    this.finishDrawPolygon();
                } else if (this.editType == 'polyline' && this.coordinateArrLen > 2) {
                    this.finishDrawPolyline();
                }
                return false;
            });
        },
        // 清除所有的标记
        clearMarker() {
            let marker = this.marker;
            if (marker.move) {
                marker.move.remove();
            }
            if (marker.num.length > 0) {
                marker.num.forEach((item) => {
                    if (item) {
                        item.remove();
                    }
                });
            }
            this.marker.move = null;
            this.marker.num = [];
        },
        drawIcon(style = {}) {
            let drawStyle = this.drawStyle || {};
            let borderColor = drawStyle.color || '#4c7efd'
            let defaultStyle = {
                'background-color': '#ffffff',
                'width': '18px',
                'height': '18px',
                'position': 'relative',
                'left': '-9px',
                'top': '-9px',
                'display': 'block',
                'border-radius': '50%',
                'outline': 'none',
                'border': '1px solid ' + borderColor
            }
            let obj = Object.assign({}, defaultStyle, this.drawIconStyle, style);
            let ks = Object.keys(obj);
            let markerHtmlStyles = ks.map(k => { return k + ':' + obj[k] + ';'; });
            markerHtmlStyles = markerHtmlStyles.join('');
            // console.log('drawIcon----', style, obj, markerHtmlStyles);
            return L.divIcon({
                className: "my-custom-pin",
                iconAnchor: [0, 0],
                // labelAnchor: [-6, 0],
                // popupAnchor: [0, -36],
                html: `<span style="${markerHtmlStyles}" />`
            });
        },
    }
};