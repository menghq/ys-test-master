<template>
  <div>
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item prop="dinerName" style="width:150px;">
                <el-input size="small" clearable v-model.trim="formInline.dinerName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item prop="cardNum" style="width:200px;">
                <el-input size="small" clearable v-model.trim="formInline.cardNum" placeholder="请输入餐卡编号"></el-input>
              </el-form-item>
              <el-form-item prop="gradeId">
                <el-select clearable filterable v-model.trim="formInline.gradeId" placeholder="请选择部门"
                           size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="item in gradeData" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="cardStatus" style="width:180px;">
                <el-select clearable v-model.trim="formInline.cardStatus" placeholder="是否绑定状态" size="small">
                    <el-option element-loading-spinner="el-icon-loading" label="绑定状态" value="1"/>
                    <el-option element-loading-spinner="el-icon-loading" label="未绑定状态" value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="exportExcel">导出数据</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="100"/>
          <el-table-column prop="card_number" label='餐卡编号'/>
          <el-table-column prop="userName" width="300" label='绑定人员'/>
          <el-table-column prop="grade_name" width="200" label='部门'/>
          <el-table-column prop="status" width="100" label='状态'/>
          <el-table-column fixed="right" align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="updateData(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="changeData(scope.row)" type="text" size="small">解绑</el-button>
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
        <el-dialog title="修改资料" :visible.sync="dialogVisible" @close="cancelForm" :show-close="true" width="450px">
          <div class="wrapper">
            <div>
              <el-form :model="form" :rules="rules" label-width="100px" ref="ruleForm">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      <el-form-item label="卡号：">
                        {{form.cardNum}}
                      </el-form-item>
                      <el-form-item label="所属部门：" prop="gradeId">
                        <el-select @change="selectGradeChanged" filterable v-model.trim="form.gradeId" placeholder="请选择部门"
                                   size="small">
                          <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in gradeData" :label="item.name" :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="绑定人员：" prop="dinerId">
                        <el-select filterable v-model.trim="form.dinerId" placeholder="请选择人员"
                                   size="small">
                          <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in gradeCardData" :label="item.title" :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="状态：" :required="true" prop="status">
                        <el-radio-group v-model="form.status">
                          <el-radio :label="1">正常</el-radio>
                          <el-radio :label="0">停用</el-radio>
                        </el-radio-group>
                      </el-form-item>

                    </div>
                  </el-col>
                </el-row>
              </el-form>

            </div>
          </div>
          <div slot="footer" class="dialog-footer" style="padding: 0px 30px;">
            <el-button @click="cancelForm()" size="mini">取消</el-button>
            <el-button type="primary" @click="submitFormData('ruleForm')" size="mini">保存</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { PublicModule, CardModule } from "@/api/common";
import { outExportExcel, formatTime } from "@/utils/tool"

