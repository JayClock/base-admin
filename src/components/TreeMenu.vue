<template>
  <template v-for="menu in userMenu">
    <el-submenu
      v-if="menu.children && menu.children.length > 0 && menu.children[0].menuType === 1"
      :index="menu.path"
      :key="menu._id"
    >
      <template #title>
        <i v-if="menu.icon" :class="menu.icon"></i>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :user-menu="menu.children"></tree-menu>
    </el-submenu>
    <el-menu-item v-else-if="menu.menuType === 1" :index="menu.path" :key="menu._id">
      <template #title>
        <i v-if="menu.icon" :class="menu.icon"></i>
        <span>{{ menu.menuName }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'TreeMenu',
  props: {
    userMenu: {
      type: Array,
      default: () => []
    }
  }
})
</script>
