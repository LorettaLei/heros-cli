<template>
  <img :class="['img', {'img-error': isError}]" :src="isError?$props.errorSrc:$props.src" @error="isError = true"
       :style="style" alt="">
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  name: 'MySvgImage',
  props: {
    boxType: {
      type: String,
      default: () => 'rect', // 'circle'
    },
    src: String,
    errorSrc: String,
    width: Number,
    height: Number,
  },
  setup (props) {
    const style = computed(() => {
      const r = <any>{}
      const { boxType, width, height } = props
      if (width) {
        r.width = typeof width === 'number' ? `${width}px` : width
      }
      if (height) {
        r.height = typeof height === 'number' ? `${height}px` : height
      }
      if (boxType === 'circle') {
        r.borderRadius = '50%'
      }

      return r
    })

    const isError = ref(false)

    return {
      style,
      isError,
    }
  },
})
</script>

<style scoped lang="less">
  .img {
    vertical-align: middle;
    user-select: none;
    -webkit-user-drag: none;
  }
</style>
