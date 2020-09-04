<template>
  <div class="orderList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="20">
              <el-form-item prop="dateVals">
                <el-date-picker v-model="formInline.dateVals" @change="changeDate" value-format="yyyy-MM-dd" type="daterange" size="small"
                  range-separator="至" start-placeholder="用餐开始日期" end-placeholder="用餐结束日期" align="right">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="gradeId" style="width:150px;">
                <el-select clearable @change="handleGradeChange" filterable v-model.trim="formInline.gradeId" placeholder="请选择部门"
                  size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in gradeData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="dinerName" style="width:150px;">
                <el-input size="small" clearable v-model.trim="formInline.dinerName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item prop="orderStatus" style="width:120px;">
                <el-select clearable v-model.trim="formInline.orderStatus" placeholder="请选择订单状态" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in orderStatusArr" :key="`${_uid}_${index}`"
                    :label="item" :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="mealTime" style="width:120px;">
                <el-select clearable v-model.trim="formInline.mealTime" placeholder="请选择餐别" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in mealTimeArr" :key="`${_uid}_${index}`"
                    :label="item" :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="addOrder">增补订单</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="dataTotal">
        <el-row>
          <el-col :span="8">
            <div>
              <div class="left">应收金额合计
                <el-tooltip class="item" effect="dark" content="筛选结果的订单应收金额合计" placement="top-start">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
              <div class="num">{{totalSum}}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <div class="left">实收金额合计
                <el-tooltip class="item" effect="dark" content="筛选结果的订单的实收金额合计" placement="top-start">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
              <div class="num">{{paySum}}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <div class="left">出餐份数合计
                <el-tooltip class="item" effect="dark" content="筛选结果的全部出餐份数合计" placement="top-start">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
              <div class="num">{{pageTotal}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" highlight-current-row border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="mealDate" label='用餐日期' width='120'>
          </el-table-column>
          <el-table-column prop="mealTime" label='餐段' width='80'>
          </el-table-column>
          <el-table-column prop="gradeName" label='部门'>
          </el-table-column>
          <el-table-column prop="dinerName" label='姓名'>
          </el-table-column>
          <el-table-column prop="foodName" label='菜品'>
          </el-table-column>
          <el-table-column prop="totalMoney" label='应付金额' width='80'>
          </el-table-column>
          <el-table-column prop="payMoney" label='实付金额' width='80'>
          </el-table-column>
          <el-table-column prop="orderStatus" label='订单状态' width='80'>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button v-if="scope.row.orderStatus!='已取消'" @click="deleteUser(scope.row)" type="text" size="small">取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" style="margin-top: 15px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30, 45, 60]"
          :page-size=pageSize layout="total, sizes, prev, pager, next, jumper" :total=pageTotal>
        </el-pagination>
      </div>
      <div class="dialogBox">
        <el-dialog title="增补订单" :visible.sync="dialogVisible" :show-close="false" width="750px">
          <div class="wrapper">
            <div>
              <el-form :model="form" :rules="rules" label-width="120px" ref="ruleForm">
                <el-form-item label="日期：" prop="mealDate">
                  <el-date-picker v-model="form.mealDate" @change="changeFormDate" value-format="yyyy-MM-dd" type="date" size="small"
                    placeholder="用餐开始日期" align="right">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="餐段：" prop="mealTime">
                  <el-select clearable v-model.trim="form.mealTime" placeholder="请选择餐段" style="width:150px;" size="small">
                    <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in mealTimeArr" :key="`${_uid}_${index}`"
                      :label="item" :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="学校：" prop="gradeId">
                  <el-select clearable v-model.trim="form.gradeId" placeholder="请选择部门" style="width:150px;" size="small">
                    <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in form.gradeData" :key="`${_uid}_${index}`"
                      :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="人员：" prop="dinerId">
                  <el-select clearable v-model.trim="form.dinerId" filterable placeholder="请选择人员" size="small">
                    <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in form.dinerData" :key="`${_uid}_${index}`"
                      :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="菜品：" prop="foodId">
                  <el-select clearable v-model.trim="form.foodId" placeholder="请选择菜品" size="small">
                    <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in form.foodData" :key="`${_uid}_${index}`"
                      :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>

            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelForm('ruleForm')" size="mini">取 消</el-button>
            <el-button type="primary" @click="submitAddForm('ruleForm')" size="mini">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { PublicModule, OrderModule } from "@/api/common";
