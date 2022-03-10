export default {
    data() {
        return {
            parentRef: null,
            parentMap: null,
            editLayer: null,
        }
    },
    methods: {

    },
    mounted() {
        this.parentRef = this.$parent;
        this.parentMap = this.$parent.getMap();

        // 编辑图层
        this.editLayer = L.featureGroup();
        this.parentMap.addLayer(this.editLayer);

        // this.editLayer = this.parentRef.getEditLayer();
    }
}