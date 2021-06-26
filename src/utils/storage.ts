/**
 * Storage二次封装
 */

import config from '../config'

const getStorage = () => {
  const storage: string = window.localStorage.getItem(config.namespace) || '{}'
  return JSON.parse(storage)
}

export default {
  setItem(key: string, val: any) {
    const storage = getStorage()
    storage[key] = val
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  getItem(key: string) {
    return getStorage()[key]
  },
  clearItem(key: string) {
    const storage = getStorage()
    delete storage[key]
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  clearAll() {
    window.localStorage.clear()
  }
}
