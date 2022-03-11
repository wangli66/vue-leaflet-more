const nav = require("./config/nav.js");
const sidebar = require("./config/sidebar.js");

module.exports = {
    title: "vue-leaflet-more 快速、便捷使用leaflet进行vue项目开发",
    description: "vue-leaflet-more 快速、便捷使用leaflet进行vue项目开发",
    dest: "./docs/dist",
    base: process.env.NODE_ENV === 'production' ? '/vue-leaflet-more/' : '/',
    plugins: [
        "demo-container",
        "@vuepress/plugin-back-to-top",
        require("./collapse/index.js")
    ],
    themeConfig: {
        logo: "https://vuejs.org/images/logo.png",
        sidebarDepth: 3,
        nav,
        sidebar: sidebar,
    },
};