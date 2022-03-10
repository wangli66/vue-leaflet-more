import { setOptions } from 'leaflet';

// 首字符大写
export const capitalizeFirstLetter = string => {
    if (!string || typeof string.charAt !== 'function') {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// 绑定参数响应改变
export const propsBinder = (vueElement, leafletElement, props, options) => {
    const params = Object.assign({}, props, options);
    for (const key in params) {
        const setMethodName = 'set' + capitalizeFirstLetter(key);
        const deepValue =
            params[key].type === Object ||
            params[key].type === Array ||
            Array.isArray(params[key].type);
        let embellishKey = options ? 'options.' + key : key;
        if (params[key].custom && vueElement[setMethodName]) {
            vueElement.$watch(
                embellishKey,
                (newVal, oldVal) => {
                    vueElement[setMethodName](newVal, oldVal);
                }, {
                    deep: deepValue,
                }
            );
        } else if (setMethodName === 'setOptions') {
            vueElement.$watch(
                embellishKey,
                (newVal, oldVal) => {
                    setOptions(leafletElement, newVal);
                }, {
                    deep: deepValue,
                }
            );
        } else if (leafletElement[setMethodName]) {
            vueElement.$watch(
                embellishKey,
                (newVal, oldVal) => {
                    leafletElement[setMethodName](newVal);
                }, {
                    deep: deepValue,
                }
            );
        }
    }
};

export const collectionCleaner = options => {
    const result = {};
    for (const key in options) {
        const value = options[key];
        if (value !== null && value !== undefined) {
            result[key] = value;
        }
    }
    return result;
};

export const optionsMerger = (props, instance) => {
    const options =
        instance.options && instance.options.constructor === Object ?
        instance.options : {};
    props = props && props.constructor === Object ? props : {};
    const result = collectionCleaner(options);
    props = collectionCleaner(props);
    const defaultProps = instance.$options.props;
    for (const key in props) {
        const def = defaultProps[key] ?
            defaultProps[key].default &&
            typeof defaultProps[key].default === 'function' ?
            defaultProps[key].default.call() :
            defaultProps[key].default :
            Symbol('unique');
        let isEqual = false;
        if (Array.isArray(def)) {
            isEqual = JSON.stringify(def) === JSON.stringify(props[key]);
        } else {
            isEqual = def === props[key];
        }
        if (result[key] && !isEqual) {
            console.warn(
                `${key} props is overriding the value passed in the options props`
            );
            result[key] = props[key];
        } else if (!result[key]) {
            result[key] = props[key];
        }
    }
    return result;
};

export const findRealParent = firstVueParent => {
    let found = false;
    while (firstVueParent && !found) {
        if (firstVueParent.self === undefined) {
            firstVueParent = firstVueParent.$parent;
        } else {
            found = true;
        }
    }
    return firstVueParent;
};

export const debounce = (fn, time) => {
    let timeout;

    const debouncedFunction = function(...args) {
        const context = this;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            fn.apply(context, args);
            timeout = null;
        }, time);
    };

    debouncedFunction.cancel = function() {
        if (timeout) {
            clearTimeout(timeout);
        }
    };

    return debouncedFunction;
};


export const methodsBinder = (vueElement, leafletElement) => {
    let methodsObj = {};
    for (let fn in leafletElement) {
        if (leafletElement[fn] &&
            !(fn && fn.startsWith('_')) &&
            typeof leafletElement[fn] == 'function') {
            methodsObj[fn] = leafletElement[fn];
            vueElement[fn] = function(...params) {
                return leafletElement[fn](...params);
            }
        }
    }
    return methodsObj;
};

export const addToParentElement = (vueElement, leafletMap) => {
    if (vueElement.addToMap) {
        vueElement.self.addTo(leafletMap.self);
    } else {
        let parent = vueElement.$parent;
        if (!(parent && parent.addLayer)) {
            parent = leafletMap;
        }
        parent.self && parent.self.addLayer(vueElement.self);
    }
};