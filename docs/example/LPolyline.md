---
title: LPolyline
---

## 基础用法

::: demo

```html
<template>
  <l-map style="height:400px;">
    <l-tile-layer
      :url="'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}'"
      :options="{ foo:'bar'}"
    >
    </l-tile-layer>
    <l-polyline :latlngs="latlngs" :options="options"></l-polyline>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      latlngs: [
        [38.57393751557594, 95.61808317250322],
        [38.57393751557594, 120.12951653254693],
        [26.775039386999605, 117.6695877365569],
        [29.563901551414443, 96.93590217035502],
      ],
      options: { color: "red" },
    }),
  };
</script>
```

:::

## 属性说明

| 属性名称    | 类型      | 默认值 | 说明                                     |
| :---------- | :-------- | :----- | :--------------------------------------- |
| latlngs     | [latlngs] | —      | 坐标                                     |
| isFitBounds | boolean   | —      | 是否将该组件范围自适应在地图的可视范围中 |
| options     | object    | —      | 配置选项，具体看下表                     |

### Options

| 名称           | 类型      | 默认值  | 说明                                                         |
| :------------- | :-------- | :------ | :----------------------------------------------------------- |
| `smoothFactor` | `Number`  | `1.0`   | 在每个缩放级别上简化多段线的程度。更多意味着更好的性能和更流畅的外观，更少意味着更准确的表示。 |
| `noClip`       | `Boolean` | `false` | 禁用折线剪裁。                                               |



## 方法说明

| 方法名称                                              | 返回值         | 描述                                                         |
| :---------------------------------------------------- | :------------- | :----------------------------------------------------------- |
| `toGeoJSON(<Number|false> *precision?*)`              | `Object`       | 坐标值[`formatNum`](#util-formatnum) 用给定的函数四舍五入`precision`。返回[`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) 折线的表示形式（作为 GeoJSON`LineString`或 `MultiLineString`特征）。 |
| `getLatLngs()`                                        | `LatLng[]`     | 返回路径中点的数组，或者在多折线的情况下返回点的嵌套数组。   |
| `setLatLngs(<LatLng[]> *latlngs*)`                    | `this`         | 用给定的地理点数组替换折线中的所有点。                       |
| `isEmpty()`                                           | `Boolean`      | `true`如果折线没有 LatLngs，则返回。                         |
| `closestLayerPoint(<Point> *p*)`                      | `Point`        | 返回最接近`p`折线上的点。                                    |
| `getCenter()`                                         | `LatLng`       | 返回折线的中心 ( [centroid](https://en.wikipedia.org/wiki/Centroid) )。 |
| `getBounds()`                                         | `LatLngBounds` | 返回[`LatLngBounds`](#latlngbounds)路径的。                  |
| `addLatLng(<LatLng> *latlng*, <LatLng[]> *latlngs?*)` | `this`         | 将给定点添加到折线。默认情况下，如果是多折线，则添加到折线的第一个环，但可以通过将特定环作为 LatLng 数组传递来覆盖（您可以更早地使用 访问[`getLatLngs`](#polyline-getlatlngs)）。 |



## 事件说明

支持继承layer图层，交互图层等的事件