<template>
  <div class="scroll" ref="scrollLoaderRef">
    <p class="scroll-title" v-if='loading'>加载中...</p>
    <p class="scroll-title" v-else-if='!loadAll' @click='$emit("loadMore")'>点击加载更多</p>
    <p class="scroll-title" v-else>我已经到底啦～</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

export default defineComponent({
  props: {
    loadAll: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  },
  setup (props, { emit }) {
    const scrollLoaderRef = ref<Element>()
    const io = new IntersectionObserver((entries :any) => {
      if (entries[0].intersectionRatio > 0 && !props.loadAll) {
        emit('loadMore')
      }
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] })

    onMounted(() => {
      scrollLoaderRef.value && io.observe(scrollLoaderRef.value)
    })
    onBeforeUnmount(() => {
      scrollLoaderRef.value && io.unobserve(scrollLoaderRef.value)
    })

    return { scrollLoaderRef }
  }
})
</script>
<style lang="scss" scoped>
.scroll{
  padding: 20px 0;
  &-title{
    font-size: 28px;
    color: #979AA2;
    line-height: 40px;
    text-align: center;
  }
}
</style>
