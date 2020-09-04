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
                <el-button size="small" icon="el-icon-plus" type="default" @click="addUser">添加后厨</el-button>
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
          <el-table-column prop="roleId" width="200" label='权限'>
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
              <el-button @click="deleteKitchenUser(scope.row)" type="text" size="small">删除</el-button>
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
                      <el-form-item label="用户名：" v-if="isAdd == true" prop="userName">
                        <el-input size="small" clearable v-model.trim="form.userName" placeholder="请输入用户名" style="width:180px;"></el-input>
                      </el-form-item>
                      <el-form-item v-else label="用户名：">
                        {{form.userName}}
                      </el-form-item>
                      <el-form-item label="新密码：" prop="newPassword" :rules="newPasswordProp">
                        <el-input size="small" clearable type="password" :show-password="true" v-model.trim="form.newPassword"
                          placeholder="请输入新密码" style="width:180px;"></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码：" prop="repeatPassword">
                        <el-input size="small" clearable type="password" :show-password="true" v-model.trim="form.repeatPassword"
                          placeholder="请重复输入新密码" style="width:180px;"></el-input>
                      </el-form-item>
                      <el-form-item label="权限：" :required="true">
                        <el-radio-group v-model="form.roleId">
                          <el-radio :label="0">主账号</el-radio>
                          <el-radio :label="1">子账号</el-radio>
                        </el-radio-group>
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
import { PublicModule, OrderModule } from "@/api/common";
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
        roleId: 0,
        fullName: '',
        mobilePhone: '',
        status: 1,
        kitchenData: [],
      },
      formInline: {
        userName: '',
      },
      statusArr: {
        '1': '正常',
        '0': '停用'
      },
      roleArr: {
        '1': '子账号',
        '0': '主账号'
      },
      roleData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      newPasswordProp: null,
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
          { required: true, message: '请选择权限', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    getKitchenUserList (pageIndex = 1, pageSize = 15) {
      let datas = {
        userName: this.formInline.userName,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      OrderModule.getKitchenUserList(datas).then(res => {
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
              roleId: this.roleArr[el.roleId],
              status: this.statusArr[el.status],

            });
            rowId++;
          });
          total = res.data.total;
        }
        this.listData = list;
        this.pageTotal = total;
      });
    },
    getKitchenUserInfo (id) {
      OrderModule.getKitchenUserInfo(id).then(res => {
        if (res.data) {
          let data = res.data;

          let info = {

            id: data.id,
            userName: data.userName,
            roleId: data.roleId,
            fullName: data.fullName,
            mobilePhone: data.mobilePhone,
            createTime: data.createTime,
            roleId: data.roleId,
            status: data.status,
            kitchenData: [],
          };

          this.form = info;
        }
      });
    },
    addKitchenUserInfo () {
      let data = {
        userName: this.form.userName,
        newPassword: this.form.newPassword,
        repeatPassword: this.form.repeatPassword,
        roleId: Number(this.form.roleId),
        fullName: this.form.fullName,
        mobilePhone: this.form.mobilePhone,
        roleId: this.form.roleId,
        status: this.form.status,
      };
      OrderModule.addKitchenUserInfo(data).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getKitchenUserList();
          } else {
            this.$message({
              type: 'error',
              message: '保存失败!'
            });
          }
        }
      });
    },
    updateKitchenUserInfo () {
      let data = {
        id: this.form.id,
        newPassword: this.form.newPassword,
        repeatPassword: this.form.repeatPassword,
        roleId: Number(this.form.roleId),
        fullName: this.form.fullName,
        mobilePhone: this.form.mobilePhone,
        status: this.form.status,
      };
      OrderModule.updateKitchenUserInfo(data).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getKitchenUserList();
          } else {
            this.$message({
              type: 'error',
              message: '保存失败!'
            });
          }
        }
      });
    },
    deleteKitchenUserInfo (id) {
      OrderModule.deleteKitchenUserInfo(id).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getKitchenUserList();
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
        roleId: 0,
        fullName: '',
        mobilePhone: '',
        status: 1,
        kitchenData: [],
      };
    },
    // 查询
    submitForm () {
      this.getKitchenUserList();
    },
    // 添加用户
    addUser () {
      this.formTitle = "新增后厨用户";
      this.isAdd = true;
      this.dialogVisible = true;
      this.clearForm();
      this.newPasswordProp = this.rules.newPasswordAdd;
    },
    goToDetail (id) {
      this.formTitle = "编辑后厨用户";
      this.isAdd = false;
      this.dialogVisible = true;
      this.clearForm();
      this.newPasswordProp = this.rules.newPasswordUpdate;
      this.getKitchenUserInfo(id);
    },
    // 提交添加用户
    submitAddForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.addKitchenUserInfo();
          } else {
            this.updateKitchenUserInfo();
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
    deleteKitchenUser (row) {
      this.$confirm(`是否删除后厨用户?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteKitchenUserInfo(row.id);
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
      this.getKitchenUserList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getKitchenUserList(val, this.pageSize);
    },
  },
  mounted () {
    this.getKitchenUserList();
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