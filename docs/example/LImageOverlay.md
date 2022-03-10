---
title: LImageOverlay
---

## 基础用法

::: demo

```html
<template>
  <l-map style="height:400px;" :center="[30.724719,114.169496]" :zoom="12">
    <l-tile-layer :url="tileUrl" :options="options"> </l-tile-layer>
    <l-image-overlay :url="imgUrl" :bounds="bounds"></l-image-overlay>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      imgUrl: "http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg",
      bounds: [
        [30.712216, 114.22655],
        [30.773941, 114.12544],
      ],
    }),
  };
</script>
```

:::

## 属性说明

| 属性名称 | 类型   | 默认值 | 说明                 |
| :------- | :----- | :----- | :------------------- |
| url      | string | —      | 给定图像的 URL       |
| bounds   | array  | —      | 地理范围             |
| options  | object | —      | 配置选项，具体看下表 |

### Options

| 参数名称          | 类型      | 默认值  | 说明                                                                                                                          |
| :---------------- | :-------- | :------ | :---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `opacity`         | `Number`  | `1.0`   | 覆盖图片的透明度                                                                                                              |
| `alt`             | `String`  | `''`    | alt 图像属性的文本（对辅助功能有用）。                                                                                        |
| `interactive`     | `Boolean` | `false` | 如果 true，当点击或悬停时，图像叠加层将发出鼠标事件 mouse events 。                                                           |
| `crossOrigin`     | `Boolean  | String` | `false`                                                                                                                       | 如果为 true，则图像将其 crossOrigin 属性设置为‘'。如果要访问图像像素数据，则需要这样做。 |
| `errorOverlayUrl` | `String`  | `''`    | 指向覆盖图像的 URL，以代替加载失败的覆盖。                                                                                    |
| `zIndex`          | `Number`  | `1`     | The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer. |
| `className`       | `String`  | `''`    | A custom class name to assign to the image. Empty by default.                                                                 |

## 方法说明

| 名称                                 | 返回值         | 说明                                                             |
| :----------------------------------- | :------------- | :--------------------------------------------------------------- |
| `setOpacity(<Number> *opacity*)`     | `this`         | 设置覆盖的透明度                                                 |
| `bringToFront()`                     | `this`         | 将图层覆盖到所有覆盖层的顶部.                                    |
| `bringToBack()`                      | `this`         | 将图层覆盖到所有覆盖的底部.                                      |
| `setUrl(<String> *url*)`             | `this`         | 设置图片的 url                                                   |
| `setBounds(<LatLngBounds> *bounds*)` | `this`         | 更新图片覆盖的边界                                               |
| `setZIndex(<Number> *value*)`        | `this`         | Changes the [zIndex](#imageoverlay-zindex) of the image overlay. |
| `getBounds()`                        | `LatLngBounds` | 获得图片的边界                                                   |
| `getElement()`                       | `HTMLElement`  | 获得地图上的图片节点                                             |
| `getCenter()`                        | `LatLng`       | Returns the center of the ImageOverlay.                          |

## 事件说明

| 名称    | 参数    | 说明                                                      |
| :------ | :------ | :-------------------------------------------------------- |
| `load`  | `Event` | Fired when the ImageOverlay layer has loaded its image    |
| `error` | `Event` | Fired when the ImageOverlay layer fails to load its image |
