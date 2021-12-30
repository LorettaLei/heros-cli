<template>
  <span :class="['my-button', `my-button--${$props.classType}`, {[`my-button--${$props.classType}-disabled`]: $props.disabled}]"
        :style="boxStyle"
        @mouseover="buttonStatus.isHover=true" @mouseout="buttonStatus.isHover=false;buttonStatus.isMouseDown=false;"
        @mousedown="buttonStatus.isMouseDown=true" @mouseup="buttonStatus.isMouseDown=false">
     <span
       @click.stop="!$props.disabled && $emit('click')"
       >
      <div class="content-wrap">
        <MyImage v-if="$props.iconType"
                 :src="iconSrc"
                 :width="$props.iconSize"></MyImage>
        <div class="text" :style="textStyle">
          <slot></slot>
        </div>
      </div>
    </span>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'

// 本页配置
import { ICON_MAP } from '@/components/button/config'

export default defineComponent({
  name: 'MyButton',
  components: {},
  props: {
    /* 图标 */
    iconType: String,
    iconSize: {
      type: Number,
      default: () => 24,
    },
    /* 样式 */
    splitSize: {
      type: Number,
      default: () => 0,
    },
    borderRadius: { // 圆角
      type: [Number, String],
      default: () => '4px',
    },
    fontSize: { // 字体
      type: Number,
      default: () => 14,
    },
    classType: { // 样式
      type: String,
      default: () => 'primary', // primary cancel text 自定义
    },
    /* 状态 */
    disabled: Boolean, // 禁用状态
    isActive: Boolean, // 激活状态
  },
  setup (props, context) {
    // 记录按钮状态
    const buttonStatus = reactive({
      isHover: false,
      isMouseDown: false,
    })

    // 根据按钮状态选择当前图片
    const iconSrc = computed(() => {
      const { isHover, isMouseDown } = buttonStatus
      const { icon, iconHover = '', iconActive, iconDisabled } = ICON_MAP[<string>props.iconType]
      let src
      switch (true) {
        case props.disabled:
          src = iconDisabled
          break
        case props.isActive || isMouseDown:
          src = iconActive
          break
        case isHover:
          src = iconHover
          break
        default:
          src = icon
      }
      return src || icon
    })

    // 按钮样式
    const boxStyle = computed(() => {
      return {
        borderRadius: `${props.borderRadius}`,
        fontSize: `${props.fontSize}px`,
      }
    })
    const textStyle = computed(() => {
      return {
        marginLeft: `${props.splitSize}px`,
      }
    })

    return {
      buttonStatus,
      iconSrc,
      boxStyle,
      textStyle,
    }
  },
})
</script>

<style scoped lang="less">
.my-button {
  //position: relative;
  display: inline-block;
  border-radius: @border_radius_button;
  cursor: pointer;
  user-select: none;
  padding: 9px 18px;
  overflow: hidden;
}

.content-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  display: flex;
  align-items: center;
  vertical-align: middle;
}

/* 正常按钮 start=============================================*/
// 按钮样式1：背景
.my-button--primary {
  color: @color_white3;
  background: @color_blue2;
  border: 1px solid @color_blue2;
}
.my-button--primary:hover
{
  background: @color_blue1;
  border: 1px solid @color_blue1;
}
.my-button--primary:active
{
  background: @color_blue4;
  border: 1px solid @color_blue4;
}
.my-button--primary-disabled {
  color: @color_gray3 !important;
  background: @color_black8 !important;
  border: 1px solid @color_black8 !important;
}

// 按钮样式2：背景
.my-button--primary2 {
  color: @color_gray3;
  background: @color_black2;
  border: 1px solid @color_black2;
}
.my-button--primary2:hover {
  color: @color_white3;
  background: @color_blue1;
  border: 1px solid @color_blue1;
}

// 按钮样式3:边框
.my-button--cancel {
  color: @color_blue2;
  border: 1px solid @color_blue2;
}
.my-button--cancel:hover {
  color: @color_white3;
  background: @color_blue1;
  border: 1px solid @color_blue1;
}
.my-button--cancel:active {
  color: @color_white3;
  background: @color_blue2;
  border: 1px solid @color_blue2;
}
.my-button--cancel-disabled {
  color: @color_gray3 !important;
  border: 1px solid @color_black8 !important;
}
/* 正常按钮 end=============================================*/

/* 文字类按钮 start=============================================*/
// 按钮样式1
.my-button--text {
  padding: 0;
  color: @color_blue2;
}
.my-button--text:hover {
  color: @color_blue1;
}
.my-button--text:active {
  color: @color_blue4;
}
/* 文字类按钮 end=============================================*/

</style>
