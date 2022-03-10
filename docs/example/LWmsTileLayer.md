---
title: LWmsTileLayer
---

## 基础用法

::: demo

```html
<template>
  <l-map style="height:400px;" :center="center" :zoom="zoom">
    <l-wms-tile-layer :url="url" :params="params"> </l-wms-tile-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      center: [30, -89],
      zoom: 5,
      url: "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi",
      params: {
        layers: "nexrad-n0r-900913",
        format: "image/png",
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad",
      },
    }),
  };
</script>
```

:::

## 属性说明

| 属性名称 | 类型   | 默认值 | 说明                    |
| :------- | :----- | :----- | :---------------------- |
| url      | string | —      | 给出 WMS 服务的基本 URL |
| params   | object | —      | 配置选项，具体看下表    |

### Params

如果使用这里未记录的任何自定义选项，它们将作为每个请求 URL 中的额外参数发送到 WMS 服务器。

| 参数名称      | 类型      | 默认值         | 说明                                                                              |
| :------------ | :-------- | :------------- | :-------------------------------------------------------------------------------- |
| `layers`      | `String`  | `''`           | （必填）要显示的 WMS 图层，逗号分隔列表                                           |
| `styles`      | `String`  | `''`           | 逗号分隔的 WMS 样式列表。                                                         |
| `format`      | `String`  | `'image/jpeg'` | wms 的图像格式 (可以使用 'image/png' 用于具有透明度的图层).                       |
| `transparent` | `Boolean` | `false`        | 如果 true，WMS 服务将返回具有透明度的图像。                                       |
| `version`     | `String`  | `'1.1.1'`      | 使用 WMS 服务版本                                                                 |
| `crs`         | `CRS`     | `null`         | 坐标参考系统用于 WMS 请求，默认为映射 CRS。如果您不确定这是什么意思，请不要更改。 |
| `uppercase`   | `Boolean` | `false`        | 如果 true，WMS 请求参数名称将是大写。                                             |

## 事件说明

继承的事件，请参考 GridLayer 、Layer 、Popup、Tooltip 等的事件

## 方法说明

| 方法名                                                | 返回值 | 说明                                                                                 |
| :---------------------------------------------------- | :----- | :----------------------------------------------------------------------------------- |
| `setParams(<Object> *params*, <Boolean> *noRedraw?*)` | `this` | 使用新参数更新合并参数，并在当前屏幕范围重新请求图块（除非 noRedraw 设 置为 true）。 |
