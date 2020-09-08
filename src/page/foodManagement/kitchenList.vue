<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item prop="kitchenName" style="width:150px;">
                <el-input size="small" clearable v-model.trim="formInline.kitchenName" placeholder="请输入供应商名称">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="addUser">添加供应商</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="kitchenName" width="200" label='供应商名称'>
          </el-table-column>
          <el-table-column prop="createTime" label='创建时间'>
          </el-table-column>
          <el-table-column prop="status" width="60" label='状态'>
          </el-table-column>

          <el-table-column fixed="right" align="center" label="操作" width="220">
            <template slot-scope="scope">
              <el-button @click="goToDetail(scope.row.id)" type="text" size="small">编辑</el-button>
              <el-button @click="goToSchool(scope.row.id)" type="text" size="small">分配</el-button>
              <el-button style="display:none" @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
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
              <el-form :model="form" :rules="rules" label-width="200px" ref="ruleForm">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      <el-form-item label="供应商名称：" prop="kitchenName">
                        <el-input size="small" clearable v-model.trim="form.kitchenName" placeholder="请输入供应商名称" style="width:180px;">
                        </el-input>
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
      <div class="choseSchoolBox">
        <el-dialog title="分配" :visible.sync="choseSchoolVisible" @close="closeChoseSchool" :show-close="true" width="750px">
          <div class="wrapper">
            <el-row>
              <div class="tableCom" style="margin-top: 15px;">
                <div class="food-list">
                  <el-checkbox-group v-model="school.select">
                    <el-checkbox-button class="chose-item" v-for="(item, index) in school.list" :label="item.id" :key="index">
                      <div>{{item.schoolName}}</div>
                    </el-checkbox-button>
                  </el-checkbox-group>
                </div>
              </div>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeChoseSchool()" size="mini">取消</el-button>
            <el-button type="primary" @click="updateSchoolInfo()" size="mini">保存</el-button>
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
    return {
      isAdd: false,
      formTitle: "",
      dialogVisible: false,
      choseSchoolVisible: false,
      form: {
        id: 0,
        kitchenName: '',
        status: 1,
      },
      formInline: {
        kitchenName: '',
      },
      statusArr: {
        '1': '正常',
        '0': '停用'
      },
      school: {
        kitchenId: 0,
        list: [],
        select: []
      },
      roleData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      rules: {
        kitchenName: [
          { required: true, message: '请输入供应商名称', trigger: ['blur', 'change'] },
          { required: true, min: 2, max: 16, message: '供应商名称不能小于2或大于16个字符', trigger: ['blur', 'change'] }
        ],
      }
    }
  },
  methods: {
    getAdminList (pageIndex = 1, pageSize = 15) {
      let datas = {
        kitchenName: this.formInline.kitchenName,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      OrderModule.getKitchenList(datas).then(res => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              kitchenName: el.kitchenName,
              status: this.statusArr[el.status],
              createTime: el.createTime,

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
    getKitchenInfo (id) {
      OrderModule.getKitchenInfo(id).then(res => {
        if (res.data) {
          let data = res.data;

          let info = {
            id: data.id,
            kitchenName: data.kitchenName,
            status: data.status,
            createTime: data.createTime,
          };

          this.form = info;
        }
      });
    },
    addKitchenInfo () {
      let data = {
        kitchenName: this.form.kitchenName,
        status: this.form.status,
      };
      OrderModule.addKitchenInfo(data).then(res => {
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
    updateKitchenInfo () {
      let data = {
        id: this.form.id,
        kitchenName: this.form.kitchenName,
        status: this.form.status,
      };
      OrderModule.updateKitchenInfo(data).then(res => {
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
    updateSchoolInfo () {
      let data = {
        kitchenId: this.school.kitchenId,
        schoolId: this.school.select,
      };
      OrderModule.updateKitchenSchoolInfo(data).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.choseSchoolVisible = false;
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
    goToSchool (id) {
      this.choseSchoolVisible = true;
      this.school = {
        kitchenId: 0,
        list: [],
        select: []
      };
      this.getKitchenSchoolInfo(id);
    },
    getKitchenSchoolInfo (id) {
      OrderModule.getKitchenSchoolInfo(id).then(res => {
        let list = [];
        let select = [];
        if (res.data) {

          res.data.list.forEach((el, i) => {
            list.push({
              rowId: i,
              id: el.id,
              schoolName: el.schoolName,
            });
          });

          res.data.select.forEach((el, i) => {
            select.push(el.id);
          });

          this.school.kitchenId = id;
          this.school.list = list;
          this.school.select = select;
        }
      });
    },
    closeChoseSchool () {
      this.choseSchoolVisible = false;
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
        kitchenName: '',
        status: 1,
      };
    },
    // 查询
    submitForm () {
      this.getAdminList();
    },
    // 添加用户
    addUser () {
      this.formTitle = "新增供应商";
      this.isAdd = true;
      this.dialogVisible = true;
      this.clearForm();
      console.log(this.form);
    },
    goToDetail (id) {
      this.formTitle = "编辑供应商";
      this.isAdd = false;
      this.dialogVisible = true;
      this.clearForm();
      this.getKitchenInfo(id);
    },
    // 提交添加用户
    submitAddForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.addKitchenInfo();
          } else {
            this.updateKitchenInfo();
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
      this.$confirm(`是否删除名称为"${row.kitchenName}"的供应商?`, '提示', {
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

.chose-item {
  width: 25%;
  margin-bottom: 20px;
}
</style>