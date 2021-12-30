<template>
  <div class="h-query-table">
    <div class="query">
      <h-form :formRule='queryFormRule' :modelValue='queryParams' @handler='queryHandler'></h-form>
    </div>
    <h-table :modelValue='modelValue' :sourceData='sourceData' :columns='columns' :btns='tabelBtns' :selectShow='selectShow' @handler='tableHandler'></h-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

import HTable from './HTable.vue'
import HForm from './HForm.vue'

import { Columns, Btns } from '@/model/common'

export default defineComponent({
  components: { HTable, HForm },
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
    tabelBtns: {
      type: Array as PropType<Btns[]>,
    },
    selectShow: {
      type: Boolean,
      default: false,
    },
    queryFormRule: {
      type: Array,
    },
    queryParams: {
      type: Object,
    },
  },
  emits: ['queryHandler', 'tableHandler'],
  setup (prop, { emit }) {
    const queryHandler = (name:string) => {
      emit('queryHandler', name)
    }

    const tableHandler = (name:string, item:any, index:number) => {
      emit('tableHandler', name, item, index)
    }

    return { queryHandler, tableHandler }
  },
})
</script>
