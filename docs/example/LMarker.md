---
title: LMarker
---

## 基础用法

::: demo

```html
<template>
  <l-map style="height:400px;" :center="[30.724719,114.169496]" :zoom="12">
    <l-tile-layer :url="tileUrl" :options="options"> </l-tile-layer>
    <l-marker
      :latlng="[30.724719,114.169496]"
      :options="{draggable: true}"
    ></l-marker>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
    }),
  };
</script>
```

:::

## 提示框和弹出窗口

::: demo

```html
<template>
  <l-map style="height:400px;" :center="[30.724719,114.169496]" :zoom="10">
    <l-tile-layer :url="tileUrl" :options="options"> </l-tile-layer>
    <l-marker
      @ready="readyFn1"
      :latlng="[30.724719,114.169496]"
      :options="{draggable: true}"
    ></l-marker>
    <l-marker
      @ready="readyFn2"
      :latlng="[30.824719,114.169496]"
      :options="{draggable: true}"
    ></l-marker>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
    }),
    methods: {
      readyFn1(selfLayer) {
        selfLayer
          .bindPopup('<div style="color:red;">这是一个弹窗</div>', {
            minWidth: 100,
          })
          .openPopup();
      },
      readyFn2(selfLayer) {
        selfLayer.bindTooltip("这是一个提示").openTooltip();
      },
    },
  };
</script>
```

:::

## 属性说明

| 属性名称 | 类型   | 默认值 | 说明                 |
| :------- | :----- | :----- | :------------------- |
| latlng   | latlng | —      | marker 标记的坐标    |
| options  | object | —      | 配置选项，具体看下表 |

###

### Options

| Option                | Type      | Default        | Description                                                                                                                                                                                                   |
| :-------------------- | :-------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `icon`                | `Icon`    | `*`            | 用于渲染标记的图标。有关如何自定义标记图标的，请参阅 Icon 文档。如果未指定默认则使 用 L.Icon.Default。                                                                                                        |
| `keyboard`            | `Boolean` | `true`         | 标记是否可以用键盘按键并按回车键。                                                                                                                                                                            |
| `title`               | `String`  | `''`           | 显示在标记悬停上的浏览器 Tooltip 提示的文本（默认情况下不提供工具提示）。                                                                                                                                     |
| `alt`                 | `String`  | `''`           | alt 图标图像属性的文本（对辅助功能有用）。                                                                                                                                                                    |
| `zIndexOffset`        | `Number`  | `0`            | 默认情况下，注记图片的叠置顺序由纬度自动设置.如果你想将某一注记放置于其他之上可用 这个选项，设置一个较大的值即可，比如 1000（或是相反地设置一个较大的负值）.                                                  |
| `opacity`             | `Number`  | `1.0`          | 注记的透明度                                                                                                                                                                                                  |
| `riseOnHover`         | `Boolean` | `false`        | 如果为 true，当您将鼠标悬停在其上时，标记将会放在其他顶部。                                                                                                                                                   |
| `riseOffset`          | `Number`  | `250`          | 用于 riseOnHover 功能的 z­index 偏移量。                                                                                                                                                                      |
| `pane`                | `String`  | `'markerPane'` | 标记图标将被添加的地图 pane 窗格                                                                                                                                                                              |
| `shadowPane`          | `String`  | `'shadowPane'` | `Map pane` where the markers shadow will be added.                                                                                                                                                            |
| `bubblingMouseEvents` | `Boolean` | `false`        | When `true`, a mouse event on this marker will trigger the same event on the map (unless [`L.DomEvent.stopPropagation`](https://leafletjs.com/SlavaUkraini/reference.html#domevent-stoppropagation) is used). |

### Draggable marker options

| Option           | Type      | Default         | Description                                                                                            |
| :--------------- | :-------- | :-------------- | :----------------------------------------------------------------------------------------------------- |
| `draggable`      | `Boolean` | `false`         | 标记是否可以用鼠标/触摸拖动。                                                                          |
| `autoPan`        | `Boolean` | `false`         | Whether to pan the map when dragging this marker near its edge or not.                                 |
| `autoPanPadding` | `Point`   | `Point(50, 50)` | Distance (in pixels to the left/right and to the top/bottom) of the map edge to start panning the map. |
| `autoPanSpeed`   | `Number`  | `10`            | Number of pixels the map should pan by.                                                                |

|     |     |     |     |
| :-- | :-- | :-- | :-- |
|     |     |     |     |

## 方法说明

In addition to [shared layer methods](https://leafletjs.com/SlavaUkraini/reference.html#layer) like `addTo()` and `remove()` and [popup methods](https://leafletjs.com/SlavaUkraini/reference.html#popup) like bindPopup() you can also use the following methods:

| 方法名                               | 返回值   | 描述                         |
| :----------------------------------- | :------- | :--------------------------- |
| `getLatLng()`                        | `LatLng` | 返回注记的 LatLng 经纬度对象 |
| `setLatLng(<LatLng> *latlng*)`       | `this`   | 修改注记的位置               |
| `setZIndexOffset(<Number> *offset*)` | `this`   | 改变注记的 ZIndex 顺序       |
| `getIcon()`                          | `Icon`   | 返回注记的图标               |
| `setIcon(<Icon> *icon*)`             | `this`   | 改变注记的图标               |
| `setOpacity(<Number> *opacity*)`     | `this`   | 改变注记的透明度             |

### Other methods

| 方法名                             | 返回值   | 描述                            |
| :--------------------------------- | :------- | :------------------------------ |
| `toGeoJSON(<Number> *precision?*)` | `Object` | 转换标记为 GeoJSON 格式对象数据 |

## 事件说明

| 事件名称 | 参数    | 描述                                                                                                                   |
| :------- | :------ | :--------------------------------------------------------------------------------------------------------------------- |
| `move`   | `Event` | 当标记通过 移动时触发[`setLatLng`](#circlemarker-setlatlng)。旧坐标和新坐标包含在事件参数中，如`oldLatLng`, `latlng`。 |

### 拖拽事件

| 事件名称    | 参数           | 描述                               |
| :---------- | :------------- | :--------------------------------- |
| `dragstart` | `Event`        | 当用户开始拖动标记时触发。         |
| `movestart` | `Event`        | 标记开始移动时发生（因为拖动）。   |
| `drag`      | `Event`        | 当用户拖动注记时不断触发.          |
| `dragend`   | `DragEndEvent` | 当用户停止拖动注记时触发           |
| `moveend`   | `Event`        | 当标记停止移动（由于拖动）时发出。 |
