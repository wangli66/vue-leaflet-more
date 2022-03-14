---
title: lMap
---

## 基础用法

::: demo

```html
<template>
  <l-map style="height:400px;">
    <l-tile-layer
      :url="'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}'"
      :options="{foo:'bar'}"
    >
    </l-tile-layer>
  </l-map>
</template>
<script>
  export default {};
</script>
```

:::

## 属性-响应式设置

- vue-leaflet-more 下的其他组件是否相应都是遵循这种规则，在 options 中设置参数
- 若 leaflet 中有相应的"set 属性"方法，则会响应
- 例如：
  ```html
  <l-map style="height:400px;" :options="{zoom:4,center:[29, 114]}"></l-map>
  zoom 值改变会响应，因为 leaflet 的 map 存在 setZoom 方法<br />
  center 值改变则不会响应，map 中无 setCenter()方法
  ```

::: tip 属性是否响应式反应

```js
zoom 值的改变不会发生响应式
html: <l-map style="height:400px;" :zoom="zoom"></l-map>
js：zoom:4
zoom 值的改变会发生响应式
html: <l-map style="height:400px;" :options="options"></l-map>
js: options={zoom:4}
```

:::

### 响应式放大：

::: demo

```html
<template>
  <button @click="handleChange">放大</button>
  <l-map style="height:400px;" :options="options">
    <l-tile-layer
      :url="'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}'"
      :options="{foo:'bar'}"
    >
    </l-tile-layer>
  </l-map>
</template>
<script>
  export default {
    data() {
      return {
        options: {
          zoom: 4,
        },
      };
    },
    methods: {
      handleChange() {
        this.options.zoom += 1;
      },
    },
  };
</script>
```

:::

### 非响应式放大：

- 如果没有响应式的需求，推荐这种属性的传值方法，更加符合 vue 的标准

::: demo

```html
<template>
  <button @click="handleChange">放大</button>
  <l-map style="height:400px;" ref="map" :useSelfMethods="true" :zoom="zoom">
    <l-tile-layer
      :url="'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}'"
      :options="{foo:'bar'}"
    >
    </l-tile-layer>
  </l-map>
</template>
<script>
  export default {
    data() {
      return {
        zoom: 4,
      };
    },
    methods: {
      handleChange() {
        let zoom = this.$refs.map.getZoom();
        this.$refs.map.setZoom(zoom + 1);
      },
    },
  };
</script>
```

:::

## 属性说明

- 下表中列举的只是一部分，更多属性配置请参考 lealet 文档

| 选项        | 类型                | 默认值                                        | 描述                                                         |
| ----------- | ------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| options     | object              | 默认值：{}<br/>示例：{center:[22,120],zoom:4} | 组件配置，配置内容参考空行下的参数说明                       |
| id          | string              | ‘map’                                         | map容器的id，当界面需要展示多个地图时请设置该值              |
| customStyle | object              |                                               | map容器的style，写法参考css规则书写                          |
| customClass | string,object,array |                                               | map容器的class                                               |
| crs         | string,CRS          | “EPSG3857”                                    | 地理坐标系。当接受string类型，为CRS下的类型，如"EPSG3857","EPSG4326"等 |

### 地图状态选项

| 选项      | 类型         | 默认值                                        | 描述                                                         |
| --------- | ------------ | --------------------------------------------- | ------------------------------------------------------------ |
| options   | object       | 默认值：{}<br/>示例：{center:[22,120],zoom:4} | 组件配置，配置内容参考空行下的参数说明                       |
|           |              |                                               |                                                              |
| center    | LatLng       | null                                          | 初始化地图的地理中心.                                        |
| zoom      | Number       | null                                          | 初始化地图的缩放.                                            |
| layers    | I.Layer[]    | null                                          | 初始化后加载到地图上的图层.                                  |
| minZoom   | Number       | null                                          | 地图的最小视图。可以重写地图图层的minZoom.                   |
| maxZoom   | Number       | null                                          | 地图的最大视图。可以重写地图图层的maxZoom.                   |
| maxBounds | LatLngBounds | null                                          | 当这个选项被设置后，地图被限制在给定的地理边界内，当用户平移将地图拖动到视图以外的范围时会出现弹回的效果， 并且也不允许缩小视图到给定范围以外的区域（这取决于地图的尺寸）。 使用setMaxBounds方法可以动态地设置这种约束. |
| crs       | CRS          | L.CRS.EPSG3857                                | 使用的坐标系，当你不确定坐标系是什么时请不要更改.            |

### 交互选项

