<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item style="width:150px;" prop="kitchenId">
                <el-select clearable v-model.trim="formInline.kitchenId" placeholder="请选择供应商" size="small">
                  <el-option element-loading-spinner="el-icon-loading" v-for="(item, index) in kitchenData" :key="`${_uid}_${index}`"
                    :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="menuName" style="width:150px;">
                <el-input size="small" clearable v-model.trim="formInline.menuName" placeholder="请输入菜单名称">
                </el-input>
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
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="kitchenName" label='供应商'>
          </el-table-column>
          <el-table-column prop="menuName" label='菜单名称'>
          </el-table-column>
          <el-table-column prop="menuCat" width="80" label='类型'>
          </el-table-column>
          <el-table-column prop="menuType" width="80" label='餐段'>
          </el-table-column>
          <el-table-column prop="rangeName" width="220" label='时段'>
          </el-table-column>
          <el-table-column prop="schoolName" label='使用学校'>
          </el-table-column>
          <el-table-column prop="createTime" label='创建时间'>
          </el-table-column>

          <el-table-column fixed="right" style="display:none;" align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="goToDetail(scope.row.id)" type="text" size="small">查看</el-button>
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
                  <div class="grid-content bg-purple">
                    <el-form-item label="菜单名称：" v-if="isAdd == false" prop="menuName">
                      <span>{{form.menuName}}</span>
                    </el-form-item>
                    <el-form-item label="菜单名称：" v-else prop="menuName">
                      <el-input size="small" clearable v-model.trim="form.menuName" placeholder="请输入菜单名称" style="width:180px;"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：" v-if="isAdd == false" prop="menuCat">
                      <span>{{form.menuCatName}}</span>
                    </el-form-item>
                    <el-form-item label="类型：" v-else prop="menuCat">
                      <el-radio v-model="form.menuCat" @change="changeMenuCat" label="1">周度菜单</el-radio>
                      <el-radio v-model="form.menuCat" @change="changeMenuCat" label="2">月度菜单</el-radio>
                    </el-form-item>
                    <el-form-item label="时段：" v-if="isAdd == false" prop="rangeId">
                      <span>{{form.rangeName}}</span>
                    </el-form-item>
                    <el-form-item label="时段：" v-else prop="rangeId">
                      <el-select style="width:300px;" v-model="form.rangeId" placeholder="请选择日期时段">
                        <el-option v-for="item in rangeData" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="餐段：" v-if="isAdd == false" prop="menuType">
                      <span>{{form.menuTypeName}}</span>
                    </el-form-item>
                    <el-form-item label="餐段：" v-else prop="menuType">
                      <el-radio v-model="form.menuType" label="1">早餐</el-radio>
                      <el-radio v-model="form.menuType" label="2">午餐</el-radio>
                      <el-radio v-model="form.menuType" label="3">晚餐</el-radio>
                    </el-form-item>
                    <el-form-item label="创建时间：" v-if="isAdd == false" prop="createTime">
                      <span>{{form.createTime}}</span>
                    </el-form-item>
                  </div>
                </el-row>
              </el-form>

              <el-row v-if="isAdd == false">
                <div class="food-table" style="margin-top: 15px;">
                  <el-table :data="menuFoodData" border :show-header="false" style="width: 100%">
                    <el-table-column align="center" width="200">
                      <template slot-scope="scope">
                        <div>{{scope.row.orderDate}}</div>
                        <div>{{scope.row.orderWeekday}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center">
                      <template slot-scope="scope">
                        <div class="food-list">
                          <div class="food-item" v-for="(item, index) in scope.row.content" v-bind:key="index">
                            <div class="food-name">{{item.foodName}}</div>
                            <div class="food-price">{{item.price}}</div>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-row>

            </div>
          </div>
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
      choseFoodVisible: false,
      choseSchoolVisible: false,
      form: {
        id: 0,
        menuName: '',
        menuCat: '',
        menuCatName: '',
        rangeId: '',
        rangeName: '',
        menuType: "",
        menuTypeName: "",
        content: []
      },
      formInline: {
        menuName: '',
      },
      menuCatArr: {
        "1": "周度菜单",
        "2": "月度菜单",
      },
      menuTypeArr: {
        "1": "早餐",
        "2": "午餐",
        "3": "晚餐",
      },
      weekDayArr: {
        "1": "星期日",
        "2": "星期一",
        "3": "星期二",
        "4": "星期三",
        "5": "星期四",
        "6": "星期五",
        "7": "星期六",
      },
      kitchenData: [],
      rangeData: [],
      menuFoodData: [],
      foodId: 0,
      foodSelect: [],
      foodData: [],
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      school: {
        menuId: 0,
        list: [],
        select: []
      },
      rules: {
        menuName: [
          { required: true, message: '请输入菜单名称', trigger: ['blur', 'change'] },
          { required: true, min: 2, max: 128, message: '菜单名称不能小于2或大于128个字符', trigger: ['blur', 'change'] }
        ],
        price: [
          { required: true, message: '请选择菜品价格', trigger: ['blur', 'change'] },
        ],
      }
    }
  },
  methods: {
    getAdminList (pageIndex = 1, pageSize = 15) {
      let datas = {
        menuName: this.formInline.menuName,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      OrderModule.getMenuList(datas).then(res => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              kitchenName: el.kitchenName,
              menuName: el.menuName,
              menuCat: this.menuCatArr[el.menuCat],
              rangeName: el.rangeName,
              menuType: this.menuTypeArr[el.menuType],
              schoolName: el.schoolName,
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
    getAdminInfo (id) {
      OrderModule.getMenuInfo(id).then(res => {
        if (res.data) {
          let data = res.data.info;

          let info = {

            id: data.id,
            menuName: data.menuName,
            menuCat: data.menuCat,
            menuCatName: this.menuCatArr[data.menuCat],
            rangeName: data.rangeName,
            menuType: data.menuType,
            menuTypeName: this.menuTypeArr[data.menuType],
            createTime: data.createTime,

          };

          this.form = info;
        }
      });
    },
    getMenuFoodInfo (id) {
      OrderModule.getMenuFoodInfo(id).then(res => {
        let list = [];
        if (res.data) {
          let data = res.data.list;

          res.data.list.forEach((el, i) => {
            list.push({
              rowId: i,
              id: el.id,
              orderDate: el.orderDate,
              orderWeekday: this.weekDayArr[el.orderWeekday],
              content: el.content,
            });
          });

          this.menuFoodData = list;
          console.log(list);
        }
      });
    },
    getMenuSchoolInfo (id) {
      OrderModule.getMenuSchoolInfo(id).then(res => {
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

          this.school.menuId = id;
          this.school.list = list;
          this.school.select = select;
        }
      });
    },
    getFoodSelect () {
      let data = {
      };
      PublicModule.getFoodSelect(data).then(res => {
        let list = [];
        if (res.data) {
          let data = res.data.list;

          data.forEach((el, i) => {
            list.push({
              id: el.id,
              foodName: el.foodName,
              price: el.price,
            });
          });

          this.foodData = list;
          console.log(this.foodData);
        }
      });
    },
    getRangeWeekList () {
      let datas = {
      };
      OrderModule.getRangeWeekList(datas).then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({

              id: el.id,
              name: el.rangeName,

            });
          });
          this.rangeData = list;
        }
      });
    },
    getRangeMonthList () {
      let datas = {
      };
      OrderModule.getRangeMonthList(datas).then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({

              id: el.id,
              name: el.rangeName,

            });
          });
          this.rangeData = list;
        }
      });
    },
    getKitchenSelect () {
      PublicModule.getKitchenSelect().then(res => {
        if (res.data) {
          let list = [];
          res.data.list.forEach((el, i) => {
            list.push({

              id: el.id,
              name: el.kitchenName,

            });
          });
          this.kitchenData = list;
        }
      });
    },
    changeMenuCat (e) {
      if (e == 1) {
        this.getRangeWeekList();
      } else if (e == 2) {
        this.getRangeMonthList();
      }
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
        foodName: '',
        foodDesc: '',
        price: ''
      };
    },
    // 查询
    submitForm () {
      this.getAdminList();
    },
    goToDetail (id) {
      this.formTitle = "编辑菜单";
      this.isAdd = false;
      this.dialogVisible = true;
      this.clearForm();
      this.getAdminInfo(id);
      this.getMenuFoodInfo(id);
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
    this.getKitchenSelect();
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

.food-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.food-item {
  width: 25%;
}
.el-checkbox-group {
  width: 100%;
}

.food-item {
  width: 25%;
  border: 1px solid #ebeef5;
}

.food-item .food-name {
  margin-top: 5px;
  height: 25px;
  line-height: 25px;
}

.food-item .food-price {
  margin-bottom: 5px;
  height: 25px;
  line-height: 25px;
}

.food-item button {
  height: 60px;
}

.chose-item {
  width: 25%;
  margin-bottom: 20px;
}

.el-checkbox-button__inner {
  width: 80%;
  border-left: 1px solid #dcdfe6;
}

.food-table .el-table_2_column_10 {
  padding: 0px !important;
}

.food-table .el-table_2_column_10 .cell {
  padding: 0px !important;
}
</style>