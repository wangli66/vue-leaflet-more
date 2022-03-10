---
title: lTileLayer
---

## 基础用法

::: demo

```html
<template>
  <l-map style="height:400px;">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
    }),
  };
</script>
```

:::

## 属性说明

| 属性名称 | 类型   | 默认值 | 说明                             |
| :------- | :----- | :----- | :------------------------------- |
| `url`    | string | —      | tile 瓦片图层对象的 URL template |
| options  | object | —      | 配置选项，具体看下表             |

### Options

| Option           | Type      | Default   | Description                                                                                                          |
| :--------------- | :-------- | :-------- | :------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `minZoom`        | `Number`  | `0`       | 最小的缩放级别                                                                                                       |
| `maxZoom`        | `Number`  | `18`      | 最大的缩放级别                                                                                                       |
| `subdomains`     | `String   | String[]` | `'abc'`                                                                                                              | 瓦片服务的子域名。可以以一个字符串的形式（每个字母都是子域名）或一个字符串数组 的形式传递。                                                                                                                                                                                                                                                                                                                                                                                             |
| `errorTileUrl`   | `String`  | `''`      | 显示加载瓦片失败时，显示的图片的 url                                                                                 |
| `zoomOffset`     | `Number`  | `0`       | 用此值来补偿 URL 中地图的缩放级别                                                                                    |
| `tms`            | `Boolean` | `false`   | 用此值来补偿 URL 中地图的缩放级别                                                                                    |
| `zoomReverse`    | `Boolean` | `false`   | 如果设置为 true，则 URL 网址中使用的缩放 z 数字将被颠倒（maxZoom ­ zoom 而不是 zoom）                                |
| `detectRetina`   | `Boolean` | `false`   | 如果此项为 true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地 区内一个更大的缩放级别来利用高分辨率 |
| `crossOrigin`    | `Boolean  | String`   | `false`                                                                                                              | 如果为 true，则所有图块将其 crossOrigin 属性设置为“'。如果要访问像素数据，则需要这 样做。                                                                                                                                                                                                                                                                                                                                                                                               |
| `referrerPolicy` | `Boolean  | String`   | `false`                                                                                                              | Whether the referrerPolicy attribute will be added to the tiles. If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided. This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer (e.g. to validate an API token). Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values. |

## 方法说明

| 方法名称                                            | 返回值        | 说明                                                                                                                      |
| :-------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------ |
| `setUrl(<String> *url*, <Boolean> *noRedraw?*)`     | `this`        | 更新图层的 URL 模板和重绘它（除非 noredraw 设置为 true）.                                                                 |
| `createTile(<Object> *coords*, <Function> *done?*)` | `HTMLElement` | `仅在内部调用，覆盖GridLayercreateTile() 以返回一个<img>给定适当的图像URL 的HTML元素coords。在瓦片已经加载回调被调用done` |

### 扩展方法

继承扩展 TileLayer 后可能会重新实现以下方法。

| 方法名称                        | 返回值   | 说明                                                                                                   |
| :------------------------------ | :------- | :----------------------------------------------------------------------------------------------------- |
| `getTileUrl(<Object> *coords*)` | `String` | 仅在内部调用，返回给定坐标的瓦片的 URL。扩展类 TileLayer 可以覆盖此功能，以提供自定义图块 URL 命名方案 |

## 事件说明

| 事件名      | 参数        | 说明                                                 |
| :---------- | :---------- | :--------------------------------------------------- |
| `tileabort` | `TileEvent` | Fired when a tile was loading but is now not wanted. |
