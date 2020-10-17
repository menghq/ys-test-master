<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item prop="dateVals">
                <el-date-picker v-model="formInline.dateVals" @change="changeDate" value-format="yyyy-MM-dd" type="daterange" size="small"
                  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="userName" style="width:150px;">
                <el-input size="small" clearable v-model.trim="formInline.dinerName" placeholder="请输入人员姓名">
                </el-input>
              </el-form-item>
              <el-form-item prop="action" style="width:120px;">
                <el-select clearable v-model.trim="formInline.action" placeholder="请选择类型" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in actionArr" :key="`${_uid}_${index}`"
                    :label="item" :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="exportConsume">导出数据</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="createTime" width="200" label='操作时间'>
          </el-table-column>
          <el-table-column prop="dinerName" width="200" label='人员姓名'>
          </el-table-column>
          <el-table-column prop="action" label='类型'>
          </el-table-column>
          <el-table-column prop="money" label='金额'>
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
import { outExportExcel, formatTime } from "@/utils/tool";

export default {
  name: 'userList',
  data () {
    return {
      isAdd: false,
      formInline: {
        dateVals: [],
        schoolId: '',
        action: '',
        dinerName: '',
      },
      actionArr: {
        'CONSUME': '消费',
        'REFUND': '退款'
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
    exportConsume(){
      let datas = {
        dateRange: this.formInline.dateVals == null ? [] : this.formInline.dateVals,
        action: this.formInline.action,
        dinerName: this.formInline.dinerName,
        isPage: 0
      };

      FinanceModule.getWalletLogList(datas).then(res => {
        let list = [];
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({
              rowId: i+1,
              id: el.id,
              outTradeNo: el.outTradeNo,
              dinerName: el.dinerName,
              action: this.actionArr[el.action],
              money: el.money,
              createTime: el.createTime,
            });
          });

          const tableHeader = ['序号', '操作时间', '人员姓名', '类型', '金额']
          const tableKey = ['rowId', 'createTime', 'dinerName', 'action', 'money']
          outExportExcel(
            tableHeader,
            tableKey,
            list,
            '消费记录报表-'+formatTime(new Date())
          )
        }
      }).catch(err=>{
        this.$message({
          type: 'error',
          message: '导出失败!'
        });
      });
    },
    getWalletLogList (pageIndex = 1, pageSize = 15) {
      let datas = {
        dateRange: this.formInline.dateVals == null ? [] : this.formInline.dateVals,
        action: this.formInline.action,
        dinerName: this.formInline.dinerName,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      FinanceModule.getWalletLogList(datas).then(res => {
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
              action: this.actionArr[el.action],
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
    submitForm () {
      this.getWalletLogList();
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.getWalletLogList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getWalletLogList(val, this.pageSize);
    },
    changeDate () {
      if (!this.formInline.dateVals) {
        this.formInline.dateVals = [];
        console.log(this.formInline.dateVals);
      }
    },
  },
  mounted () {
    this.getWalletLogList();
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
