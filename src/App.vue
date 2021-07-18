<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
@import './assets/style/reset.css';
@import './assets/style/index.scss';
</style>
