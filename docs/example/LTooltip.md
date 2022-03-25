---
title: LTooltip
---

## 基础用法

::: tip 温馨提醒
该组件一般不单独使用，包含在其他组件（继承自 layer）的内部使用；
该组件为最小颗粒组件，不能再包含组件
:::

::: demo

```html
<template>
  <l-map style="height:400px;" :center="[30.724719,114.169496]" :zoom="12">
    <l-tile-layer :url="tileUrl" :options="options"> </l-tile-layer>
    <l-marker :latlng="[30.724719,114.169496]">
      <l-tooltip>这是一个tooltip示例</l-tooltip>
    </l-marker>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      content:
        '<p style="color:red;">Hello world!<br />This is a nice popup.</p>',
    }),
  };
</script>
```

:::

## 属性说明

| 属性    | 类型   | 默认 | 描述                      |
| :------ | :----- | :--- | :------------------------ |
| content | string | ''   | 提示信息                  |
| options | object | {}   | 初始化时的信息 ，具体如下 |

### Options

| 选项          | 类型      | 默认            | 描述                                                                                                                                                                                                                  |
| :------------ | :-------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pane`        | `String`  | `'tooltipPane'` | `Map pane`工具提示将被添加到哪里。                                                                                                                                                                                    |
| `offset`      | `Point`   | `Point(0, 0)`   | Optional offset of the tooltip position.                                                                                                                                                                              |
| `direction`   | `String`  | `'auto'`        | Direction where to open the tooltip. Possible values are: `right`, `left`, `top`, `bottom`, `center`, `auto`. `auto` will dynamically switch between `right` and `left` according to the tooltip position on the map. |
| `permanent`   | `Boolean` | `false`         | Whether to open the tooltip permanently or only on mouseover.                                                                                                                                                         |
| `sticky`      | `Boolean` | `false`         | 如果为 true，则工具提示将跟随鼠标而不是固定在特征中心。                                                                                                                                                               |
| `interactive` | `Boolean` | `false`         | If true, the tooltip will listen to the feature events.                                                                                                                                                               |
| `opacity`     | `Number`  | `0.9`           | Tooltip container opacity.                                                                                                                                                                                            |
| `className`   | `String`  | `''`            | 要分配给弹出窗口的自定义 CSS 类名称。                                                                                                                                                                                 |

## 方法说明

下列方法在 tooltip 依附的图层上使用

如：marker.bindTooltip("my tooltip text").openTooltip();

| 方法明                            | 退货        | 描述                                                                               |
| :-------------------------------- | :---------- | :--------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `bindTooltip(<String              | HTMLElement | Function                                                                           | Tooltip> _content_, <Tooltip options> _options?_)` | `this`                             | 将工具提示绑定到传递的图层`content`并设置必要的事件侦听器。如果 a`Function`被传递，它将接收层作为第一个参数，并应返回 a`String`或`HTMLElement`。 |
| `unbindTooltip()`                 | `this`      | 删除之前绑定的工具提示`bindTooltip`。                                              |
| `openTooltip(<LatLng> *latlng?*)` | `this`      | 如果没有传递，则在指定的`latlng`或默认的工具提示锚点处打开绑定的工具提示。`latlng` |
| `closeTooltip()`                  | `this`      | 如果此图层打开，则关闭绑定到此图层的工具提示。                                     |
| `toggleTooltip()`                 | `this`      | 根据其当前状态打开或关闭绑定到此图层的工具提示。                                   |
| `isTooltipOpen()`                 | `boolean`   | 返回`true`绑定到此图层的工具提示当前是否打开。                                     |
| `setTooltipContent(<String        | HTMLElement | Tooltip> _content_)`                                                               | `this`                                             | 设置绑定到该图层的工具提示的内容。 |
| `getTooltip()`                    | `Tooltip`   | 返回绑定到该图层的工具提示。                                                       |
