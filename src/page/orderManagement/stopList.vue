<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item style="width:150px;" prop="schoolId">
                <el-select clearable v-model.trim="formInline.schoolId" placeholder="请选择" @change="getGradeSelect" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in schoolData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width:150px;" prop="gradeId">
                <el-select clearable v-model.trim="formInline.gradeId" placeholder="请选择年级" @change="getClassSelect" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in gradeData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width:120px;" prop="dinerName">
                <el-input size="small" clearable v-model.trim="formInline.dinerName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item style="width:150px;" prop="state">
                <el-select clearable v-model.trim="formInline.state" placeholder="请选择状态" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in stateArr" :key="`${_uid}_${index}`"
                    :label="item" :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="addUser">添加停餐</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="gradeName" label='部门'>
          </el-table-column>
          <el-table-column prop="dinerName" label='人员'>
          </el-table-column>
          <el-table-column prop="startDate" label='开始日期'>
          </el-table-column>
          <el-table-column prop="endDate" label='结束日期'>
          </el-table-column>
          <el-table-column prop="state" label='状态'>
          </el-table-column>
          <el-table-column prop="createTime" label='创建时间' width="150">
          </el-table-column>

          <el-table-column fixed="right" align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button v-if="scope.row.isCancel==false" @click="cancelStopMeal(scope.row)" type="text" size="small">取消</el-button>
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
        <el-dialog :title="isAdd ? '添加用户' : '编辑用户'" :visible.sync="dialogVisible" :show-close="true" width="750px">
          <div class="wrapper">
            <el-form :model="form" :rules="rules" label-width="120px" ref="ruleForm">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="年级：" prop="gradeId">
                    <el-select v-model.trim="form.gradeId" placeholder="请选择部门" style="width:150px;" @change="getFormClassSelect"
                      size="small">
                      <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in form.gradeData" :key="`${_uid}_${index}`"
                        :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="人员：" prop="dinerId">
                    <el-select v-model.trim="form.dinerId" placeholder="请选择人员" filterable style="width:150px;" size="small">
                      <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in form.dinerData" :key="`${_uid}_${index}`"
                        :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="开始日期：" prop="mobilePhone">
                    <el-date-picker v-model="form.startDate" value-format="yyyy-MM-dd" size="small" type="date" placeholder="选择停餐开始日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="永久停餐：" prop="isStop">
                    <el-switch v-model="form.isStop" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                  </el-form-item>
                  <el-form-item label="结束日期：" prop="mobilePhone" v-if="form.isStop==false">
                    <el-date-picker v-model="form.endDate" value-format="yyyy-MM-dd" size="small" type="date" placeholder="选择停餐结束日期">
                    </el-date-picker>
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
      <div class="importDialogBox">
        <el-dialog title="导入人员" :visible.sync="importDialogVisible" :show-close="true" width="750px">
          <div class="wrapper">
            <el-form :model="form" :rules="rules" label-width="120px" ref="ruleForm">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="Excel文件：" prop="file">
                    <el-upload class="upload-demo" drag action="" :auto-upload="false" :show-file-list="false"
                      :on-change="handleImportPreview">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text" v-if="formImport.previewName==''">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__text" v-else>{{formImport.previewName}}</div>
                      <div class="el-upload__tip" slot="tip">只能上传Excel文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelImportForm('ruleForm')" size="mini">取 消</el-button>
            <el-button type="primary" @click="submitImportForm('ruleForm')" size="mini">确 定</el-button>
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
    return {
      isAdd: false,
      dialogVisible: false,
      importDialogVisible: false,
      form: {
        id: '',
        schoolId: '',
        schoolName: '',
        gradeId: '',
        gradeName: '',
        classId: '',
        className: '',
        dinerId: '',
        dinerName: '',
        startDate: '',
        endDate: '',
        isStop: false,
        schoolData: [],
        gradeData: [],
        classData: [],
        dinerData: [],
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
        state: '',
      },
      stateArr: {
        'ACTIVE': '正常',
        'CANCELED': '已取消'
      },
      schoolData: [],
      gradeData: [],
      classData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      rules: {
        startDate: [
          { required: true, message: '请选择开始日期', trigger: ['blur', 'change'] },
        ],
      }
    }
  },
  methods: {
    getStopMealList (pageIndex = 1, pageSize = 15) {
      let datas = {
        schoolId: Number(this.formInline.schoolId),
        gradeId: Number(this.formInline.gradeId),
        classId: Number(this.formInline.classId),
        dinerName: this.formInline.dinerName,
        state: this.formInline.state,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      OrderModule.getStopMealList(datas).then(res => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              schoolName: el.schoolName == '' ? '全部' : el.schoolName,
              gradeName: el.gradeName == '' ? '全部' : el.gradeName,
              className: el.className == '' ? '全部' : el.className,
              dinerName: el.dinerName == '' ? '全部' : el.dinerName,
              startDate: el.startDate,
              endDate: el.endDate == '' ? '永久' : el.endDate,
              state: this.stateArr[el.state],
              isCancel: el.state == 'ACTIVE' ? false : true,
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
    getSchoolSelect () {
      this.gradeData = [];
      this.classData = [];
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
      this.classData = [];
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
    getClassSelect () {
      let datas = {
        schoolId: Number(this.formInline.schoolId),
        gradeId: Number(this.formInline.gradeId),
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
          this.classData = list;
        }
      });
    },
    getFormSchoolSelect () {
      this.form.gradeData = [];
      this.form.classData = [];
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
      this.form.classData = [];
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
    getFormClassSelect () {
      let datas = {
        schoolId: Number(this.form.schoolId),
        gradeId: Number(this.form.gradeId),
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
          this.form.classData = list;
        }
      });
    },
    getFormDinerSelect () {
      let datas = {
        classId: Number(this.form.classId),
      };
      PublicModule.getDinerSelect(datas).then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({

              id: el.id,
              name: el.dinerName,

            });
          });
          this.form.dinerData = list;
        }
      });
    },
    changeAreaList () {
      this.form.classId = '';
    },
    getDinerInfo (id) {
      OrderModule.getDinerInfo(id).then(res => {
        if (res.data) {
          let data = res.data;
          this.form.id = data.id;
          this.form.schoolId = data.schoolId;
          this.form.schoolName = data.schoolName;
          this.form.gradeId = data.gradeId;
          this.form.gradeName = data.gradeName;
          this.form.classId = data.classId;
          this.form.className = data.className;
          this.form.dinerName = data.dinerName;
          this.form.mobilePhone = data.mobilePhone;

          this.getFormSchoolSelect();
          this.getFormGradeSelect();
          this.getFormClassSelect();
        }
      });
    },
    addStopMealInfo () {
      let datas = {
        schoolId: Number(this.form.schoolId),
        gradeId: Number(this.form.gradeId),
        classId: Number(this.form.classId),
        dinerId: Number(this.form.dinerId),
        startDate: this.form.startDate,
        endDate: this.form.isStop == true ? "" : this.form.endDate,
      };
      OrderModule.addStopMealInfo(datas).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getStopMealList();
          } else if (res.data.err == 2) {
            this.$message({
              type: 'error',
              message: '请选择菜单!'
            });
          }
        }
      });
    },
    updateStopMealInfo (id) {
      OrderModule.updateStopMealInfo(id).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '取消成功!'
            });
            this.getStopMealList();
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
      this.getStopMealList();
    },
    getUser (row) {
      this.isAdd = false;
      this.form.id = '';
      this.parentId = '';
      this.form.schoolAreaId = '';
      this.form.classId = '';
      this.form.cabinetGroup = '';
      this.form.studentName = '';
      this.form.studentNumber = '';
      this.form.phoneNumber = '';
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
      this.form.schoolId = '';
      this.form.gradeId = '';
      this.form.classId = '';
      this.form.dinerId = '';
      this.form.startDate = '';
      this.form.endDate = '';
      this.form.isStop = false;
      this.dialogVisible = true;
      this.getFormSchoolSelect();

      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields();
      }
    },
    importUser () {
      this.isAdd = true;
      this.form.id = '';
      this.parentId = '';
      this.form.schoolAreaId = '';
      this.form.classId = '';
      this.form.cabinetGroup = '';
      this.form.studentName = '';
      this.form.studentNumber = '';
      this.form.phoneNumber = '';
      this.importDialogVisible = true;

      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields();
      }
    },
    importDiner () {
      let datas = {
        file: this.formImport.file,
      };
      OrderModule.importDiner(datas).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            let total = res.data.total;
            let success = res.data.success;
            this.$message({
              type: 'success',
              message: '导入成功!总行数：' + total + ",成功数：" + success
            });
            this.importDialogVisible = false;
            this.getStopMealList();
          } else if (res.data.err == 1) {
            this.$message({
              type: 'error',
              message: '上传文件类型必须为XLXS!'
            });
          } else if (res.data.err == 2) {
            this.$message({
              type: 'error',
              message: '上传文件不能超过2M!'
            });
          }
        }
      });
    },
    // 提交添加用户
    submitAddForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addStopMealInfo();
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
    cancelImportForm (formName) {
      this.importDialogVisible = false;
    },
    cancelStopMeal (row) {
      this.$confirm(`是否取消停餐?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateStopMealInfo(row.id);
      }).catch(() => {
        // this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        // });         
      });
    },
    handleImportPreview (file) {
      console.log(file);

      const isJPG = file.raw.type === 'application/vnd.ms-excel';
      const isLt2M = file.raw.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传文件只能是 Excel 格式!');
        return;
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
        return;
      }

      this.getBase64(file.raw).then(res => {
        const params = res.split(',')
        if (params.length > 0) {
          this.formImport.previewName = file.name;
          this.formImport.file = res;
        }
      })
    },
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.getStopMealList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getStopMealList(val, this.pageSize);
    },
  },
  mounted () {
    this.getSchoolSelect();
    this.getStopMealList();
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