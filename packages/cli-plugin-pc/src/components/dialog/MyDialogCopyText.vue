<template>
  <MyDialog
    ref="dialogRef"
    dialogType="form"
    :title="$props.title" :ok-text="okText"
    @ok="copy"
  >
    <template #body>
      <textarea ref="textareaRef" class="download-text g-hide-font"
           readonly="readonly" :value="text"
           ></textarea>
    </template>
  </MyDialog>
</template>

<script lang="ts">
import { Ref } from '@vue/reactivity'

import { defineComponent, ref } from 'vue'
import MyDialog from './MyDialog.vue'

export default defineComponent({
  name: 'MyDialogCopyText',
  components: {
    MyDialog,
  },
  props: {
    title: String,
  },
  setup (props, context) {
    const okText:Ref<string> = ref('复制')
    function copy () {
      textareaRef.value.select()
      document.execCommand('Copy')
      okText.value = '复制成功'
    }

    const dialogRef: Ref = ref(<unknown>null)
    const textareaRef: Ref = ref(<unknown>null)

    // 控制表单是否弹出
    const text:Ref<string> = ref('')
    function showDialog (str:string) {
      text.value = str
      okText.value = '复制'
      dialogRef.value.showDialog(!!str)
    }

    return {
      showDialog,
      dialogRef,
      textareaRef,
      okText,
      copy,
      text,
    }
  },
})
</script>

<style scoped lang="less">

.download-text {
  width: 416px;
  height: 165px;
  padding: 10px;
  margin-bottom: 32px;
  border: 1px solid @color_gray3;
  border-radius: @border_radius_button;
  text-align: left;
  background: transparent;
  color: @color_white3;
  overflow: auto;
  resize: none;
}

</style>
