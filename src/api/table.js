import $axios from './index'

export function getPageTab1(params) {
  const url = '/getPageData1'
  return $axios.get(url, params)
}
export function getNewsPage(param1, param2) {
  const url = '/api/news/?page=' + param1 + '&pageSize=' + param2
  return $axios.get(url)
}
export function getTagPage(param1, param2) {
  const url = '/api/tag/?page=' + param1 + '&pageSize=' + param2
  return $axios.get(url)
}
export function getNewsImgPage(param1, param2) {
  const url = '/api/news_img/?page=' + param1 + '&pageSize=' + param2
  return $axios.get(url)
}
export function getModulePage(param1, param2) {
  const url = '/api/module/page?page=' + param1 + '&pageSize=' + param2
  return $axios.get(url)
}
export function getNewsLogsPage(param1, param2) {
  const url = '/api/news_logs/?page=' + param1 + '&pageSize=' + param2
  return $axios.get(url)
}
export function getUserPage(param1, param2) {
  const url = '/api/user/page?page=' + param1 + '&pageSize=' + param2
  return $axios.get(url)
}
