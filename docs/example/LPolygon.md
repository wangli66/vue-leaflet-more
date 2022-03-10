---
title: LPolygon
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
    <l-polygon :latlngs="latlngs" :options="options"></l-polygon>
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
        [38.57393751557594, 95.61808317250322],
      ],
      options: { color: "red", fillColor: "blue" },
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

options 的详情配置，参考 polyline 和 path 类的 options

## 方法说明

| 方法名称           | 退货                  | 描述     |
| :----------------- | :-------------------- | :------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `toGeoJSON(<Number | false> _precision?_)` | `Object` | 坐标值[`formatNum`](#util-formatnum) 用给定的函数四舍五入`precision`。返回[`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) 多边形的表示形式（作为 GeoJSON[`Polygon`](#polygon) 或 `MultiPolygon`要素）。 |
