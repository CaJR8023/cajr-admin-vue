<template>
  <div ref="myCharts" :style="{ width: width, height: height }"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/mixins/resize'
require('echarts/theme/macarons')
export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    barData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      mycharts: null
    }
  },
  watch: {
    barData: {
      deep: true,
      handler(val) {
        console.info('val =>' + val)
        this._setOption(val.cb, val.cf, val.hr)
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.initEcharts()
    })
  },
  methods: {
    initEcharts() {
      this.mycharts = echarts.init(this.$refs.myCharts, 'macarons')
      if (Object.keys(this.barData).length > 0) {
        this._setOption(
          this.barData.cb,
          this.barData.cf,
          this.barData.hr
        )
      }
    },
    _setOption(cb, cf, hr) {
      this.mycharts.setOption({
        title: {
          text: '推荐算法生成的新闻数量',
          left: '16'
        },
        legend: {
          data: ['基于内容推荐', '协同过滤推荐', '基于热点推荐']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '20',
          right: '20',
          bottom: '3',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun'
          ]
        },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            type: 'bar',
            name: '基于内容推荐',
            data: cb
          },
          {
            type: 'bar',
            name: '协同过滤推荐',
            data: cf
          },
          {
            type: 'bar',
            name: '基于热点推荐',
            data: hr
          }
        ]
      })
    }
  }
}
</script>
