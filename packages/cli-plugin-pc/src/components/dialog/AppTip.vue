<!-- 提示信息 -->
<template>
  <el-dialog title="收货地址" v-model="show">
    内容
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="showDialog(false)">取 消</el-button>
      <el-button type="primary" @click="showDialog(true)">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MyDialog',
  setup (props) {
    const dialogStatus = ref(false)
    /** 关闭/开启
     * @param show {boolean} - 设置状态；undefined时 取反
     * */
    function showDialog (show) {
      dialogStatus.value = show ?? !dialogStatus.value
    }
    return {
      dialogStatus,
      showDialog,
    }
  },
})
</script>

<style scoped>

</style>
