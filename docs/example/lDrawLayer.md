---
title: lDrawLayer
---

## 基础用法

- 点击绘制项，选中，再次点击，取消选中

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer></l-draw-layer>
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

## 修改展示位置

- position 绘制项放置的位置，string,默认 topleft
  - 可选值 'topleft', 'topright', 'bottomleft', 'bottomright'
- dToB 绘制项到边框的位置 ，string,默认'10px 80px'
  - '10px 80px': 10px 表示 x 轴距离边框的位置，80 表示 y 轴距离边框的位置

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer :dToB="dToB" :position="position"></l-draw-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      dToB: "10px 100px",
      position: "topright",
    }),
  };
</script>
```

:::

## 仅绘制一个图形

- 设置属性 drawShapeMore:false; 默认可以绘制多个图形
- 地图只能绘制一个图像，绘制下个图形时，上个图形自动删除
- 一个图形的限制仅 针对于'rectangle', 'polygon', 'circle', 'polyline',

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer :drawShapeMore="false"></l-draw-layer>
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

## 自定义绘制项-[string,string]

- drawOptions 属性可以是 string 类型的数组
- 默认显示可以绘制项的有：
- marker(点标记), circleMarker(圆标记), rectangle(矩形), polygon(多边形), circle(圆形), polyline(多线段), delete(删除功能 )
- 本示例仅配置显示出 marker, rectangle,polygon,delete,此种配置只能展示组件默认的展示信息，更为精细的配置请参考下一项

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer :drawOptions="drawOptions"></l-draw-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      drawOptions: ["marker", "rectangle", "polygon", "delete"],
    }),
  };
</script>
```

:::

## 自定义绘制项-[object,object]

- drawOptions 属性可以是 object 类型的数组
- 对象形式,在更为精确的配置时使用，drawOptions 数组对象中的 key 必须包含 type
- 本示例配置显示三项：rectangle,polygon,delete, 并 rectangle 自定义 title 提示信息

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer :drawOptions="drawOptions"></l-draw-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      drawOptions: [
        { type: "rectangle", title: "自定义title显示名" },
        { type: "polygon" },
        { type: "delete" },
      ],
    }),
  };
</script>
```

:::

## 自定义绘制项-[object,string]

- drawOptions 属性可以是 object 和 string 混合类型的数组
- 这种配置，可应用于只有个别的绘制项需要自定义配置的情况下
- 本示例配置显示三项：rectangle,polygon,circle,polyline,delete,

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer :drawOptions="drawOptions"></l-draw-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      drawOptions: [
        "rectangle",
        { type: "polygon", title: "自定义多边形的提示名称" },
        "circle",
        "polyline",
        "delete",
      ],
    }),
  };
</script>
```

:::

## 自定义绘制项 - object

- drawOptions 属性值为 object,对象的 key 为绘制项的类型
- 此种配置方式和[object]大致相同
- 本示例配置显示项：rectangle,polygon,delete,

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer :drawOptions="drawOptions"></l-draw-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      drawOptions: {
        rectangle: {
          title: "自定义绘制矩形提示名称",
        },
        polygon: {},
        delete: {},
      },
    }),
  };
</script>
```

:::

## 测量功能

- 测量功能仅支持 rectangle，polygon，circle 的面积测量， polyline 的长度测量
- 设置属性 measure:true; 表示以上几种类型全部测试，默认不测量

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer :measure="true"></l-draw-layer>
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

## 自定义部分测量功能

- 示例中，仅设置 polygon 需要测量面积

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer :drawOptions="drawOptions"></l-draw-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      drawOptions: [
        "rectangle",
        { type: "polygon", measure: true },
        "circle",
        "polyline",
        "delete",
      ],
    }),
  };
</script>
```

:::

## 自定义绘制图形的样式

- 属性 commonStyle，自定义整体绘制图形的样式
- 类型：object, 参考：leaflet 中定义图形 Options 参数中 style 对象
- 优先级：drawOptions 中的 style 配置 > 优先级大于 commonStyle 中的配置
- 绘制样式改变，绘制标记点的边框会随之改变
- 示例中，polygon 类型是绘制样式特殊设定的，也可将每个绘制项都配置成不一样的

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer
      :commonStyle="commonStyle"
      :drawOptions="drawOptions"
    ></l-draw-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      commonStyle: {
        color: "#E5D612",
        weight: 3,
      },
      drawOptions: [
        "rectangle",
        {
          type: "polygon",
          style: { color: "red", weigth: 5, fillColor: "#000000" },
        },
        "circle",
        "polyline",
        "delete",
      ],
    }),
  };
