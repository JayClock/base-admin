<script setup>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadList = computed(() => route.matched)
</script>
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
      <router-link v-if="index === 0" to="/welcome">{{ item.meta.title }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
