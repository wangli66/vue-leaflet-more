const path = require("path");

module.exports = (options, context) => ({
    define() {
        return {
            selector: options.selector || 'a[class~="sidebar-link"]',
            copyText: options.open || true,
        };
    },
    clientRootMixin: path.resolve(__dirname, "clientRootMixin.js"),
});