<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="21">
              <el-form-item prop="dateVals">
                <el-date-picker v-model="formInline.dateVals" @change="changeDate" value-format="yyyy-MM-dd" type="daterange" size="small"
                  range-separator="至" start-placeholder="用餐开始日期" end-placeholder="用餐结束日期" align="right">
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="statementBy" style="width:150px;">
                <el-select v-model.trim="formInline.statementBy" placeholder="请选择类型" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in statementByArr" :key="`${_uid}_${index}`"
                    :label="item" :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="schoolId" style="width:150px;">
                <el-select v-if="formInline.statementBy=='diner'" clearable @change="handleSchoolChange" v-model.trim="formInline.schoolId" placeholder="请选择学校" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in schoolData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="formInline.statementBy=='diner'" prop="gradeId" style="width:150px;">
                <el-select clearable @change="handleGradeChange" filterable v-model.trim="formInline.gradeId" placeholder="请选择年级"
                  size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in gradeData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="formInline.statementBy=='diner'" prop="classId" style="width:150px;">
                <el-select clearable filterable v-model.trim="formInline.classId" placeholder="请选择班级"
                  size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in classData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
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
          <el-table-column prop="schoolName" width="200" label='学校名称'>
          </el-table-column>
          <el-table-column v-if="tableType=='diner'" prop="dinerName" label='人员名称'>
          </el-table-column>
          <el-table-column v-if="tableType=='diner'" prop="gradeName" label='年级'>
          </el-table-column>
          <el-table-column v-if="tableType=='diner'" prop="className" label='班级'>
          </el-table-column>
          <el-table-column prop="incomeAmount" label='充值金额'>
          </el-table-column>
          <el-table-column v-if="tableType=='school'" prop="incomeCount" label='充值笔数'>
          </el-table-column>
          <el-table-column prop="refundAmount" label='提现金额'>
          </el-table-column>
          <el-table-column v-if="tableType=='school'" prop="refundCount" label='提现笔数'>
          </el-table-column>
          <el-table-column v-if="tableType=='school'" prop="dinerCount" label='用餐人数'>
          </el-table-column>
          <el-table-column v-if="tableType=='school'" prop="cancelAmount" label='取消订单金额'>
          </el-table-column>
          <el-table-column v-if="tableType=='school'" prop="cancelCount" label='取消订单份数'>
          </el-table-column>
          <el-table-column prop="finishAmount" label='完成订单金额'>
          </el-table-column>
          <el-table-column prop="finishCount" label='完成订单份数'>
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
    const validateRepeatPassword = (rule, value, callback) => {
      if (this.form.repeatPassword != this.form.newPassword) {
        callback(new Error('两次密码不一致'));
      }

      callback();
    }
    return {
      isAdd: false,
      formTitle: "",
      form: {
        id: 0,
        statementBy: 'school',
        money: '',
        repeatPassword: '',
        roleId: "",
        fullName: '',
        mobilePhone: '',
        status: 1,
      },
      formInline: {
        dateVals: [],
        statementBy: 'school',
        schoolId: '',
        gradeId: '',
        classId: '',
      },
      tableType: 'school',
      statementByArr: {
        'school': "按学校", 'diner': "按用餐人员"
      },
      schoolData: [],
      gradeData: [],
      classData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { required: true, pattern: /^[0-9a-z_]+$/, message: '用户名只能包含小写字母、数字和下划线', trigger: ['blur', 'change'] },
          { required: true, min: 6, max: 16, message: '用户名不能小于6或大于16个字符', trigger: ['blur', 'change'] }
        ],
        newPasswordAdd: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { required: true, min: 6, message: '密码不能小于6个字符', trigger: ['blur', 'change'] },
        ],
        newPasswordUpdate: [
          { required: false, min: 6, message: '密码不能小于6个字符', trigger: ['blur', 'change'] },
        ],
        repeatPassword: [
          { required: false, trigger: ['blur', 'change'], validator: validateRepeatPassword }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    getStatementList (pageIndex = 1, pageSize = 15) {
      let datas = {
        dateRange: this.formInline.dateVals == null ? [] : this.formInline.dateVals,
        statementBy: this.formInline.statementBy,
        schoolId: Number(this.formInline.schoolId),
        gradeId: Number(this.formInline.gradeId),
        classId: Number(this.formInline.classId),
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      FinanceModule.getStatementList(datas).then(res => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              schoolName: el.schoolName,
              gradeName: el.gradeName,
              className: el.className,
              dinerName: el.dinerName,
              incomeAmount: el.incomeAmount,
              incomeCount: el.incomeCount,
              refundAmount: el.refundAmount,
              refundCount: el.refundCount,
              dinerCount: el.dinerCount,
              finishAmount: el.finishAmount,
              finishCount: el.finishCount,
              cancelAmount: el.cancelAmount,
              cancelCount: el.cancelCount,

            });
            rowId++;
          });
          total = res.data.total;
        }
        console.log(list);
        this.listData = list;
        this.pageTotal = total;
        this.tableType = this.formInline.statementBy;
      });
    },
    getWithdrawInfo (id) {
      FinanceModule.getWithdrawInfo(id).then(res => {
        if (res.data) {
          let data = res.data;

          let info = {

            id: data.id,
            userName: data.userName,
            roleId: data.roleId,
            fullName: data.fullName,
            mobilePhone: data.mobilePhone,
            createTime: data.createTime,
            status: data.status,

          };

          this.form = info;
        }
      });
    },
    updateWithdrawInfo () {
      let data = {
        id: this.form.id,
        newPassword: this.form.newPassword,
        repeatPassword: this.form.repeatPassword,
        fullName: this.form.fullName,
        mobilePhone: this.form.mobilePhone,
        status: this.form.status,
      };
      FinanceModule.updateWithdrawInfo(data).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getStatementList();
          } else {
            this.$message({
              type: 'error',
              message: '保存失败!'
            });
          }
        }
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
    // 重置
    resetForm () {
      this.formInline.userName = '';
    },
    clearForm () {

      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields();
      }

      this.form = {
        id: 0,
        userName: '',
        newPassword: '',
        repeatPassword: '',
        roleId: "",
        fullName: '',
        mobilePhone: '',
        status: 1,
      };
    },
    // 查询
    submitForm () {
      this.getStatementList();
    },
    goToDetail (id) {
      this.formTitle = "编辑系统用户";
      this.isAdd = false;
      this.dialogVisible = true;
      this.clearForm();
      this.getWithdrawInfo(id);
    },
    // 提交添加用户
    submitAddForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateWithdrawInfo();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消提交
    cancelForm () {
      this.dialogVisible = false;
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.getStatementList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getStatementList(val, this.pageSize);
    },
    handleSchoolChange (value) {
      this.getGradeSelect();
    },
    handleGradeChange (value) {
      this.getClassSelect();
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
    this.getStatementList();
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