import $axios from './index'

export function login(data) {
  const url = '/api/oauth/token'
  return $axios._post(url, data)
}
export function getInfo(param) {
  const url = '/api/admin/getInfo?account=' + param
  return $axios.get(url)
}
