<template>
<el-form :label-width="labelWidth" :inline='inline' :label-position='labelPosition' :size='size' :model='formData'>
  <template v-for='(item) in formRule' :key='item.name'>
    <el-form-item label='' v-if='item.type==="button"'>
      <el-button
        @click='$emit("handler", item.name)'
        v-show='showHandler(item.isHide)'
      > {{item.label}}</el-button>
    </el-form-item>
    <el-form-item :label='item.label' :required='item.required' :prop='item.name' :rules='item.rules||[]' :error='item.error' v-else>
      <template v-if='item.type==="inputNumber"'>
        <el-input-number
          v-model='formData[item.name]'
          :min='item.min||""'
          :max='item.max||""'
          :step='item.step||1'
          :size='item.size||"small"'
          :disabled='item.disabled||false'
          :readonly='item.readonly||false'
          @change='$emit("update:modelValue",formData)'
        ></el-input-number>
      </template>
      <template v-else-if='item.type==="radio"'>
        <el-radio-group v-model='formData[item.name]' :disabled='item.disabled||false' @change='$emit("update:modelValue",formData)'>
          <el-radio
            v-for='option in item.options'
            :key='option.name'
            :label='option.value'
            :disabled='option.disabled||false'
          >{{option.label}}</el-radio>
        </el-radio-group>
      </template>
      <template v-else-if='item.type==="checkbox"'>
        <el-checkbox-group v-model='formData[item.name]' :disabled='item.disabled||false' @change='$emit("update:modelValue",formData)'>
          <el-checkbox
            v-for='option in item.options'
            :key='option.name'
            :label='option.value'
            :disabled='option.disabled||false'
          >{{option.label}}</el-checkbox>
        </el-checkbox-group>
      </template>
      <template v-else-if='item.type==="select"'>
        <el-select
          v-model='formData[item.name]'
          :disabled='item.disabled||false'
          :readonly='item.readonly||false'
          :placeholder='item.placeholder || "请输入" + item.label'
          :size='item.size||"small"'
          :clearable='item.clearable'
          @change='$emit("update:modelValue",formData)'
        >
          <el-option
            v-for='option in item.options'
            :key='option.name'
            :label='option.label'
            :value='option.value'
            :disabled='option.disabled||false'
          >
          </el-option>
        </el-select>
      </template>
      <template v-else-if='item.type==="switch"'>
        <el-switch
          v-model='formData[item.name]'
          :disabled='item.disabled||false'
          @change='$emit("update:modelValue",formData)'
        ></el-switch>
      </template>
      <template v-else-if='item.type==="datePicker"'>
        <el-date-picker
          v-model='formData[item.name]'
          type='date'
          :disabled='item.disabled||false'
          :readonly='item.readonly||false'
          :placeholder='item.placeholder || "请输入" + item.label'
          :disabled-date="item.disabledDate"
          :clearable='item.clearable'
          :size='item.size'
          @change='$emit("update:modelValue",formData)'
        ></el-date-picker>
      </template>
      <template v-else-if='item.type==="daterange"'>
        <el-date-picker
          v-model='formData[item.name]'
          type='daterange'
          :disabled='item.disabled||false'
          :readonly='item.readonly||false'
          :disabledDate="item.disabledDate"
          range-separator="至"
          :start-placeholder='item.startPlaceholder||"开始时间"'
          :end-placeholder='item.endPlaceholder||"结束时间"'
          :clearable='item.clearable'
          :size='item.size'
          @change='$emit("update:modelValue",formData)'
        ></el-date-picker>
      </template>
      <template v-else-if='item.type==="datetimerange"'>
        <el-date-picker
          v-model='formData[item.name]'
          type='datetimerange'
          :disabled='item.disabled||false'
          :readonly='item.readonly||false'
          :disabledDate="item.disabledDate"
          range-separator="至"
          :start-placeholder='item.startPlaceholder||"开始时间"'
          :end-placeholder='item.endPlaceholder||"结束时间"'
          :clearable='item.clearable'
          :size='item.size'
          @change='$emit("update:modelValue",formData)'
        ></el-date-picker>
      </template>
      <template v-else-if='item.type==="datetimePicker"'>
        <el-date-picker
          v-model='formData[item.name]'
          type='datetime'
          :disabled='item.disabled||false'
          :readonly='item.readonly||false'
          :placeholder='item.placeholder || "请输入" + item.label'
          :disabledDate="item.disabledDate"
          :clearable='item.clearable'
          :size='item.size'
          @change='$emit("update:modelValue",formData)'
        ></el-date-picker>
      </template>
      <template v-else>
        <el-input
          v-model.trim='formData[item.name]'
          :type='item.type||"text"'
          :disabled='item.disabled||false'
          :readonly='item.readonly||false'
          :min='item.min||""'
          :max='item.max||""'
          :maxlength='item.maxlength||""'
          :minlength='item.minlength||""'
          :placeholder='item.placeholder || "请输入" + item.label'
          :clearable='item.clearable'
          @input='$emit("update:modelValue",formData)'
          @change='$emit("update:modelValue",formData)'
        >
          <template #suffix v-if='item.suffix'>
            <i class="form-suffix" @click='$emit("suffixHandler",item,index)' :class='item.suffix'></i>
          </template>
        </el-input>
      </template>
    </el-form-item>
  </template>
</el-form>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { FormRule } from '@/model/common'
export default defineComponent({
  props: {
    formRule: {
      type: Array as PropType<FormRule[]>,
    },
    modelValue: {
      type: Object,
    },
    labelWidth: {
      type: String,
      default: '80px',
    },
    inline: {
      type: Boolean,
      default: true,
    },
    labelPosition: {
      type: String,
      default: 'right',
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  emits: ['update:modelValue', 'suffixHandler', 'handler'],
  setup (props) {
    const formData = computed(() => { return props.modelValue })
    const showHandler = (fn:any) => {
      if (typeof (fn) === 'boolean') {
        return !fn
      }
      if (typeof (fn) === 'function') {
        return !fn()
      }
      return true
    }
    return { formData, showHandler }
  },
})
</script>
