import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router).use(store).use(ElementPlus, { size: 'small' }).mount('#app')