export default {
  name: 'orderList',
  data () {
    return {
      dialogVisible: false,
      formInline: {
        gradeId: '',
        dateVals: [],
        dinerName: '',
        orderStatus: '',
        mealTime: '',
        kitchenId: '',
      },
      form: {
        mealDate: "",
        mealTime: "",
        gradeId: "",
        dinerId: "",
        foodId: "",
        gradeData: [],
        foodData: [],
        dinerData: [],
      },
      mealTimeArr: {
        'BREAKFAST': '早餐',
        'LUNCH': '午餐',
        'DINNER': '晚餐'
      },
      orderStatusArr: {
        'PAID': "未完成",
        'FINISH': "已完成",
        'CANCELED': "已取消",
      },
      gradeData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      totalSum: "0.00",
      paySum: "0.00",
      infoData: {},
      dialogTableData: [{
        shouldGet: -20.5,
        factGet: 10.5,
      }],
      // 收款信息数据
      dialogGatheringTableData: [],
      // 点餐明细数据
      dialogOrderingTableData: [],
      rules: {
        gradeId: [
          { required: true, message: '请选择部门', trigger: ['blur', 'change'] },
        ],
        studentName: [
          { required: true, message: '请输入姓名', trigger: ['blur', 'change'] },
        ],
      }
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
    getOrderList (pageIndex = 1, pageSize = 15) {
      let datas = {
        gradeId: Number(this.formInline.gradeId),
        dateRange: this.formInline.dateVals == null ? [] : this.formInline.dateVals,
        dinerName: this.formInline.dinerName,
        orderStatus: this.formInline.orderStatus,
        mealTime: this.formInline.mealTime,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      OrderModule.getOrderList(datas).then(res => {
        let list = [];
        let total = 0;
        let totalSum = "0.00";
        let paySum = "0.00";
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              mealDate: el.mealDate,
              mealTime: this.mealTimeArr[el.mealTime],
              gradeName: el.gradeName,
              dinerName: el.dinerName,
              foodName: el.foodName,
              totalMoney: this.formatAmount(el.totalMoney),
              payMoney: this.formatAmount(el.payMoney),
              orderStatus: this.orderStatusArr[el.orderState],

            });
            rowId++;
          });
          total = res.data.total;
          totalSum = res.data.totalSum;
          paySum = res.data.paySum;
        }
        this.listData = list;
        this.pageTotal = Number(total);
        this.totalSum = this.formatAmount(totalSum);
        this.paySum = this.formatAmount(paySum);
      });
    },
    getSchoolSelect () {
      PublicModule.getSchoolSelect().then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({

              id: el.id,
              name: el.schoolName,

            });
          });
          this.schoolData = list;
          this.formInline.gradeId = "";
          this.gradeData = [];
          this.formInline.classId = "";
          this.classData = [];
        }
      });
    },
    getGradeSelect () {
      let datas = {
        schoolId: Number(this.formInline.schoolId)
      };
      PublicModule.getGradeSelect(datas).then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({

              id: el.id,
              name: el.gradeName,

            });
          });
          this.formInline.gradeId = "";
          this.gradeData = list;
          this.formInline.classId = "";
          this.classData = [];
        }
      });
    },
    getClassSelect () {
      let datas = {
        schoolId: Number(this.formInline.schoolId),
        gradeId: Number(this.formInline.gradeId)
      };
      PublicModule.getClassSelect(datas).then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({

              id: el.id,
              name: el.className,

            });
          });
          this.formInline.classId = "";
          this.classData = list;
        }
      });
    },
    getKitchenSelect () {
      let datas = {
      };
      PublicModule.getKitchenSelect(datas).then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({

              id: el.id,
              name: el.kitchenName,

            });
          });
          this.formInline.kitchenId = "";
          this.kitchenData = list;
        }
      });
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.getOrderList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getOrderList(val, this.pageSize);
    },
    handleSchoolChange (value) {
      this.getGradeSelect();
    },
    handleGradeChange (value) {
      this.getClassSelect();
    },
    handleClassChange (value) {
    },
    changeDate () {
      if (!this.formInline.dateVals) {
        this.formInline.dateVals = [];
        console.log(this.formInline.dateVals);
      }
    },
    changeFormDate () {
      if (!this.form.mealDate) {
        this.form.mealDate = "";
      }
    },
    submitAddForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addOrderInfo();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    cancelForm () {
      this.dialogVisible = false;
    },
    addOrderInfo () {
      let datas = {
        mealDate: this.form.mealDate,
        mealTime: this.form.mealTime,
        gradeId: Number(this.form.gradeId),
        dinerId: Number(this.form.dinerId),
        foodId: Number(this.form.foodId),
      };
      OrderModule.addOrderInfo(datas).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getOrderList();
          } else if (res.data.err == 1) {
            this.$message({
              type: 'error',
              message: '无效的用餐用户'
            });
          } else if (res.data.err == 2) {
            this.$message({
              type: 'error',
              message: '无效的菜品'
            });
          } else if (res.data.err == 3) {
            this.$message({
              type: 'error',
              message: '余额不足'
            });
          }
        }
      });
    },
    addOrder () {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields();
      }
      this.dialogVisible = true;
      this.getFormGradeSelect();
    },
    getFormGradeSelect () {
      this.form.classData = [];
      let datas = {
        schoolId: Number(this.form.schoolId),
      };
      PublicModule.getGradeSelect(datas).then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({

              id: el.id,
              name: el.gradeName,

            });
          });
          this.form.gradeData = list;
        }
      });
    },
    getFormFoodSelect () {
      let datas = {
        kitchenId: Number(this.form.kitchenId),
      };
      PublicModule.getFoodSelect(datas).then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({

              id: el.id,
              name: el.foodName + "(" + el.price + "元)",

            });
          });
          this.form.foodData = list;
        }
      });
    },
    getFormDinerSelect () {
      let datas = {
        classId: Number(this.form.classId),
      };
      PublicModule.getDinerSelect(datas).then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({

              id: el.id,
              name: el.dinerName + "(" + el.money + "元)",

            });
          });
          this.form.dinerData = list;
        }
      });
    },
    // 查询
    submitForm () {
      this.getOrderList();
    },
    deleteUser (row) {
      this.$confirm(`是否取消订单?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelOrderInfo(row.id);
        // 成功后回掉
      }).catch(() => {
        // this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        // });          
      });
    },
    cancelOrderInfo (id) {
      OrderModule.cancelOrderInfo(id).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '取消成功!'
            });
            this.getOrderList();
          }
        }
      });
    },
  },
  mounted () {
    this.getOrderList();
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