<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item style="width:180px;" prop="gradeName">
                <el-input size="small" clearable v-model.trim="formInline.gradeName" placeholder="请输入部门名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="addUser">添加部门</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="gradeName" label='部门名称'>
          </el-table-column>
          <el-table-column prop="createTime" label='创建时间'>
          </el-table-column>

          <el-table-column fixed="right" align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" style="margin-top: 15px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30, 45, 60]" :page-size="100"
          layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
      <div class="dialogBox">
        <el-dialog :title="isAdd ? '添加部门' : '编辑部门'" :visible.sync="dialogVisible" :show-close="true" width="750px">
          <div class="wrapper">
            <el-form :model="form" :rules="rules" label-width="120px" ref="ruleForm">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="部门名称：" prop="gradeName">
                    <el-input size="small" clearable v-model.trim="form.gradeName" placeholder="请输入部门名称" style="width:180px;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
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
import { PublicModule, SchoolModule } from "@/api/common";
export default {
  name: 'userList',
  data () {
    return {
      isAdd: false,
      dialogVisible: false,
      form: {
        id: '',
        gradeName: '',
      },
      formInline: {
        gradeName: '',
      },
      schoolData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      rules: {
        gradeName: [
          { required: true, message: '请输入部门名称', trigger: ['blur', 'change'] },
        ],
      }
    }
  },
  methods: {
    getGradeList (pageIndex = 1, pageSize = 15) {
      let datas = {
        gradeName: this.formInline.gradeName,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      SchoolModule.getGradeList(datas).then(res => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              gradeName: el.gradeName,
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
    addGradeInfo () {
      let datas = {
        gradeName: this.form.gradeName,
      };
      SchoolModule.addGradeInfo(datas).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getGradeList();
          } else {
            this.$message({
              type: 'error',
              message: '保存失败!'
            });
          }
        }
      });
    },
    deleteGradeInfo (id) {
      SchoolModule.deleteGradeInfo(id).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getGradeList();
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
      this.getGradeList();
    },
    // 添加用户
    addUser () {
      this.isAdd = true;
      this.form.gradeName = '';
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
          this.addGradeInfo();
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
      this.$confirm(`是否删除部门?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteGradeInfo(row.id);
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
      this.getGradeList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getGradeList(val, this.pageSize);
    },
  },
  mounted () {
    this.getGradeList();
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