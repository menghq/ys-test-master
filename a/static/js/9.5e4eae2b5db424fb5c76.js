webpackJsonp([9],{GeN5:function(e,t){},TRZm:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("t5DY"),a={name:"userList",data:function(){return{isAdd:!1,dialogVisible:!1,importDialogVisible:!1,form:{id:"",gradeId:"",dinerType:"",dinerName:"",mobilePhone:"",status:"0",gradeData:[]},formImport:{previewName:"",file:""},formInline:{gradeId:"",dinerName:"",mobilePhone:""},dinerTypeArr:{STAFF:"正式职工",JOBBER:"临时职工",OTHERS:"其他人员"},statusArr:{0:"正常",1:"停餐"},gradeData:[],listData:[],pageIndex:1,pageSize:15,pageTotal:0,rules:{gradeId:[{required:!0,message:"请选择部门",trigger:["blur","change"]}],studentName:[{required:!0,message:"请输入姓名",trigger:["blur","change"]}]}}},methods:{getDinerList:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15,a={gradeId:Number(this.formInline.gradeId),dinerName:this.formInline.dinerName,mobilePhone:this.formInline.mobilePhone,pageIndex:t,pageSize:i};r.e.getDinerList(a).then(function(r){var a=[],n=0,s=(t-1)*i+1;r.data&&(r.data.list.forEach(function(t,i){a.push({rowId:s,id:t.id,dinerName:t.dinerName,dinerType:e.dinerTypeArr[t.dinerType],gradeName:t.gradeName,money:t.money,status:e.statusArr[t.status],createTime:t.createTime}),s++}),n=r.data.total),e.listData=a,e.pageTotal=n})},getGradeSelect:function(){var e=this;this.classData=[];r.d.getGradeSelect({}).then(function(t){if(t.data){var i=[];t.data.list.forEach(function(e,t){i.push({id:e.id,name:e.gradeName})}),e.gradeData=i}})},getFormGradeSelect:function(){var e=this;this.form.classData=[];r.d.getGradeSelect({}).then(function(t){if(t.data){var i=[];t.data.list.forEach(function(e,t){i.push({id:e.id,name:e.gradeName})}),e.form.gradeData=i}})},getDinerInfo:function(e){var t=this;r.e.getDinerInfo(e).then(function(e){if(e.data){var i=e.data;t.form.id=i.id,t.form.gradeId=i.gradeId,t.form.gradeName=i.gradeName,t.form.dinerType=i.dinerType,t.form.dinerName=i.dinerName,t.form.mobilePhone=i.mobilePhone,t.form.status=i.status+"",t.getFormGradeSelect()}})},addDinerInfo:function(){var e=this,t={gradeId:Number(this.form.gradeId),dinerType:this.form.dinerType,dinerName:this.form.dinerName,mobilePhone:this.form.mobilePhone,status:this.form.status};r.e.addDinerInfo(t).then(function(t){t.data&&(0==t.data.err?(e.$message({type:"success",message:"保存成功!"}),e.dialogVisible=!1,e.getDinerList()):e.$message({type:"error",message:"保存失败!"}))})},updateDinerInfo:function(){var e=this,t={id:this.form.id,gradeId:Number(this.form.gradeId),dinerType:this.form.dinerType,dinerName:this.form.dinerName,mobilePhone:this.form.mobilePhone,status:this.form.status};r.e.updateDinerInfo(t).then(function(t){t.data&&(0==t.data.err?(e.$message({type:"success",message:"保存成功!"}),e.dialogVisible=!1,e.getDinerList()):1==t.data.err?e.$message({type:"error",message:"请选择部门!"}):2==t.data.err&&e.$message({type:"error",message:"请选择菜单!"}))})},deleteDinerInfo:function(e){var t=this;r.e.deleteDinerInfo(e).then(function(e){e.data&&0==e.data.err&&(t.$message({type:"success",message:"删除成功!"}),t.getDinerList())})},submitForm:function(){this.getDinerList()},getUser:function(e){this.isAdd=!1,this.form.id="",this.form.gradeId="",this.form.dinerType="",this.form.dinerName="",this.form.mobilePhone="",this.form.status="",this.dialogVisible=!0,this.getDinerInfo(e.id),this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},addUser:function(){this.isAdd=!0,this.form.id="",this.form.gradeId="",this.form.dinerType="",this.form.dinerName="",this.form.mobilePhone="",this.dialogVisible=!0,this.getFormGradeSelect(),this.$refs.ruleForm&&this.$refs.ruleForm.resetFields()},submitAddForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.isAdd?t.addDinerInfo():t.updateDinerInfo()})},submitImportForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.importDiner()})},cancelForm:function(e){this.dialogVisible=!1},deleteUser:function(e){var t=this;this.$confirm("是否删除人员?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.deleteDinerInfo(e.id)}).catch(function(){})},handleSizeChange:function(e){this.pageSize=e,this.getDinerList(this.pageIndex,e)},handleCurrentChange:function(e){this.pageIndex=e,this.getDinerList(e,this.pageSize)}},mounted:function(){this.getGradeSelect(),this.getDinerList()}},n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"userList"},[i("div",{staticClass:"wrapper"},[i("div",{staticClass:"queryList"},[i("el-form",{staticClass:"form-inline",attrs:{inline:!0,model:e.formInline}},[i("el-row",[i("el-col",{attrs:{span:18}},[i("el-form-item",{staticStyle:{width:"150px"},attrs:{prop:"gradeId"}},[i("el-select",{attrs:{clearable:"",placeholder:"请选择部门",size:"small"},model:{value:e.formInline.gradeId,callback:function(t){e.$set(e.formInline,"gradeId","string"==typeof t?t.trim():t)},expression:"formInline.gradeId"}},e._l(e.gradeData,function(t,r){return i("el-option",{key:e._uid+"_"+r,attrs:{"element-loading-spinner":"el-icon-loading",label:t.name,value:t.id}})}),1)],1),e._v(" "),i("el-form-item",{staticStyle:{width:"120px"},attrs:{prop:"dinerName"}},[i("el-input",{attrs:{size:"small",clearable:"",placeholder:"请输入姓名"},model:{value:e.formInline.dinerName,callback:function(t){e.$set(e.formInline,"dinerName","string"==typeof t?t.trim():t)},expression:"formInline.dinerName"}})],1),e._v(" "),i("el-form-item",{staticStyle:{width:"150px"},attrs:{prop:"mobilePhone"}},[i("el-input",{attrs:{type:"number",size:"small",clearable:"",placeholder:"请输入电话"},model:{value:e.formInline.mobilePhone,callback:function(t){e.$set(e.formInline,"mobilePhone","string"==typeof t?t.trim():t)},expression:"formInline.mobilePhone"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:6}},[i("el-form-item",{staticStyle:{float:"right"}},[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.submitForm("formInline")}}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{size:"small",icon:"el-icon-plus",type:"default"},on:{click:e.addUser}},[e._v("添加人员")])],1)],1)],1)],1)],1),e._v(" "),i("div",{staticClass:"tableCom",staticStyle:{"margin-top":"15px"}},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[i("el-table-column",{attrs:{prop:"rowId",label:"序号",width:"50"}}),e._v(" "),i("el-table-column",{attrs:{prop:"dinerName",label:"姓名"}}),e._v(" "),i("el-table-column",{attrs:{prop:"gradeName",label:"部门"}}),e._v(" "),i("el-table-column",{attrs:{prop:"dinerType",label:"身份"}}),e._v(" "),i("el-table-column",{attrs:{prop:"money",label:"余额"}}),e._v(" "),i("el-table-column",{attrs:{prop:"status",label:"状态"}}),e._v(" "),i("el-table-column",{attrs:{prop:"createTime",label:"创建时间"}}),e._v(" "),i("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"text",size:"small"},on:{click:function(i){return e.getUser(t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{type:"text",size:"small"},on:{click:function(i){return e.deleteUser(t.row)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),i("div",{staticClass:"pagination",staticStyle:{"margin-top":"15px"}},[i("el-pagination",{attrs:{"page-sizes":[15,30,45,60],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:e.pageTotal},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),i("div",{staticClass:"dialogBox"},[i("el-dialog",{attrs:{title:e.isAdd?"添加人员":"编辑人员",visible:e.dialogVisible,"show-close":!0,width:"750px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("div",{staticClass:"wrapper"},[i("el-form",{ref:"ruleForm",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[i("el-row",[i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:"部门：",prop:"classId"}},[i("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择部门",size:"small"},model:{value:e.form.gradeId,callback:function(t){e.$set(e.form,"gradeId","string"==typeof t?t.trim():t)},expression:"form.gradeId"}},e._l(e.form.gradeData,function(t,r){return i("el-option",{key:e._uid+"_"+r,attrs:{"element-loading-spinner":"el-icon-loading",label:t.name,value:t.id}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"角色：",prop:"dinerType"}},[i("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择角色",size:"small"},model:{value:e.form.dinerType,callback:function(t){e.$set(e.form,"dinerType","string"==typeof t?t.trim():t)},expression:"form.dinerType"}},e._l(e.dinerTypeArr,function(t,r){return i("el-option",{key:e._uid+"_"+r,attrs:{"element-loading-spinner":"el-icon-loading",label:t,value:r}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"姓名：",prop:"dinerName"}},[i("el-input",{staticStyle:{width:"180px"},attrs:{size:"small",clearable:"",placeholder:"请输入姓名"},model:{value:e.form.dinerName,callback:function(t){e.$set(e.form,"dinerName","string"==typeof t?t.trim():t)},expression:"form.dinerName"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"电话：",prop:"mobilePhone"}},[i("el-input",{staticStyle:{width:"180px"},attrs:{size:"small",clearable:"",placeholder:"请输入电话号码"},model:{value:e.form.mobilePhone,callback:function(t){e.$set(e.form,"mobilePhone","string"==typeof t?t.trim():t)},expression:"form.mobilePhone"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"状态：",prop:"status"}},[i("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择状态",size:"small"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status","string"==typeof t?t.trim():t)},expression:"form.status"}},e._l(e.statusArr,function(t,r){return i("el-option",{key:e._uid+"_"+r,attrs:{"element-loading-spinner":"el-icon-loading",label:t,value:r}})}),1)],1)],1)],1)],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.cancelForm("ruleForm")}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.submitAddForm("ruleForm")}}},[e._v("确 定")])],1)])],1)])])},staticRenderFns:[]};var s=i("VU/8")(a,n,!1,function(e){i("GeN5")},null,null);t.default=s.exports}});
//# sourceMappingURL=9.5e4eae2b5db424fb5c76.js.map