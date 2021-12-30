<template>
  <div class="photo-frame">
    <MySvgImage class="background" :src="photoFrameSrc" :width="128"></MySvgImage>
    <MyImage class="photo" :src="$props.photoSrc" :off-auto-px="true" box-type="circle" :width="70"></MyImage>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

const PHOTO_FRAME_ICON_MAP = {
  1: '/static/images/svg_icon/icon_user_photo_frame_level2.svg',
  2: '/static/images/svg_icon/icon_user_photo_frame_level1.svg',
}
export default defineComponent({
  name: 'PhotoFrame',
  components: {},
  props: {
    levelType: {
      type: Number,
      require: true,
    }, // 相框等级
    photoSrc: {
      type: String,
      require: true,
    }, // 头像
  },
  setup (props, context) {
    const photoFrameSrc = computed(() => {
      return PHOTO_FRAME_ICON_MAP[<string>props.levelType]
    })
    return {
      photoFrameSrc,
    }
  },
})
</script>

<style scoped lang="less">
  .photo-frame {
    position: relative;
    width: 128px;
    height: 112px;
  }
  .background, .photo {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }
  .photo {
    top: calc(50% + 6px);
  }
</style>
