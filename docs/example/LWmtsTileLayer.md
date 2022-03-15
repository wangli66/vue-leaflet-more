---
title: LWmtsTileLayer
---

## 基础用法

::: demo

```html
<template>
  <l-map style="height:400px;" :crs="'EPSG4326'" :center="[30, 111]" :zoom="4">
    <l-wmts-tile-layer :url="wmtsUrl" :options="wmtsOptions">
    </l-wmts-tile-layer>
    <l-wmts-tile-layer :url="wmtsUrl2" :options="wmtsOptions2">
    </l-wmts-tile-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      test: true,
      wmtsUrl:
        "http://t0.tianditu.gov.cn/ter_c/wmts?tk=3133b000f831d898dc3a8f9bcff6ddf4",
      wmtsOptions: {
        layer: "ter",
        tileMatrixSet: "c",
        format: "tiles",
        style: "default",
        type: "baseLayer",
      },
      wmtsUrl2:
        "http://t0.tianditu.gov.cn/cta_c/wmts?tk=3133b000f831d898dc3a8f9bcff6ddf4",
      wmtsOptions2: {
        layer: "cta",
        tileMatrixSet: "c",
        format: "tiles",
        style: "default",
        type: "baseLayer",
      },
    }),
  };
</script>
```

:::

## 属性说明

| 属性名称 | 类型   | 默认值 | 说明                     |
| :------- | :----- | :----- | :----------------------- |
| url      | string | —      | 给出 WMTS 服务的基本 URL |
| options  | object | —      | 配置选项，具体看下表     |

### options

具体参数需与后台服务提供的参数保持一致，下表仅供参考

| 参数名称   | 类型   | 默认值      | 说明                                      |
| :--------- | :----- | :---------- | :---------------------------------------- |
| name       | string | ''          |                                           |
| service    | string | 'wmts'      | 服务类型                                  |
| request    | string | `''`        | 请求函数名                                |
| version    | string | `''`        | 使用 WMTS 服务版本                        |
| layer      | string | `''`        | 请求图层名                                |
| style      | string | `'default'` | 使用 WMS 服务版本                         |
| format     | string | `''`        | wmts 的加载格式。如：‘tile’,'image/png'等 |
| type       | string | `''`        | baseLayer 图层类型                        |
| maxtrixSet | string |             | 切片方案的名称                            |

## 方法说明

wmtsLayer 继承自 layer,请参考 layer 及其继承组件的方法
