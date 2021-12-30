<template>
  <svg class="icon" aria-hidden="true" :style="iconStyle">
    <use :xlink:href="$props.id"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'IconSvg',
  components: {},
  props: {
    id: String,
    width: {
      type: [Number, String],
      default: 24,
    },
    height: [Number, String],
    rotateZ: Number, // 旋转角度
  },
  setup (props, context) {
    const iconStyle = ref({})
    watchEffect(() => {
      const { width, height, rotateZ } = props
      iconStyle.value = {
        width: `${width}px`,
        height: `${height || width}px`,
      }
      if (rotateZ) {
        iconStyle.value.transform = `rotateZ(${rotateZ}deg)`
      }
    })
    return {
      iconStyle,
    }
  },
})
</script>

<style scoped lang="less">
</style>
