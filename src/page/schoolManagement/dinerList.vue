<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item style="width:150px;" prop="gradeId">
                <el-select clearable v-model.trim="formInline.gradeId" placeholder="请选择部门" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in gradeData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width:120px;" prop="dinerName">
                <el-input size="small" clearable v-model.trim="formInline.dinerName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item style="width:150px;" prop="mobilePhone">
                <el-input type="number" size="small" clearable v-model.trim="formInline.mobilePhone" placeholder="请输入电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="addUser">添加人员</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="dinerName" label='姓名'>
          </el-table-column>
          <el-table-column prop="gradeName" label='部门'>
          </el-table-column>
          <el-table-column prop="money" label='余额'>
          </el-table-column>
          <el-table-column prop="status" label='状态'>
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
        <el-dialog :title="isAdd ? '添加人员' : '编辑人员'" :visible.sync="dialogVisible" :show-close="true" width="750px">
          <div class="wrapper">
            <el-form :model="form" :rules="rules" label-width="120px" ref="ruleForm">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="部门：" prop="classId">
                    <el-select v-model.trim="form.gradeId" placeholder="请选择部门" style="width:150px;" size="small">
                      <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in form.gradeData" :key="`${_uid}_${index}`"
                        :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="姓名：" prop="dinerName">
                    <el-input size="small" clearable v-model.trim="form.dinerName" placeholder="请输入姓名" style="width:180px;"></el-input>
                  </el-form-item>
                  <el-form-item label="电话：" prop="mobilePhone">
                    <el-input size="small" clearable v-model.trim="form.mobilePhone" placeholder="请输入电话号码" style="width:180px;"></el-input>
                  </el-form-item>
                  <el-form-item label="状态：" prop="status">
                    <el-select v-model.trim="form.status" placeholder="请选择状态" style="width:150px;" size="small">
                      <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in statusArr" :key="`${_uid}_${index}`"
                        :label="item" :value="index">
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
import { PublicModule, SchoolModule, OrderModule } from "@/api/common";
export default {
  name: 'userList',
  data () {
    return {
      isAdd: false,
      dialogVisible: false,
      importDialogVisible: false,
      form: {
        id: '',
        schoolId: '',
        gradeId: '',
        classId: '',
        dinerName: '',
        mobilePhone: '',
        status: '0',
        schoolData: [],
        gradeData: [],
        classData: [],
      },
      formImport: {
        previewName: "",
        file: ""
      },
      formInline: {
        schoolId: '',
        gradeId: '',
        classId: '',
        dinerName: '',
        mobilePhone: '',
      },
      statusArr: {
        '0': '正常',
        '1': '停餐',
      },
      schoolData: [],
      gradeData: [],
      classData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
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
    getDinerList (pageIndex = 1, pageSize = 15) {
      let datas = {
        gradeId: Number(this.formInline.gradeId),
        dinerName: this.formInline.dinerName,
        mobilePhone: this.formInline.mobilePhone,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      SchoolModule.getDinerList(datas).then(res => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              dinerName: el.dinerName,
              gradeName: el.gradeName,
              money: el.money,
              status: this.statusArr[el.status],
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
    getGradeSelect () {
      this.classData = [];
      let datas = {
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
          this.gradeData = list;
        }
      });
    },
    getFormGradeSelect () {
      this.form.classData = [];
      let datas = {
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
    getDinerInfo (id) {
      SchoolModule.getDinerInfo(id).then(res => {
        if (res.data) {
          let data = res.data;
          this.form.id = data.id;
          this.form.gradeId = data.gradeId;
          this.form.gradeName = data.gradeName;
          this.form.dinerName = data.dinerName;
          this.form.mobilePhone = data.mobilePhone;
          this.form.status = data.status + "";

          this.getFormGradeSelect();
        }
      });
    },
    addDinerInfo () {
      let datas = {
        gradeId: Number(this.form.gradeId),
        dinerName: this.form.dinerName,
        mobilePhone: this.form.mobilePhone,
        status: this.form.status,
      };
      SchoolModule.addDinerInfo(datas).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getDinerList();
          } else {
            this.$message({
              type: 'error',
              message: '保存失败!'
            });
          }
        }
      });
    },
    updateDinerInfo () {
      let datas = {
        id: this.form.id,
        gradeId: Number(this.form.gradeId),
        dinerName: this.form.dinerName,
        mobilePhone: this.form.mobilePhone,
        status: this.form.status,
      };
      SchoolModule.updateDinerInfo(datas).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getDinerList();
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
    deleteDinerInfo (id) {
      SchoolModule.deleteDinerInfo(id).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getDinerList();
          }
        }
      });
    },
    // 查询
    submitForm () {
      this.getDinerList();
    },
    getUser (row) {
      this.isAdd = false;
      this.form.id = '';
      this.form.gradeId = '';
      this.form.dinerName = '';
      this.form.mobilePhone = '';
      this.form.status = '';
      this.dialogVisible = true;

      this.getDinerInfo(row.id);

      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields();
      }
    },
    // 添加用户
    addUser () {
      this.isAdd = true;
      this.form.id = '';
      this.form.gradeId = '';
      this.form.dinerName = '';
      this.form.mobilePhone = '';
      this.dialogVisible = true;
      this.getFormGradeSelect();

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
            this.addDinerInfo();
          } else {
            this.updateDinerInfo();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitImportForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.importDiner();
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
      this.$confirm(`是否删除人员?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteDinerInfo(row.id);
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
      this.getDinerList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getDinerList(val, this.pageSize);
    },
  },
  mounted () {
    this.getGradeSelect();
    this.getDinerList();
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