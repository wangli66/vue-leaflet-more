module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "browser": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ], //其他的设置都是自动的
    "rules": {
        //就是这一句，禁用import和require必须出现在顶层作用域的验证规则
        "global-require": 0, //这里应该0代表off之前写错了写成了false
        "indent": ["error", 4]
    }
};