| 选项              | 类型    | 默认值 | 描述                                                         |
| ----------------- | ------- | ------ | ------------------------------------------------------------ |
| dragging          | Boolean | true   | 决定地图是否可被鼠标或触摸拖动.                              |
| touchZoom         | Boolean | true   | 决定地图是否可被两只手指触摸拖拽缩放.                        |
| scrollWheelZoom   | Boolean | true   | 决定地图是否被被鼠标滚轮滚动缩放.                            |
| doubleClickZoom   | Boolean | true   | 决定地图是否可被双击缩放.                                    |
| boxZoom           | Boolean | true   | 决定地图是否可被缩放到鼠标拖拽出的矩形的视图，鼠标拖拽时需要同时按住shift键. |
| tap               | Boolean | true   | Enables mobile hacks for supporting instant taps (fixing 200ms click delay on iOS/Android) and touch holds (fired as contextmenu events). |
| tapTolerance      | Number  | 15     | The max number of pixels a user can shift his finger during touch for it to be considered a valid tap. |
| trackResize       | Boolean | true   | 确定地图在窗口尺寸改变时是否可以自动处理浏览器以更新视图.    |
| worldCopyJump     | Boolean | false  | 当这个选项可用时，当你平移地图到其另一个领域时会被地图捕获到，并无缝地跳转到原始的领域以保证所有标注、矢量图层之类的覆盖物仍然可见. |
| closePopupOnClick | Boolean | true   | 当你不想用户点击地图关闭消息弹出框时，请将其设置为false .    |

### 键盘导航选项

| 选项               | 类型    | 默认值 | 描述                                                   |
| ------------------ | ------- | ------ | ------------------------------------------------------ |
| keyboard           | Boolean | true   | 聚焦到地图且允许用户通过键盘的方向键和+/-键来漫游地图. |
| keyboardPanOffset  | Number  | 80     | 确定按键盘方向键时地图平移的像素.                      |
| keyboardZoomOffset | Number  | 1      | 确定键盘+ or -键对于的缩放级数.                        |

### Panning Inertia Options

| 选项                | 类型    | 默认值  | 描述                                                         |
| ------------------- | ------- | ------- | ------------------------------------------------------------ |
| inertia             | Boolean | true    | 如果该选项可用，在拖动和在某一时间段内持续朝同一方向移动建有动力的地图时，会有惯性的效果. |
| inertiaDeceleration | Number  | 3000    | 确定惯性移动减速的速率，单位是像素每秒的二次方2.             |
| inertiaMaxSpeed     | Number  | 1500    | 惯性移动的最大速度，单位是像素每秒.                          |
| inertiaThreshold    | Number  | depends | 放开鼠标或是触摸来停止惯性移动与移动停止之间的毫秒数.        |

### 控件选项

| 选项               | 类型    | 默认值 | 描述                                         |
| ------------------ | ------- | ------ | -------------------------------------------- |
| zoomControl        | Boolean | true   | 确定zoom control是否默认加载在地图上 .       |
| attributionControl | Boolean | true   | 确定attribution control是否默认加载在地图上. |



### 动画选项

| 选项                   | 类型    | 默认值  | 描述                                                         |
| ---------------------- | ------- | ------- | ------------------------------------------------------------ |
| fadeAnimation          | Boolean | depends | 确定瓦片淡出动画是否可用。通常默认在所有浏览器中都支持CSS3转场，android例外. |
| zoomAnimation          | Boolean | depends | 确定瓦片缩放动画是否可用。通常默认在所有浏览器中都支持CSS3转场，android例外. |
| zoomAnimationThreshold | Number  | 4       | Won’t animate zoom if the zoom difference exceeds this value. |
| markerZoomAnimation    | Boolean | depends | 确定注记的缩放是否随地图缩放动画而播放，如果被禁用，注记在动画中拉长时会消失。通常默认在所有浏览器中都支持CSS3转场，android例外. |



## 方法说明

下表中列举的只是一部分，更多方法请参考 lealet 文档，使用下表方法，请设置useSelfMethods为true

| 方法                           | 返回值  | 描述                                   |
| ------------------------------ | ------- | -------------------------------------- |
| geojsonToWKT(< object>geoJson) | wkt     | 将geojson对象的数据格式转化为wkt字符串 |
| wktToGeoJSON(< string>wkt)     | geoJson | 将wkt字符串的数据格式转化为geojson对象 |



### 地图状态修改

