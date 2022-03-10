---
title: lBaseLayer
---

## 介绍

- 组件说明和产生原因：
  - 该组件是后面若干瓦片底图组件的集合体，组件的类型和后续的瓦片底图组件一一相对应
  - 解决问题的情况：项目中多处使用到地图组件，在功能不断开发过程中，频繁改变瓦片服务类型；
  - 建议：将瓦片服务配置成全局的 mixins 或全局变量，这样，一旦项目中的瓦片服务类型发生改变，只用改全局配置即可
- lBaseLayer 组件，作为底图加载组件，支持的图层类型有 tileLayer(默认),wmsTileLayer,wmtsTileLayer,imageOverlay,videoOverlay
- layersOptions 的标准格式为

```js
layersOptions: {
    type: '', //瓦片类型
    config: { //具体的瓦片配置
        url:''
        // ....其他配置
    }
}
// 直接把参数写在layersOptions中也是支持的，不推荐，项目大了后，容易把baseLayer的配置和具体类型瓦片的配置混淆
layersOptions: {
    type: '', //瓦片类型
    url: '',
    //....其他配置
}
```

## 基础用法

- 默认的底图类型是 tileLayer

::: demo

```html
<template>
  <l-map style="height:400px;">
    <l-base-layer :layersOptions="layersOptions"> </l-base-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      layersOptions: {
        config: {
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
          options: { foo: "bar" },
        },
      },
    }),
  };
</script>
```

:::

## 加载 wmsTileLayer 底图

::: demo

```html
<template>
  <l-map
    style="height:400px;"
    :center="[30, -89]"
    :zoom="5"
    :zoomControl="true"
  >
    <l-base-layer :layersOptions="layersOptions2"> </l-base-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      layersOptions2: {
        type: "wmsTileLayer",
        config: {
          url: "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi",
          options: {
            layers: "nexrad-n0r-900913",
            format: "image/png",
            transparent: true,
            attribution: "Weather data © 2012 IEM Nexrad",
          },
        },
      },
    }),
  };
</script>
```

:::

## 加载 wmtsTileLayer 底图

- 该示例的 tk 用在天地图上申请的个人 tk，若底图加载不出来，可能是由于当天底图加载次数过多，使用时请自行前往天地图申请 tk 使用

::: demo

```html
<template>
  <l-map style="height:400px;" :crs="'EPSG4326'" :zoom="4" :zoomControl="true">
    <l-base-layer :layersOptions="layersOptions3"> </l-base-layer>
  </l-map>
</template>
<script>
  //   let { CRS } = require("leaflet");
  export default {
    data: () => ({
      //   EPSG4326: CRS.EPSG4326,
      layersOptions3: {
        type: "wmtsTileLayer",
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
    }),
  };
</script>
```

:::

## 加载 imageOverlay 底图

::: demo

```html
<template>
  <l-map
    style="height:400px;"
    :center="[40.73903079078143, -74.17453765869142]"
    :zoom="12"
  >
    <l-base-layer :layersOptions="layersOptions4"> </l-base-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      layersOptions4: {
        type: "imageOverlay",
        config: {
          url: "http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg",
          bounds: [
            [40.712216, -74.22655],
            [40.773941, -74.12544],
          ],
        },
      },
    }),
  };
</script>
```

:::

## 加载 videoOverlay 底图

::: demo

```html
<template>
  <l-map
    style="height:400px;"
    :center="[22.863521826289627, -115.98632991313936]"
    :zoom="5"
  >
    <l-base-layer :layersOptions="layersOptions5"> </l-base-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      layersOptions5: {
        type: "videoOverlay",
        config: {
          url: "https://www.mapbox.com/bites/00188/patricia_nasa.webm",
          bounds: [
            [32, -130],
            [13, -100],
          ],
        },
      },
    }),
  };
</script>
```

:::

## 加载多个底图

- 加载的多个底图，请注意 CRS.EPSG\*坐标系要相同
- 本例以天地图的瓦片为例
- 右侧的地图卡片，组件支持的 nameClass 以下几种，nameClass 和展示名字的对应关系如下：
  vector: '矢量',
  terrain: '地形',
  image: '影像',
  earth: '地球'

::: demo 1、加载多个瓦片时，layersOptions 为数组，2、若一个地图中需要包含底图、坐标等，可将 config 配置成数组，3、若需自定义展示名称，可在 name 中配置，如下示例，不配置的 name，展示名称管理如说明一致

```html
<template>
  <l-map style="height:400px;" :crs="'EPSG4326'" :zoom="2" :zoomControl="true">
    <l-base-layer :layersOptions="layersOptions6"> </l-base-layer>
  </l-map>
</template>
<script>
  //   let { CRS } = require("leaflet");
  export default {
    data: () => ({
      //   EPSG4326: CRS.EPSG4326,
      layersOptions6: [
        {
          type: "wmtsTileLayer",
          nameClass: "vector",
          name: "矢量test",
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

## 自定义底图卡片的位置和显示名

- 注意事项参考加载加载多个底图瓦片
- dToB 设置地图卡片到边框的位置
  - 默认为:'20px', 表示 x 轴、y 轴方向上的距离边框都是 20px
  - 若想设置 x 轴、y 轴方向上到边框的距离不一致，可设为 dToB:'20px 40px'; //x 轴距离边框 20px，y 轴距离边框 40px
- position 卡片放置的位置
  - 默认为:'topright',表示卡片在地图的右上角
  - 可选择值有：'topleft', 'topright', 'bottomleft', 'bottomright'
- nameClass 可自定义，若用组件提供的卡片项的图片，请在'vector','terrain','image','earth'中选择一个
  - name 可自定义，若不自定义，由组件提供 nameClass 决定
    - vector: '矢量',
    - terrain: '地形',
    - image: '影像',
    - earth: '地球'

::: demo 1、第一项配置 nameClass: "customClass",为自定义的 class 类名，在组件提供的四种背景图不满足需求的情况下，自定义；

```html
<template>
  <l-map style="height:400px;" :crs="'EPSG4326'" :zoom="2">
    <l-base-layer
      :dToB="dToB"
      :position="position"
      :layersOptions="layersOptions7"
    >
    </l-base-layer>
  </l-map>
