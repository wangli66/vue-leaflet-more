import collapseCom from "./collapse.vue";
import Vue from "vue";

export default {
    updated() {
        this.$nextTick(() => {
            this.update();
        });
    },
    methods: {
        update() {
            const dom = Array.from(document.querySelectorAll(selector));
            let aDom = dom.filter(el => {
                let sidebar = el.parentNode.parentNode;
                return sidebar.className.includes("sidebar-links");
            });
            aDom.forEach((el) => {
                let collapse = el.querySelector(".vp-self-collapse");
                if (collapse) {
                    collapse.remove();
                }
                const C = Vue.extend(collapseCom);
                const collapseC = new C();
                let a = el.className.includes('active');
                collapseC.open = a;
                collapseC._parent = el;
                collapseC.$mount();
                el.appendChild(collapseC.$el);
            });
        },
    },
};