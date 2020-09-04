<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item style="width:150px;" prop="schoolId">
                <el-select clearable v-model.trim="formInline.schoolId" placeholder="请选择学校" @change="getGradeSelect" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in schoolData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width:150px;" prop="gradeId">
                <el-select clearable v-model.trim="formInline.gradeId" placeholder="请选择年级" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in gradeData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width:150px;" prop="className">
                <el-input size="small" clearable v-model.trim="formInline.className" placeholder="请输入班级名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="addUser">添加班级</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="className" label='班级名称'>
          </el-table-column>
          <el-table-column prop="schoolName" label='学校'>
          </el-table-column>
          <el-table-column prop="gradeName" label='年级'>
          </el-table-column>
          <el-table-column prop="createTime" label='创建时间'>
          </el-table-column>

          <el-table-column fixed="right" style="display:none;" align="center" label="操作" width="100">
            <template slot-scope="scope">
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
        <el-dialog title="添加班级" :visible.sync="dialogVisible" :show-close="false" width="750px">
          <div class="wrapper">
            <div>
              <el-form :model="form" :rules="rules" label-width="120px" ref="ruleForm">
                <el-form-item label="学校：" prop="schoolId">
                  <el-select clearable v-model.trim="form.schoolId" placeholder="请选择学校" @change="getFormGradeSelect" style="width:150px;" size="small">
                    <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in form.schoolData" :key="`${_uid}_${index}`"
                      :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                  <el-select clearable v-model.trim="form.gradeId" placeholder="请选择年级" style="width:150px;" size="small">
                    <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in form.gradeData" :key="`${_uid}_${index}`"
                      :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="班级名称：" prop="className">
                  <el-input size="small" clearable v-model.trim="form.className" placeholder="请输入班级名称" style="width:300px;"></el-input>
                </el-form-item>
              </el-form>

            </div>
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
      dialogVisible: false,
      form: {
        schoolId: '',
        gradeId: '',
        className: '',
        schoolData: [],
        gradeData: [],
      },
      formInline: {
        schoolId: '',
        gradeId: '',
        className: '',
      },
      studentTypeArr: {
        'STUDENT': '学生',
        'STAFF': '老师',
        'WORKER': '第三方工作人员'
      },
      schoolData: [],
      gradeData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      rules: {
        schoolId: [
          { required: true, message: '请选择学校', trigger: ['blur', 'change'] },
        ],
        gradeId: [
          { required: true, message: '请选择年级', trigger: ['blur', 'change'] },
        ],
        className: [
          { required: true, message: '请输入班级名称' },
          { required: true, min: 2, max: 32, message: '班级名称不能小于2个或大于32个字符', trigger: ['blur', 'change'] },
        ],
      }
    }
  },
  methods: {
    getClassList (pageIndex = 1, pageSize = 15) {
      let datas = {
        schoolId: Number(this.formInline.schoolId),
        gradeId: Number(this.formInline.gradeId),
        className: this.formInline.className,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      SchoolModule.getClassList(datas).then(res => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              className: el.className,
              schoolName: el.schoolName,
              gradeName: el.gradeName,
              dinerCount: el.dinerCount,
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
    addClassInfo () {
      let datas = {
        schoolId: Number(this.form.schoolId),
        gradeId: Number(this.form.gradeId),
        className: this.form.className,
      };
      SchoolModule.addClassInfo(datas).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.form.schoolId = '';
            this.form.gradeId = '';
            this.form.className = '';
            this.dialogVisible = false;
            this.getClassList();
          }
          else if (res.data.err == 1) {
            this.$message({
              type: 'error',
              message: '无效校区!'
            });
          }
          else if (res.data.err == 2) {
            this.$message({
              type: 'error',
              message: '请填写名称!'
            });
          }
          else if (res.data.err == 3) {
            this.$message({
              type: 'error',
              message: '名称已存在!'
            });
          }
        }
      });
    },
    deleteClassInfo (id) {
      SchoolModule.deleteClassInfo(id).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getClassList();
          }
          else if (res.data.err == 1) {
            this.$message({
              type: 'error',
              message: '班级不存在!'
            });
            this.getClassList();
          }
          else if (res.data.err == 2) {
            this.$message({
              type: 'error',
              message: '无法删除已经存在人员的班级!'
            });
            this.getClassList();
          }
        }
      });
    },
    getSchoolSelect () {
      this.gradeData = [];
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
    getGradeSelect () {
      let datas = {
        schoolId: Number(this.formInline.schoolId),
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
    getFormSchoolSelect () {
      this.form.gradeData = [];
      PublicModule.getSchoolSelect().then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({

              id: el.id,
              name: el.schoolName,

            });
          });
          this.form.schoolData = list;
        }
      });
    },
    getFormGradeSelect () {
      let datas = {
        schoolId: Number(this.form.schoolId),
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
    // 重置
    resetForm () {
      this.formInline.className = '';
      this.formInline.schoolAreaId = '';
      this.formInline.studentType = '';
    },
    // 查询
    submitForm () {
      this.getClassList();
    },
    // 添加用户
    addUser () {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields();
      }
      this.dialogVisible = true;
      this.getFormSchoolSelect();
    },
    // 提交添加用户
    submitAddForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addClassInfo();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消提交
    cancelForm (formName) {
      this.form.user = '';
      this.form.role = '';
      this.form.userCode = '';
      this.form.userPhoneNum = '';
      this.form.gradeAndClass = '';
      this.dialogVisible = false;
    },
    // 删除用户
    deleteUser (row) {
      console.log(row.id);
      this.$confirm(`是否删除id为:${row.id}的班级?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteClassInfo(row.id);
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
      this.getClassList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getClassList(val, this.pageSize);
    },
  },
  mounted () {
    this.getSchoolSelect();
    this.getClassList();
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