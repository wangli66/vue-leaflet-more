<template>
  <span class="vp-self-collapse" :class="[isOpen?'open':'close']" @click="handleCollapse">
    <span></span>
  </span>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpen: this.open,
    }
  },
  watch: {
    open: {
      immediate: true,
      handler(newVal, o) {
        this.isOpen = newVal
      },
    },
  },
  methods: {
    handleCollapse(e) {
      this.isOpen = !this.isOpen
      let target = e.target
      let aDom = target.parentNode
      let ulDom = aDom.nextElementSibling
      if (ulDom) {
        e.stopPropagation()
        e.preventDefault()
        let className = ulDom.className
        if (className.includes('none')) {
          ulDom.className = className.replace('none', '')
        } else {
          ulDom.className += ' none'
        }
      }
    },
  },
}
</script>

<style>
.sidebar-link {
  position: relative;
}

.sidebar-link span.vp-self-collapse {
  position: absolute;
  top: 12px;
  right: 18px;
  width: 0px;
  height: 0px;
  border-radius: 2px;
}

.sidebar-link span.vp-self-collapse.close {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 10px solid #556567;
}

.sidebar-link span.vp-self-collapse.open {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 10px solid #556567;
}

.sidebar-links .none {
  display: none;
}
</style>