</template>
<script>
  //   let { CRS } = require("leaflet");
  export default {
    data: () => ({
      //   EPSG4326: CRS.EPSG4326,
      dToB: "60px 10px",
      position: "topleft",
      layersOptions7: [
        {
          type: "wmtsTileLayer",
          nameClass: "customClass",
          name: "custom",
          config: {
            url: "http://t0.tianditu.gov.cn/ter_c/wmts?tk=5f62055ba4a942589b724283706c399a",
            options: {
              layer: "ter",
              tileMatrixSet: "c",
              format: "tiles",
              style: "default",
              type: "baseLayer",
            },
          },
        },
        {
          type: "wmtsTileLayer",
          nameClass: "vector",
          name: "矢量图",
          config: {
            url: "http://t0.tianditu.gov.cn/vec_c/wmts?tk=3133b000f831d898dc3a8f9bcff6ddf4",
            options: {
              layer: "vec",
              tileMatrixSet: "c",
              format: "tiles",
              style: "default",
              type: "baseLayer",
            },
          },
        },
        {
          type: "wmtsTileLayer",
          nameClass: "earth",
          name: "地理坐标",
          config: {
            url: "http://t0.tianditu.gov.cn/cva_c/wmts?tk=3133b000f831d898dc3a8f9bcff6ddf4",
            options: {
              layer: "cva",
              tileMatrixSet: "c",
              format: "tiles",
              style: "default",
              type: "baseLayer",
            },
          },
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
          name: "只有影像",
          config: {
            url: "http://t0.tianditu.gov.cn/img_c/wmts?tk=5f62055ba4a942589b724283706c399a",
            options: {
              layer: "img",
              tileMatrixSet: "c",
              format: "tiles",
              style: "default",
              type: "baseLayer",
            },
          },
        },
      ],
    }),
  };
</script>
<style>
  .customClass {
    background-color: red;
  }
</style>
```

:::

---

## 属性说明

| 属性名称      | 说明                                                                                                                                                                    | 类型          | 可选值                                     | 默认值   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------ | -------- |
| layersOptions | 配置选项，具体看下表                                                                                                                                                    | object        | —                                          | —        |
| showType      | 是否展示地图类型的卡片                                                                                                                                                  | boolean       | —                                          | false    |
| position      | 地图类型的卡片显示的位置                                                                                                                                                | string        | topleft/ topright/ bottomleft/ bottomright | topright |
| dToB          | 地图类型的卡片距离表框的位置。 ( 如果想设置卡片距离 x 轴和 y 轴的边框距离不一样，可设置值为“10px 20px”，字符串中的两个值用空格隔开即可，或者设置为数组["10px","20px"] ) | string，array | —                                          | 20px     |

### layersOptions

| 参数名称  | 说明                                                                                                             | 类型   | 可选值                                                                                                                        | 默认值    |
| --------- | ---------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- | --------- |
| type      | 加载的瓦片服务类型                                                                                               | string | tileLayer/ wmsTileLayer/ wmtsTileLayer/ imageOverlay/videoOverlay                                                             | tileLayer |
| nameClass | 加载多个底图服务，并且显示地图卡片时需要设置<br/>卡片显示的 class 名称，可自定义，自定义后要写相应自定义的类支持 | string | vector/terrain/image/earth                                                                                                    | —         |
| name      | 卡片项上显示的名称                                                                                               | string | 自定义，若此项不设置，显示的名称根据上一行对应<br/> vector: '矢量',<br/>terrain: '地形',<br/>image: '影像',<br/>earth: '地球' | —         |
|           |                                                                                                                  |        |                                                                                                                               |           |
| config    | 指定 type 对应的地图组件的配置<br/>该项中的值也可直接放在 layersOptions 中使用                                   | object | —                                                                                                                             | —         |
|           | url：服务地址                                                                                                    | string | —                                                                                                                             | —         |
|           | options：服务的参数                                                                                              | object | —                                                                                                                             | —         |
|           | 其他的值，根据类型的地图组件而定，请参考具体的地图组件                                                           |        |                                                                                                                               |           |
|           |                                                                                                                  |        |                                                                                                                               |           |

## 方法说明

参考 leaflet 的相应类的方法，都支持，若想以组件方法调用，请将 useSelfMethods 设置为 true

## 事件说明

参考 leaflet 的相应类的事件，都支持

| 事件名称   | 说明         | 回调参数                                           |
| ---------- | ------------ | -------------------------------------------------- |
| changeType | 切换瓦片类型 | 共两个参数，依次为：切换后的 type、切换前的 type。 |
