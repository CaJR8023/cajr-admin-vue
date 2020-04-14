import $axios from './index'

export function getCardsData() {
  const url = '/api/admin/card_data'
  return $axios.get(url)
}
export function getBarData() {
  const url = '/api/news_rec/count'
  return $axios.get(url)
}
export function getPieData() {
  const url = '/api/module/count'
  return $axios.get(url)
}
