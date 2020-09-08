<template>
  <div class="orderList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="schoolId" style="width:150px;">
                <el-select clearable @change="handleSchoolChange" v-model.trim="formInline.schoolId" placeholder="请选择单位" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in schoolData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="gradeClass" style="width:150px;">
                <el-select clearable @change="handleGradeChange" filterable v-model.trim="formInline.gradeId" placeholder="请选择部门"
                  size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in gradeData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="timeChose">
                <el-date-picker v-model="formInline.dateVals" @change="changeDate" value-format="yyyy-MM-dd" type="daterange" size="small"
                  range-separator="至" start-placeholder="用餐开始日期" end-placeholder="用餐结束日期" align="right">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item prop="gradeClass" style="width:150px;">
                <el-select clearable filterable v-model.trim="formInline.health" placeholder="请选择健康评分" size="small">
                  <el-option element-loading-spinner="el-icon-loading" label="五星" value="5">
                  </el-option>
                  <el-option element-loading-spinner="el-icon-loading" label="四星" value="4">
                  </el-option>
                  <el-option element-loading-spinner="el-icon-loading" label="三星" value="3">
                  </el-option>
                  <el-option element-loading-spinner="el-icon-loading" label="二星" value="2">
                  </el-option>
                  <el-option element-loading-spinner="el-icon-loading" label="一星" value="1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="gradeClass" style="width:150px;">
                <el-select clearable filterable v-model.trim="formInline.weight" placeholder="请选择分量评分" size="small">
                  <el-option element-loading-spinner="el-icon-loading" label="五星" value="5">
                  </el-option>
                  <el-option element-loading-spinner="el-icon-loading" label="四星" value="4">
                  </el-option>
                  <el-option element-loading-spinner="el-icon-loading" label="三星" value="3">
                  </el-option>
                  <el-option element-loading-spinner="el-icon-loading" label="二星" value="2">
                  </el-option>
                  <el-option element-loading-spinner="el-icon-loading" label="一星" value="1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="gradeClass" style="width:150px;">
                <el-select clearable filterable v-model.trim="formInline.taste" placeholder="请选择口味评分" size="small">
                  <el-option element-loading-spinner="el-icon-loading" label="五星" value="5">
                  </el-option>
                  <el-option element-loading-spinner="el-icon-loading" label="四星" value="4">
                  </el-option>
                  <el-option element-loading-spinner="el-icon-loading" label="三星" value="3">
                  </el-option>
                  <el-option element-loading-spinner="el-icon-loading" label="二星" value="2">
                  </el-option>
                  <el-option element-loading-spinner="el-icon-loading" label="一星" value="1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="gradeClass" style="width:150px;">
                <el-select clearable filterable v-model.trim="formInline.isContent" placeholder="请选择有无文字" size="small">
                  <el-option element-loading-spinner="el-icon-loading" label="有文字评论" value="1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="gradeClass" style="width:150px;">
                <el-select clearable filterable v-model.trim="formInline.isReply" placeholder="请选择有无回复" size="small">
                  <el-option element-loading-spinner="el-icon-loading" label="未回复" value="1">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" highlight-current-row border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column label='内容'>
            <template slot-scope="scope">
              <el-row>
                <span style="margin-left: 10px">{{ scope.row.dinerName }}</span>
                <span style="margin-left: 10px">{{ scope.row.schoolName }}</span>
                <span style="margin-left: 10px">{{ scope.row.gradeName }}</span>
                <span style="margin-left: 10px">{{ scope.row.className }}</span>
                <span style="margin-left: 10px">{{ scope.row.mealDate }}</span>
                <span style="margin-left: 10px">{{ scope.row.mealTime }}</span>
                <span style="margin-left: 10px">{{ scope.row.foodName }}</span>
              </el-row>
              <el-row class="rank_list">
                <div class="rank_item" style="margin-left: 10px">卫生: <el-rate :disabled="true" :show-text="false"
                    v-model="scope.row.health"></el-rate>
                </div>
                <div class="rank_item" style="margin-left: 10px">分量: <el-rate :disabled="true" :show-text="false"
                    v-model="scope.row.weight"></el-rate>
                </div>
                <div class="rank_item" style="margin-left: 10px">口味: <el-rate :disabled="true" :show-text="false" v-model="scope.row.taste">
                  </el-rate>
                </div>
              </el-row>
              <el-row>
                <el-alert style="margin:10px 0;" :title="scope.row.content" type="info" :closable="false">
                </el-alert>
              </el-row>
              <el-row v-if="scope.row.isReply>0">
                <el-alert :title="'商家回复:'+scope.row.replyContent" :description="scope.row.replyTime" type="success" :closable="false">
                </el-alert>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label='评价时间' width='200'>
            <template slot-scope="scope">
              {{scope.row.replyTime}}
            </template>
          </el-table-column>
          <el-table-column label='订单状态' width='80'>
            <template slot-scope="scope">
              <el-button v-if="scope.row.isReply===0" @click="goToDetail(scope.row.id)" type="text" size="small">回复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" style="margin-top: 15px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30, 45, 60]"
          :page-size=pageSize layout="total, sizes, prev, pager, next, jumper" :total=pageTotal>
        </el-pagination>
      </div>
      <div class="dialogBox">
        <el-dialog title="回复评价" :visible.sync="dialogVisible" @close="cancelForm" :show-close="true" width="750px">
          <div class="wrapper">
            <div>
              <el-form :model="form" :rules="rules" label-width="100px" ref="ruleForm">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      <el-form-item label="用户名：" prop="dinnerName">
                        <span>{{form.dinnerName}} {{form.schoolName}} {{form.gradeName}} {{form.className}} {{form.mealDate}}
                          {{form.mealTime}} {{form.foodName}}</span>
                      </el-form-item>
                      <el-form-item label="卫生：" prop="health">
                        <el-rate :disabled="true" :show-text="false" v-model="form.health"></el-rate>
                      </el-form-item>
                      <el-form-item label="分量：" prop="weight">
                        <el-rate :disabled="true" :show-text="false" v-model="form.weight"></el-rate>
                      </el-form-item>
                      <el-form-item label="口味：" prop="taste">
                        <el-rate :disabled="true" :show-text="false" v-model="form.taste"></el-rate>
                      </el-form-item>
                      <el-form-item label="内容：" prop="content">
                        <el-alert :title="form.content" type="info" :closable="false">
                        </el-alert>
                      </el-form-item>
                      <el-form-item label="评价时间：" prop="createTime">
                        <span>{{form.createTime}}</span>
                      </el-form-item>
                      <el-form-item label="回复：" prop="replyContent">
                        <el-input type="textarea" placeholder="请输入内容" v-model="form.replyContent" rows="10" style="width:400px;">
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
  name: 'orderList',
  data () {
    return {
      dialogVisible: false,
      formInline: {
        schoolId: '',
        gradeId: '',
        classId: '',
        dateVals: [],
        health: '',
        weight: '',
        taste: '',
        isContent: '',
        isReply: '',
      },
      form: {
        id: "",
        dinerName: "",
        content: "",
        health: "",
        weight: "",
        taste: "",
        mealDate: "",
        mealTime: "",
        schoolName: "",
        gradeName: "",
        className: "",
        foodName: "",
        isReply: "",
        replyContent: "",
        replyTime: "",
      },
      mealTimeArr: {
        'BREAKFAST': '早餐',
        'LUNCH': '午餐',
        'DINNER': '晚餐'
      },
      orderStatusArr: {
        'PAID': "未完成",
        'FINISH': "已完成",
        'CANCELED': "已退款",
      },
      schoolData: [],
      gradeData: [],
      classData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      totalSum: "0.00",
      paySum: "0.00",
      infoData: {},
      dialogTableData: [{
        shouldGet: -20.5,
        factGet: 10.5,
      }],
      // 收款信息数据
      dialogGatheringTableData: [],
      // 点餐明细数据
      dialogOrderingTableData: [],
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
      }
    }
  },
  methods: {
    formatAmount (val) {
      var str = (val * 100 / 100).toFixed(2) + '';
      var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
      var dot = str.substring(str.length, str.indexOf("."))//取到小数部分搜索
      var ret = intSum + dot;
      return ret;
    },
    formatNumber (str) {
      var intSum = str.replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
      return intSum;
    },
    getCommentList (pageIndex = 1, pageSize = 15) {
      let datas = {
        schoolId: Number(this.formInline.schoolId),
        gradeId: Number(this.formInline.gradeId),
        classId: Number(this.formInline.classId),
        dateRange: this.formInline.dateVals == null ? [] : this.formInline.dateVals,
        health: Number(this.formInline.health),
        weight: Number(this.formInline.weight),
        taste: Number(this.formInline.taste),
        isContent: Number(this.formInline.isContent),
        isReply: Number(this.formInline.isReply),
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      OrderModule.getCommentList(datas).then(res => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              dinerName: el.dinerName,
              content: el.content,
              health: el.health,
              weight: el.weight,
              taste: el.taste,
              mealDate: el.mealDate,
              mealTime: this.mealTimeArr[el.mealTime],
              schoolName: el.schoolName,
              gradeName: el.gradeName,
              className: el.className,
              foodName: el.foodName,
              isReply: el.isReply,
              replyContent: el.replyContent,
              replyTime: el.replyTime,

            });
            rowId++;
          });
          total = res.data.total;
        }
        this.listData = list;
        this.pageTotal = Number(total);
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
    goToDetail (id) {
      this.dialogVisible = true;
      this.clearForm();
      this.newPasswordProp = this.rules.newPasswordUpdate;
      this.getCommentInfo(id);
    },
    getCommentInfo (id) {
      OrderModule.getCommentInfo(id).then(res => {
        if (res.data) {
          let data = res.data;

          let info = {

            id: data.id,
            dinerName: data.dinerName,
            content: data.content,
            health: data.health,
            weight: data.weight,
            taste: data.taste,
            mealDate: data.mealDate,
            mealTime: this.mealTimeArr[data.mealTime],
            schoolName: data.schoolName,
            gradeName: data.gradeName,
            className: data.className,
            foodName: data.foodName,
            createTime: data.createTime,

          };

          this.form = info;
        }
      });
    },
    submitAddForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateCommentInfo();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateCommentInfo () {
      let data = {
        id: this.form.id,
        replyContent: this.form.replyContent,
      };
      OrderModule.updateCommentInfo(data).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogVisible = false;
            this.getCommentList();
          } else {
            this.$message({
              type: 'error',
              message: '保存失败!'
            });
          }
        }
      });
    },
    cancelForm () {
      this.dialogVisible = false;
    },
    clearForm () {

      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields();
      }

      this.form = {
        id: "",
        dinerName: "",
        content: "",
        health: "",
        weight: "",
        taste: "",
        mealDate: "",
        mealTime: "",
        schoolName: "",
        gradeName: "",
        className: "",
        foodName: "",
        isReply: "",
        replyContent: "",
        replyTime: "",
      };
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.getCommentList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getCommentList(val, this.pageSize);
    },
    handleSchoolChange (value) {
      this.getGradeSelect();
    },
    handleGradeChange (value) {
      this.getClassSelect();
    },
    handleClassChange (value) {
    },
    changeDate () {
      if (!this.formInline.dateVals) {
        this.formInline.dateVals = [];
        console.log(this.formInline.dateVals);
      }
    },
    // 查询
    submitForm () {
      this.getCommentList();
    },
    exportForm () {
      let datas = {
        schoolId: Number(this.formInline.schoolId),
        gradeId: Number(this.formInline.gradeId),
        classId: Number(this.formInline.classId),
        dateRange: this.formInline.dateVals == null ? [] : this.formInline.dateVals,
        dinerName: this.formInline.dinerName,
        orderStatus: this.formInline.orderStatus,
        mealTime: this.formInline.mealTime,
      };
      OrderModule.getOrderExport(datas).then(res => {
        if (res.data) {
        }
      });
    },
  },
  mounted () {
    this.getSchoolSelect();
    this.getCommentList();
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
.dataTotal {
  margin-top: 15px;
  text-align: center;
  padding: 5px;
  border: 1px solid #eee;
  font-size: 12px;
}
.dataTotal .num {
  color: #f56c6c;
  font-size: 16px;
  padding: 5px 0;
}
.dataTotal .left {
  padding: 5px 0;
}
.dataTotal .left i {
  color: #409eff;
  font-size: 14px;
  margin-left: 3px;
}
.dataTotal .el-col {
  border-right: 4px solid #409eff;
}
.dialogBox .el-col {
  font-size: 12px;
}
.info .el-col {
  padding: 2px 0;
}

.el-collapse {
  border-top: 0;
  border-bottom: 0;
}
.el-collapse-item__header {
  border-bottom: 0;
}
.el-collapse-item__wrap {
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
  border-bottom: 0;
}
.el-collapse-item__header span {
  font-weight: normal;
}
.el-collapse-item:last-child {
  margin-bottom: 0;
}
.el-collapse-item__content {
  padding-bottom: 0;
}

.rank_list {
  display: flex;
}

.rank_list .rank_item {
  display: flex;
}
</style>