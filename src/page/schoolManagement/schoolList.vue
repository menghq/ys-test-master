<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="20">
              <el-form-item style="width:240px;" prop="schoolName">
                <el-input size="small" clearable v-model.trim="formInline.schoolName" placeholder="请输入学校名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="addUser">添加学校</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="schoolName" label='学校名称'>
          </el-table-column>
          <el-table-column prop="contact" label='联系人'>
          </el-table-column>
          <el-table-column prop="kitchenName" label='所属供应商'>
          </el-table-column>
          <el-table-column prop="createTime" label='创建时间'>
          </el-table-column>

          <el-table-column fixed="right" align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="getUser(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" style="margin-top: 15px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30, 45, 60]" :page-size="100"
          layout="total, sizes, prev, pager, next, jumper" :total=pageTotal>
        </el-pagination>
      </div>
      <div class="dialogBox">
        <el-dialog :title="isAdd ? '添加学校' : '编辑学校'" :visible.sync="dialogVisible" :show-close="true" width="1100px">
          <div class="wrapper">
            <el-form :model="form" :rules="rules" label-width="120px" ref="ruleForm">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="学校名称：" prop="schoolName">
                    <el-input size="small" clearable v-model.trim="form.schoolName" placeholder="请输入学校名称" style="width:180px;"></el-input>
                  </el-form-item>
                  <el-form-item label="简称：" prop="shortName">
                    <el-input size="small" clearable v-model.trim="form.shortName" placeholder="请输入学校简称" style="width:180px;"></el-input>
                  </el-form-item>
                  <el-form-item label="联系人：" prop="contact">
                    <el-input size="small" clearable v-model.trim="form.contact" placeholder="请输入联系人" style="width:180px;"></el-input>
                  </el-form-item>
                  <el-form-item label="联系人电话：" prop="phone">
                    <el-input size="small" clearable v-model.trim="form.phone" placeholder="请输入联系人电话" style="width:180px;"></el-input>
                  </el-form-item>
                  <el-form-item label="学校电话：" prop="tel">
                    <el-input size="small" clearable v-model.trim="form.tel" placeholder="请输入学校电话" style="width:180px;"></el-input>
                  </el-form-item>
                  <el-form-item label="学校地址：" prop="addressDetail">
                    <el-input size="small" type="textarea" :rows="4" clearable v-model.trim="form.addressDetail" placeholder="请输入学校地址"
                      style="width:300px;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="缴费周期：" prop="paymentCycle">
                    <el-select v-model="formConfig.paymentCycle" size="small" placeholder="请选择缴费周期">
                      <el-option v-for="(item, index) in paymentCycle" :key="index" :label="item" :value="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="固定充值金额：" prop="fixedRechargeMoney">
                    <el-input size="small" clearable v-model.trim="formConfig.fixedRechargeMoney" placeholder="请输入固定充值金额"
                      style="width:180px;"></el-input>
                  </el-form-item>
                  <el-form-item label="临时充值最小金额：" prop="tempRechargeMoney">
                    <el-input size="small" clearable v-model.trim="formConfig.tempRechargeMoney" placeholder="请输入临时充值最小金额"
                      style="width:180px;"></el-input>
                  </el-form-item>
                  <el-form-item label="供餐开始日期：" prop="orderStartDate">
                    <el-date-picker v-model="formConfig.orderStartDate" value-format="yyyy-MM-dd" size="small" type="date"
                      placeholder="选择供餐开始日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="供餐结束日期：" prop="orderEndDate">
                    <el-date-picker v-model="formConfig.orderEndDate" value-format="yyyy-MM-dd" size="small" type="date"
                      placeholder="选择供餐结束日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="开放早餐：" prop="openBreakfast">
                    <el-switch v-model="formConfig.openBreakfast" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                    <el-time-picker size="small" v-model="formConfig.breakfastTime" value-format="HH:mm:ss" style="width:140px;"
                      :picker-options="{
      selectableRange: '05:00:00 - 09:00:00'
    }" placeholder="用餐时间">
                    </el-time-picker>
                    <el-input size="small" clearable v-model.trim="formConfig.stopOrderBreakfastOffset" placeholder="停止预定分钟"
                      style="width:140px;"></el-input>
                  </el-form-item>
                  <el-form-item label="开放午餐：" prop="openLunch">
                    <el-switch v-model="formConfig.openLunch" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                    <el-time-picker size="small" v-model="formConfig.lunchTime" value-format="HH:mm:ss" style="width:140px;"
                      :picker-options="{
      selectableRange: '10:00:00 - 14:00:00'
    }" placeholder="用餐时间">
                    </el-time-picker>
                    <el-input size="small" clearable v-model.trim="formConfig.stopOrderLunchOffset" placeholder="停止预定分钟"
                      style="width:140px;"></el-input>
                  </el-form-item>
                  <el-form-item label="开放晚餐：" prop="openDinner">
                    <el-switch v-model="formConfig.openDinner" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                    <el-time-picker size="small" v-model="formConfig.dinnerTime" value-format="HH:mm:ss" style="width:140px;"
                      :picker-options="{
      selectableRange: '16:00:00 - 20:00:00'
    }" placeholder="用餐时间">
                    </el-time-picker>
                    <el-input size="small" clearable v-model.trim="formConfig.stopOrderDinnerOffset" placeholder="停止预定分钟"
                      style="width:140px;"></el-input>
                  </el-form-item>
                  <el-form-item label="订餐模式：" prop="orderMode">
                    <el-select v-model="formConfig.orderMode" size="small" placeholder="请选择订餐模式">
                      <el-option v-for="(item, index) in orderModeArr" :key="index" :label="item" :value="index">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>

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
import { SchoolModule } from "@/api/common";
export default {
  name: 'userList',
  data () {
    return {
      isAdd: false,
      dialogVisible: false,
      form: {
        id: '',
        schoolName: '',
        shortName: '',
        contact: '',
        phone: '',
        tel: '',
        addressDetail: '',
      },
      formConfig: {
        id: '',
        schoolId: '',
        paymentCycle: 'termly',
        fixedRechargeMoney: '0.00',
        tempRechargeMoney: '0.00',
        orderStartDate: '',
        orderEndDate: '',
        openBreakfast: true,
        openLunch: true,
        openDinner: true,
        breakfastTime: '',
        lunchTime: '',
        dinnerTime: '',
        stopOrderBreakfastOffset: '',
        stopOrderLunchOffset: '',
        stopOrderDinnerOffset: '',
        orderMode: 'WEEKLY',
      },
      formInline: {
        schoolName: '',
      },
      paymentCycle: { 'monthly': '按月', 'termly': '按学期' },
      orderModeArr: { 'DAILY': '每日', 'WEEKLY': '每周' },
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      rules: {
        schoolName: [
          { required: true, message: '请输入学校名称', trigger: ['blur', 'change'] },
        ],
      }
    }
  },
  methods: {
    getSchoolList (pageIndex = 1, pageSize = 15) {
      let datas = {
        schoolName: this.formInline.schoolName,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      SchoolModule.getSchoolList(datas).then(res => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              schoolName: el.schoolName,
              contact: el.contact,
              gradeCount: el.gradeCount,
              classCount: el.classCount,
              dinerCount: el.dinerCount,
              kitchenName: el.kitchenName,
              createTime: el.createTime,

            });
            rowId++;
          });
          total = res.data.total;
        }
        this.listData = list;
        this.pageTotal = total;
      });
    },
    getSchoolInfo (id) {
      SchoolModule.getSchoolInfo(id).then(res => {
        if (res.data) {
          let data = res.data;
          this.form.id = data.id;
          this.form.schoolName = data.schoolName;
          this.form.shortName = data.shortName;
          this.form.contact = data.contact;
          this.form.phone = data.phone;
          this.form.tel = data.tel;
          this.form.addressDetail = data.addressDetail;
        }
      });
    },
    getSchoolConfigInfo (id) {
      SchoolModule.getSchoolConfigInfo(id).then(res => {
        if (res.data) {
          let data = res.data;
          this.formConfig = {
            id: data.id,
            schoolId: data.schoolId,
            paymentCycle: data.paymentCycle,
            fixedRechargeMoney: data.fixedRechargeMoney,
            tempRechargeMoney: data.tempRechargeMoney,
            orderStartDate: data.orderStartDate,
            orderEndDate: data.orderEndDate,
            openBreakfast: data.openBreakfast == 1 ? true : false,
            openLunch: data.openLunch == 1 ? true : false,
            openDinner: data.openDinner == 1 ? true : false,
            breakfastTime: data.breakfastTime,
            lunchTime: data.lunchTime,
            dinnerTime: data.dinnerTime,
            stopOrderBreakfastOffset: data.stopOrderBreakfastOffset,
            stopOrderLunchOffset: data.stopOrderLunchOffset,
            stopOrderDinnerOffset: data.stopOrderDinnerOffset,
            orderMode: data.orderMode,
          };
        }
      });
    },
    addSchoolInfo () {
      let datas = {
        schoolName: this.form.schoolName,
        shortName: this.form.shortName,
        contact: this.form.contact,
        phone: this.form.phone,
        tel: this.form.contact,
        addressDetail: this.form.addressDetail,

        paymentCycle: this.formConfig.paymentCycle,
        fixedRechargeMoney: this.formConfig.fixedRechargeMoney,
        tempRechargeMoney: this.formConfig.tempRechargeMoney,
        orderStartDate: this.formConfig.orderStartDate,
        orderEndDate: this.formConfig.orderEndDate,
        openBreakfast: Number(this.formConfig.openBreakfast),
        openLunch: Number(this.formConfig.openLunch),
        openDinner: Number(this.formConfig.openDinner),
        breakfastTime: this.formConfig.breakfastTime,
        lunchTime: this.formConfig.lunchTime,
        dinnerTime: this.formConfig.dinnerTime,
        stopOrderBreakfastOffset: Number(this.formConfig.stopOrderBreakfastOffset),
        stopOrderLunchOffset: Number(this.formConfig.stopOrderLunchOffset),
        stopOrderDinnerOffset: Number(this.formConfig.stopOrderDinnerOffset),
        orderMode: this.formConfig.orderMode,
      };
      SchoolModule.addSchoolInfo(datas).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getSchoolList();
          } else if (res.data.err == 1) {
            this.$message({
              type: 'error',
              message: '请选择班级!'
            });
          } else if (res.data.err == 2) {
            this.$message({
              type: 'error',
              message: '请选择菜单!'
            });
          }
        }
      });
    },
    updateSchoolInfo () {
      let datas = {
        id: this.form.id,
        schoolName: this.form.schoolName,
        shortName: this.form.shortName,
        contact: this.form.contact,
        phone: this.form.phone,
        tel: this.form.contact,
        addressDetail: this.form.addressDetail,

        schoolId: Number(this.formConfig.schoolId),
        paymentCycle: this.formConfig.paymentCycle,
        fixedRechargeMoney: this.formConfig.fixedRechargeMoney,
        tempRechargeMoney: this.formConfig.tempRechargeMoney,
        orderStartDate: this.formConfig.orderStartDate,
        orderEndDate: this.formConfig.orderEndDate,
        openBreakfast: Number(this.formConfig.openBreakfast),
        openLunch: Number(this.formConfig.openLunch),
        openDinner: Number(this.formConfig.openDinner),
        breakfastTime: this.formConfig.breakfastTime,
        lunchTime: this.formConfig.lunchTime,
        dinnerTime: this.formConfig.dinnerTime,
        stopOrderBreakfastOffset: Number(this.formConfig.stopOrderBreakfastOffset),
        stopOrderLunchOffset: Number(this.formConfig.stopOrderLunchOffset),
        stopOrderDinnerOffset: Number(this.formConfig.stopOrderDinnerOffset),
        orderMode: this.formConfig.orderMode,
      };
      SchoolModule.updateSchoolInfo(datas).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getSchoolList();
          } else if (res.data.err == 1) {
            this.$message({
              type: 'error',
              message: '请选择班级!'
            });
          } else if (res.data.err == 2) {
            this.$message({
              type: 'error',
              message: '请选择菜单!'
            });
          }
        }
      });
    },
    deleteSchoolInfo (id) {
      SchoolModule.deleteSchoolInfo(id).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getSchoolList();
          }
        }
      });
    },
    // 重置
    resetForm () {
      this.formInline.userName = '';
      this.formInline.schoolAreaId = '';
      this.formInline.studentType = '';
    },
    // 查询
    submitForm () {
      this.getSchoolList();
    },
    getUser (row) {
      this.isAdd = false;
      this.form.id = '';
      this.form.schoolName = '';
      this.form.contact = '';
      this.dialogVisible = true;

      this.getSchoolInfo(row.id);
      this.getSchoolConfigInfo(row.id);

      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields();
      }
    },
    // 添加用户
    addUser () {
      this.isAdd = true;

      this.form = {
        id: '',
        schoolName: '',
        shortName: '',
        contact: '',
        phone: '',
        tel: '',
        addressDetail: '',
      };
      this.formConfig = {
        id: '',
        schoolId: '',
        paymentCycle: 'termly',
        fixedRechargeMoney: '0.00',
        tempRechargeMoney: '0.00',
        orderStartDate: '',
        orderEndDate: '',
        openBreakfast: true,
        openLunch: true,
        openDinner: true,
        breakfastTime: '',
        lunchTime: '',
        dinnerTime: '',
        stopOrderBreakfastOffset: '',
        stopOrderLunchOffset: '',
        stopOrderDinnerOffset: '',
        orderMode: 'WEEKLY',
      };

      this.dialogVisible = true;

      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields();
      }
    },
    // 提交添加用户
    submitAddForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.addSchoolInfo();
          } else {
            this.updateSchoolInfo();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消提交
    cancelForm (formName) {
      this.dialogVisible = false;
    },
    // 删除用户
    deleteUser (row) {
      this.$confirm(`是否删除id为:${row.id}的用户?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteSchoolInfo(row.id);
        // 成功后回掉
      }).catch(() => {
        // this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        // });          
      });
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.getSchoolList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getSchoolList(val, this.pageSize);
    },
  },
  mounted () {
    this.getSchoolList();
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
.dialogBox /deep/ .el-form-item {
  margin-bottom: 12px;
}

.dialogBox /deep/ .el-form-item .el-form-item__label {
  font-size: 12px;
}
.dialogBox /deep/ .el-form-item .el-radio__label {
  font-size: 12px;
}
</style>