<template>
  <div class="userList">
    <div class="wrapper">
      <el-form :model="formConfig" :rules="rules" label-width="150px" ref="ruleForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="早餐供餐时间：" prop="orderStartDate">
              <el-switch
                v-model="formConfig.openMealBreakfast"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
              <el-time-picker
                v-model="formConfig.mealBreakfastTimeVals"
                size="small"
                is-range
                arrow-control
                value-format="HH:mm:ss"
                range-separator="至"
                start-placeholder="选择开始时间"
                end-placeholder="选择结束时间"
              ></el-time-picker>
            </el-form-item>
            <el-form-item label="午餐供餐时间：" prop="orderEndDate">
              <el-switch
                v-model="formConfig.openMealLunch"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
              <el-time-picker
                v-model="formConfig.mealLunchTimeVals"
                size="small"
                is-range
                arrow-control
                value-format="HH:mm:ss"
                range-separator="至"
                start-placeholder="选择开始时间"
                end-placeholder="选择结束时间"
              ></el-time-picker>
            </el-form-item>
            <el-form-item label="晚餐供餐时间：" prop="orderEndDate">
              <el-switch
                v-model="formConfig.openMealDinner"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
              <el-time-picker
                v-model="formConfig.mealDinnerTimeVals"
                size="small"
                is-range
                arrow-control
                value-format="HH:mm:ss"
                range-separator="至"
                start-placeholder="选择开始时间"
                end-placeholder="选择结束时间"
              ></el-time-picker>
            </el-form-item>
            <el-form-item label="早餐预定：" prop="openBreakfast">
              <el-switch
                v-model="formConfig.openBreakfast"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
              <el-time-picker
                size="small"
                v-model="formConfig.breakfastTime"
                value-format="HH:mm:ss"
                style="width:140px;"
                :picker-options="{
      selectableRange: '05:00:00 - 09:00:00'
    }"
                placeholder="用餐时间"
              ></el-time-picker>
              <el-input
                size="small"
                clearable
                v-model.trim="formConfig.stopOrderBreakfastOffset"
                placeholder="停止预定分钟"
                style="width:140px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="午餐预定：" prop="openLunch">
              <el-switch
                v-model="formConfig.openLunch"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
              <el-time-picker
                size="small"
                v-model="formConfig.lunchTime"
                value-format="HH:mm:ss"
                style="width:140px;"
                :picker-options="{
      selectableRange: '10:00:00 - 14:00:00'
    }"
                placeholder="用餐时间"
              ></el-time-picker>
              <el-input
                size="small"
                clearable
                v-model.trim="formConfig.stopOrderLunchOffset"
                placeholder="停止预定分钟"
                style="width:140px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="晚餐预定：" prop="openDinner">
              <el-switch
                v-model="formConfig.openDinner"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
              <el-time-picker
                size="small"
                v-model="formConfig.dinnerTime"
                value-format="HH:mm:ss"
                style="width:140px;"
                :picker-options="{
      selectableRange: '16:00:00 - 20:00:00'
    }"
                placeholder="用餐时间"
              ></el-time-picker>
              <el-input
                size="small"
                clearable
                v-model.trim="formConfig.stopOrderDinnerOffset"
                placeholder="停止预定分钟"
                style="width:140px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="订餐模式：" prop="orderMode">
              <el-select v-model="formConfig.orderMode" size="small" placeholder="请选择订餐模式">
                <el-option
                  v-for="(item, index) in orderModeArr"
                  :key="index"
                  :label="item"
                  :value="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitAddForm('ruleForm')" size="mini">保存</el-button>
    </span>
  </div>
</template>
<script>
import { SchoolModule } from "@/api/common";
export default {
  name: "userList",
  data() {
    return {
      formConfig: {
        openMealBreakfast: true,
        openMealLunch: true,
        openMealDinner: true,

        mealBreakfastTimeVals: [],
        mealLunchTimeVals: [],
        mealDinnerTimeVals: [],

        openBreakfast: true,
        openLunch: true,
        openDinner: true,
        breakfastTime: "",
        lunchTime: "",
        dinnerTime: "",
        stopOrderBreakfastOffset: "",
        stopOrderLunchOffset: "",
        stopOrderDinnerOffset: "",
        orderMode: "WEEKLY",
      },
      orderModeArr: { DAILY: "每日", WEEKLY: "每周" },
      rules: {
        schoolName: [
          {
            required: true,
            message: "请输入名称",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    getSchoolConfigInfo() {
      let id = 1;
      SchoolModule.getSchoolConfigInfo(id).then((res) => {
        if (res.data) {
          let data = res.data;
          this.formConfig = {
            openMealBreakfast: data.openMealBreakfast == 1 ? true : false,
            openMealLunch: data.openMealLunch == 1 ? true : false,
            openMealDinner: data.openMealDinner == 1 ? true : false,
            
            mealBreakfastTimeVals: [data.mealBreakfastTimeStart, data.mealBreakfastTimeEnd],
            mealLunchTimeVals: [data.mealLunchTimeStart, data.mealLunchTimeEnd],
            mealDinnerTimeVals: [data.mealDinnerTimeStart, data.mealDinnerTimeEnd],

            openBreakfast: data.openBreakfast == 1 ? true : false,
            openLunch: data.openLunch == 1 ? true : false,
            openDinner: data.openDinner == 1 ? true : false,
            breakfastTime: data.breakfastTime,
            lunchTime: data.lunchTime,
            dinnerTime: data.dinnerTime,
            stopOrderBreakfastOffset: data.stopOrderBreakfastOffset,
            stopOrderLunchOffset: data.stopOrderLunchOffset,
            stopOrderDinnerOffset: data.stopOrderDinnerOffset,
            orderMode: data.orderMode,
          };
        }
      });
    },
    updateSchoolInfo() {
      let datas = {
        openMealBreakfast: Number(this.formConfig.openMealBreakfast),
        openMealLunch: Number(this.formConfig.openMealLunch),
        openMealDinner: Number(this.formConfig.openMealDinner),

        mealBreakfastTimeVals: this.formConfig.mealBreakfastTimeVals,
        mealLunchTimeVals: this.formConfig.mealLunchTimeVals,
        mealDinnerTimeVals: this.formConfig.mealDinnerTimeVals,

        openBreakfast: Number(this.formConfig.openBreakfast),
        openLunch: Number(this.formConfig.openLunch),
        openDinner: Number(this.formConfig.openDinner),
        breakfastTime: this.formConfig.breakfastTime,
        lunchTime: this.formConfig.lunchTime,
        dinnerTime: this.formConfig.dinnerTime,
        stopOrderBreakfastOffset: Number(this.formConfig.stopOrderBreakfastOffset),
        stopOrderLunchOffset: Number(this.formConfig.stopOrderLunchOffset),
        stopOrderDinnerOffset: Number(this.formConfig.stopOrderDinnerOffset),
        orderMode: this.formConfig.orderMode,
      };
      SchoolModule.updateSchoolInfo(datas).then((res) => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: "success",
              message: "保存成功!",
            });
          } else if (res.data.err == 1) {
            this.$message({
              type: "error",
              message: "无效的单位!",
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
    // 提交添加用户
    submitAddForm(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateSchoolInfo();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    this.getSchoolConfigInfo();
  },
};
</script>
<style lang="">
.dialog-footer {
  padding: 0 150px;
}
</style>