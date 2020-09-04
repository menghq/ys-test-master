<template>
    <div class="mealList-wapper">
        <el-dialog :title="title" :visible.sync="this.syncToggle" class="alertbox" :show-close="true" :close-on-click-modal=false :before-close="delebox" width="450px">
            <el-form :inline="true" :inline-message="false" :status-icon='true' size="mini" :model="ruleForm" :rules="rules" ref="dialogForm" class="" label-width="">
                <div class="form">
                    <el-form-item  label="菜名" prop="mealName">
                        <el-input size="mini" clearable v-model.trim="ruleForm.mealName" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item  label="价格" prop="price">
                        <el-input type="number" size="mini" clearable v-model.trim="ruleForm.price" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item  label="限量" prop="limitation">
                        <el-input type="number" size="mini" clearable v-model.trim="ruleForm.limitation" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="可供餐段" prop="type">
                        <el-checkbox-group v-model="ruleForm.type">
                            <el-checkbox label="午餐" name="type"></el-checkbox>
                            <el-checkbox label="晚餐" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="展示图" prop="showImg">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :file-list="imagelist"
                            :multiple = "multipleToggle"
                            :on-change = "handleChange"
                            :class="{ hide: hideUpload }"
                            :limit = imgNumLimit
                            :auto-upload="false">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                <img
                                    class="el-upload-list__item-thumbnail"
                                    :src="file.url" alt=""
                                >
                                <span class="el-upload-list__item-actions">
                                    <span
                                    class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)"
                                    >
                                    <i class="el-icon-zoom-in"></i>
                                    </span>
                                    <span
                                    v-if="!hide"
                                    class="el-upload-list__item-delete"
                                    @click="handleDownload(file)"
                                    >
                                    <i class="el-icon-download"></i>
                                    </span>
                                    <span
                                    v-if="!hide"
                                    class="el-upload-list__item-delete"
                                    @click="handleRemove(file)"
                                    >
                                    <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                            </div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
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
import { downloadIamge } from '../../../utils/tool'
export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            hide: false,
            multipleToggle: false,
            imgNumLimit: 1,
            imagelist: [], //name url

            canclebox: false,
            ruleForm: {
                mealName: '',
                price: '',
                limitation: '',
                type: [],
                showImg: ''
            },
            rules: {
                mealName: [
					{ required: true, message: '该项为必填项' },
                ],
                price: [
					{ required: true, message: '该项为必填项' },
                ],
                limitation: [
                    { required: true, message: '该项为必填项' },
                ],
                type: [
                    { required: true, message: '该项为必填项' },
                ],
                showImg: [
                    { required: true, message: '该项为必填项' },
                ]
            },
        }
    },
    props: ['syncToggle', 'title', 'oprationData', 'operationType'],
    computed: {
        hideUpload: function() {
            console.log(this.imagelist)
            return this.imagelist.length > 0;
        }
    },
    methods: {
        // 图片变动监听
        handleChange(file) {
            let obj = {};
            obj = Object.assign(obj, {name: file.name, url: file.url});
            this.imagelist.push(obj);
            // console.log(this.imagelist)
        },
        // 图片删除
        handleRemove(file) {
            this.imagelist = [];
            // console.log(file);
        },
        // 图片预览 
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 图片下载
        handleDownload(file) {
            downloadIamge(file.url, file.name)
            // console.log(file);
        },
        // 取消新增
        delebox(el) {
            if(this.operationType === "add"){
              this.$refs['dialogForm'].resetFields();
              this.imagelist = [];
			}
            this.$emit('canclebox');
        }
    }

}
</script>
<style lang="">
    .hide .el-upload--picture-card {
        display: none;
    }
    .mealList-wapper /deep/ .el-form-item__label{
        font-size: 13px!important;
    }
</style>