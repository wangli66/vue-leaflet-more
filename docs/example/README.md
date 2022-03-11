---
title: 写在前面
---

## 组件共同的属性

如果 leaflet 官网打不开，可参考：https://blog.csdn.net/qq_36595013/article/details/83144874

以下是各个组件共同的属性，每个组件都有这些属性和方法

### options

- options 初始化各个组件时的参数，使用组件时的参数都可以写在 options 中

  - 类型：object
  - 默认值： 无
  - 说明：根据具体组件的不同，参照 leaflet 文档中相应对象传值,
  - 若 leaflet 中存在相应的 "set 属性名"的方法，则会响应式反应
    ::: details options 详细说明

    ```js 基础使用和响应式说明
    示例：
    设置map的缩放级别和中心点坐标，可以这样写：
    //若zoom=13的值发生变化，map地图不会发生变化
    <l-map ref="map" :zoom="13"></l-map>
    也可以这样写：
    //若zoom=13的值发生变化，map会自动缩放，（原因：会自动触发setCenter()方法）
    <l-map ref="map" :options="{zoom:13}"></l-map>

    ```

    :::

### addToMap

- addToMap 是否将当前组件添加到根部的 map 中

  - 类型：boolean
  - 默认值： true
  - 说明：若设置为 false，表示添加到父级组件中

### useSelfMethods

- useSelfMethods 是否使用 leaflet 的 class 自身的方法

  - 类型：boolean
  - 默认值： true
  - 说明：若为 false,则不可以直接用调用组件的方法的方式调用 leaflet 中的方法（性能优化时，可在不需要调用组件方法时，将此项设置为 false）
    ::: details useSelfMethods 设置使用说明
    ```js
    useSelfMethods:true,可以直接在组件的基础上使用 leaflet 对象的方法
    示例：设置 map 的缩放级别为 10
    <l-map ref="map"></l-map>
    设置map 的缩放级别:   this.$refs.map.setZoom(10);
    若useSelfMethods的值为false
    设置map 的缩放级别:  this.$refs.map.getSelf().setZoom(10);
    ```
    :::

## 组件共同的方法

### getSelf

- getSelf() 获取 leaflet 本身提供的实例化对象

  - 类型：无
  - 返回值： 返回 leaflet 本身的实例化对象
  - 说明：若为 true,则可以用调用组件的方法的方式调用 leaflet 中的方法
    ::: details getSelf() 示例说明

    ```js
     示例1：
    <l-map ref="map"></l-map>
    this.$refs.map.getSelf();//获取的是L.map()的对象

    示例2：
    <l-tile-layer ref="tileLayer"></l-tile-layer>
    this.$refs.tileLayer.getSelf();//获取的是L.tileLayer()的对象

    示例3：
    <l-polyline ref="tileLayer"></l-polyline>
    this.$refs.tileLayer.getSelf();//获取的是L.polyline()的对象
    ```

    :::

### getOptions

- getOptions() 获取组件传参合并后的参数

  - 类型：无
  - 返回值： 返回组件 props、options 等合并后的参数,props 优先级大于 options
  - 说明：
    ::: details getOptions() 示例说明

    ```js
     示例：
    <l-map ref="map" :zoom="13" :options="{zoom:12}"></l-map>
    let options = this.$refs.map.getOptions();
    //options的值为{zoom:13}
    ```

    :::

## 常用功能概览

常用的底图瓦片和地图的操作

::: demo

```html
<template>
  <l-map style="height:400px;" :crs="'EPSG4326'" :zoomControl="true">
    <l-base-layer :layersOptions="layersOptions"> </l-base-layer>
    <l-draw-layer></l-draw-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      layersOptions: [
        {
          type: "wmtsTileLayer",
          nameClass: "vector",
          config: [
            {
              url: "http://t0.tianditu.gov.cn/vec_c/wmts?tk=3133b000f831d898dc3a8f9bcff6ddf4",
              options: {
                layer: "vec",
                tileMatrixSet: "c",
                format: "tiles",
                style: "default",
                type: "baseLayer",
              },
            },
            {
              url: "http://t0.tianditu.gov.cn/cva_c/wmts?tk=3133b000f831d898dc3a8f9bcff6ddf4",
              options: {
                layer: "cva",
                tileMatrixSet: "c",
                format: "tiles",
                style: "default",
                type: "baseLayer",
              },
            },
          ],
        },
        {
          type: "wmtsTileLayer",
          nameClass: "terrain",
          config: [
            {
              url: "http://t0.tianditu.gov.cn/ter_c/wmts?tk=5f62055ba4a942589b724283706c399a",
              options: {
                layer: "ter",
                tileMatrixSet: "c",
                format: "tiles",
                style: "default",
                type: "baseLayer",
              },
            },
            {
              url: "http://t0.tianditu.gov.cn/cta_c/wmts?tk=5f62055ba4a942589b724283706c399a",
              options: {
                layer: "cta",
                tileMatrixSet: "c",
                format: "tiles",
                style: "default",
                type: "baseLayer",
              },
            },
          ],
        },
        {
          type: "wmtsTileLayer",
          nameClass: "image",
          config: [
            {
              url: "http://t0.tianditu.gov.cn/img_c/wmts?tk=5f62055ba4a942589b724283706c399a",
              options: {
                layer: "img",
                tileMatrixSet: "c",
                format: "tiles",
                style: "default",
                type: "baseLayer",
              },
            },
            {
              url: "http://t0.tianditu.gov.cn/cia_c/wmts?tk=5f62055ba4a942589b724283706c399a",
              options: {
                layer: "cia",
                tileMatrixSet: "c",
                format: "tiles",
                style: "default",
                type: "baseLayer",
              },
            },
          ],
        },
      ],
    }),
  };
</script>
```

:::
