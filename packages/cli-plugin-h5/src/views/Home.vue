<template>
<div class="home">
  <p>Home</p>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return { }
  }
})
</script>
<style lang="scss" scoped>
button{
  display: block;
  width: 50%;
  margin: 20px auto;
  height: 60px;
  border-radius: 8px;
  border: 1px solid #999;
}
p{
  text-align: center;
  img{
    width: 60px;
    height: 60px;
    border-radius: 60px;
    vertical-align: middle;
  }
}
input{
  display: block;
  width: 80%;
  height: 60px;
  margin: 10px auto;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid #999;
}
</style>
