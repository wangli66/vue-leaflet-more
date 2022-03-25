---
title: LPopup
---

## 基础用法

::: tip 温馨提醒
使用时，经常与带坐标的图层一起使用，如 marker： marker.bindPopup(popupContent).openPopup();
:::

::: demo

```html
<template>
  <l-map style="height:400px;" :center="[30.724719,114.169496]" :zoom="12">
    <l-tile-layer :url="tileUrl" :options="options"> </l-tile-layer>
    <l-marker :latlng="[30.724719,114.169496]">
      <l-popup>hello!<br />这是一个slot的写法</l-popup>
    </l-marker>
    <l-popup :latlng="[30.724719,114.209496]" :content="content"></l-popup>
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

| 参数    | 类型                        | 默认值 | Description          |
| :------ | :-------------------------- | :----- | :------------------- |
| latlng  | latlng,array,object         | [0,0]  | popup 显示的坐标位置 |
| content | string,function,htmlElement | ''     | popup 显示的内容     |
| layer   | object\|Layer               | null   | 想要插入的图层       |
| options | object                      | --     | 具体见下表           |

### Options 说明

| 参数                        | 类型      | 默认值        | Description                                                                                             |
| :-------------------------- | :-------- | :------------ | :------------------------------------------------------------------------------------------------------ |
| `maxWidth`                  | `Number`  | `300`         | 弹窗的最大宽度，单位为像素                                                                              |
| `minWidth`                  | `Number`  | `50`          | 弹窗的最小宽度，单位为像素                                                                              |
| `maxHeight`                 | `Number`  | `null`        | 如果设置，如果内容超过此高度时，则在弹出窗口中显示滚动条。                                              |
| `autoPan`                   | `Boolean` | `true`        | 如果您不希望地图进行平移动画以适应打开的弹出窗口， 请将其设置为 false。                                 |
| `autoPanPaddingTopLeft`     | `Point`   | `null`        | 执行自动平移后，弹窗和地图视图左上角之间的边距。                                                        |
| `autoPanPaddingBottomRight` | `Point`   | `null`        | 执行自动平移后，弹窗和地图视图右下角之间的边距。                                                        |
| `autoPanPadding`            | `Point`   | `Point(5, 5)` | 相当于将左上角和右下角的自动平移填充设置为相同的值。                                                    |
| `keepInView`                | `Boolean` | `false`       | 如果你想防止用户在屏幕打开时弹出屏幕上的弹出窗口，将其设置为 true.                                      |
| `closeButton`               | `Boolean` | `true`        | 弹窗中是否存在关闭按钮                                                                                  |
| `autoClose`                 | `Boolean` | `true`        | 如果在打开另一个弹窗时，是否自动关闭之前的弹窗.                                                         |
| `closeOnEscapeKey`          | `Boolean` | `true`        | Set it to `false` if you want to override the default behavior of the ESC key for closing of the popup. |
| `closeOnClick`              | `Boolean` | `*`           | 如果要覆盖用户在地图上单击的弹出窗口关闭的默认行为，请设置它。默认为 Map 的 closePopupOnClick 选项。    |
| `className`                 | `String`  | `''`          | 要分配给弹窗的自定义的 css 类名                                                                         |

## 方法说明

| 方法名                         | 返回值      | 描述                                                                      |
| :----------------------------- | :---------- | :------------------------------------------------------------------------ | ---------------------- | --------------------- |
| `getLatLng()`                  | `LatLng`    | 返回弹窗的地理坐标点                                                      |
| `setLatLng(<LatLng> *latlng*)` | `this`      | 设定当弹窗打开时所在的地理坐标点                                          |
| `getContent()`                 | `String     | HTMLElement`                                                              | 返回弹窗的内容         |
| `setContent(<String            | HTMLElement | Function> _htmlContent_)`                                                 | `this`                 | 设定弹窗的 html 内容. |
| `getElement()`                 | `String     | HTMLElement`                                                              | getContent()方法的别名 |
| `update()`                     | `null`      | 更新弹出内容，布局和位置。用于在更改内容之后更新弹出 窗口，例如图像加载。 |
| `isOpen()`                     | `Boolean`   | 当弹窗时打开的时候则返回 true                                             |
| `bringToFront()`               | `this`      | 将当前的弹窗设置在另外的弹窗之前                                          |
| `bringToBack()`                | `this`      | 将当前的弹窗设置在另外的弹窗之前                                          |
| `openOn(<Map> *map*)`          | `this`      | 添加弹窗到地图并关闭前一个.与 map.openPopup(popup)操 作一样               |

## 事件说明

具体事件的使用和详情，可以参考 leaflet 的文档

| 事件         | 参数         | 描述                                             |
| :----------- | :----------- | :----------------------------------------------- |
| `add`        | `Event`      | Fired after the layer is added to a map          |
| `remove`     | `Event`      | Fired after the layer is removed from a map      |
| `popupopen`  | `PopupEvent` | Fired when a popup bound to this layer is opened |
| `popupclose` | `PopupEvent` | Fired when a popup bound to this layer is closed |
