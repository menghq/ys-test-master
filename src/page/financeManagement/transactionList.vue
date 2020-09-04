<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item prop="dateVals">
                <el-date-picker v-model="formInline.dateVals" @change="changeDate" value-format="yyyy-MM-dd" type="daterange" size="small"
                  range-separator="至" start-placeholder="交易开始日期" end-placeholder="交易结束日期" align="right">
                </el-date-picker>
              </el-form-item>
              <el-form-item style="width:150px;" prop="schoolId">
                <el-select clearable v-model.trim="formInline.schoolId" placeholder="请选择学校" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in schoolData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="transactionType" style="width:150px;">
                <el-select clearable v-model.trim="formInline.transactionType" placeholder="请选择类型" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in transactionTypeArr" :key="`${_uid}_${index}`"
                    :label="item" :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="userName" style="width:150px;">
                <el-input size="small" clearable v-model.trim="formInline.dinerName" placeholder="请输入人员名称">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="dataTotal">
        <el-row>
          <el-col :span="6">
            <div>
              <div class="left">充值金额合计
                <el-tooltip class="item" effect="dark" content="筛选结果的充值金额合计" placement="top-start">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
              <div class="num">{{incomeAmount}}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <div class="left">充值笔数合计
                <el-tooltip class="item" effect="dark" content="筛选结果的充值笔数合计" placement="top-start">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
              <div class="num">{{incomeCount}}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <div class="left">提现金额合计
                <el-tooltip class="item" effect="dark" content="筛选结果的全部提现金额合计" placement="top-start">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
              <div class="num">{{refundAmount}}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <div class="left">提现笔数合计
                <el-tooltip class="item" effect="dark" content="筛选结果的全部提现笔数合计" placement="top-start">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
              <div class="num">{{refundCount}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="outTradeNo" width="200" label='交易流水号'>
          </el-table-column>
          <el-table-column prop="dinerName" width="200" label='人员'>
          </el-table-column>
          <el-table-column prop="transactionType" width="60" label='类型'>
          </el-table-column>
          <el-table-column prop="money" width="200" label='金额'>
          </el-table-column>
          <el-table-column prop="transactionTime" label='交易时间'>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" style="margin-top: 15px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30, 45, 60]" :page-size="100"
          layout="total, sizes, prev, pager, next, jumper" :total=pageTotal>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { PublicModule, FinanceModule } from "@/api/common";
export default {
  name: 'userList',
  data () {
    return {
      isAdd: false,
      formInline: {
        dateVals: [],
        schoolId: '',
        transactionType: '',
        dinerName: '',
      },
      transactionTypeArr: {
        'INCOME': '充值',
        'REFUND': '提现'
      },
      incomeAmount: '0.00',
      incomeCount: '0',
      refundAmount: '0.00',
      refundCount: '0',
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
    }
  },
  methods: {
    getTransactionList (pageIndex = 1, pageSize = 15) {
      let datas = {
        dateRange: this.formInline.dateVals == null ? [] : this.formInline.dateVals,
        schoolId: Number(this.formInline.schoolId),
        transactionType: this.formInline.transactionType,
        dinerName: this.formInline.dinerName,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      FinanceModule.getTransactionList(datas).then(res => {
        let list = [];
        let total = 0;
        let incomeAmount = '0.00';
        let incomeCount = '0';
        let refundAmount = '0.00';
        let refundCount = '0';
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              outTradeNo: el.outTradeNo,
              dinerName: el.dinerName,
              transactionType: this.transactionTypeArr[el.transactionType],
              money: el.money,
              transactionTime: el.transactionTime,

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
        }
      });
    },
    // 查询
    submitForm () {
      this.getTransactionList();
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.getTransactionList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getTransactionList(val, this.pageSize);
    },
    changeDate () {
      if (!this.formInline.dateVals) {
        this.formInline.dateVals = [];
        console.log(this.formInline.dateVals);
      }
    },
  },
  mounted () {
    this.getSchoolSelect();
    this.getTransactionList();
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