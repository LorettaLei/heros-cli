<template>
  <el-table class="g-form--primary g-form--color-gray table-page"
    :data='sourceData'
    style='width：100%;'
    ref="multipleTable"
    border
    size='mini'
    @selection-change="handleSelectionChange"
  >
    <el-table-column type='selection' align="center" width='55' fixed="left" v-if='selectShow'></el-table-column>
    <el-table-column
      v-for='item in columns'
      :key='item.name'
      :align="item.align||'center'"
      :label='item.label'
      :prop='item.name'
      :width='item.width || ""'
      :class-name='item.class||""'
    >
      <template #default='scope' v-if='item.slot'>
        <slot :name='item.slot' :record='scope.row' :index='scope.$index'></slot>
      </template>
    </el-table-column>
    <el-table-column width='220' align="center" label='操作' fixed="right">
      <template #default='scope'>
        <span class="btn btn-text"
          v-for='item in btns'
          :key='item.name'
          @click='$emit("handler", item.name, scope.row, scope.$index)'
          v-show='showHandler(item.isHide,scope.row)'
        > {{item.label}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Columns, Btns } from '@/model/common'
import { ElTable, ElTableColumn } from 'element-plus'

export default defineComponent({
  components: { ElTable, ElTableColumn },
  name: 'HTable',
  props: {
    modelValue: {
      type: Array,
    },
    sourceData: {
      type: Array,
    },
    columns: {
      type: Array as PropType<Columns[]>,
    },
    btns: {
      type: Array as PropType<Btns[]>,
    },
    selectShow: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['handler', 'update:modelValue'],
  setup (props, { emit }) {
    const handleSelectionChange = (val:any) => {
      emit('update:modelValue', val)
    }
    const showHandler = (fn:any, row:any) => {
      if (typeof (fn) === 'boolean') {
        return !fn
      }
      if (typeof (fn) === 'function') {
        return !fn(row)
      }
      return true
    }

    return { handleSelectionChange, showHandler }
  },
})
</script>
