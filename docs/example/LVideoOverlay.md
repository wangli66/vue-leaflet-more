---
title: LVideoOverlay
---

## 基础用法

::: demo

```html
<template>
  <l-map
    style="height:400px;"
    :center="[22.863521826289627, -115.98632991313936]"
    :zoom="5"
  >
    <l-tile-layer :url="tileUrl" :options="options"> </l-tile-layer>
    <l-video-overlay :url="videoUrl" :bounds="bounds"></l-video-overlay>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      videoUrl: "https://www.mapbox.com/bites/00188/patricia_nasa.webm",
      bounds: [
        [32, -130],
        [13, -100],
      ],
    }),
  };
</script>
```

:::



## 属性说明

| 属性名称 | 类型   | 默认值 | 说明                 |
| :------- | :----- | :----- | :------------------- |
| url      | string | —      | 给定video的 URL      |
| bounds   | array  | —      | 地理范围             |
| options  | object | —      | 配置选项，具体看下表 |

### Options

| 名称              | 类型      | 默认是  | 说明                                                         |
| :---------------- | :-------- | :------ | :----------------------------------------------------------- |
| `autoplay`        | `Boolean` | `true`  | 视频在加载时是否自动开始播放。在某些浏览器上，自动播放仅适用于`muted: true` |
| `loop`            | `Boolean` | `true`  | 播放时视频是否会循环播放到开头。                             |
| `keepAspectRatio` | `Boolean` | `true`  | 视频是否会在投影后保存宽高比。与支持的浏览器相关。查看[浏览器兼容性](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) |
| `muted`           | `Boolean` | `false` | 视频在加载时是否以静音状态开始。                             |
| `playsInline`     | `Boolean` | `true`  | 移动浏览器将在原处播放视频，而不是以全屏模式打开视频。       |



## 方法说明

| 方法名称       | 返回值             | 说明                                                         |
| :------------- | :----------------- | :----------------------------------------------------------- |
| `getElement()` | `HTMLVideoElement` | 返回此覆盖使用的 [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement) 的实例。 |

## 事件

| 事件名称 | 参数    | 说明                       |
| :------- | :------ | :------------------------- |
| `load`   | `Event` | 当视频完成加载第一帧时触发 |