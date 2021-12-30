<template>
  <MyDialog ref="dialogRef"
            :title="$props.title" dialogType="form"
            :disabled-ok-button="formManager.loading.value"
            @ok="formManager.submit">
    <template #body>
      <el-form ref="formRef" :label-width="$props.labelWidth" class="g-form--primary g-form--color-gray" :model="$props.model">
        <slot name="form_body"></slot>
      </el-form>
    </template>
  </MyDialog>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'

import MyDialog from './MyDialog.vue'
import HttpSendQueue from '@/api/plugin/http_queue_manager'
import { Ref } from '@vue/reactivity'

export default defineComponent({
  name: 'MyDialogForm',
  components: {
    MyDialog,
  },
  props: {
    model: Object,
    title: String, // 弹框名称
    loadingGroupName: String, // 请求队列名称
    labelWidth: Number, // 表单宽度
  },
  emits: [
    'submit',
  ],
  setup (props, context) {
    const vm = <any>getCurrentInstance()

    const dialogRef: Ref = ref(<unknown>null)
    const formRef: Ref = ref(<unknown>null)

    const formManager = {
      loading: HttpSendQueue.getLoadingStatus(props.loadingGroupName),
      submit () {
        formRef.value?.validate((valid:boolean) => {
          if (valid) {
            vm.emit('submit')
          }
        })
      },
    }

    // 控制表单是否弹出
    function showForm (show:boolean) {
      formRef.value?.clearValidate()
      dialogRef.value.showDialog(show)
    }

    return {
      dialogRef,
      formRef,
      formManager,
      showForm,
    }
  },
})
</script>

<style scoped lang="less">

</style>
