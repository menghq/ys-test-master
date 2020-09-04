<template>
    <div class="account-wapper">
        <el-dialog :title="title" :visible.sync="this.syncToggle" class="alertbox" :show-close="true" :close-on-click-modal=false :before-close="delebox" width="580px">
            <el-form :inline="true" :inline-message="false" :status-icon='true' size="mini" :model="ruleForm" :rules="rules" ref="dialogForm" class="" label-width="">
                <div class="form">
                    <el-form-item  label="姓名" prop="name">
                        <el-input size="mini" clearable v-model.trim="ruleForm.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item  label="手机号" prop="phoneNum" style="position: relative;">
                        <el-input size="mini" clearable v-model.trim="ruleForm.phoneNum" placeholder="请输入手机号码"></el-input>
                        <!-- <el-alert
                            title="手机号即登录账号，账号创建后初始密码为123456"
                            type="info"
                            show-icon>
                        </el-alert> -->
                        <div style="font-size: 12px;color:#909399;position: absolute;top: 2px;left: 200px;width: 285px;"><i class="el-alert__icon el-icon-info"></i><span class="">手机号即登录账号，账号创建后初始密码为123456</span></div>
                    </el-form-item>
                    <el-form-item label="角色" prop="role">
                        <el-radio-group v-model="ruleForm.role">
                            <el-radio label="管理员"></el-radio>
                            <el-radio label="配送员"></el-radio>
                            <el-radio label="财务"></el-radio>
                        </el-radio-group>
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
export default {
    data() {
        return {
            canclebox: false,
            ruleForm: {
                name: '',
                phoneNum: '',
                role: ''
            },
            rules: {
                name: [
					{ required: true, message: '该项为必填项' },
                ],
                phoneNum: [
					{ required: true, message: '该项为必填项' },
                ],
                role: [
                    { required: true, message: '该项为必填项', trigger: 'change' },
                ]
            },
        }
    },
    props: ['syncToggle', 'title', 'oprationData', 'operationType'],
    methods: {
        addData(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 取消新增
        delebox(el) {
            if(this.operationType === "add"){
              this.$refs['dialogForm'].resetFields();
			}
            this.$emit('canclebox');
        }
    }
}
</script>
<style lang="" scoped>
    .account-wapper /deep/ .el-form-item__label{
        font-size: 13px!important;
    }
    .form /deep/ .el-form-item__label{
        width: 65px;
    }
    .form /deep/ .el-form-item{
        display: block;
    }
</style>