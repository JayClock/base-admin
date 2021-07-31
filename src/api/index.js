/**
 * api管理
 */
import request from '../utils/request'

export default {
  login(params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params
    })
  },
  noticeCount() {
    return request({
      url: '/leave/count',
      method: 'get',
      data: {}
    })
  },
  getMenuList() {
    return request({
      url: '/menu/list',
      method: 'get',
      data: {}
    })
  },
  getUserList(params) {
    return request({
      url: '/users/list',
      method: 'get',
      data: params
    })
  },
  userDel(params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params
    })
  },
  getRoleAllList() {
    return request({
      url: '/roles/allList',
      method: 'get',
      data: {},
      mock: true
    })
  },
  getRoleList(params) {
    return request({
      url: '/roles/list',
      method: 'get',
      data: params
    })
  },
  getDeptList() {
    return request({
      url: '/dept/list',
      method: 'get',
      data: {}
    })
  },
  userSubmit(params) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params
    })
  },
  menuSubmit(params) {
    return request({
      url: '/menu/operate',
      method: 'post',
      data: params
    })
  },
  roleOperate(params) {
    return request({
      url: '/roles/operate',
      method: 'post',
      data: params
    })
  }
}
