<template>
  <div class="dashbord">
    <!-- cardlist -->
    <el-row class="infoCrads">
      <el-col :span="6">
        <div class="cardItem">
          <div class="cardItem_txt">
            <count-to
              class="cardItem_p0 color-green1"
              :startVal="startVal"
              :endVal="totalUserNum"
              :duration="2000"
            ></count-to>
            <p class="cardItem_p1">总 人 数</p>
          </div>
          <div class="cardItem_icon">
            <i class="el-icon-user color-green1"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="cardItem">
          <div class="cardItem_txt">
            <count-to
              class="cardItem_p0 color-blue"
              :startVal="startVal"
              :endVal="totalNewsNum"
              :duration="2000"
            ></count-to>
            <p class="cardItem_p1">新闻总数</p>
          </div>
          <div class="cardItem_icon">
            <i class="el-icon-s-comment color-blue"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="cardItem">
          <div class="cardItem_txt">
            <h1 style="margin-top:10px; font-size:22px; font-weight:500;">
              开启定时推荐开关
            </h1>
          </div>
          <div class="cardItem_icon" style="margin-top:40px;">
            <el-switch
              active-color="#13ce66"
              inactive-color="#ff4949"
              v-model="recStart"
              active-value= "true"
              inactive-value = "false"
              :change="_startCrawlNewestNews()"
            ></el-switch>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="cardItem">
          <div class="cardItem_txt">
            <h1 style="margin-top:10px; font-size:22px; font-weight:500;">
              开启定时新闻抓取开关
            </h1>
          </div>
          <div class="cardItem_icon" style="margin-top:40px;">
            <el-switch
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value= "true"
              inactive-value = "false"
              v-model="newsDataStart"
              :change="_startCrawlNewsData()"
            ></el-switch>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- end -->
    <!-- bar chart -->
    <bar-charts class="barCharts" :barData="barData"></bar-charts>
    <!-- end -->
    <!-- lineEcharts -->
    <!-- table and pie -->
    <el-row class="tableChart">
      <el-col :span="8">
        <pie-charts class="pieCharts" :pieData="pieData"></pie-charts>
      </el-col>
    </el-row>
    <!-- end -->
    <!-- <line-charts class="lCharts" :lineChartData="lineChartData"></line-charts> -->
    <!-- end -->
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import PieCharts from './components/PieCharts'
import BarCharts from './components/BarCharts'
import { Message } from 'element-ui'
import { getCardsData, getBarData, getPieData, startCrawlNewestNews, startCrawlNewsData } from '@/api/dashboard'
export default {
  data() {
    return {
      startVal: 0,
      totalUserNum: 0,
      totalNewsNum: 0,
      recMsg: '开启定时推荐',
      profit: 0,
      barData: {},
      recStart: false,
      newsDataStart: false,
      pieData: []
    }
  },
  created() {
    this._getAllData()
  },
  components: {
    CountTo,
    PieCharts,
    BarCharts
  },
  methods: {
    _getAllData() {
      this.$http.all([getCardsData(), getBarData(), getPieData()]).then(
        this.$http.spread((cardData, barData, pieData) => {
          this.totalUserNum = cardData.data.totalUserNum
          this.totalNewsNum = cardData.data.totalNewsNum
          this.barData = barData
          this.pieData = pieData.data
        })
      )
    },
    _startCrawlNewsData(){
      let recStart = 0
      if(this.recStart){
        recStart = 1
      }else{
        recStart = 0
      }
      startCrawlNewsData(recStart).then(res => {
        if(res.data == 1){
          if(recStart == 1){
            Message.success('开启成功!')
          }else{
            Message.success('关闭成功!')
          }
        }
      })
    },
    _startCrawlNewestNews(){
      let newsDataStart = 0
      if(this.newsDataStart){
        newsDataStart = 1
      }else{
        newsDataStart = 0
      }
      startCrawlNewestNews(newsDataStart).then(res => {
        if(res.data == 1){
          if(newsDataStart == 1){
            Message.success('开启成功!')
          }else{
            Message.success('关闭成功!')
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
$mgTop: 30px;
@mixin shadow {
  box-shadow: 0 0 10px #e2e2e2;
}
.color-green1 {
  color: #40c9c6 !important;
}
.color-blue {
  color: #36a3f7 !important;
}
.color-red {
  color: #f4516c !important;
}
.color-green2 {
  color: #34bfa3 !important;
}
.dashbord {
  background-color: #f0f3f4;
}
.infoCrads {
  margin: 0 -20px 0 -20px;
  .el-col {
    padding: 0 20px;
    .cardItem {
      height: 108px;
      background: #fff;
    }
  }
}
.cardItem {
  color: #666;
  @include shadow();
  .cardItem_txt {
    float: left;
    margin: 26px 0 0 20px;
    .cardItem_p0 {
      font-size: 20px;
      font-weight: bold;
    }
    .cardItem_p1 {
      font-size: 16px;
    }
  }
  .cardItem_icon {
    float: right;
    margin: 24px 20px 0 0;
    i {
      font-size: 55px;
    }
  }
}
.lCharts {
  background: #fff;
  margin-top: $mgTop;
  padding: 30px 0;
  @include shadow();
}
.barCharts {
  background: #fff;
  margin-top: $mgTop;
  padding: 30px 0;
  @include shadow();
}
.pieCharts {
  background: #fff;
  padding: 20px 520px;
}
.tableChart {
  width: 100%;
  background: #fff;
  @include shadow();
  margin-top: $mgTop;
}
</style>
