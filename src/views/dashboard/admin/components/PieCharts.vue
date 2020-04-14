<template>
  <div ref="myCharts" :style="{ width: width, height: height }"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/mixins/resize'
require('echarts/theme/macarons') // echarts theme
export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '700px'
    },
    pieData:{
      type: Array,
      required: true
    }
  },
  data() {
    return {
      mycharts: null
    }
  },
  watch: {
    pieData: {
      deep: true,
      handler(val) {
        this._setOtion(val)
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
      this._setOtion()
    },
    _setOtion(data) {
      this.mycharts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '20'
        },
        series: [
          {
            name: '不同模块下的新闻数量占的百分比',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 120],
            center: ['50%', '50%'],
            data: data,
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            width: 400
          }
        ]
      })
    }
  }
}
</script>
<style></style>
