<template>
  <div class="home">
    <el-row style="margin-top: 15px;" :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover">
            <div class="turnover">
              <i class="el-icon-circle-check"></i>
              欢迎光临智慧食堂管理系统，当前系统系统日期{{todayDate}}。
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { debounce } from "@/utils/tool";
import iTable from "@/components/table";
import SearchForm from "@/components/searchForm";

import { OrderModule } from "@/api/common";

let echarts = require("echarts/lib/echarts");
// 引入饼图组件
require("echarts/lib/chart/pie");
// 引入提示框和图例组件
require("echarts/lib/component/title");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/legendScroll");

export default {
  name: "home",
  components: {
    iTable,
    SearchForm,
  },
  data() {
    return {
      todaySummarySum: "",
      todaySummaryCount: "",
      thisWeekSummaryPer: "",
      nextWeekSummaryPer: "",
      mealStudentCount: [],
      mealOrderToCount: [],
      menuStudentSelected: 0,
      menuOrderToSelected: 0,
      todayDate: "",
      dateTypeArr: {
        day: "昨天",
        week: "最近7天",
        month: "最近30天",
      },
      paidArr: {
        paid: "已订餐",
        unpaid: "未订餐",
      },
      dealMethodArr: {
        CABINET: "保温柜",
        CANTEEN: "食堂预订",
      },
      mealTypeArr: {
        BREAKFAST: "早餐",
        LUNCH: "午餐",
        DINNER: "晚餐",
      },
      dataShow: "",
    };
  },
  methods: {
    formatAmount(val) {
      var str = ((val * 100) / 100).toFixed(2) + "";
      var intSum = str
        .substring(0, str.indexOf("."))
        .replace(/\B(?=(?:\d{3})+$)/g, ","); //取到整数部分
      var dot = str.substring(str.length, str.indexOf(".")); //取到小数部分搜索
      var ret = intSum + dot;
      return ret;
    },
    formatNumber(str) {
      var intSum = str.toString().replace(/\B(?=(?:\d{3})+$)/g, ","); //取到整数部分
      return intSum;
    },
    getHomeSummary() {
      let datas = {};
      OrderModule.getHomeSummary(datas).then((res) => {
        if (res.data) {
          this.todayDate = res.data.todayDate;
        }
      });
    },
  },
  mounted() {
    this.getHomeSummary();
  },
};
</script>
<style lang="" scoped>
.el-card {
  border: 0;
}

.home .turnover {
  text-align: center;
  color: #666666;
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
  padding: 300px 0;
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