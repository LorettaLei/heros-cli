<template>
  <img class="img" :src="imgSrc" :style="style" alt="" @mouseover="selfHover=true" @mouseout="selfHover=false">
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { SCREEN_MD_MAX } from '@/style/var/var'

/**
 * 1200px以下 => 选择1倍图片
 * 1200px以上 => 选择2倍图片
 * */
const IMG_SUFFIX = [
  { suffix: '@2x', px: SCREEN_MD_MAX },
]

export default defineComponent({
  name: 'MyImage',
  props: {
    boxType: {
      type: String,
      default: () => 'rect', // 'circle'
    },
    src: String,
    width: Number,
    height: Number,
    offAutoPx: Boolean, // 关闭自动选择图像
  },
  setup (props) {
    const $store = useStore()

    /** 向文件名添加后缀
     * @param {string} imgSrc - 图片路径
     * @param {string} suffix - 添加的路径
     * */
    function addSuffixToPath (imgSrc:string, suffix:string = '') {
      const path = imgSrc?.split('.')
      if (Array.isArray(path) && path.length >= 2) {
        const imgName = path[path.length - 2]
        path[path.length - 2] = imgName + suffix
        imgSrc = path.join('.')
      }
      return imgSrc
    }

    /** 适配图片倍数，依赖 IMG_SUFFIX 配置 */
    const imgSrc = computed(() => {
      const windowWidth = $store.getters.windowWidth
      // 1. 选择图片
      let imgSrc = props.src

      // 2. 选择像素
      if (props.offAutoPx) { return imgSrc }
      if (!windowWidth) { // 没有尺寸信息，防加载重复
        imgSrc = ''
      } else { // 寻找对应尺寸
        for (const obj of IMG_SUFFIX) {
          const { px, suffix = '' } = obj
          if (windowWidth >= px) {
            imgSrc = addSuffixToPath(imgSrc, suffix)
          }
        }
      }
      return imgSrc
    })

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

    return {
      imgSrc,
      style,
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
