<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item prop="userName" style="width:150px;">
                <el-input size="small" clearable v-model.trim="formInline.userName" placeholder="请输入用户名">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="addUser">添加管理员</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="userName" width="200" label='用户名'>
          </el-table-column>
          <el-table-column prop="mobilePhone" width="200" label='电话'>
          </el-table-column>
          <el-table-column prop="createTime" label='创建时间'>
          </el-table-column>
          <el-table-column prop="status" width="60" label='状态'>
          </el-table-column>

          <el-table-column fixed="right" style="display:none;" align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="goToDetail(scope.row.id)" type="text" size="small">详情</el-button>
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
        <el-dialog :title="formTitle" :visible.sync="dialogVisible" @close="cancelForm" :show-close="true" width="750px">
          <div class="wrapper">
            <div>
              <el-form :model="form" :rules="rules" label-width="100px" ref="ruleForm">
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="用户名：" v-if="isAdd" prop="userName">
                        <el-input size="small" clearable v-model.trim="form.userName" placeholder="请输入用户名" style="width:180px;"></el-input>
                      </el-form-item>
                      <el-form-item label="用户名：" v-else prop="userName">
                        <span>{{form.userName}}</span>
                      </el-form-item>
                      <el-form-item label="新密码：" prop="newPassword" :rules="newPasswordProp">
                        <el-input size="small" clearable type="password" :show-password="true" v-model.trim="form.newPassword"
                          placeholder="请输入新密码" style="width:180px;"></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码：" prop="repeatPassword">
                        <el-input size="small" clearable type="password" :show-password="true" v-model.trim="form.repeatPassword"
                          placeholder="请重复输入新密码" style="width:180px;"></el-input>
                      </el-form-item>
                      <el-form-item label="状态：" :required="true">
                        <el-radio-group v-model="form.status">
                          <el-radio :label="1">正常</el-radio>
                          <el-radio :label="0">停用</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="创建时间：" v-if="isAdd == false" prop="createTime">
                        <span>{{form.createTime}}</span>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="border-left: 1px solid #cccccc;">
                      <el-form-item label="姓名：" prop="fullName">
                        <el-input size="small" clearable v-model.trim="form.fullName" placeholder="请输入姓名" style="width:180px;"></el-input>
                      </el-form-item>
                      <el-form-item label="电话：" prop="mobilePhone">
                        <el-input size="small" clearable v-model.trim="form.mobilePhone" placeholder="请输入电话号码" style="width:180px;">
                        </el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>

            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelForm()" size="mini">取消</el-button>
            <el-button type="primary" @click="submitAddForm('ruleForm')" size="mini">保存</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { OrderModule } from "@/api/common";
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
      dialogVisible: false,
      form: {
        id: 0,
        userName: '',
        newPassword: '',
        repeatPassword: '',
        roleId: "",
        fullName: '',
        mobilePhone: '',
        status: 1,
      },
      formInline: {
        userName: '',
        userCode: '',
        mobilePhone: '',
      },
      statusArr: {
        '1': '正常',
        '0': '停用'
      },
      roleData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      newPasswordProp: null,
      roleIdProp: "roleId",
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
    getAdminList (pageIndex = 1, pageSize = 15) {
      let datas = {
        userName: this.formInline.userName,
        studentNumber: this.formInline.userCode,
        mobilePhone: this.formInline.mobilePhone,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      OrderModule.getAdminList(datas).then(res => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              userName: el.userName,
              roleName: el.roleName,
              fullName: el.fullName,
              mobilePhone: el.mobilePhone,
              createTime: el.createTime,
              status: this.statusArr[el.status],

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
    getAdminInfo (id) {
      OrderModule.getAdminInfo(id).then(res => {
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
    addAdminInfo () {
      let data = {
        userName: this.form.userName,
        newPassword: this.form.newPassword,
        repeatPassword: this.form.repeatPassword,
        roleId: Number(this.form.roleId),
        fullName: this.form.fullName,
        mobilePhone: this.form.mobilePhone,
        status: this.form.status,
      };
      OrderModule.addAdminInfo(data).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getAdminList();
          } else {
            this.$message({
              type: 'error',
              message: '保存失败!'
            });
          }
        }
      });
    },
    updateAdminInfo () {
      let data = {
        id: this.form.id,
        newPassword: this.form.newPassword,
        repeatPassword: this.form.repeatPassword,
        fullName: this.form.fullName,
        mobilePhone: this.form.mobilePhone,
        status: this.form.status,
      };
      OrderModule.updateAdminInfo(data).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getAdminList();
          } else {
            this.$message({
              type: 'error',
              message: '保存失败!'
            });
          }
        }
      });
    },
    deleteAdminInfo (id) {
      OrderModule.deleteAdminInfo(id).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getAdminList();
          }
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
      this.getAdminList();
    },
    // 添加用户
    addUser () {
      this.formTitle = "新增系统用户";
      this.isAdd = true;
      this.dialogVisible = true;
      this.clearForm();
      this.newPasswordProp = this.rules.newPasswordAdd;
      console.log(this.form);
    },
    goToDetail (id) {
      this.formTitle = "编辑系统用户";
      this.isAdd = false;
      this.dialogVisible = true;
      this.clearForm();
      this.newPasswordProp = this.rules.newPasswordUpdate;
      this.getAdminInfo(id);
    },
    // 提交添加用户
    submitAddForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.addAdminInfo();
          } else {
            this.updateAdminInfo();
          }
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
    // 删除用户
    deleteUser (row) {
      this.$confirm(`是否删除用户名为"${row.userName}"的用户?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteAdminInfo(row.id);
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