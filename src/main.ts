import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import storage from './utils/storage'

const app = createApp(App)

app.use(router).use(store).use(ElementPlus, { size: 'small' }).mount('#app')

app.directive('has', {
  beforeMount: (el, binding) => {
    // 获取按钮权限
    const actionList = storage.getItem('actionList')
    const { value } = binding
    // 判断列表中是否有对应的按钮权限标识
    const hasPermission = actionList.includes(value)
    if (!hasPermission) {
      el.style = 'display:none'
      setTimeout(() => {
        el.parentNode.removeChild(el)
      }, 0)
    }
  }
})
