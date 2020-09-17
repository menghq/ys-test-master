webpackJsonp([6],{L4Z4:function(e,t){},"v/HL":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("t5DY"),a={name:"userList",data:function(){var e=this;return{isAdd:!1,formTitle:"",dialogVisible:!1,form:{id:0,userName:"",newPassword:"",repeatPassword:"",roleId:"",fullName:"",mobilePhone:"",status:1},formInline:{userName:"",userCode:"",mobilePhone:""},statusArr:{1:"正常",0:"停用"},roleData:[],listData:[],pageIndex:1,pageSize:15,pageTotal:0,newPasswordProp:null,roleIdProp:"roleId",rules:{userName:[{required:!0,message:"请输入用户名",trigger:["blur","change"]},{required:!0,pattern:/^[0-9a-z_]+$/,message:"用户名只能包含小写字母、数字和下划线",trigger:["blur","change"]},{required:!0,min:6,max:16,message:"用户名不能小于6或大于16个字符",trigger:["blur","change"]}],newPasswordAdd:[{required:!0,message:"请输入密码",trigger:["blur","change"]},{required:!0,min:6,message:"密码不能小于6个字符",trigger:["blur","change"]}],newPasswordUpdate:[{required:!1,min:6,message:"密码不能小于6个字符",trigger:["blur","change"]}],repeatPassword:[{required:!1,trigger:["blur","change"],validator:function(t,s,r){e.form.repeatPassword!=e.form.newPassword&&r(new Error("两次密码不一致")),r()}}],roleId:[{required:!0,message:"请选择角色",trigger:"change"}]}}},methods:{getAdminList:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15,a={userName:this.formInline.userName,studentNumber:this.formInline.userCode,mobilePhone:this.formInline.mobilePhone,pageIndex:t,pageSize:s};r.c.getAdminList(a).then(function(r){var a=[],i=0,o=(t-1)*s+1;r.data&&(r.data.list.forEach(function(t,s){a.push({rowId:o,id:t.id,userName:t.userName,roleName:t.roleName,fullName:t.fullName,mobilePhone:t.mobilePhone,createTime:t.createTime,status:e.statusArr[t.status]}),o++}),i=r.data.total),console.log(a),e.listData=a,e.pageTotal=i})},getAdminInfo:function(e){var t=this;r.c.getAdminInfo(e).then(function(e){if(e.data){var s=e.data,r={id:s.id,userName:s.userName,roleId:s.roleId,fullName:s.fullName,mobilePhone:s.mobilePhone,createTime:s.createTime,status:s.status};t.form=r}})},addAdminInfo:function(){var e=this,t={userName:this.form.userName,newPassword:this.form.newPassword,repeatPassword:this.form.repeatPassword,roleId:Number(this.form.roleId),fullName:this.form.fullName,mobilePhone:this.form.mobilePhone,status:this.form.status};r.c.addAdminInfo(t).then(function(t){t.data&&(0==t.data.err?(e.$message({type:"success",message:"保存成功!"}),e.dialogVisible=!1,e.getAdminList()):e.$message({type:"error",message:"保存失败!"}))})},updateAdminInfo:function(){var e=this,t={id:this.form.id,newPassword:this.form.newPassword,repeatPassword:this.form.repeatPassword,fullName:this.form.fullName,mobilePhone:this.form.mobilePhone,status:this.form.status};r.c.updateAdminInfo(t).then(function(t){t.data&&(0==t.data.err?(e.$message({type:"success",message:"保存成功!"}),e.dialogVisible=!1,e.getAdminList()):e.$message({type:"error",message:"保存失败!"}))})},deleteAdminInfo:function(e){var t=this;r.c.deleteAdminInfo(e).then(function(e){e.data&&0==e.data.err&&(t.$message({type:"success",message:"删除成功!"}),t.getAdminList())})},resetForm:function(){this.formInline.userName=""},clearForm:function(){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields(),this.form={id:0,userName:"",newPassword:"",repeatPassword:"",roleId:"",fullName:"",mobilePhone:"",status:1}},submitForm:function(){this.getAdminList()},addUser:function(){this.formTitle="新增系统用户",this.isAdd=!0,this.dialogVisible=!0,this.clearForm(),this.newPasswordProp=this.rules.newPasswordAdd,console.log(this.form)},goToDetail:function(e){this.formTitle="编辑系统用户",this.isAdd=!1,this.dialogVisible=!0,this.clearForm(),this.newPasswordProp=this.rules.newPasswordUpdate,this.getAdminInfo(e)},submitAddForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.isAdd?t.addAdminInfo():t.updateAdminInfo()})},cancelForm:function(){this.dialogVisible=!1},deleteUser:function(e){var t=this;this.$confirm('是否删除用户名为"'+e.userName+'"的用户?',"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.deleteAdminInfo(e.id)}).catch(function(){})},handleSizeChange:function(e){this.pageSize=e,this.getAdminList(this.pageIndex,e)},handleCurrentChange:function(e){this.pageIndex=e,this.getAdminList(e,this.pageSize)}},mounted:function(){this.getAdminList()}},i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"userList"},[s("div",{staticClass:"wrapper"},[s("div",{staticClass:"queryList"},[s("el-form",{staticClass:"form-inline",attrs:{inline:!0,model:e.formInline}},[s("el-row",[s("el-col",{attrs:{span:18}},[s("el-form-item",{staticStyle:{width:"150px"},attrs:{prop:"userName"}},[s("el-input",{attrs:{size:"small",clearable:"",placeholder:"请输入用户名"},model:{value:e.formInline.userName,callback:function(t){e.$set(e.formInline,"userName","string"==typeof t?t.trim():t)},expression:"formInline.userName"}})],1)],1),e._v(" "),s("el-col",{attrs:{span:6}},[s("el-form-item",{staticStyle:{float:"right"}},[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.submitForm("formInline")}}},[e._v("查询")]),e._v(" "),s("el-button",{attrs:{size:"small",icon:"el-icon-plus",type:"default"},on:{click:e.addUser}},[e._v("添加管理员")])],1)],1)],1)],1)],1),e._v(" "),s("div",{staticClass:"tableCom",staticStyle:{"margin-top":"15px"}},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:e.listData,border:""}},[s("el-table-column",{attrs:{prop:"rowId",label:"序号",width:"50"}}),e._v(" "),s("el-table-column",{attrs:{prop:"userName",width:"200",label:"用户名"}}),e._v(" "),s("el-table-column",{attrs:{prop:"mobilePhone",width:"200",label:"电话"}}),e._v(" "),s("el-table-column",{attrs:{prop:"createTime",label:"创建时间"}}),e._v(" "),s("el-table-column",{attrs:{prop:"status",width:"60",label:"状态"}}),e._v(" "),s("el-table-column",{staticStyle:{display:"none"},attrs:{fixed:"right",align:"center",label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{type:"text",size:"small"},on:{click:function(s){return e.goToDetail(t.row.id)}}},[e._v("详情")]),e._v(" "),s("el-button",{attrs:{type:"text",size:"small"},on:{click:function(s){return e.deleteUser(t.row)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),s("div",{staticClass:"pagination",staticStyle:{"margin-top":"15px"}},[s("el-pagination",{attrs:{"page-sizes":[15,30,45,60],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:e.pageTotal},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),s("div",{staticClass:"dialogBox"},[s("el-dialog",{attrs:{title:e.formTitle,visible:e.dialogVisible,"show-close":!0,width:"750px"},on:{"update:visible":function(t){e.dialogVisible=t},close:e.cancelForm}},[s("div",{staticClass:"wrapper"},[s("div",[s("el-form",{ref:"ruleForm",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[s("el-row",[s("el-col",{attrs:{span:12}},[s("div",{staticClass:"grid-content bg-purple"},[e.isAdd?s("el-form-item",{attrs:{label:"用户名：",prop:"userName"}},[s("el-input",{staticStyle:{width:"180px"},attrs:{size:"small",clearable:"",placeholder:"请输入用户名"},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName","string"==typeof t?t.trim():t)},expression:"form.userName"}})],1):s("el-form-item",{attrs:{label:"用户名：",prop:"userName"}},[s("span",[e._v(e._s(e.form.userName))])]),e._v(" "),s("el-form-item",{attrs:{label:"新密码：",prop:"newPassword",rules:e.newPasswordProp}},[s("el-input",{staticStyle:{width:"180px"},attrs:{size:"small",clearable:"",type:"password","show-password":!0,placeholder:"请输入新密码"},model:{value:e.form.newPassword,callback:function(t){e.$set(e.form,"newPassword","string"==typeof t?t.trim():t)},expression:"form.newPassword"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"确认密码：",prop:"repeatPassword"}},[s("el-input",{staticStyle:{width:"180px"},attrs:{size:"small",clearable:"",type:"password","show-password":!0,placeholder:"请重复输入新密码"},model:{value:e.form.repeatPassword,callback:function(t){e.$set(e.form,"repeatPassword","string"==typeof t?t.trim():t)},expression:"form.repeatPassword"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"状态：",required:!0}},[s("el-radio-group",{model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[s("el-radio",{attrs:{label:1}},[e._v("正常")]),e._v(" "),s("el-radio",{attrs:{label:0}},[e._v("停用")])],1)],1),e._v(" "),0==e.isAdd?s("el-form-item",{attrs:{label:"创建时间：",prop:"createTime"}},[s("span",[e._v(e._s(e.form.createTime))])]):e._e()],1)]),e._v(" "),s("el-col",{attrs:{span:12}},[s("div",{staticStyle:{"border-left":"1px solid #cccccc"}},[s("el-form-item",{attrs:{label:"姓名：",prop:"fullName"}},[s("el-input",{staticStyle:{width:"180px"},attrs:{size:"small",clearable:"",placeholder:"请输入姓名"},model:{value:e.form.fullName,callback:function(t){e.$set(e.form,"fullName","string"==typeof t?t.trim():t)},expression:"form.fullName"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"电话：",prop:"mobilePhone"}},[s("el-input",{staticStyle:{width:"180px"},attrs:{size:"small",clearable:"",placeholder:"请输入电话号码"},model:{value:e.form.mobilePhone,callback:function(t){e.$set(e.form,"mobilePhone","string"==typeof t?t.trim():t)},expression:"form.mobilePhone"}})],1)],1)])],1)],1)],1)]),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.cancelForm()}}},[e._v("取消")]),e._v(" "),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.submitAddForm("ruleForm")}}},[e._v("保存")])],1)])],1)])])},staticRenderFns:[]};var o=s("VU/8")(a,i,!1,function(e){s("L4Z4")},null,null);t.default=o.exports}});
//# sourceMappingURL=6.7bc5aade65fd1e27f6c8.js.map