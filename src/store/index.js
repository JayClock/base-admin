/**
 * Vuex状态管理
 */
import { createLogger, createStore } from 'vuex'
import mutations from './mutations'
import storage from '../utils/storage'

const debug = import.meta.env !== 'production'

const state = {
  userInfo: storage.getItem('userInfo') || {}, // 获取用户信息
  menuList: storage.getItem('menuList'),
  actionList: storage.getItem('actionList'),
  noticeCount: 0
}

export default createStore({
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
