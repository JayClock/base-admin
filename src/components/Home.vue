<script setup>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import TreeMenu from './TreeMenu.vue'
import api from '../api'
import BreadCrumb from './BreadCrumb.vue'

const store = useStore()
const router = useRouter()

// 是否显示侧边栏
const isCollapse = ref(false)
// 控制侧边栏显示隐藏
const toggle = () => {
  isCollapse.value = !isCollapse.value
}

// 用户信息
const userInfo = computed(() => store.state.userInfo)
// 退出登陆操作
const handleLogout = (key) => {
  if (key === 'email') return
  store.commit('saveUserInfo', {})
  router.push('/login')
}

// 通知数量
const noticeCount = ref(0)
// 获取通知数量
const getNoticeCount = async () => {
  try {
    const count = await api.noticeCount()
    noticeCount.value = count
  } catch (error) {
    console.error(error)
  }
}

// 用户菜单
const userMenu = computed(() => store.state.menuList)
// 获取用户菜单信息
const getMenuList = async () => {
  try {
    const { menuList, actionList } = await api.getPermissionList()
    store.commit('saveUserMenu', menuList)
    store.commit('saveUserAction', actionList)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getMenuList()
  getNoticeCount()
})
</script>

<template>
  <div class="basic-layout">
    <div class="nav-side" :class="[isCollapse ? 'fold' : 'unfold']">
      <!-- 系统LOGO -->
      <div class="logo">
        <img src="./../assets/logo.png" />
        <span>Manager</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="activeMenu"
        background-color="#001529"
        text-color="#fff"
        router
        :collapse="isCollapse"
        class="nav-menu"
      >
        <tree-menu :user-menu="userMenu"></tree-menu>
      </el-menu>
    </div>
    <div class="content-right" :class="[isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle"><i class="el-icon-s-fold"></i></div>
          <div class="bread">
            <bread-crumb></bread-crumb>
          </div>
        </div>
        <div class="user-info">
          <el-badge :is-dot="noticeCount > 0 ? true : false" class="notice" type="danger">
            <i class="el-icon-bell"></i>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{ userInfo.userName }}
              <i class="el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">邮箱：{{ userInfo.userEmail }}</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
    // 合并
    &.fold {
      width: 64px;
    }
    // 展开
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    // 合并
    &.fold {
      margin-left: 64px;
    }
    // 展开
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .user-info {
        .notice {
          line-height: 30px;
          margin-right: 15px;
        }
        .user-link {
          cursor: pointer;
          color: #409eff;
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>