| 方法                                                         | 返回值 | 描述                                                         |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| setView( < LatLng> center, < Number> zoom, <zoom/pan options> options? ) | this   | 设定地图（设定其地理中心和缩放）.                            |
| setZoom( < Number> zoom, < zoom options> options? )          | this   | 设定地图的缩放.                                              |
| zoomIn( < Number> delta?, < zoom options> options? )         | this   | 通过delta变量放大地图的级别，1是delta的默认值.               |
| zoomOut( < Number> delta?, < zoom options> options? )        | this   | 通过delta变量缩小地图的级别，1是delta的默认值.               |
| setZoomAround( < LatLng> latlng, < Number> zoom, < zoom options> options? ) | this   | Zooms the map while keeping a specified point on the map stationary (e.g. used internally for scroll zoom and double-click zoom). |
| fitBounds( < LatLngBounds> bounds, < fitBounds options> options? ) | this   | 将地图视图尽可能大地设定在给定的地理边界内.                  |
| fitWorld( < fitBounds options> options? )                    | this   | 将地图视图尽可能大地设定在包含全部地域的级别上.              |
| panTo( < LatLng> latlng, < pan options> options? )           | this   | 将地图平移到给定的中心。如果新的中心点在屏幕内与现有的中心点不同则产生平移动作. |
| panInsideBounds( < LatLngBounds> bounds )                    | this   | 平移地图到坐落于给定边界最接近的视图内.                      |
| panBy( < Point> point, < pan options> options? )             | this   | 通过给定的像素值对地图进行平移.                              |
| invalidateSize( < Boolean> options?, <zoom/pan options> options? ) | this   | 检查地图容器的大小是否改变并更新地图，如果是这样的话，在动态改变地图大小后调用，如果animate是true的话，对地图进行更新. |
| setMaxBounds( < LatLngBounds> bounds, <zoom/pan options> options? ) | this   | 将地图限定在给定的边界内 (map maxBounds).                    |
| locate( < Locate options> options? )                         | this   | 用地理定位接口Geolocation API获取用户位置信息，在成功定位或定位出错产生locationerror后解除location-found事件与定位数据，且将地图视图设定到检测的确切的用户的位置（如果定位失败则回到地域视图）。在Locate options中有更多详细内容。 |
| stopLocate()                                                 | this   | Stops watching location previously initiated by map.locate({watch: true}) and aborts resetting the map view if map.locate was called with {setView: true}. |
| remove()                                                     | this   | Destroys the map and clears all related event listeners.     |

### 获取地图状态

| 方法                                                        | 返回值       | 描述                                                         |
| ----------------------------------------------------------- | ------------ | ------------------------------------------------------------ |
| getCenter()                                                 | LatLng       | 返回地图视图的地理中心.                                      |
| getZoom()                                                   | Number       | 获取地图视图现在所处的缩放级别.                              |
| getMinZoom()                                                | Number       | 返回地图最小的缩放级别.                                      |
| getMaxZoom()                                                | Number       | 返回地图最大的缩放级别.                                      |
| getBounds()                                                 | LatLngBounds | 返回地图视图的经纬度边界.                                    |
| getBoundsZoom( < LatLngBounds> bounds, < Boolean> inside? ) | Number       | 返回适应整个地图视图边界的最大缩放级别。如果inside的设置时true，这个方法返回适应整个地图视图边界的最小缩放级别. |
| getSize()                                                   | Point        | 返回现有地图容器的大小.                                      |
| getPixelBounds()                                            | Bounds       | 返回地图视图在像素投影坐标系下的边界。（很多时候对用户自定义图层和叠加很有用）. |
| getPixelOrigin()                                            | Point        | 返回地图图层像素投影坐标系下的左上角的点。（很多时候对用户自定义图层和叠加很有用）. |



### 图层控制

| 方法                                                       | 返回值                                                       | 描述                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| addLayer( < ILayer> layer, < Boolean> insertAtTheBottom? ) | this                                                         | 将图层添加到地图上。如果insertAtTheBottom的选项为true，图层添加时在所以图层之下。（在切换基底图时比较有用）. |
| removeLayer( < ILayer> layer )                             | this                                                         | 将图层在地图上移除.                                          |
| hasLayer( < ILayer> layer )                                | Boolean                                                      | 如果添加的图层是当前图层则返回true.                          |
| openPopup( < Popup> popup )                                | this                                                         | 当关闭前一个弹出框时弹出指定的对话框。（确定在同一时间只有一个打开并可用）. |
| openPopup( < String> html                                  | < HTMLElement> el, < LatLng> latlng, < Popup options> options? ) | this                                                         |
| closePopup( < Popup> popup? )                              | this                                                         | 关闭openPopup打开的弹出框.                                   |
| addControl( < IControl> control )                          | this                                                         | 在地图上添加控制选项.                                        |
| removeControl( < IControl> control )                       | this                                                         | 在地图上移除控制选项.                                        |



### 转换方法

