(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{361:function(t,s,a){"use strict";a.d(s,"a",(function(){return r}));a(123),a(61),a(31),a(6),a(363),a(91),a(92),a(206),a(364),a(122);var e=a(362);function n(t,s){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);s&&(e=e.filter((function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable}))),a.push.apply(a,e)}return a}function r(t){for(var s=1;s<arguments.length;s++){var a=null!=arguments[s]?arguments[s]:{};s%2?n(Object(a),!0).forEach((function(s){Object(e.a)(t,s,a[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(a,s))}))}return t}},362:function(t,s,a){"use strict";a.d(s,"a",(function(){return e}));a(122);function e(t,s,a){return s in t?Object.defineProperty(t,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[s]=a,t}},363:function(t,s,a){var e=a(2),n=a(3),r=a(19),p=a(32).f,o=a(8),l=n((function(){p(1)}));e({target:"Object",stat:!0,forced:!o||l,sham:!o},{getOwnPropertyDescriptor:function(t,s){return p(r(t),s)}})},364:function(t,s,a){var e=a(2),n=a(8),r=a(124).f;e({target:"Object",stat:!0,forced:Object.defineProperties!==r,sham:!n},{defineProperties:r})},488:function(t,s,a){"use strict";a.r(s);var e,n=a(361),r=(a(90),{name:"component-doc",components:{"render-demo-0":(e={data:function(){return{layersOptions:"这是调用时的自定义属性"}},methods:{emitClick:function(){alert("测试点击事件——"+this.name)}}},Object(n.a)({render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",[[s("l-map",{staticStyle:{height:"400px"},attrs:{zoomControl:!0}},[s("l-tile-layer",{attrs:{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}",options:{foo:"bar"}}}),this._v(" "),s("l-draw-layer")],1)]],2)},staticRenderFns:[]},e))}}),p=a(18),o=Object(p.a)(r,(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"组件共同的属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组件共同的属性"}},[t._v("#")]),t._v(" 组件共同的属性")]),t._v(" "),a("p",[t._v("如果 leaflet 官网打不开，可参考：https://blog.csdn.net/qq_36595013/article/details/83144874")]),t._v(" "),a("p",[t._v("以下是各个组件共同的属性，每个组件都有这些属性和方法")]),t._v(" "),a("h3",{attrs:{id:"options"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#options"}},[t._v("#")]),t._v(" options")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("options 初始化各个组件时的参数，使用组件时的参数都可以写在 options 中")]),t._v(" "),a("ul",[a("li",[t._v("类型：object")]),t._v(" "),a("li",[t._v("默认值： 无")]),t._v(" "),a("li",[t._v("说明：根据具体组件的不同，参照 leaflet 文档中相应对象传值,")]),t._v(" "),a("li",[t._v('若 leaflet 中存在相应的 "set 属性名"的方法，则会响应式反应'),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("options 详细说明")]),t._v(" "),a("div",{staticClass:"language-js 基础使用和响应式说明 extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("示例：\n设置map的缩放级别和中心点坐标，可以这样写：\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//若zoom=13的值发生变化，map地图不会发生变化")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("map ref"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"map"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("zoom"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"13"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("map"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n也可以这样写：\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//若zoom=13的值发生变化，map会自动缩放，（原因：会自动触发setCenter()方法）")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("map ref"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"map"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("options"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"{zoom:13}"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("map"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n")])])])])])])])]),t._v(" "),a("h3",{attrs:{id:"addtomap"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#addtomap"}},[t._v("#")]),t._v(" addToMap")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("addToMap 是否将当前组件添加到根部的 map 中")]),t._v(" "),a("ul",[a("li",[t._v("类型：boolean")]),t._v(" "),a("li",[t._v("默认值： true")]),t._v(" "),a("li",[t._v("说明：若设置为 false，表示添加到父级组件中")])])])]),t._v(" "),a("h3",{attrs:{id:"useselfmethods"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#useselfmethods"}},[t._v("#")]),t._v(" useSelfMethods")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("useSelfMethods 是否使用 leaflet 的 class 自身的方法")]),t._v(" "),a("ul",[a("li",[t._v("类型：boolean")]),t._v(" "),a("li",[t._v("默认值： true")]),t._v(" "),a("li",[t._v("说明：若为 false,则不可以直接用调用组件的方法的方式调用 leaflet 中的方法（性能优化时，可在不需要调用组件方法时，将此项设置为 false）"),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("useSelfMethods 设置使用说明")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("useSelfMethods")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("可以直接在组件的基础上使用 leaflet 对象的方法\n示例：设置 map 的缩放级别为 "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("map ref"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"map"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("map"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n设置map 的缩放级别"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("map"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setZoom")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n若useSelfMethods的值为"),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n设置map 的缩放级别"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("map"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSelf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setZoom")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])])])])]),t._v(" "),a("h2",{attrs:{id:"组件共同的方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#组件共同的方法"}},[t._v("#")]),t._v(" 组件共同的方法")]),t._v(" "),a("h3",{attrs:{id:"getself"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getself"}},[t._v("#")]),t._v(" getSelf")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("getSelf() 获取 leaflet 本身提供的实例化对象")]),t._v(" "),a("ul",[a("li",[t._v("类型：无")]),t._v(" "),a("li",[t._v("返回值： 返回 leaflet 本身的实例化对象")]),t._v(" "),a("li",[t._v("说明：若为 true,则可以用调用组件的方法的方式调用 leaflet 中的方法"),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("getSelf() 示例说明")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v(" 示例"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("：\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("map ref"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"map"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("map"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("map"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSelf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//获取的是L.map()的对象")]),t._v("\n\n示例"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("：\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("tile"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("layer ref"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"tileLayer"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("tile"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("layer"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tileLayer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSelf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//获取的是L.tileLayer()的对象")]),t._v("\n\n示例"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("：\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("polyline ref"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"tileLayer"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("polyline"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tileLayer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSelf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//获取的是L.polyline()的对象")]),t._v("\n")])])])])])])])]),t._v(" "),a("h3",{attrs:{id:"getoptions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getoptions"}},[t._v("#")]),t._v(" getOptions")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("getOptions() 获取组件传参合并后的参数")]),t._v(" "),a("ul",[a("li",[t._v("类型：无")]),t._v(" "),a("li",[t._v("返回值： 返回组件 props、options 等合并后的参数,props 优先级大于 options")]),t._v(" "),a("li",[t._v("说明："),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("getOptions() 示例说明")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v(" 示例：\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("map ref"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"map"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("zoom"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"13"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("options"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"{zoom:12}"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("l"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("map"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" options "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$refs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("map"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getOptions")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//options的值为{zoom:13}")]),t._v("\n")])])])])])])])]),t._v(" "),a("h2",{attrs:{id:"常用功能概览"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用功能概览"}},[t._v("#")]),t._v(" 常用功能概览")]),t._v(" "),a("p",[t._v("常用的底图瓦片和地图的操作")]),t._v(" "),a("demo-block",{attrs:{options:JSON.parse(decodeURI("%7B%7D"))}},[a("template",{slot:"demo"},[[a("render-demo-0")]],2),t._v(" "),a("template",{slot:"source"},[a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("l-map")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token special-attr"}},[a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("style")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),a("span",{pre:!0,attrs:{class:"token value css language-css"}},[a("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("400px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":zoomControl")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("true"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("l-tile-layer")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":url")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":options")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("{foo:"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("bar"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("'")]),t._v("}"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("l-tile-layer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("l-draw-layer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("l-draw-layer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("l-map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("data")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("layersOptions")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"这是调用时的自定义属性"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("methods")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("emitClick")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"测试点击事件——"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])])],2)],1)}),[],!1,null,null,null);s.default=o.exports}}]);