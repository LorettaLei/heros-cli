<template>
  <span :class="['icon-button', buttonClass, {[buttonClassDisabled]: $props.disabled}]" :style="wrapStyle">
    <span
      class="my-button-wrap"
      @click.stop="!$props.disabled && $emit('click')">
      <icon-svg v-if="icon" :id="icon" :width="iconSize"></icon-svg>
      <div class="text" :style="{marginLeft: `${splitSize}px`}">
        <slot></slot>
      </div>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconButton',
  components: {},
  props: {
    /* 图标 */
    icon: String,
    iconSize: {
      type: Number,
      default: () => 24,
    },
    /* 文字 */
    fontSize: { // 字体
      type: Number,
      default: () => 14,
    },
    /* 样式 */
    styleType: String,
    width: [Number, String],
    height: [Number, String],
    borderRadius: { // 圆角
      type: [Number, String],
      default: () => '4px',
    },
    splitSize: {
      type: Number,
      default: () => 0,
    },
    /* 状态 */
    disabled: Boolean, // 禁用状态
  },
  model: {
    prop: 'modelValue',
    event: ['update:modelValue'],
  },
  setup (props, context) {
    const {
      borderRadius,
      fontSize,
      width,
      height,
      styleType,
    } = props
    // 按钮容器
    const wrapStyle = <any>{
      borderRadius: `${borderRadius}`,
      fontSize: `${fontSize}px`,
    }
    if (props.width) {
      wrapStyle.width = typeof width === 'number'
        ? `${width}px`
        : width
    }
    if (props.height) {
      wrapStyle.height = typeof height === 'number'
        ? `${height}px`
        : height
    }

    return {
      wrapStyle,
      ...props,
      buttonClass: `button-style_${styleType}`,
      buttonClassDisabled: `button-style_${styleType}--disabled`,
    }
  },
})
</script>

<style scoped lang="less">
.icon-button {
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
}
.my-button-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  user-select: none;
  cursor: pointer;
}
</style>
<style scoped lang="less">
/* 样式种类 */
@import "style";
</style>
