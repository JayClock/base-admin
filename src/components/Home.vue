<template>
  <div class="position-relative">
    <div class="nav-side position-fixed"></div>
    <div class="content-right">
      <div class="nav-top d-flex justify-content-between">
        <div class="bread">面包屑</div>
        <div class="user-">用户</div>
      </div>
      <div class="wrapper">
        <div class="bg-white h-100">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'Home'
})
</script>

<style lang="scss">
.nav-side {
  width: 200px;
  height: 100vh;
  background-color: #001529;
  color: #fff;
  overflow-y: auto;
  transition: width 0.5s;
}
.content-right {
  margin-left: 200px;
  .nav-top {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    padding: 0 20px;
  }
  .wrapper {
    background: #eef0f3;
    padding: 20px;
    height: calc(100vh - 50px);
  }
}
</style>
