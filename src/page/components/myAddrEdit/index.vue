<template>
    <div class="my-addrEdit">
        <el-dialog :title="title" :visible.sync="this.syncToggle" class="alertbox" :show-close="false" :close-on-click-modal=false :before-close="delebox" width="600px">
            <el-form :inline="true" :inline-message="false" :status-icon='true' size="mini" :model="ruleForm" :rules="rules" ref="dialogForm" class="" label-width="110px">
                <div class="wrapper">
                    <el-form-item label="门店名称" prop="shopName" style="position: relative;">
                        <el-input clearable v-model.trim="ruleForm.shopName" placeholder="请输入名称"></el-input>
                        <div style="font-size: 12px;color:#909399;position: absolute;top: 2px;left: 200px;width: 285px;"><i class="el-alert__icon el-icon-info"></i><span class="">审核通过后方可修改门店名称</span></div>
                    </el-form-item>
                    <el-form-item label="门店地址" prop="shopAddr" >
                        <el-cascader
                            clearable
                            v-model="ruleForm.editAddr"
                            :options="options"
                            @change="handleChange">
                        </el-cascader>
                        <el-input style="width: 196px;margin-left: 5px;" clearable v-model.trim="ruleForm.addrDetail" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="门店电话" prop="shopPhone">
                        <el-input clearable v-model.trim="ruleForm.shopPhone" placeholder="请输入名称"></el-input>
                    </el-form-item>
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
                shopName: '',
                editAddr: '',
                addrDetail: '',
                shopPhone: ''
            },
            options: regionDataPlus, //三级联动地址选择
            rules: {},
            canclebox: false,
        }
    },
    props: ['syncToggle', 'title', 'editShopAddr'],
    methods: {
        handleChange(val) {
            console.log(this.ruleForm.editAddr)
        },
        // 取消新增
        delebox(el) {
            this.$refs['dialogForm'].resetFields();
            this.$emit('canclebox');
        }
    },
    watch: {
        syncToggle(n, o) {
            if(!n){
			    return ;
            }
            console.log(this.editShopAddr);
            this.ruleForm.shopName = this.editShopAddr.name;
            this.ruleForm.addrDetail = this.editShopAddr.addr;
            this.ruleForm.shopPhone = this.editShopAddr.phoneNum;
        }
    }
}
</script>
<style lang="" scoped>
    
</style>