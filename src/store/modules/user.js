import { login, getInfo } from '@/api/login'
import { Message } from 'element-ui'
import router, { resetRouter } from '@/router'

const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '', // 认证凭证'
  userName: localStorage.getItem('username')
    ? localStorage.getItem('username')
    : '',
  roles: []
}
const mutations = {
  SET_TOKEN(state, val) {
    state.token = val
    localStorage.setItem('token', val)
  },
  DEL_TOKEN(state) {
    state.token = ''
    state.userName = ''
    state.roles = ''
    state.introduce = ''
    localStorage.removeItem('token')
  },
  SET_ROLES(state, payload) {
    state.roles = payload
  },
  SET_NAME(state, payload) {
    state.userName = payload
  }
}
const actions = {
  // user login
  _login({ commit }, formdatas) {
    return new Promise((resolve, reject) => {
      login(formdatas)
        .then(res => {
          if (res.access_token != '') {
            Message.success('登录成功')
            commit('SET_TOKEN', res.access_token)
            commit('SET_NAME', formdatas.username)
            localStorage.setItem('username', formdatas.username)
          } else {
            Message.error('登录失败')
          }
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loginOut({ commit }) {
    commit('DEL_TOKEN')
    resetRouter()
    router.push({
      path: '/login',
      query: {
        redirect: '/'
      }
    })
  },
  _getInfo({ commit }, param) {
    return new Promise((resolve, reject) => {
      getInfo(param)
        .then(res => {
          const { account, roles } = res.data
          commit('SET_ROLES', roles)
          commit('SET_NAME', account)
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
