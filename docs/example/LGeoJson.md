---
title: LGeoJson
---

## 基础用法

::: demo

```html
<template>
  <l-map style="height:400px;">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-geo-json :geojson="geoJson" :options="jsonOptions"></l-geo-json>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      geoJson: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [95.61808317250322, 38.57393751557594],
              [120.12951653254693, 38.57393751557594],
              [117.6695877365569, 26.775039386999605],
              [96.93590217035502, 29.563901551414443],
              [95.61808317250322, 38.57393751557594],
            ],
          ],
        },
      },
      jsonOptions: {
        style: {
          color: "yellow",
          fillColor: "red",
          weight: 2,
        },
      },
    }),
  };
</script>
```

:::

## 属性说明

| 属性名称    | 类型    | 默认值 | 说明                                     |
| :---------- | :------ | :----- | :--------------------------------------- |
| geojson     | geojson | —      | 一个 GeoJSON 对象或一组 GeoJSON 对象     |
| isFitBounds | boolean | —      | 是否将该组件范围自适应在地图的可视范围中 |
| options     | object  | —      | 配置选项，具体看下表                     |

### options

| 选项                    | 类型       | 默认    | 描述                                                                                                                                                                                                                       |
| :---------------------- | :--------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pointToLayer`          | `Function` | `*`     | 定义`Function`GeoJSON 点如何生成 Leaflet 层。它在添加数据时在内部调用，传递 GeoJSON 点特征及其[`LatLng`](#latlng). 默认是产生一个默认值[`Marker`](#marker)：`function(geoJsonPoint, latlng) { return L.marker(latlng); } ` |
| `style`                 | `Function` | `*`     | 用于`Function`定义[`Path options`](#path-option) GeoJSON 线和多边形样式的定义，在添加数据时在内部调用。默认值是不覆盖任何默认值：`function (geoJsonFeature) { return {} } `                                                |
| `onEachFeature`         | `Function` | `*`     | 在创建和设置样式之后，`Function`将为每个 created 调用一次。`Feature`用于将事件和弹出窗口附加到功能。默认是对新创建的图层不做任何事情：`function (feature, layer) {} `                                                      |
| `filter`                | `Function` | `*`     | `Function`将用于决定是否包含功能的 A。默认是包括所有功能：`function (geoJsonFeature) { return true; } `注意：动态更改`filter`选项只会对新添加的数据产生影响。它*不会*重新评估已包含的功能。                                |
| `coordsToLatLng`        | `Function` | `*`     | `Function`用于将 GeoJSON 坐标转换为[`LatLng`](#latlng)s 的 A。默认是`coordsToLatLng`静态方法。                                                                                                                             |
| `markersInheritOptions` | `Boolean`  | `false` | “点”类型特征的默认标记是否从组选项继承。                                                                                                                                                                                   |

## 方法说明

| 方法名称             | 返回值 | 说明                                                                                                                             |
| :------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------- |
| `addData(data)`      | `this` | 将 GeoJSON 对象添加到图层。                                                                                                      |
| `resetStyle(layer?)` | `this` | 将给定矢量图层的样式重置为原始 GeoJSON 样式，这对于在悬停事件后重置样式很有用。如果`layer`省略，则重置当前图层中所有要素的样式。 |
| `setStyle(style)`    | `this` | 使用给定的样式函数更改 GeoJSON 矢量图层的样式。                                                                                  |
