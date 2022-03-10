---
title: LPath
---

- 一个抽象类，无实体组件
- 包含在矢量叠加层（多边形、折线、圆）之间共享的选项和常量。不要直接使用它。

## Options 选项

| 参数选项              | 类型       | 默认        | 描述                                                                                                                                                                                                                                                                                     |
| :-------------------- | :--------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stroke`              | `Boolean`  | `true`      | 是否沿路径绘制描边。将其设置`false`为禁用多边形或圆形的边框。                                                                                                                                                                                                                            |
| `color`               | `String`   | `'#3388ff'` | 描边颜色                                                                                                                                                                                                                                                                                 |
| `weight`              | `Number`   | `3`         | 笔画宽度（以像素为单位）                                                                                                                                                                                                                                                                 |
| `opacity`             | `Number`   | `1.0`       | 描边不透明度                                                                                                                                                                                                                                                                             |
| `lineCap`             | `String`   | `'round'`   | 一个字符串，它定义要在笔画[末尾使用的形状。](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap)                                                                                                                                                                        |
| `lineJoin`            | `String`   | `'round'`   | 一个字符串，它定义了要在笔画[角落使用的形状。](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin)                                                                                                                                                                     |
| `dashArray`           | `String`   | `null`      | 定义笔划[破折号模式](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray)的字符串。不适用于[某些旧浏览器](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility)[`Canvas`](#canvas)中的驱动层 。                       |
| `dashOffset`          | `String`   | `null`      | 一个字符串，它定义[到破折号模式的距离以开始破折号](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset)。不适用于[某些旧浏览器](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility)[`Canvas`](#canvas)中的驱动层。 |
| `fill`                | `Boolean`  | `depends`   | 是否用颜色填充路径。将其设置`false`为禁用填充多边形或圆形。                                                                                                                                                                                                                              |
| `fillColor`           | `String`   | `*`         | 填色。默认为[`color`](#path-color)选项 的值                                                                                                                                                                                                                                              |
| `fillOpacity`         | `Number`   | `0.2`       | 填充不透明度。                                                                                                                                                                                                                                                                           |
| `fillRule`            | `String`   | `'evenodd'` | 定义[如何确定形状内部的](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule)字符串。                                                                                                                                                                                         |
| `bubblingMouseEvents` | `Boolean`  | `true`      | 时`true`，此路径上的鼠标事件将触发地图上的相同事件（除非[`L.DomEvent.stopPropagation`](#domevent-stoppropagation)使用）。                                                                                                                                                                |
| `renderer`            | `Renderer` | ``          | 将此特定实例[`Renderer`](#renderer)用于此路径。优先于地图的[默认渲染器](#map-renderer)。                                                                                                                                                                                                 |
| `className`           | `String`   | `null`      | 在元素上设置的自定义类名。仅适用于 SVG 渲染器。                                                                                                                                                                                                                                          |

## 方法说明

| 方法                               | 退货   | 描述                                                           |
| :--------------------------------- | :----- | :------------------------------------------------------------- |
| `redraw()`                         | `this` | 重绘图层。有时在更改路径使用的坐标后很有用。                   |
| `setStyle(<Path options> *style*)` | `this` | 根据对象中的选项更改路径的外观[`Path options`](#path-option)。 |
| `bringToFront()`                   | `this` | 将图层置于所有路径图层的顶部。                                 |
| `bringToBack()`                    | `this` | 将图层置于所有路径图层的底部。                                 |
