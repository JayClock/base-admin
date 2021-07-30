/**
 * axios 二次封装
 */
import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import config from '../config'
import storage from './storage'

const TOKEN_INVALD = 'Token认证失败，请重新登陆'
const NETWORK_ERROR = '网络请求异常，请稍后重试'
// 添加全局配置
axios.defaults.baseURL = config.baseApi
axios.defaults.timeout = 8000

// 请求拦截
axios.interceptors.request.use((req) => {
  const { headers } = req
  const { token } = storage.getItem('userInfo')
  if (!headers.Authorization) headers.Authorization = `Bearer ${token}`
  return req
})

/**
 * 请求核心函数
 * @param requestConfig 请求配置
 */

interface AxiosRequestConfigNew extends AxiosRequestConfig {
  mock?: boolean
}

const request = async (options: AxiosRequestConfigNew) => {
  options.method = options.method || 'get'
  if (options.method.toLocaleLowerCase() === 'get') {
    options.params = options.data
  }
  let isMock = config.mock
  // 单接口设置mock数据
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  // 环境配置
  if (config.env === 'prod') {
    // 确保线上使用真实地址
    axios.defaults.baseURL = config.baseApi
  } else {
    // 开发和测试可使用mock假数据
    axios.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  const res = await axios.request(options)
  // 响应结果处理
  const { code, data, msg } = res.data
  if (code === 200) {
    return data
  }
  if (code === 50001) {
    //  token校验失败
    ElMessage.error(TOKEN_INVALD)
    const router = useRouter()
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_INVALD)
  }
  // 网络错误
  ElMessage.error(msg || NETWORK_ERROR)
  return Promise.reject(msg || NETWORK_ERROR)
}

export default request
