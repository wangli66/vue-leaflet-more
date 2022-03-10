---
title: LCircle
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
    <l-circle
      :latlng="latlng"
      :options="options"
      :isFitBounds="true"
    ></l-circle>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      latlng: [38.57393751557594, 95.61808317250322],
      options: { radius: 100000, color: "red", fillColor: "blue" },
    }),
  };
</script>
```

:::

## 属性说明

| 属性名称    | 类型    | 默认值 | 说明                                     |
| :---------- | :------ | :----- | :--------------------------------------- |
| latlng      | latlng  | —      | 圆形的圆点坐标                           |
| isFitBounds | boolean | false  | 是否将该组件范围自适应在地图的可视范围中 |
| options     | object  | —      | 配置选项，具体看下表                     |

### Options

其他options选项，请查看Path类的

| 选项     | 类型     | 默认 | 描述                   |
| :------- | :------- | :--- | :--------------------- |
| `radius` | `Number` | ``   | 圆的半径，以米为单位。 |

## 方法

| 方法名称                     | 返回值         | 描述                                        |
| :--------------------------- | :------------- | :------------------------------------------ |
| `setRadius(<Number> radius)` | `this`         | 设置圆的半径。单位是米。                    |
| `getRadius()`                | `Number`       | 返回圆的当前半径。单位是米。                |
| `getBounds()`                | `LatLngBounds` | 返回[`LatLngBounds`](#latlngbounds)路径的。 |
