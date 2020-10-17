<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item prop="foodName" style="width: 150px">
                <el-input
                  size="small"
                  clearable
                  v-model.trim="formInline.foodName"
                  placeholder="请输入菜品名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right">
                <el-button
                  size="small"
                  type="primary"
                  @click="submitForm('formInline')"
                  >查询</el-button
                >
                <el-button
                  size="small"
                  icon="el-icon-plus"
                  type="default"
                  @click="addUser"
                  >添加菜品</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column
            prop="rowId"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="foodName"
            width="200"
            label="菜品名称"
          ></el-table-column>
          <el-table-column
            prop="foodCat"
            width="200"
            label="分类"
          ></el-table-column>
          <el-table-column
            prop="price"
            width="200"
            label="价格"
          ></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>

          <el-table-column
            fixed="right"
            style="display: none"
            align="center"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button
                @click="goToDetail(scope.row.id)"
                type="text"
                size="small"
                >详情</el-button
              >
              <el-button @click="deleteFood(scope.row)" type="text" size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" style="margin-top: 15px">
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
              <el-form
                :model="form"
                :rules="rules"
                label-width="100px"
                ref="ruleForm"
              >
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple">
                      <el-form-item label="封面图片：" prop="foodImg">
                        <el-upload
                          class="avatar-uploader"
                          action
                          :show-file-list="false"
                          :auto-upload="false"
                          :on-change="changeFoodImgChange"
                          :on-success="handleFoodImgSuccess"
                          :before-upload="beforeFoodImgUpload"
                        >
                          <img
                            v-if="form.foodThumb"
                            :src="form.foodThumb"
                            class="thumb"
                          />
                          <i v-else class="el-icon-plus avatar-uploader-icon">{{
                            form.foodThumb
                          }}</i>
                        </el-upload>
                      </el-form-item>
                      <el-form-item label="菜品名称：" prop="foodName">
                        <el-input
                          size="small"
                          clearable
                          v-model.trim="form.foodName"
                          placeholder="请输入菜品名称"
                          style="width: 180px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="菜品分类：" prop="foodCat">
                        <el-select
                          v-model.trim="form.foodCat"
                          placeholder="请选择"
                          size="small"
                        >
                          <el-option
                            v-for="(item, index) in foodCat"
                            element-loading-spinner="el-icon-loading"
                            :key="index"
                            :label="item"
                            :value="index"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="描述：" prop="foodDesc">
                        <el-input
                          size="small"
                          clearable
                          v-model.trim="form.foodDesc"
                          placeholder="请输入菜品描述"
                          style="width: 90%"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="价格：" prop="price">
                        <el-input
                          size="small"
                          clearable
                          v-model.trim="form.price"
                          placeholder="请输入菜品价格"
                          style="width: 180px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item
                        label="创建时间："
                        v-if="isAdd == false"
                        prop="createTime"
                      >
                        <span>{{ form.createTime }}</span>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelForm()" size="mini">取消</el-button>
            <el-button
              type="primary"
              @click="submitAddForm('ruleForm')"
              size="mini"
              >保存</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { PublicModule, KitchenModule, OrderModule } from "@/api/common";
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
      form: {
        id: 0,
        foodThumb: "",
        foodName: "",
        foodCat: "",
        foodDesc: "",
        price: "",
        foodType: "",
        createTime: "",
      },
      formInline: {
        foodName: "",
      },
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      foodType: {
        NORMAL: "可存餐柜",
        FLUIDS: "非存餐柜",
      },
      foodCat: {
        HOT: "热菜",
        COLD: "凉菜",
        STAPLE: "主食",
        PASTRY: "面点",
      },
      rules: {
        foodName: [
          {
            required: true,
            message: "请输入菜品名称",
            trigger: ["blur", "change"],
          },
          {
            required: true,
            min: 2,
            max: 128,
            message: "菜品名称不能小于2或大于128个字符",
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
        foodCat: [{ required: true, message: "请选择分类", trigger: "change" }],
        foodType: [
          { required: true, message: "请选择类型", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    getAdminList(pageIndex = 1, pageSize = 15) {
      let datas = {
        foodName: this.formInline.foodName,
        pageIndex: pageIndex,
        pageSize: pageSize,
      };
      KitchenModule.getFoodList(datas).then((res) => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({
              rowId: rowId,
              id: el.id,
              foodName: el.foodName,
              foodCat: this.foodCat[el.foodCat],
              price: el.price,
              foodType: this.foodType[el.foodType],
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
    getFoodInfo(id) {
      KitchenModule.getFoodInfo(id).then((res) => {
        if (res.data) {
          let data = res.data;

          let info = {
            id: data.id,
            foodThumb: data.foodThumb,
            foodName: data.foodName,
            foodCat: data.foodCat,
            foodDesc: data.foodDesc,
            price: data.price,
            foodType: data.foodType,
            createTime: data.createTime,
          };

          this.form = info;
        }
      });
    },
    addFoodInfo() {
      let data = {
        foodThumb: this.form.foodThumb,
        foodName: this.form.foodName,
        foodCat: this.form.foodCat,
        foodDesc: this.form.foodDesc,
        price: this.form.price,
      };
      KitchenModule.addFoodInfo(data).then((res) => {
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
    updateFoodInfo() {
      let data = {
        id: this.form.id,
        foodThumb: this.form.foodThumb,
        foodName: this.form.foodName,
        foodCat: this.form.foodCat,
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
    deleteFoodInfo(id) {
      OrderModule.deleteFoodInfo(id).then((res) => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getAdminList();
          }
        }
      });
    },
    clearForm() {
      if (this.$refs["ruleForm"]) {
        this.$refs["ruleForm"].resetFields();
      }

      this.form = {
        id: 0,
        foodName: "",
        foodDesc: "",
        foodType: "",
        price: "",
      };
    },
    beforeFoodImgUpload() {},
    handleFoodImgSuccess() {},
    changeFoodImgChange(file, fileList) {
      console.log(file);

      const isJPG = file.raw.type === "image/jpeg";
      const isLt2M = file.raw.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      this.getBase64(file.raw).then((res) => {
        const params = res.split(",");
        if (params.length > 0) {
          this.uploadFoodImg(res);
        }
      });
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    uploadFoodImg(file) {
      let datas = {
        file: file,
      };
      OrderModule.uploadFoodImg(datas).then((res) => {
        if (res.data) {
          this.form.foodThumb = res.data.foodThumb;
        }
      });
    },
    // 查询
    submitForm() {
      this.getAdminList();
    },
    // 添加用户
    addUser() {
      this.formTitle = "新增菜品";
      this.isAdd = true;
      this.dialogVisible = true;
      this.clearForm();
    },
    goToDetail(id) {
      this.formTitle = "编辑菜品";
      this.isAdd = false;
      this.dialogVisible = true;
      this.clearForm();
      this.getFoodInfo(id);
    },
    // 提交添加用户
    submitAddForm(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.addFoodInfo();
          } else {
            this.updateFoodInfo();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消提交
    cancelForm() {
      this.dialogVisible = false;
    },
    // 删除
    deleteFood(row) {
      this.$confirm(`是否删除菜品名称为"${row.foodName}"的菜品?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteFoodInfo(row.id);
          // 成功后回掉
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          // });
        });
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

.thumb {
  width: 160px;
  height: 160px;
  border: 1px solid #cccccc;
}
</style>
