<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item prop="dateVals">
                <el-date-picker
                  v-model="formInline.dateVals"
                  @change="changeDate"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  size="small"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                ></el-date-picker>
              </el-form-item>
              <el-form-item prop="userName" style="width:150px;">
                <el-input
                  size="small"
                  clearable
                  v-model.trim="formInline.dinerName"
                  placeholder="请输入人员姓名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="addRecharge">手动充值</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label="序号" width="50"></el-table-column>
          <el-table-column prop="createTime" width="200" label="充值时间"></el-table-column>
          <el-table-column prop="dinerName" width="200" label="人员姓名"></el-table-column>
          <el-table-column prop="money" label="金额"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" style="margin-top: 15px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[15, 30, 45, 60]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        ></el-pagination>
      </div>
      <div class="dialogBox">
        <el-dialog title="手动充值" :visible.sync="dialogVisible" :show-close="false" width="750px">
          <div class="wrapper">
            <div>
              <el-form :model="form" :rules="rules" label-width="120px" ref="ruleForm">
                <el-form-item label="部门：" prop="gradeId">
                  <el-select
                    clearable
                    @change="handleFromGradeChange"
                    v-model.trim="form.gradeId"
                    placeholder="请选择部门"
                    style="width:150px;"
                    size="small"
                  >
                    <el-option
                      element-loading-spinner="el-icon-loading"
                      v-for="(item, index) in form.gradeData"
                      :key="`${_uid}_${index}`"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="人员：" prop="dinerId">
                  <el-select
                    clearable
                    v-model.trim="form.dinerId"
                    filterable
                    placeholder="请选择人员"
                    size="small"
                  >
                    <el-option
                      element-loading-spinner="el-icon-loading"
                      v-for="(item, index) in form.dinerData"
                      :key="`${_uid}_${index}`"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="充值金额：" prop="amount">
                  <el-input
                    size="small"
                    clearable
                    v-model.trim="form.amount"
                    placeholder="请输入充值金额"
                    style="width:180px;"
                  ></el-input>
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
import { PublicModule, FinanceModule } from "@/api/common";
export default {
  name: "userList",
  data() {
    return {
      isAdd: false,
      dialogVisible: false,
      formInline: {
        dateVals: [],
        gradeId: "",
        transactionType: "",
        dinerName: "",
      },
      form: {
        gradeId: "",
        dinerId: "",
        gradeData: [],
        dinerData: [],
        amount: "",
      },
      transactionTypeArr: {
        INCOME: "充值",
        REFUND: "提现",
      },
      incomeAmount: "0.00",
      incomeCount: "0",
      refundAmount: "0.00",
      refundCount: "0",
      gradeData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      rules: {
        gradeId: [
          {
            required: true,
            message: "请选择部门",
            trigger: ["blur", "change"],
          },
        ],
        dinerId: [
          {
            required: true,
            message: "请选择充值人员",
            trigger: ["blur", "change"],
          },
        ],
        amount: [
          {
            required: true,
            message: "请输入充值金额",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    getWalletLogList(pageIndex = 1, pageSize = 15) {
      let datas = {
        dateRange:
          this.formInline.dateVals == null ? [] : this.formInline.dateVals,
        action: "RECHARGE",
        dinerName: this.formInline.dinerName,
        pageIndex: pageIndex,
        pageSize: pageSize,
      };
      FinanceModule.getWalletLogList(datas).then((res) => {
        let list = [];
        let total = 0;
        let incomeAmount = "0.00";
        let incomeCount = "0";
        let refundAmount = "0.00";
        let refundCount = "0";
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({
              rowId: rowId,
              id: el.id,
              outTradeNo: el.outTradeNo,
              dinerName: el.dinerName,
              action: this.transactionTypeArr[el.transactionType],
              money: el.money,
              createTime: el.createTime,
            });
            rowId++;
          });
          total = res.data.total;
          incomeAmount = res.data.incomeAmount;
          incomeCount = res.data.incomeCount;
          refundAmount = res.data.refundAmount;
          refundCount = res.data.refundCount;
        }
        console.log(list);
        this.listData = list;
        this.pageTotal = total;
        this.incomeAmount = incomeAmount;
        this.incomeCount = incomeCount;
        this.refundAmount = refundAmount;
        this.refundCount = refundCount;
      });
    },
    // 查询
    submitForm() {
      this.getWalletLogList();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getWalletLogList(this.pageIndex, val);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getWalletLogList(val, this.pageSize);
    },
    changeDate() {
      if (!this.formInline.dateVals) {
        this.formInline.dateVals = [];
        console.log(this.formInline.dateVals);
      }
    },
    cancelForm() {
      this.dialogVisible = false;
    },
    addRecharge() {
      if (this.$refs["ruleForm"]) {
        this.$refs["ruleForm"].resetFields();
      }
      this.dialogVisible = true;
      this.getFormGradeSelect();
    },
    getFormGradeSelect() {
      this.form.classData = [];
      let datas = {
        schoolId: 1,
      };
      PublicModule.getGradeSelect(datas).then((res) => {
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
    getFormDinerSelect() {
      let datas = {
        gradeId: Number(this.form.gradeId),
      };
      PublicModule.getDinerSelect(datas).then((res) => {
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
    handleFromGradeChange() {
      this.getFormDinerSelect();
    },
    addRechargeInfo () {
      let datas = {
        gradeId: Number(this.form.gradeId),
        dinerId: Number(this.form.dinerId),
        amount: this.form.amount,
      };
      FinanceModule.addRechargeInfo(datas).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getWalletLogList();
          } else if (res.data.err == 1) {
            this.$message({
              type: 'error',
              message: '无效的人员'
            });
          }
        }
      });
    },
    submitAddForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addRechargeInfo();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  mounted() {
    this.getWalletLogList();
  },
};
</script>
<style lang="">
.queryList {
  border: 1px solid #eee;
  padding: 10px 15px 0px 15px;
}
.queryList .el-form-item {
  margin-bottom: 12px;
}
.queryList /deep/ .el-form-item__label {
  font-size: 13px !important;
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