</script>
```

:::

## 自定义绘制标记点

- 属性 commonIconStyle，自定义整理绘制时的标记点的样式
- 类型：object, 参考：css 样式写法
- 优先级：drawOptions 中的 iconStyle 配置 > commonIconStyle > commonStyle 的影响 > drawOptions 中的 style 的影响
- 示例中，polygon 类型是绘制样式特殊设定的，也可将每个绘制项都配置成不一样的

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer
      :commonIconStyle="commonIconStyle"
      :drawOptions="drawOptions"
    ></l-draw-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      commonIconStyle: {
        border: "1px solid red",
        "background-color": "#FC05E8",
      },
      drawOptions: [
        "rectangle",
        {
          type: "polygon",
          iconStyle: {
            border: "none",
            "background-color": "#8B868B",
            "border-radius": "0",
          },
        },
        "circle",
        "polyline",
        "delete",
      ],
    }),
  };
</script>
```

:::

## 自定义点标记 marker

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer :drawOptions="drawOptions"></l-draw-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      drawOptions: [],
    }),
    mounted() {
      //   debugger;
      //   const icon = require("./marker-icon.png");
      const L = require("leaflet");
      this.drawOptions = [
        {
          type: "marker",
          style: {
            icon: L.icon({
              iconUrl: require("./marker-icon.png"),
              iconAnchor: [12, 38],
            }),
            title: "default",
          },
        },
        "rectangle",
        "polygon",
        "circle",
        "polyline",
        "delete",
      ];
    },
  };
</script>
```

:::

## 自定义圆标记 circleMarker

- style 中的配置，请参考 Path 类的 Options

::: demo

```html
<template>
  <l-map style="height:400px;" :zoomControl="true">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-draw-layer :drawOptions="drawOptions"></l-draw-layer>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      drawOptions: [
        {
          type: "circleMarker",
          style: {
            border: 20,
            color: "red",
            fillColor: "blue",
            fillOpacity: 0.5,
          },
        },
        "rectangle",
        "polygon",
        "circle",
        "polyline",
        "delete",
      ],
    }),
  };
</script>
```

:::

## 属性说明

| 属性名称        | 说明                                                                                                                                                                    | 类型          | 可选值                                     | 默认值    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------ | --------- |
| drawOptions     | 配置选项，具体看下表                                                                                                                                                    | object        | —                                          | —         |
| drawShapeMore   | 是否绘制多个图形                                                                                                                                                        | boolean       | —                                          | true      |
| commonStyle     | 绘制图形时的图形样式<br/>具体配置参考 Path 类的 Options                                                                                                                 | object        | —                                          | —         |
| commonIconStyle | 绘制图形时的标记点样式<br/>具体配置参考 css 规则书写                                                                                                                    | object        | —                                          | —         |
| measure         | 是否测量绘制图形的面积或长度<br/>marker、circleMarker 类型不能测量                                                                                                      | boolean       | —                                          | false     |
| position        | 地图类型的卡片显示的位置                                                                                                                                                | string        | topleft/ topright/ bottomleft/ bottomright | topright  |
| dToB            | 地图类型的卡片距离表框的位置。 ( 如果想设置卡片距离 x 轴和 y 轴的边框距离不一样，可设置值为“10px 20px”，字符串中的两个值用空格隔开即可，或者设置为数组["10px","20px"] ) | string，array | —                                          | 60px 10px |

### drawOptions

drawOptions 中的配置优先级 > 属性说明中的配置

| 参数名称  | 说明                       | 类型    | 可选值                                                            | 默认值 |
| --------- | -------------------------- | ------- | ----------------------------------------------------------------- | ------ |
| type      | 绘制项的类型               | string  | marker/circleMarker/rectangle<br/>/polygon/circle/polyline/delete | —      |
| title     | 鼠标滑过绘制栏时的提示信息 | string  | —                                                                 | —      |
| style     | 当前绘制图形的样式         | object  | —                                                                 | —      |
| iconStyle | 当前绘制图形的标记点样式   | object  | —                                                                 | —      |
| measure   | 当前绘制的图形是否需要测量 | boolean | —                                                                 | false  |
|           |                            |         |                                                                   |        |

## 方法说明

| 方法名称      | 说明               | 参数 | 返回值  |
| ------------- | ------------------ | ---- | ------- |
| clearLayers   | 清除所有的绘制图层 | —    | this    |
| getDrawLayers | 得到所有的绘制图层 | —    | Layer[] |

## 事件说明

| 事件名称   | 说明                                                                             | 回调参数                                                                                     |
| ---------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| changeType | 切换绘制类型是触发                                                               | 共一个参数，依次为：当前绘制类型包含的信息[object]<br/>{type:'',title:'',style:{}}           |
| startDraw  | 开始绘制时触发<br/>marker、circleMarker 类型只能触发开始，无绘制中和绘制结束事件 | 共两个参数，依次为：绘制开始时的坐标[array]、绘制项的图形类型[string]                        |
| drawing    | 正在绘制、绘制中触发                                                             | 共三个参数，依次为：绘制图形的临时图层[layer]、绘制图形的类型[string]、绘制图形的坐标[array] |
| finishDraw | 绘制结束时触发                                                                   | 共一个参数，依次为：绘制图形的图层[layer]                                                    |
