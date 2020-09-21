<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item prop="menuName" style="width:150px;">
                <el-input
                  size="small"
                  clearable
                  v-model.trim="formInline.menuName"
                  placeholder="请输入菜单名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="addUser">添加菜单</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label="序号" width="50"></el-table-column>
          <el-table-column prop="menuName" label="菜单名称"></el-table-column>
          <el-table-column prop="menuCat" width="80" label="类型"></el-table-column>
          <el-table-column prop="menuType" width="80" label="餐段"></el-table-column>
          <el-table-column prop="rangeName" width="220" label="时段"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>

          <el-table-column
            fixed="right"
            style="display:none;"
            align="center"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button @click="goToDetail(scope.row.id)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" style="margin-top: 15px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[15, 30, 45, 60]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        ></el-pagination>
      </div>
      <div class="dialogBox">
        <el-dialog
          :title="formTitle"
          :visible.sync="dialogVisible"
          @close="cancelForm"
          :show-close="true"
          width="750px"
        >
          <div class="wrapper">
            <div>
              <el-form :model="form" :rules="rules" label-width="100px" ref="ruleForm">
                <el-row>
                  <div class="grid-content bg-purple">
                    <el-form-item label="菜单名称：" v-if="isAdd == false" prop="menuName">
                      <span>{{form.menuName}}</span>
                    </el-form-item>
                    <el-form-item label="菜单名称：" v-else prop="menuName">
                      <el-input
                        size="small"
                        clearable
                        v-model.trim="form.menuName"
                        placeholder="请输入菜单名称"
                        style="width:180px;"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="类型：" v-if="isAdd == false" prop="menuCat">
                      <span>{{form.menuCatName}}</span>
                    </el-form-item>
                    <el-form-item label="类型：" v-else prop="menuCat">
                      <el-radio v-model="form.menuCat" @change="changeMenuCat" label="1">周度菜单</el-radio>
                    </el-form-item>
                    <el-form-item label="时段：" v-if="isAdd == false" prop="rangeId">
                      <span>{{form.rangeName}}</span>
                    </el-form-item>
                    <el-form-item label="时段：" v-else prop="rangeId">
                      <el-select style="width:300px;" v-model="form.rangeId" placeholder="请选择日期时段">
                        <el-option
                          v-for="item in rangeData"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
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
                          <div
                            class="food-item"
                            v-for="(item, index) in scope.row.content"
                            v-bind:key="index"
                          >
                            <div class="food-name">{{item.foodName}}</div>
                            <div class="food-price">{{item.price}}</div>
                          </div>
                          <div class="food-item">
                            <el-button
                              @click="choseFood(scope.row.rowId)"
                              type="text"
                              size="small"
                            >编辑</el-button>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-row>
            </div>
          </div>
          <span slot="footer" class="dialog-footer" v-if="isAdd == true">
            <el-button @click="cancelForm()" size="mini">取消</el-button>
            <el-button type="primary" @click="submitAddForm('ruleForm')" size="mini">保存</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="choseFoodBox">
        <el-dialog
          :title="formTitle"
          :visible.sync="choseFoodVisible"
          @close="closeChoseFood"
          :show-close="true"
          width="750px"
        >
          <div class="wrapper">
            <el-row>
              <div class="tableCom" style="margin-top: 15px;">
                <div class="food-list">
                  <el-checkbox-group v-model="foodSelect" @change="changeChoseFood">
                    <el-checkbox-button
                      class="chose-item"
                      v-for="(item, index) in foodData"
                      :label="item.id"
                      :key="index"
                    >
                      <div>{{item.foodName}}</div>
                      <div style="margin: 8px 0px;">{{item.price}}</div>
                      <div>
                          <el-select v-model.trim="item.foodType" placeholder="请选择" size="small">
                            <el-option v-for="ft in mfoodType" element-loading-spinner="el-icon-loading" :label="ft.title" :value="ft.num"/>
                          </el-select>
                      </div>
                    </el-checkbox-button>
                  </el-checkbox-group>
                </div>
              </div>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeChoseFood()" size="mini">取消</el-button>
            <el-button type="primary" @click="submitFoodForm()" size="mini">保存</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { PublicModule, OrderModule } from "@/api/common";
