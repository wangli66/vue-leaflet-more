---
title: LImageOverlayRotated
---

## 基础用法

- 属性的 bounds 的值类型为 Array|Object
  - 参数为 Array,是一个二维数组,顺序为：[topleft, topright, bottomleft]
  - 参数为 Object,{topleft:XXX, topright:XXX, bottomleft:XXX}
  - topleft, topright, bottomleft 三个参数可为数组或对象
    - 例如：数组可为：[39, 110]
    - 例如：对象可为可为：{lat:39, lng:110} 或者 {lat:39, lon: 110}

::: demo

```html
<template>
  <l-map style="height:400px;" :center="[30.724719,114.169496]" :zoom="12">
    <l-tile-layer :url="tileUrl" :options="options"> </l-tile-layer>
    <l-image-overlay-rotated
      :url="imgUrl"
      :bounds="bounds"
      :options="{opacity:0.9}"
    ></l-image-overlay-rotated>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      imgUrl: "http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg",
      //   bounds: [
      //     [30.76878861937772, 114.13574865289849],
      //     [30.74538274399332, 114.22120127924],
      //     [30.70129535595603, 114.1117258262161],
      //   ],
      // 或者可为
      //   bounds: [
      //     { lat: 30.76878861937772, lng: 114.13574865289849 },
      //     { lat: 30.74538274399332, lng: 114.22120127924 },
      //     { lat: 30.70129535595603, lng: 114.1117258262161 },
      //   ],
      //  或者可为
      bounds: {
        topleft: [30.76878861937772, 114.13574865289849],
        topright: [30.74538274399332, 114.22120127924],
        bottomleft: [30.70129535595603, 114.1117258262161],
      },
    }),
  };
</script>
```

:::

## 改变三角位置

- 使用方法：reposition(),参数和初始化时保持一致

::: demo

```html
<template>
  <l-map style="height:400px;" :center="[30.724719,114.169496]" :zoom="12">
    <l-tile-layer :url="tileUrl" :options="options"> </l-tile-layer>
    <l-image-overlay-rotated
      ref="rotated"
      @ready="readyFn"
      :url="imgUrl"
      :bounds="bounds"
      :options="{opacity:0.9}"
    ></l-image-overlay-rotated>
    <l-marker
      ref="marker"
      v-for="(item,index) in bounds"
      :keys="index"
      :latlng="item"
      :options="{draggable: true}"
    ></l-marker>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      imgUrl: "http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg",
      bounds: [
        [30.76878861937772, 114.13574865289849],
        [30.74538274399332, 114.22120127924],
        [30.70129535595603, 114.1117258262161],
      ],
    }),
    methods: {
      readyFn() {
        this.$nextTick(() => {
          let refs = this.$refs.marker;
          let rotated = this.$refs.rotated;
          refs.forEach((ref) => {
            ref.on("drag dragend", () => {
              rotated.reposition(
                refs[0].getLatLng(),
                refs[1].getLatLng(),
                refs[2].getLatLng()
              );
            });
          });
        });
      },
    },
  };
</script>
```

:::

reposition

## 属性说明

| 属性名称            | 类型                                        | 默认值 | 说明                                                                            |
| :------------------ | :------------------------------------------ | :----- | :------------------------------------------------------------------------------ |
| url                 | string                                      | —      | 给定图像的 URL                                                                  |
| bounds              | array，object                               | —      | 地理范围，经纬度。具体看下两列说明                                              |
| ------类型为 array  | [topleft, topright, bottomleft]             |        | topleft, topright, bottomleft 指经纬度，可为 array，object,具体看基础用法的说明 |
| ------类型为 object | {topleft:XXX, topright:XXX, bottomleft:XXX} |        |                                                                                 |
| options             | object                                      | —      | 配置选项，具体看下表                                                            |

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
