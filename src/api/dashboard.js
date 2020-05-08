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

export function startCrawlNewestNews(params) {
  const url = '/api/qtz/newest_news?isStart=' + params
  return $axios.get(url)
}

export function startCrawlNewsData(params) {
  const url = '/api/qtz/news_data?isStart=' + params
  return $axios.get(url)
}
