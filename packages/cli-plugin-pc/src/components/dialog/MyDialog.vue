<!-- 提示信息 -->
<template>
  <el-dialog custom-class="my-dialog" :title="$props.title" v-model="dialogStatus"
    :width="$props.width"
    :show-close="false"
  >
    <!--    {{$store.getters.appTip}}-->
    <span class="body" v-if="!$slots.body">{{ $props.content }}</span>
    <div class="slot-body">
      <slot name="body"></slot>
    </div>
    <template #footer>
      <IconButton v-if="!hideCancel && $props.dialogType !== 'tip'"
                  class="ok-cancel"
                  :disabled="$props.disabledOkButton" borderRadius="4px"
                  style-type="normal-line"
                  @click="clickBtn('cancel')">{{ $props.cancelText }}</IconButton>
      <IconButton :disabled="$props.disabledOkButton" borderRadius="4px"
                  style-type="normal"
                  @click="clickBtn('ok')">{{ $props.okText }}</IconButton>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'MyDialog',
  emits: [
    'ok',
    'cancel',
  ],
  props: {
    // 弹窗类型
    dialogType: {
      type: String, // form tip
      default: () => 'tip',
    },
    // 弹窗名称
    title: {
      type: String,
      default: () => '提示',
    },
    // 提示文字
    content: String,
    // 确定文字
    okText: {
      type: String,
      default: () => '确定',
    },
    // 取消文字
    cancelText: {
      type: String,
      default: () => '取消',
    },
    // 宽度
    width: {
      type: [Number, String],
      default: () => 480,
    },
    // 隐藏取消按钮
    hideCancel: Boolean,
    disabledOkButton: Boolean,
    disabledCancelButton: Boolean,
  },
  setup (props, context) {
    const dialogStatus = ref(false)
    /** 关闭/开启
     * @param show {boolean} - 设置状态；undefined时 取反
     * */
    function showDialog (show:boolean) {
      dialogStatus.value = show ?? !dialogStatus.value
    }
    function clickBtn (btnType:string) {
      if (props.dialogType === 'tip') {
        showDialog(false)
      } else if (btnType === 'cancel') {
        context.emit('cancel')
        showDialog(false)
      } else if (btnType === 'ok') {
        context.emit('ok')
      }
    }
    return {
      clickBtn,
      dialogStatus,
      showDialog,
    }
  },
})
</script>
