<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item prop="dinerName" style="width:150px;">
                <el-input size="small" clearable v-model.trim="formInline.dinerName" placeholder="请输入用户名">
                </el-input>
              </el-form-item>
              <el-form-item prop="state" style="width:150px;">
                <el-select clearable v-model.trim="formInline.state" placeholder="请选择类型" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in stateArr" :key="`${_uid}_${index}`"
                    :label="item" :value="index">
                  </el-option>
                </el-select>
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
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="dinerName" width="200" label='人员'>
          </el-table-column>
          <el-table-column prop="money" width="200" label='金额'>
          </el-table-column>
          <el-table-column prop="state" width="100" label='状态'>
          </el-table-column>
          <el-table-column prop="createTime" label='创建时间'>
          </el-table-column>
          <el-table-column prop="reviewTime" label='审核时间'>
          </el-table-column>

          <el-table-column fixed="right" style="display:none;" align="center" label="操作" width="100">
            <template slot-scope="scope" v-if="scope.row.op=='PENDING'">
              <el-button @click="acceptWithdraw(scope.row.id)" type="text" size="small">同意</el-button>
              <el-button @click="rejectWithdraw(scope.row.id)" type="text" size="small">驳回</el-button>
            </template>
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
import { FinanceModule } from "@/api/common";
export default {
  name: 'userList',
  data () {
    const validateRepeatPassword = (rule, value, callback) => {
      if (this.form.repeatPassword != this.form.newPassword) {
        callback(new Error('两次密码不一致'));
      }

      callback();
    }
    return {
      formInline: {
        dinerName: '',
        state: '',
      },
      stateArr: {
        'PENDING': "等待审批", 'ACCEPTED': "同意申请", 'REFUNDING': "提现处理中", 'REJECTED': "驳回申请", 'FINISH': "完成提现"
      },
      roleData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
    }
  },
  methods: {
    getAdminList (pageIndex = 1, pageSize = 15) {
      let datas = {
        dinerName: this.formInline.dinerName,
        state: this.formInline.state,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      FinanceModule.getWithdrawList(datas).then(res => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              dinerName: el.dinerName,
              money: el.money,
              state: this.stateArr[el.state],
              op: el.state,
              createTime: el.createTime,
              reviewer: el.reviewer,
              reviewTime: el.reviewTime,

            });
            rowId++;
          });
          total = res.data.total;
        }
        console.log(list);
        this.listData = list;
        this.pageTotal = total;
      });
    },
    acceptWithdraw (id) {
      this.$confirm(`是否同意申请?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateWithdrawInfo(id, 'ACCEPTED');
        // 成功后回掉
      }).catch(() => {
        // this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        // });          
      });
    },
    rejectWithdraw (id) {
      this.$confirm(`是否驳回申请?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateWithdrawInfo(id, 'REJECTED');
        // 成功后回掉
      }).catch(() => {
        // this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        // });          
      });
    },
    updateWithdrawInfo (id, state) {
      let data = {
        withdrawId: id,
        state: state,
      };
      FinanceModule.updateWithdrawInfo(data).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.dialogVisible = false;
            this.getAdminList();
          } else if (res.data.err == 1) {
            this.$message({
              type: 'error',
              message: '保存失败!'
            });
          } else {
            this.$message({
              type: 'error',
              message: res.data.data.msg
            });
          }
        }
      });
    },
    // 重置
    resetForm () {
      this.formInline.userName = '';
    },
    // 查询
    submitForm () {
      this.getAdminList();
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.getAdminList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getAdminList(val, this.pageSize);
    },
  },
  mounted () {
    this.getAdminList();
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
</style>