export default {
  data () {
    return {
      gradeData: [],
      gradeCardData: [],
      statusArr:[{id:"1", title:"正常"}, {id:"0", title: "停用"}],
      dialogVisible: false,
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      formInline: {
        dinerName: '',
        cardNum: '',
        gradeId: '',
        cardStatus: '',
      },
      form: {
        id: 0,
        cardNum: '',
        gradeId: '',
        dinerId: '',
        status: 1,
      },

      rules: {
        gradeId: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        dinerId: [
          { required: true, message: '请选择', trigger: 'change' },
        ]
      }
    }
  },
  mounted () {
    this.getFormGradeSelect();
    this.getDataList();
  },
  methods: {
    exportExcel(){
      let datas = {
        gradeId: Number(this.formInline.gradeId),
        cardStatus: Number(this.formInline.cardStatus),
        cardNum: this.formInline.cardNum,
        userName: this.formInline.dinerName,
        isPage: 0
      };

      CardModule.getCardList(datas).then(res => {
        let list = [];
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({
              rowId: i + 1,
              id: el.id,
              card_number: el.card_number,
              userName: el.username,
              grade_name: el.grade_name,
              status: this.statusArr[0].title,//el.status],
            });
          })
        }
        const tableHeader = ['序号', '餐卡编号', '绑定人员', '部门', '状态']
        const tableKey = ['rowId', 'card_number', 'userName', 'grade_name', 'status']
        outExportExcel(
          tableHeader,
          tableKey,
          list,
          '餐卡管理报表-' + formatTime(new Date())
        )
      }).catch(err=>{
        this.$message({
          type: 'error',
          message: '导出失败!'
        });
      })
    },
    changeData(info){
      this.$confirm(`确定解除此卡的绑定吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id: info.id
        };

        CardModule.changeCardInfo(data).then(res => {
          if (res.data) {
            switch (res.data.err)
            {
              case 0:
                this.$message({
                  type: 'success',
                  message: '解绑成功!'
                });
                this.getDataList();
                break;
              default:
                this.$message({
                  type: 'error',
                  message: '解绑失败!'
                });
            }
          }
        });

      }).catch(() => {
      });
    },
    getDataList (pageIndex = 1, pageSize = 15) {
      let datas = {
        gradeId: Number(this.formInline.gradeId),
        cardStatus: Number(this.formInline.cardStatus),
        cardNum: this.formInline.cardNum,
        userName: this.formInline.dinerName,
        pageIndex: pageIndex,
        pageSize: pageSize
      };

      CardModule.getCardList(datas).then(res => {
        this.listData = [];
        let list = [];
        this.pageTotal = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
            res.data.list.forEach((el, i) => {
              list.push({
                rowId: rowId,
                id: el.id,
                card_number: el.card_number,
                card_uuid: el.card_uuid,
                userName: el.username,
                grade_name: el.grade_name,
                status: this.statusArr[0].title,//el.status],
              });
              rowId++;
          })
        }

        this.listData = list
        this.pageTotal = Number(res.data.total);
      });
    },
    getUserGrade(id){
      let name = "";
      this.gradeData.forEach((v, i) => {
        if(v.id == id)
        {
          name = v.name;
          return;
        }
      });
      return name;
    },
    getFormGradeSelect () {
      let datas = {
        schoolId: 1,
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
    selectGradeChanged(value){
      if(!value)
      {
        return
      }

      let datas = {
        schoolId: 1,
        gradeId: value,
      };

      CardModule.getGinerList(datas).then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({
              id: el.id,
              title: el.card_uuid?el.username+' --- '+el.card_uuid:el.username,
              status: el.card_uuid?1:0
            });
          });
          this.gradeCardData = list;
        }
      });
    },
    submitFormData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let st = 0;
          this.gradeCardData.forEach((v, i)=>{
            if(v.id == this.form.dinerId){
              if(v.status == 1) {
                st = 1;
                this.$message({
                  type: 'error',
                  message: '此员工已经绑定了餐卡，不能重复绑定!'
                });
              }
              return
            }
          })

          if(st)
          {
            return
          }

          let data = {
            id: this.form.id,
            dinerId: this.form.dinerId,
            status: this.form.status,
          };

          CardModule.updateCardInfo(data).then(res => {
            if (res.data) {
              switch (res.data.err)
              {
                case 0:
                    this.$message({
                      type: 'success',
                      message: '保存成功!'
                    });
                    this.dialogVisible = false;
                    this.getDataList();
                  break;
                case 21:
                  this.$message({
                    type: 'error',
                    message: '餐卡已被绑定，不能重复绑定!'
                  });
                  break;
                default:
                  this.$message({
                    type: 'error',
                    message: '保存失败!'
                  });
              }
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateData (info) {
      this.cancelForm();
      this.form = {
        id: info.id,
        cardNum: info.card_number,
        gradeId: '',
        dinerId: '',
        status: 1,
      };

      this.dialogVisible = true;
    },
    cancelForm () {
      this.dialogVisible = false;
      this.form = {
        id: 0,
        cardNum: '',
        gradeId: '',
        dinerId: '',
        status: 1,
      };
    },
    // 查询
    submitForm () {
      this.getDataList();
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.getDataList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getDataList(val, this.pageSize);
    },
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
