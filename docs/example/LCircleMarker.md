---


title: LCircleMarker
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
    <l-circle-marker :latlng="latlng" :options="options"></l-circle-marker>
    <l-circle-marker
      :latlng="[39,110]"
      :options="{color:'blue'}"
    ></l-circle-marker>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      latlng: [38.57393751557594, 95.61808317250322],
      options: { radius: 10, color: "red" },
    }),
  };
</script>
```

:::

## 属性说明

| 属性名称    | 类型    | 默认值 | 说明                                     |
| :---------- | :------ | :----- | :--------------------------------------- |
| latlng      | latlng  | —      | 圆形标记的中心坐标                       |
| isFitBounds | boolean | false  | 是否将该组件范围自适应在地图的可视范围中 |
| options     | object  | —      | 配置选项，具体看下表                     |

### options

| 选项     | 类型     | 默认 | 描述                         |
| :------- | :------- | :--- | :--------------------------- |
| `radius` | `Number` | `10` | 圆形标记的半径，以像素为单位 |



## 方法说明

| 方法名称                                 | 返回值   | 描述                                                         |
| :--------------------------------------- | :------- | :----------------------------------------------------------- |
| `toGeoJSON(<Number|false> *precision?*)` | `Object` | 坐标值[`formatNum`](#util-formatnum) 用给定的函数四舍五入`precision`。返回[`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) 圆形标记的表示形式（作为 GeoJSON[`Point`](#point) 特征）。 |
| `setLatLng(<LatLng> *latLng*)`           | `this`   | 将圆形标记的位置设置为新位置。                               |
| `getLatLng()`                            | `LatLng` | 返回圆形标记的当前地理位置                                   |
| `setRadius(<Number> *radius*)`           | `this`   | 设置圆形标记的半径。单位是像素。                             |
| `getRadius()`                            | `Number` | 返回圆的当前半径                                             |

## 事件说明

| 事件名称 | 参数    | 描述                                                         |
| :------- | :------ | :----------------------------------------------------------- |
| `move`   | `Event` | 当标记通过 移动时触发[`setLatLng`](#circlemarker-setlatlng)。旧坐标和新坐标包含在事件参数中，如`oldLatLng`, `latlng`。 |