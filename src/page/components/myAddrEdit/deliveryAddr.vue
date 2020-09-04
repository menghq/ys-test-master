<template>
    <div class="delivery-addr">
        <el-dialog :title="title" :visible.sync="this.syncToggle_deli" class="alertbox" :show-close="false" :close-on-click-modal=false :before-close="delebox" width="600px">
             <el-form :inline="true" :inline-message="false" :status-icon='true' size="mini" :model="ruleForm" :rules="rules" ref="dialogForm" class="" label-width="110px">
                 <div class="wrapper">
                     <el-form-item label="配送地址" prop="address">
                        <el-cascader
                            clearable
                            v-model="ruleForm.address"
                            :options="options"
                            @change="handleChange">
                        </el-cascader>
                        <el-input style="width: 196px;margin-left: 5px;" clearable v-model.trim="ruleForm.addrDetail" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="供餐餐段" prop="mealSection">
                        <el-checkbox-group v-model="ruleForm.mealSection">
                            <el-checkbox label="早餐" name="type"></el-checkbox>
                            <el-checkbox label="午餐" name="type"></el-checkbox>
                            <el-checkbox label="下午茶" name="type"></el-checkbox>
                            <el-checkbox label="晚餐" name="type"></el-checkbox>
                            <el-checkbox label="宵夜" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <div class="mealSectionTimeSet">
                        <span style="line-height: 28px;margin-left:80px;">午餐</span>
                        <el-form-item style="display: inline-block;" class="" label="截止订餐时间" prop="stopOrderTime_lunch">
                            <el-input style="width: 80px;margin-left: 5px;" clearable v-model.trim="ruleForm.stopOrderTime_lunch" placeholder="11:00"></el-input>
                        </el-form-item>
                        <el-form-item style="display: inline-block;" class="" label="用户取餐时间" prop="mealTakingTime_lunch">
                            <el-input style="width: 80px;margin-left: 5px;" clearable v-model.trim="ruleForm.mealTakingTime_lunch" placeholder="12:00"></el-input>
                        </el-form-item>
                    </div>
                    <div class="mealSectionTimeSet">
                        <span style="line-height: 28px;margin-left:80px;">晚餐</span>
                        <el-form-item style="display: inline-block;" class="" label="截止订餐时间" prop="stopOrderTime_dinner">
                            <el-input style="width: 80px;margin-left: 5px;" clearable v-model.trim="ruleForm.stopOrderTime_dinner" placeholder="11:00"></el-input>
                        </el-form-item>
                        <el-form-item style="display: inline-block;" class="" label="用户取餐时间" prop="mealTakingTime_dinner">
                            <el-input style="width: 80px;margin-left: 5px;" clearable v-model.trim="ruleForm.mealTakingTime_dinner" placeholder="12:00"></el-input>
                        </el-form-item>
                    </div>
                 </div>
             </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="delebox($event,'dialogForm')">取消</el-button>
                <el-button type="primary" size="small" @click="addData('dialogForm')">确定</el-button>	   
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
export default {
    data() {
        return {
            ruleForm: {
                address: '',
                addrDetail: '',
                mealSection: [],
                stopOrderTime_lunch: '',
                stopOrderTime_dinner: '',
                mealTakingTime_lunch: '',
                mealTakingTime_dinner: ''
            },
            canclebox: false,
            options: regionDataPlus, //三级联动地址选择
            rules: {
                address: [
					{ required: true, message: '该项为必填项' },
                ],
                addrDetail: [
					{ required: true, message: '该项为必填项' },
                ],
                mealSection: [
					{ required: true, message: '该项为必填项' },
                ],
                stopOrderTime_lunch: [
					{ required: true, message: '该项为必填项' },
                ],
                stopOrderTime_dinner: [
					{ required: true, message: '该项为必填项' },
                ],
                mealTakingTime_lunch: [
					{ required: true, message: '该项为必填项' },
                ],
                mealTakingTime_dinner: [
					{ required: true, message: '该项为必填项' },
                ]
            },
        }
    },
    props: ['syncToggle_deli', 'editdeliAddr', 'operationType', 'oprationData', 'title'],
    methods: {
        handleChange(el) {
            console.log(el);
        },
        addData(el){
			this.$refs[el].validate((valid) => {          
	          if (valid) {
                  // 修改
				  if(this.operationType=='modify'){
                    let params;
                    params = {
                        // 'sourceId':this.ruleForm.sourceId,
                    }
                    // collectionTaskModify(params).then(response => {
					// 	//规则修改成功以后，关闭并刷新table
					// 	let that=this
					// 	this.$alert('采集任务修改成功', {
					// 		confirmButtonText: '确定',
					// 		callback: action => {
					// 			this.$refs['vimForm'].resetFields()
					// 			that.delebox();
					// 			this.$emit('canclebox','onSubmit');
					// 		}
					// 	});
					// }).catch(error => {
					// 	console.log(error);
					// })
                  }else {
                    let params;
                    params = {
                       
                    }
                    // 新增
					// collectionTaskAdd(params).then(response => {
					// 	let that=this;
					// 	this.$alert('新增采集任务成功', {
					// 		confirmButtonText: '确定',
					// 		callback: action => {
    
                    //             that.delebox();
					// 			this.$emit('canclebox','onSubmit')
					// 		}
					// 	});
					// }).catch(error => {
                    //     console.log(error)
					// })
                  }
                } else {
                    return false;
                } 
			})
		},
        // 取消新增
        delebox(el) {
            this.$refs['dialogForm'].resetFields();
            this.$emit('canclebox');
        }
    },
    watch:{
		syncToggle_deli(n, o){	
			if(!n){
				return ;
			}			
            console.log(this.operationType)
            if(this.operationType=='modify'){
                this.ruleForm.addrDetail = this.oprationData.mealTakingAddr;
                this.oprationData.deliveryInfoList.forEach((item, i) => {
                    // console.log(item);
                    this.ruleForm.mealSection.push(item.mealSection);
                })
                this.ruleForm.stopOrderTime_lunch = this.oprationData.deliveryInfoList[0].DeadlineForOrdering || '';
                this.ruleForm.mealTakingTime_lunch = this.oprationData.deliveryInfoList[0].mealTakingTime || '';
                this.ruleForm.stopOrderTime_dinner = this.oprationData.deliveryInfoList[1].DeadlineForOrdering || '';
                this.ruleForm.mealTakingTime_dinner = this.oprationData.deliveryInfoList[1].mealTakingTime || '';
                console.log(this.oprationData)
      	    }else {
                this.ruleForm = {	
                    address: '',
                    addrDetail: '',
                    mealSection: [],
                    stopOrderTime_lunch: '',
                    stopOrderTime_dinner: '',
                    mealTakingTime_lunch: '',	
                    mealTakingTime_dinner: ''
                }
            }	
        }
    }
}
</script>
<style lang="" scoped>
    .delivery-addr /deep/ .el-form-item__label, .delivery-addr /deep/ .el-checkbox__label{
        font-size: 13px!important;
    }
</style>