| 方法                                              | 返回值 | 描述                                                         |
| ------------------------------------------------- | ------ | ------------------------------------------------------------ |
| latLngToLayerPoint( < LatLng> latlng )            | Point  | 返回地图图层上与地理坐标相一致的点。（在地图上进行位置叠加时比较有用）. |
| layerPointToLatLng( < Point> point )              | LatLng | 返回给定地图上点的地理坐标系.                                |
| containerPointToLayerPoint( < Point> point )      | Point  | 将于地图容器相关的点转换为地图图层相关的点.                  |
| layerPointToContainerPoint( < Point> point )      | Point  | 将地图图层相关的点转换为地图容器相关的点.                    |
| latLngToContainerPoint( < LatLng> latlng )        | Point  | 返回与给定地理坐标系相符的地图容器的点.                      |
| containerPointToLatLng( < Point> point )          | LatLng | 返回给定地理容器点的地理坐标.                                |
| project( < LatLng> latlng, < Number> zoom? )      | Point  | 将地理坐标投影到指定缩放级别的像素坐标系中.                  |
| unproject( < Point> point, < Number> zoom? )      | LatLng | 将像素坐标系投影到指定缩放级别的地理坐标系中。（默认为当前的缩放级别）. |
| mouseEventToContainerPoint( < MouseEvent> event ) | Point  | 返回鼠标点击事件对象的像素坐标（与地图左上角相关）.          |
| mouseEventToLayerPoint( < MouseEvent> event )     | Point  | 返回鼠标点击事件对象的像素坐标（与地图图层相关）.            |
| mouseEventToLatLng( < MouseEvent> event )         | LatLng | 返回鼠标点击事件对象的地理坐标.                              |

### 其他方法

| 方法                                            | 返回值      | 描述                                                         |
| ----------------------------------------------- | ----------- | ------------------------------------------------------------ |
| getContainer()                                  | HTMLElement | 返回地图容器对象.                                            |
| getPanes()                                      | MapPanes    | 返回不同地图对象的边框（叠加渲染).                           |
| whenReady( < Function> fn, < Object> context? ) | this        | 当地图的位置和缩放初始化好或是时间发生之后，运行给定的回调方法，通常传递一个函数内容. |



## 事件说明

下表中列举的只是一部分，更多事件请参考 lealet 文档

| 事件名称         | 说明                                                         | 回调参数   |
| ---------------- | ------------------------------------------------------------ | ---------- |
| click            | 用户点击或触摸地图时触发.                                    | MouseEvent |
| dblclick         | 用户双击或连续两次触摸地图时触发.                            |            |
| mousedown        | 用户按下鼠标按键时触发.                                      |            |
| mouseup          | 用户按下鼠标按键时触发.                                      |            |
| mouseover        | 鼠标进入地图时触发.                                          |            |
| mouseout         | 鼠标离开地图时触发.                                          |            |
| mousemove        | 鼠标在地图上移动时触发.                                      |            |
| contextmenu      | 当用户在地图上按下鼠标右键时触发，如果有监听器在监听这个时间，则浏览器默认的情景菜单被禁用. |            |
| focus            | 当用户在地图上进行标引、点击或移动时进行聚焦.                |            |
| blur             | 当地图失去焦点时触发.                                        |            |
| preclick         | 当鼠标在地图上点击之前触发。有时会在点击鼠标时，并在已存在的点击事件开始处理之前想要某件事情发生时用得到. |            |
| load             | 当地图初始化时触发。（当地图的中心点和缩放初次设置时）.      |            |
| unload           | Fired when the map is destroyed with remove method.          |            |
| viewreset        | 当地图需要重绘内容时触发。（通常在地图缩放和载入时发生）这对于创建用户自定义的叠置图层非常有用. |            |
| movestart        | 地图视图开始改变时触发。（比如用户开始拖动地图）.            |            |
| move             | 所有的地图视图移动时触发.                                    |            |
| moveend          | 当地图视图结束改变时触发。（比如用户停止拖动地图）.          |            |
| drag             | 用户拖动地图时不断重复地触发.                                |            |
| dragend          | 用户停止拖动时触发.                                          |            |
| zoomstart        | 当地图缩放即将发生时触发。（比如缩放动作开始前）.            |            |
| zoomend          | 当地图缩放时触发.                                            |            |
| zoomlevelschange | Fired when the number of zoomlevels on the map is changed due to adding or removing a layer. |            |
| resize           | Fired when the map is resized.                               |            |
| autopanstart     | 打开弹出窗口时地图开始自动平移时触发.                        |            |
| layeradd         | 当一个新的图层添加到地图上时触发.                            |            |
| layerremove      | 当一些图层从地图上移除时触发.                                |            |
| baselayerchange  | 当通过layer control改变基础图层时触发.                       |            |
| overlayadd       | Fired when an overlay is selected through the layer control. |            |
| overlayremove    | Fired when an overlay is deselected through the layer control. |            |
| locationfound    | 当地理寻址成功时触发（使用locate方法）                       |            |
| locationerror    | 当地理寻址错误时触发（使用locate方法）                       |            |
| popupopen        | 当弹出框打开时触发（使用openPopup方法）                      |            |
| popupclose       | 当弹出框关闭时触发（使用closePopup方法）                     |            |

