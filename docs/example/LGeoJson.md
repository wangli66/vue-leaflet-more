---
title: LGeoJson
---

## 基础用法

::: demo

```html
<template>
  <l-map style="height:400px;" @click="test">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-geo-json :geojson="geoJson" :options="jsonOptions"></l-geo-json>
  </l-map>
</template>
<script>
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      geoJson: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          properties: {
            state: 1,
          },
          coordinates: [
            [
              [95.61808317250322, 38.57393751557594],
              [120.12951653254693, 38.57393751557594],
              [117.6695877365569, 26.775039386999605],
              [96.93590217035502, 29.563901551414443],
              [95.61808317250322, 38.57393751557594],
            ],
          ],
        },
      },
      jsonOptions: {
        style: {
          color: "yellow",
          fillColor: "red",
          weight: 2,
        },
      },
    }),
    methods: {
      test(e) {
        console.log(e.latlng);
      },
    },
  };
</script>
```

:::

## geojson 集合

geojson 集合时，多个数据的不同渲染和时间支持

::: demo

```html
<template>
  <l-map ref="map" style="height:400px;" @click="test">
    <l-tile-layer :url="url" :options="options"> </l-tile-layer>
    <l-geo-json
      ref="geojsonLayer"
      :geojson="geoJson"
      :options="geojsonOptions"
      :onEachFeature="onEachFeature"
    ></l-geo-json>
  </l-map>
</template>
<script>
  //   import L from "leaflet";
  export default {
    data: () => ({
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",
      options: { foo: "bar" },
      geoJson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              properties: {
                state: 1,
              },
              coordinates: [
                [
                  [101.32863216319438, 35.72570430208827],
                  [106.07278055546094, 35.72570430208827],
                  [105.54565295632021, 32.82113382785512],
                  [102.20717816176229, 32.82113382785512],
                ],
              ],
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              properties: {
                state: 2,
              },
              coordinates: [
                [
                  [106.07278055546094, 35.72570430208827],
                  [110.81692894772748, 35.868279437251786],
                  [110.46551054830033, 32.8949634680289],
                  [105.54565295632021, 32.82113382785512],
                ],
              ],
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              properties: {
                state: 3,
              },
              coordinates: [
                [
                  [105.54565295632021, 32.82113382785512],
                  [102.20717816176229, 32.82113382785512],
                  [101.76790516247831, 30.04690678625502],
                  [106.77561735431523, 29.97079807221586],
                ],
              ],
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              properties: {
                state: 4,
              },
              coordinates: [
                [
                  [105.54565295632021, 32.82113382785512],
                  [110.46551054830033, 32.8949634680289],
                  [112.92543934429035, 29.818405697795484],
                  [106.77561735431523, 29.97079807221586],
                  [105.54565295632021, 32.82113382785512],
                ],
              ],
            },
          },
        ],
      },
      geojsonOptions: {
        style(feature) {
          const fillColorArr = ["#ff0000", "#1fff00", "#003fff", "#c900ff"];
          let properties = feature.geometry.properties;
          let state = properties.state;
          let fillColor = fillColorArr[state - 1];
          return {
            color: "yellow",
            fillColor: fillColor,
            weight: 2,
          };
        },
      },
    }),
    methods: {
      test(e) {
        console.log(e.latlng);
      },
      renderText(feature, layer) {
        let state = feature.geometry.properties.state;
        let myIcon = L.divIcon({
          className: "my-geojson-icon",
          html: '<span class="tips">状态' + state + "</span>",
        });
        this.$nextTick(() => {
          let center = layer.getCenter();
          let map = this.$refs.map.getSelf();
          L.marker(center, { icon: myIcon }).addTo(map);
        });
      },
      onEachFeature(feature, layer) {
        let _this = this;
        this.renderText(feature, layer);
        layer.on({
          mouseover(e) {
            layer.setStyle({
              weight: 3,
              fillOpacity: 0.9,
            });
          },
          mouseout(e) {
            _this.$refs.geojsonLayer.resetStyle(layer);
          },
          click(e) {
            let latlng = e.latlng;
            let properties = feature.geometry.properties;
            let state = properties.state;
            alert("你点击的状态为" + state);
          },
        });
      },
    },
  };
</script>
<style>
  .my-geojson-icon .tips {
    display: inline-block;
    transform: translateX(-50%) translateY(-50%);
    white-space: nowrap;
    color: red;
  }
</style>
```

:::

## 属性说明

| 属性名称    | 类型    | 默认值 | 说明                                     |
| :---------- | :------ | :----- | :--------------------------------------- |
| geojson     | geojson | —      | 一个 GeoJSON 对象或一组 GeoJSON 对象     |
| isFitBounds | boolean | —      | 是否将该组件范围自适应在地图的可视范围中 |
| options     | object  | —      | 配置选项，具体看下表                     |

### options

| 选项                    | 类型       | 默认    | 描述                                                                                                                                                                                                                       |
| :---------------------- | :--------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pointToLayer`          | `Function` | `*`     | 定义`Function`GeoJSON 点如何生成 Leaflet 层。它在添加数据时在内部调用，传递 GeoJSON 点特征及其[`LatLng`](#latlng). 默认是产生一个默认值[`Marker`](#marker)：`function(geoJsonPoint, latlng) { return L.marker(latlng); } ` |
| `style`                 | `Function` | `*`     | 用于`Function`定义[`Path options`](#path-option) GeoJSON 线和多边形样式的定义，在添加数据时在内部调用。默认值是不覆盖任何默认值：`function (geoJsonFeature) { return {} } `                                                |
| `onEachFeature`         | `Function` | `*`     | 在创建和设置样式之后，`Function`将为每个 created 调用一次。`Feature`用于将事件和弹出窗口附加到功能。默认是对新创建的图层不做任何事情：`function (feature, layer) {} `                                                      |
| `filter`                | `Function` | `*`     | `Function`将用于决定是否包含功能的 A。默认是包括所有功能：`function (geoJsonFeature) { return true; } `注意：动态更改`filter`选项只会对新添加的数据产生影响。它*不会*重新评估已包含的功能。                                |
| `coordsToLatLng`        | `Function` | `*`     | `Function`用于将 GeoJSON 坐标转换为[`LatLng`](#latlng)s 的 A。默认是`coordsToLatLng`静态方法。                                                                                                                             |
| `markersInheritOptions` | `Boolean`  | `false` | “点”类型特征的默认标记是否从组选项继承。                                                                                                                                                                                   |

## 方法说明

| 方法名称             | 返回值 | 说明                                                                                                                             |
| :------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------- |
| `addData(data)`      | `this` | 将 GeoJSON 对象添加到图层。                                                                                                      |
| `resetStyle(layer?)` | `this` | 将给定矢量图层的样式重置为原始 GeoJSON 样式，这对于在悬停事件后重置样式很有用。如果`layer`省略，则重置当前图层中所有要素的样式。 |
| `setStyle(style)`    | `this` | 使用给定的样式函数更改 GeoJSON 矢量图层的样式。                                                                                  |
