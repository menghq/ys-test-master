<template>
  <div class="orderList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" class="form-inline">
          <el-row>
            <el-col :span="3" v-for="(item, index) in dateData" :key="index">
              <el-form-item>
                <el-button size="small" :type="dateSelect == item.date ? 'primary' : 'default'" @click="changeDate(item.date)">
                  {{item.date}}({{item.weekday}})</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-row>
        <el-col :span="6">
          <el-menu :default-active="defaultMenuActive" :default-openeds="defaultMenuOpeneds" :unique-opened="true" @open="changeMenu">
            <el-submenu v-for="(group, index) in menuData" :key="index" :index="group.mealTime">
              <template slot="title">
                <i class="el-icon-burger"></i>
                <span>{{group.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(school, idx) in group.schoolList" :key="idx" :index="index + '-' + idx"
                  @click="changeMenuItem(group.mealTime, school.schoolId)">
                  {{school.schoolName}}({{school.foodAmount}}份)</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="18">
          <div class="tableCom" style="margin-top: 15px;" v-if="listAllData">
            <el-row v-for="(group, index) in listAllData" :key="index">
              <el-row>
                {{group.name}} 合计：{{group.foodAmount}}份
              </el-row>
              <el-table :data="group.foodList" highlight-current-row border style="width: 100%">
                <el-table-column prop="rowId" label='序号' width="50">
                </el-table-column>
                <el-table-column prop="foodName" label='菜品'>
                </el-table-column>
                <el-table-column prop="foodAmount" label='份数'>
                </el-table-column>
              </el-table>
            </el-row>
          </div>
          <div class="tableCom" style="margin-top: 15px;" v-if="Object.keys(listGradeData).length > 0">
            <el-tabs v-model="detailSelect" type="card" @tab-click="handleTabClick">
              <el-tab-pane label="年级总览" name="grade">
                <el-row v-for="(group, index) in listGradeData" :key="index">
                  <el-row>
                    {{group.name}} 合计：{{group.foodAmount}}份
                  </el-row>
                  <el-table :data="group.foodList" highlight-current-row border style="width: 100%">
                    <el-table-column prop="rowId" label='序号' width="50">
                    </el-table-column>
                    <el-table-column prop="foodName" label='菜品'>
                    </el-table-column>
                    <el-table-column prop="foodAmount" label='份数'>
                    </el-table-column>
                  </el-table>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="班级总览" name="class">
                <el-row v-for="(group, index) in listClassData" :key="index">
                  <el-row>
                    {{group.name}} 合计：{{group.foodAmount}}份
                  </el-row>
                  <el-table :data="group.classList" highlight-current-row border style="width: 100%">
                    <el-table-column prop="rowId" label='序号' width="50">
                    </el-table-column>
                    <el-table-column prop="className" label='班级'>
                    </el-table-column>
                    <el-table-column v-for="(food, i) in group.foodName" :key="i" :label='food'>
                      <template slot-scope="scope">
                        {{scope.row.foodList[i].foodAmount}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="foodAmount" label='合计'>
                      <template slot-scope="scope">
                        {{scope.row.foodAmount}}
                      </template>
                    </el-table-column>
                  </el-table>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="订单明细" name="order">

                <el-table :data="listOrderData" highlight-current-row border style="width: 100%">
                  <el-table-column prop="rowId" label='序号' width="50">
                  </el-table-column>
                  <el-table-column prop="foodName" label='菜品'>
                  </el-table-column>
                  <el-table-column prop="dinerName" label='姓名'>
                  </el-table-column>
                  <el-table-column prop="schoolName" label='學校'>
                  </el-table-column>
                  <el-table-column prop="gradeName" label='年級'>
                  </el-table-column>
                  <el-table-column prop="className" label='班級'>
                  </el-table-column>
                </el-table>

              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { OrderModule } from "@/api/common";
export default {
  name: 'orderList',
  data () {
    return {
      dialogVisible: false,
      select: {
        mealDate: "",
        mealTime: '',
        schoolId: 0,
      },
      mealTimeArr: {
        'BREAKFAST': '早餐',
        'LUNCH': '午餐',
        'DINNER': '晚餐'
      },
      defaultMenuActive: "",
      defaultMenuOpeneds: [],
      detailSelect: "grade",
      schoolSelect: "",
      dateSelect: "",
      mealTimeSelect: "",
      dateData: [],
      gradeData: [],
      classData: [],
      listData: [],
      listAllData: [],
      listGradeData: [],
      listClassData: [],
      listOrderData: [],
      menuData: [],
    }
  },
  methods: {
    formatAmount (val) {
      var str = (val * 100 / 100).toFixed(2) + '';
      var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
      var dot = str.substring(str.length, str.indexOf("."))//取到小数部分搜索
      var ret = intSum + dot;
      return ret;
    },
    formatNumber (str) {
      var intSum = str.replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
      return intSum;
    },
    changeDate (date) {
      this.dateSelect = date;
      this.getAssignMenu();
    },
    changeMenu (i) {
      this.getAssignMealTimeList(i);
    },
    changeMenuItem (mealTime, schoolId) {
      this.select.mealTime = mealTime;
      this.select.schoolId = schoolId;
      this.getAssignGradeList();
    },
    handleTabClick (tab, event) {
      let name = tab.name;
      console.log(name);
      if (name == 'grade') {
        this.getAssignGradeList();
      } else if (name == 'class') {
        this.getAssignClassList();
      } else if (name == 'order') {
        this.getAssignOrderList();
      }
    },
    clearSelect () {
      this.select = {
        mealDate: "",
        mealTime: '',
        schoolId: 0,
      };
    },
    clearList () {
      this.select = {
        mealDate: "",
        mealTime: '',
        schoolId: 0,
      };
    },
    getAssignMenu () {
      this.menuData = [];
      this.mealTimeSelect = "";
      this.listAllData = [];
      this.listGradeData = [];
      let datas = {
        mealDate: this.dateSelect,
      };
      OrderModule.getAssignMenu(datas).then(res => {
        let list = [];
        if (res.data) {
          res.data.list.forEach((el, i) => {
            let schoolList = [];
            el.foodList.forEach((e, j) => {
              schoolList.push({

                schoolId: e.schoolId,
                schoolName: e.schoolName,
                foodAmount: e.foodAmount,

              });
            });

            list.push({

              name: this.mealTimeArr[el.mealTime],
              mealTime: el.mealTime,
              schoolList: schoolList

            });
          });
        }
        this.menuData = list;
        this.defaultMenuActive = "";
        this.defaultMenuOpeneds = [];
        this.getAssignAllList();
      });
    },
    getAssignAllList () {
      let datas = {
        mealDate: this.dateSelect,
      };
      OrderModule.getAssignAllList(datas).then(res => {
        let list = [];
        if (res.data) {
          res.data.list.forEach((el, i) => {
            let rowId = 1;
            let foodList = [];
            el.foodList.forEach((e, j) => {
              foodList.push({

                rowId: rowId,
                foodName: e.foodName,
                foodAmount: e.foodAmount,

              });
              rowId++;
            });

            list.push({

              name: this.mealTimeArr[el.mealTime],
              foodAmount: el.foodAmount,


              foodList: foodList,

            });
          });
        }
        this.listAllData = list;
      });
    },
    getAssignMealTimeList (mealTime) {
      let datas = {
        mealDate: this.dateSelect,
        mealTime: mealTime,
      };
      OrderModule.getAssignMealTimeList(datas).then(res => {
        let list = [];
        if (res.data) {
          res.data.list.forEach((el, i) => {
            let rowId = 1;
            let foodList = [];
            el.foodList.forEach((e, j) => {
              foodList.push({

                rowId: rowId,
                foodName: e.foodName,
                foodAmount: e.foodAmount,

              });
              rowId++;
            });

            list.push({

              name: this.mealTimeArr[el.mealTime],
              foodAmount: el.foodAmount,

              foodList: foodList,

            });
          });
        }
        this.listAllData = list;
      });
    },
    getAssignGradeList () {
      this.listAllData = [];
      this.listGradeData = [];
      let datas = {
        mealDate: this.dateSelect,
        mealTime: this.select.mealTime,
        schoolId: this.select.schoolId
      };
      OrderModule.getAssignGradeList(datas).then(res => {
        let list = [];
        if (res.data) {
          res.data.list.forEach((el, i) => {
            let rowId = 1;
            let foodList = [];
            el.foodList.forEach((e, j) => {
              foodList.push({

                rowId: rowId,
                foodName: e.foodName,
                foodAmount: e.foodAmount,

              });
              rowId++;
            });

            list.push({

              name: el.gradeName,
              foodAmount: el.foodAmount,

              foodList: foodList,

            });
          });
        }
        this.listGradeData = list;
      });
    },
    getAssignClassList () {
      this.listAllData = [];
      this.listClassData = [];
      let datas = {
        mealDate: this.dateSelect,
        mealTime: this.select.mealTime,
        schoolId: this.select.schoolId
      };
      OrderModule.getAssignClassList(datas).then(res => {
        let list = [];
        if (res.data) {
          res.data.list.forEach((el, i) => {
            let rowId = 1;
            let classList = [];
            el.foodList.forEach((e, j) => {

              let foodList = [];
              e.foodList.forEach((f, k) => {
                foodList.push({

                  foodName: f.foodName,
                  foodAmount: f.foodAmount,

                });
              });
              classList.push({

                rowId: rowId,
                className: e.className,
                foodAmount: e.foodAmount,

                foodList: foodList,

              });
              rowId++;
            });

            list.push({

              name: el.gradeName,
              foodAmount: el.foodAmount,

              foodId: el.foodId.split(','),
              foodName: el.foodName.split(','),

              classList: classList,

            });
          });
        }
        this.listClassData = list;
      });
    },
    getAssignOrderList () {
      this.listAllData = [];
      this.listOrderData = [];
      let datas = {
        mealDate: this.dateSelect,
        mealTime: this.select.mealTime,
        schoolId: this.select.schoolId
      };
      OrderModule.getAssignOrderList(datas).then(res => {
        let list = [];
        let rowId = 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {

            list.push({

              rowId: rowId,
              foodName: el.foodName,
              dinerName: el.dinerName,
              schoolName: el.schoolName,
              gradeName: el.gradeName,
              className: el.className,

            });
            rowId++;
          });
        }
        this.listOrderData = list;
      });
    },
    getAssignDate () {
      OrderModule.getAssignDate().then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            if (i == 0) {
              this.dateSelect = el.date;
              this.getAssignMenu();
            }
            list.push({

              date: el.date,
              weekday: el.weekday,

            });
          });
          this.dateData = list;
        }
      });
    },
    exportForm () {
      let datas = {
      };
      OrderModule.getOrderExport(datas).then(res => {
        if (res.data) {
        }
      });
    },
  },
  mounted () {
    this.getAssignDate();
  }
}
</script>
<style lang="">
.queryList {
  border: 1px solid #eee;
  padding: 10px 15px 0px 15px;
}
.queryList .el-form-item {
  margin-bottom: 12px;
}
.order-detail /deep/ .el-pagination {
  margin-top: 10px;
  font-size: 13px !important;
}
.queryList /deep/ .el-form-item__label {
  font-size: 13px !important;
}
.statistics .el-alert {
  margin: 10px 0;
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
.dialogBox .el-col {
  font-size: 12px;
}
.info .el-col {
  padding: 2px 0;
}

.el-collapse {
  border-top: 0;
  border-bottom: 0;
}
.el-collapse-item__header {
  border-bottom: 0;
}
.el-collapse-item__wrap {
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
  border-bottom: 0;
}
.el-collapse-item__header span {
  font-weight: normal;
}
.el-collapse-item:last-child {
  margin-bottom: 0;
}
.el-collapse-item__content {
  padding-bottom: 0;
}
</style>