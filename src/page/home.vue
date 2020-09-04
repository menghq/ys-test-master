<template>
  <div class="home">
    <el-row style="margin-top: 15px;" :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">

            <div class="turnover">

              <div class="dataTotal">
                <el-row>
                  <el-col :span="6">
                    <div>
                      <div class="left">当日订单总数
                        <el-tooltip class="item" effect="dark" content="筛选结果的当日订单总数合计" placement="top-start">
                          <i class="el-icon-question"></i>
                        </el-tooltip>
                      </div>
                      <div class="num">{{todaySummaryCount}}份</div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div>
                      <div class="left">当日订单金额
                        <el-tooltip class="item" effect="dark" content="筛选结果的订单金额合计" placement="top-start">
                          <i class="el-icon-question"></i>
                        </el-tooltip>
                      </div>
                      <div class="num">{{todaySummarySum}}元</div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div>
                      <div class="left">本周订餐人数
                        <el-tooltip class="item" effect="dark" content="筛选结果的本周订餐人数合计" placement="top-start">
                          <i class="el-icon-question"></i>
                        </el-tooltip>
                      </div>
                      <div class="num">{{thisWeekPerCount}}人</div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div>
                      <div class="left">下周已预定人数
                        <el-tooltip class="item" effect="dark" content="筛选结果的下周已预定人数合计" placement="top-start">
                          <i class="el-icon-question"></i>
                        </el-tooltip>
                      </div>
                      <div class="num">{{nextWeekPerCount}}人</div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div style="border-bottom: 1px solid #EBEEF5; margin: 20px 0;"></div>
              <div class="echarts-content">
                <div class="chart-main" id="chart-main">
                  <el-row>
                    <div style="display:flex; margin-bottom:20px;">
                      <div style="margin-right:40px;">
                        <div id="mealStudentChart" :style="{width: '350px', height: '270px'}"></div>
                      </div>
                      <div style="margin-right:40px;">
                        <div style="height:30px;"></div>
                        <div id="mealTimeChart" :style="{width: '350px', height: '270px'}"></div>
                      </div>
                      <div>
                        <div id="mealOrderToChart" :style="{width: '350px', height: '270px'}"></div>
                      </div>
                    </div>
                  </el-row>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import { debounce } from '@/utils/tool'
import iTable from '@/components/table'
import SearchForm from '@/components/searchForm'

import { OrderModule } from "@/api/common";

let echarts = require('echarts/lib/echarts');
// 引入饼图组件
require('echarts/lib/chart/pie');
// 引入提示框和图例组件
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require("echarts/lib/component/legendScroll");