export default {
  name: "userList",
  data() {
    const validateRepeatPassword = (rule, value, callback) => {
      if (this.form.repeatPassword != this.form.newPassword) {
        callback(new Error("两次密码不一致"));
      }

      callback();
    };
    return {
      isAdd: false,
      formTitle: "",
      dialogVisible: false,
      choseFoodVisible: false,
      choseSchoolVisible: false,
      form: {
        id: 0,
        menuName: "",
        menuCat: 1,
        menuCatName: "",
        rangeId: "",
        rangeName: "",
        menuType: "",
        menuTypeName: "",
        content: [],
      },
      formInline: {
        menuName: "",
      },
      sfoodType:[],
      mfoodType:[{num:0, title:"全部"}, {num:1, title:"预定"}, {num:2, title:"现点"}],
      menuCatArr: {
        1: "周度菜单",
        2: "月度菜单",
      },
      menuTypeArr: {
        1: "早餐",
        2: "午餐",
        3: "晚餐",
      },
      weekDayArr: {
        1: "星期日",
        2: "星期一",
        3: "星期二",
        4: "星期三",
        5: "星期四",
        6: "星期五",
        7: "星期六",
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
        select: [],
      },
      rules: {
        menuName: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: ["blur", "change"],
          },
          {
            required: true,
            min: 2,
            max: 128,
            message: "菜单名称不能小于2或大于128个字符",
            trigger: ["blur", "change"],
          },
        ],
        price: [
          {
            required: true,
            message: "请选择菜品价格",
            trigger: ["blur", "change"],
          },
        ],
        menuCat: [
          {
            required: true,
            message: "请选择类型",
            trigger: ["blur", "change"],
          },
        ],
        rangeId: [
          {
            required: true,
            message: "请选择时段",
            trigger: ["blur", "change"],
          },
        ],
        menuType: [
          {
            required: true,
            message: "请选择餐段",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    getAdminList(pageIndex = 1, pageSize = 15) {
      let datas = {
        menuName: this.formInline.menuName,
        pageIndex: pageIndex,
        pageSize: pageSize,
      };
      OrderModule.getMenuList(datas).then((res) => {
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
    getAdminInfo(id) {
      OrderModule.getMenuInfo(id).then((res) => {
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
    getMenuFoodInfo(id) {
      OrderModule.getMenuFoodInfo(id).then((res) => {
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
    getMenuSchoolInfo(id) {
      OrderModule.getMenuSchoolInfo(id).then((res) => {
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
    getFoodSelect() {
      let data = {};
      PublicModule.getFoodSelect(data).then((res) => {
        let list = [];
        if (res.data) {
          let data = res.data.list;
          let curFoodType = 0;
          data.forEach((el, i) => {

            curFoodType = 0;
            this.sfoodType.forEach((v, i)=>{
              if(v.id == el.id){
                curFoodType = v.foodType;
                return;
              }
            });

            list.push({
              id: el.id,
              foodName: el.foodName,
              price: el.price,
              foodType: curFoodType
            });
          });

          this.foodData = list;
        }
      });
    },
    addUser() {
      this.formTitle = "新增菜单";
      this.isAdd = true;
      this.dialogVisible = true;
      this.clearForm();
      console.log(this.form);
    },
    cancelForm() {
      this.dialogVisible = false;
    },
    closeChoseFood() {
      this.choseFoodVisible = false;
    },
    changeChoseFood(e) {
      console.log(e);
      console.log(this.foodSelect);
    },
    submitAddForm(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.addAdminInfo();
          } else {
            this.updateAdminInfo();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addAdminInfo() {
      let data = {
        menuName: this.form.menuName,
        menuCat: this.form.menuCat,
        rangeId: this.form.rangeId,
        menuType: this.form.menuType,
      };
      OrderModule.addMenuInfo(data).then((res) => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: "success",
              message: "保存成功!",
            });
            this.dialogVisible = false;
            this.getAdminList();
          } else {
            this.$message({
              type: "error",
              message: "保存失败!",
            });
          }
        }
      });
    },
    updateAdminInfo() {
      let data = {
        id: this.form.id,
        foodName: this.form.foodName,
        foodDesc: this.form.foodDesc,
        price: this.form.price,
      };
      OrderModule.updateFoodInfo(data).then((res) => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: "success",
              message: "保存成功!",
            });
            this.choseFoodVisible = false;
            this.getAdminList();
          } else if (res.data.err == 1) {
            this.$message({
              type: "error",
              message: "无效的菜单名称!",
            });
          } else if (res.data.err == 2) {
            this.$message({
              type: "error",
              message: "无效的时间段!",
            });
          } else if (res.data.err == 4) {
            this.$message({
              type: "error",
              message: "已存在该时间段菜单!",
            });
          } else {
            this.$message({
              type: "error",
              message: "保存失败!",
            });
          }
        }
      });
    },
    updateMenuFoodInfo() {

      let foodSelectType = [];
      let fArr = this.foodSelect.toString().split(',');
      fArr.forEach((v,i)=>{
        this.foodData.forEach((el, i) => {
          if(v == el.id)
          {
            foodSelectType.push(el.foodType);
            return;
          }
        });
      })

      let data = {
        id: this.foodId,
        menuId: this.form.id,
        contentId: this.foodSelect,
        ftypeId: foodSelectType
      };

      OrderModule.updateMenuFoodInfo(data).then((res) => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: "success",
              message: "保存成功!",
            });
            this.choseFoodVisible = false;
            this.getMenuFoodInfo(this.form.id);
          } else if (res.data.err == 1) {
            this.$message({
              type: "error",
              message: "无效的菜单!",
            });
          } else if (res.data.err == 2) {
            this.$message({
              type: "error",
              message: "超出数量限制，每天最多只能加入9个菜品!",
            });
          } else {
            this.$message({
              type: "error",
              message: "保存失败!",
            });
          }
        }
      });
    },
    submitFoodForm() {
      this.updateMenuFoodInfo();
    },
    choseFood(id) {
      this.choseFoodVisible = true;
      let food = this.menuFoodData[id];
      let foodSelect = [];
      let foodType = [];
      food.content.forEach((el, i) => {
        foodSelect.push(el.id);
        foodType.push({id:el.id, foodType:el.foodType});
      });
      this.foodId = food.id;
      this.foodSelect = foodSelect;
      this.sfoodType = foodType;

      this.getFoodSelect();
    },
    getRangeWeekList() {
      let datas = {};
      OrderModule.getRangeWeekList(datas).then((res) => {
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
    getRangeMonthList() {
      let datas = {};
      OrderModule.getRangeMonthList(datas).then((res) => {
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
    getKitchenSelect() {
      PublicModule.getKitchenSelect().then((res) => {
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
    changeMenuCat(e) {
      if (e == 1) {
        this.getRangeWeekList();
      } else if (e == 2) {
        this.getRangeMonthList();
      }
    },
    clearForm() {
      if (this.$refs["ruleForm"]) {
        this.$refs["ruleForm"].resetFields();
      }

      this.form = {
        id: 0,
        foodName: "",
        foodDesc: "",
        price: "",
      };
    },
    // 查询
    submitForm() {
      this.getAdminList();
    },
    goToDetail(id) {
      this.formTitle = "编辑菜单";
      this.isAdd = false;
      this.dialogVisible = true;
      this.clearForm();
      this.getAdminInfo(id);
      this.getMenuFoodInfo(id);
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAdminList(this.pageIndex, val);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getAdminList(val, this.pageSize);
    },
  },
  mounted() {
    this.getKitchenSelect();
    this.getAdminList();
  },
};
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
