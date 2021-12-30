<template>
  <IconButton
    @click="back"
    :icon="$props.icon"
    class="back-button"
    style-type="back"
    :iconSize="20"
    :fontSize="14"
  ><span class="text">{{$props.text}}</span>
  </IconButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routerManager } from '@/router/router_manager'

export default defineComponent({
  name: 'BackButton',
  components: {
  },
  props: {
    icon: {
      type: String,
      default: '#icon-arrow_left',
    },
    text: {
      type: String,
      default: () => '返回',
    },
    backFunction: Function,
  },
  setup (props, context) {
    function back () {
      if (props.backFunction) {
        props.backFunction()
      } else {
        routerManager.back()
      }
    }
    return {
      back,
    }
  },
})
</script>

<style scoped lang="less">
  .back-button {
    height: 32px;
    //padding: 5px 10px 5px 0;
    transform: translateX(-6px);
    .text {
      margin-left: 0;
      line-height: 1px;
    }
  }
</style>
<style lang="less">
// 返回样式
.button-style_back {
  color: @color_white6;
  border: 0;
}
.button-style_back:hover {
  color: @color_blue1;
}
.button-style_back:active {
  color: @color_blue1;
}
</style>