export default {
  name: 'home',
  components: {
    iTable,
    SearchForm
  },
  data () {
    return {

      todaySummarySum: "",
      todaySummaryCount: "",
      thisWeekSummaryPer: "",
      nextWeekSummaryPer: "",
      mealStudentCount: [],
      mealOrderToCount: [],
      menuStudentSelected: 0,
      menuOrderToSelected: 0,
      dateTypeArr: {
        'day': '昨天',
        'week': '最近7天',
        'month': '最近30天'
      },
      studentTypeArr: {
        'STUDENT': '学生',
        'STAFF': '教职工'
      },
      paidArr: {
        'paid': '已订餐',
        'unpaid': '未订餐'
      },
      dealMethodArr: {
        'CABINET': '保温柜',
        'CANTEEN': '食堂预订'
      },
      mealTypeArr: {
        'BREAKFAST': '早餐',
        'LUNCH': '午餐',
        'AFTERNOON_TEA': '下午茶',
        'DINNER': '晚餐',
        'SUPPER': '宵夜'
      },

      mealStudentOption: {
        tooltip: {
          trigger: 'item',
          /* formatter: "{a} <br/>{b} : ({c}门) {d}%"*/
          formatter: "{a} {b} : {c}人 {d}%"
        },
        legend: {
          left: 'center',
          top: 'bottom',
          itemWidth: 10,
          itemHeight: 10,
          selectedMode: false, //禁止点击
          textStyle: {
            fontSize: 12,
            color: "#ffffff",
          },
          formatter: function (name) { //避免文字太长做省略处理
            return name.length > 4 ? (name.slice(0, 4) + "...") : name
          },
          data: []
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '60%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            hoverAnimation: true, //是否开启 hover 在扇区上的放大动画效果	
            selectedMode: false,  //选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'，'multiple'，分别表示单选还是多选。
            selectedOffset: 0, //选中扇区的偏移距离
            label: {
              show: false,
              position: 'center',
              formatter: "{d}%"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold',
                color: "#ffffff",
              },
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ],
        color: ['#f5cd6e', '#d87480'] //饼图分块颜色设置
      },
      mealTimeOption: {
        tooltip: {
          trigger: 'item',
          /* formatter: "{a} <br/>{b} : ({c}门) {d}%"*/
          formatter: "{a} {b} : {c}份 {d}%"
        },
        legend: {
          left: 'center',
          top: 'bottom',
          itemWidth: 10,
          itemHeight: 10,
          selectedMode: false, //禁止点击
          textStyle: {
            fontSize: 12,
            color: "#ffffff",
          },
          formatter: function (name) { //避免文字太长做省略处理
            return name.length > 4 ? (name.slice(0, 4) + "...") : name
          },
          data: []
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: [0, '60%'],
            center: ['50%', '40%'],
            hoverAnimation: true, //是否开启 hover 在扇区上的放大动画效果	
            selectedMode: false,  //选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'，'multiple'，分别表示单选还是多选。
            selectedOffset: 0, //选中扇区的偏移距离
            data: [],

            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    fontSize: 12
                  },
                  position: 'inner',
                },
                labelLine: {
                  show: false
                }
              }
            }
          }
        ],
        color: ['#6db5f8', '#82d06b', '#7673ec', '#ec7062'] //饼图分块颜色设置
      },
      mealOrderToOption: {
        tooltip: {
          trigger: 'item',
          /* formatter: "{a} <br/>{b} : ({c}门) {d}%"*/
          formatter: "{a} {b} : {c}份 {d}%"
        },
        legend: {
          left: 'center',
          top: 'bottom',
          itemWidth: 10,
          itemHeight: 10,
          selectedMode: false, //禁止点击
          textStyle: {
            fontSize: 12,
            color: "#ffffff",
          },
          formatter: function (name) { //避免文字太长做省略处理
            return name.length > 4 ? (name.slice(0, 4) + "...") : name
          },
          data: []
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '60%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            hoverAnimation: true, //是否开启 hover 在扇区上的放大动画效果	
            selectedMode: false,  //选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'，'multiple'，分别表示单选还是多选。
            selectedOffset: 0, //选中扇区的偏移距离
            label: {
              show: false,
              position: 'center',
              formatter: "{d}%"
            },
            labelLine: {
              show: false
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold'
              },
            },
            data: []
          }
        ],
        color: ['#81d06a', '#7774ed'] //饼图分块颜色设置
      },

      dataShow: '',
    }
  },
  methods: {

    drawLine: function () {// 初始化echarts实例
      //获取demo元素
      let mealStudentChart = echarts.init(document.getElementById('mealStudentChart'));
      let mealTimeChart = echarts.init(document.getElementById('mealTimeChart'));
      let mealOrderToChart = echarts.init(document.getElementById('mealOrderToChart'));

      //初始化echarts
      mealStudentChart.setOption(this.mealStudentOption);
      mealTimeChart.setOption(this.mealTimeOption);
      mealOrderToChart.setOption(this.mealOrderToOption);

    },

    formatAmount (val) {
      var str = (val * 100 / 100).toFixed(2) + '';
      var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
      var dot = str.substring(str.length, str.indexOf("."))//取到小数部分搜索
      var ret = intSum + dot;
      return ret;
    },
    formatNumber (str) {
      var intSum = str.toString().replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
      return intSum;
    },
    getHomeSummary () {
      let datas = {
      };
      OrderModule.getHomeSummary(datas).then(res => {
        if (res.data) {
          let todaySummarySum = res.data.todaySummarySum;
          let todaySummaryCount = res.data.todaySummaryCount;
          let thisWeekPerCount = res.data.thisWeekPerCount;
          let nextWeekPerCount = res.data.nextWeekPerCount;

          let mealTimeCount = res.data.mealTimeCount;
          let mealTimeData = res.data.mealTimeData;
          let mealTimeLabel = res.data.mealTimeLabel;
          let mealDateLabel = res.data.mealDateLabel;
          let mealOrderToCount = res.data.mealOrderToCount;
          let mealOrderToLabel = res.data.mealOrderToLabel;

          this.todaySummarySum = todaySummarySum;
          this.todaySummaryCount = todaySummaryCount;
          this.thisWeekPerCount = thisWeekPerCount;
          this.nextWeekPerCount = nextWeekPerCount;

          for (let i = 0; i < mealStudentCount.length; i++) {
            mealStudentCount[i].name = this.paidArr[mealStudentCount[i].name];
            mealStudentLabel[i] = this.paidArr[mealStudentLabel[i]];
          }

          for (let i = 0; i < mealTimeCount.length; i++) {
            mealTimeCount[i].name = this.mealTypeArr[mealTimeCount[i].name];
            mealTimeLabel[i] = this.mealTypeArr[mealTimeLabel[i]];
          }

          for (let i = 0; i < mealOrderToCount.length; i++) {
            mealOrderToCount[i].name = this.dealMethodArr[mealOrderToCount[i].name];
            mealOrderToLabel[i] = this.dealMethodArr[mealOrderToLabel[i]];
          }

          this.mealStudentCount = mealStudentCount;
          this.mealOrderToCount = mealOrderToCount;

          this.mealStudentOption.series[0].data = mealStudentCount.all;
          this.mealStudentOption.legend.data = mealStudentLabel;
          this.mealTimeOption.series[0].data = mealTimeCount;
          this.mealTimeOption.legend.data = mealTimeLabel;
          this.mealOrderToOption.series[0].data = mealOrderToCount.all;
          this.mealOrderToOption.legend.data = mealOrderToLabel;

          //初始化
          this.drawLine();
        }
      });
    },
    // 查询
    submitForm () {
      this.getHomeSummary();
    },
  },
  mounted () {
    this.getHomeSummary();
  },
}
</script>
<style lang="" scoped>
.el-card {
  border: 0;
}
.el-form-item {
  margin-bottom: 0;
}
.home .grid-content /deep/ .el-card__header {
  padding: 12px 20px;
  font-size: 13px;
}
.home .turnover /deep/ .el-card {
  margin-bottom: 10px;
}
.home .grid-content /deep/ .el-card__body {
  padding: 20px 0;
}
.tableCom /deep/ .el-table {
  font-size: 12px !important;
}
.tableCom /deep/ .el-table th {
  background: linear-gradient(rgb(247, 245, 245) 0%, rgb(229, 229, 229) 100%);
  color: rgb(51, 51, 51);
  height: 35px;
  line-height: 35px;
  padding: 0px;
}
.tableCom /deep/ .el-table td {
  color: rgb(51, 51, 51);
  height: 35px;
  line-height: 35px;
  padding: 0px;
}
.home /deep/ .el-pagination {
  margin-top: 10px;
  font-size: 13px !important;
}

.echarts-content {
  width: 100%;
}

.echarts-content .chart-main {
  width: 100%;
  position: relative;
  overflow: hidden;
  -webkit-transition: height 0.6s;
  -moz-transition: height 0.6s;
  -o-transition: height 0.6s;
  transition: height 0.6s;
}

.block-menu {
  height: 30px;
  display: flex;
}

.block-menu .menu-item {
  color: #ffffff;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  width: 25%;
}
.block-menu .on {
  background: #cccccc;
}
.dataTotal {
  margin-top: 15px;
  text-align: center;
  padding: 5px;
  border: 1px solid #eee;
  font-size: 12px;
}
.dataTotal .num {
  color: #f56c6c;
  font-size: 16px;
  padding: 5px 0;
}
.dataTotal .left {
  padding: 5px 0;
}
.dataTotal .left i {
  color: #409eff;
  font-size: 14px;
  margin-left: 3px;
}
.dataTotal .el-col {
  border-right: 4px solid #409eff;
}
</style>