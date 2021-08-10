<script setup>
import { defineCustomElement } from '@vue/runtime-dom'

defineCustomElement({
  name: 'TreeMenu'
})
defineProps({
  userMenu: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <template v-for="menu in userMenu" :key="menu._id">
    <el-submenu
      v-if="menu.children && menu.children.length > 0 && menu.children[0].menuType === 1"
      :index="menu.path"
    >
      <template #title>
        <i v-if="menu.icon" :class="menu.icon"></i>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :user-menu="menu.children"></tree-menu>
    </el-submenu>
    <el-menu-item v-else-if="menu.menuType === 1" :index="menu.path">
      <template #title>
        <i v-if="menu.icon" :class="menu.icon"></i>
        <span>{{ menu.menuName }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
