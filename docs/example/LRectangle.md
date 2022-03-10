---
title: LRectangle
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
    <l-rectangle :latlngs="latlngs" :options="options"></l-rectangle>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      latlngs: [
        [38.57393751557594, 95.61808317250322],
        [26.775039386999605, 117.6695877365569],
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

| 方法名称                                   | 返回值 | 描述                     |
| :----------------------------------------- | :----- | :----------------------- |
| `setBounds(<LatLngBounds> *latLngBounds*)` | `this` | 使用传递的边界重绘矩形。 |