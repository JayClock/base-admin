<template>
  <div class="welcome">
    <h1>欢迎来到主界面</h1>
    <router-link to="/login">去登录</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'Welcome'
})
</script>

<style scoped></style>
