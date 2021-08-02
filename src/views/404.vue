<template>
  <div class="execption">
    <img src="@/assets/images/404.jpeg" alt="" />
    <el-button class="btn-home" @click="goHome">回首页</el-button>
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: '404',
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
})
</script>
<style lang="scss">
.execption {
  position: relative;
  img {
    width: 100%;
    height: 100vh;
  }
  .btn-home {
    position: fixed;
    bottom: 100px;
    left: 50%;
    margin-left: -34px;
  }
}
</style>
