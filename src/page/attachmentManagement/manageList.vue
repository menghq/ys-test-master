<template>
  <div class="userList">
    <div class="wrapper">
      <div class="queryList">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-row>
            <el-col :span="18">
              <el-form-item style="width:150px;" prop="gradeName">
                <el-input size="small" clearable v-model.trim="formInline.title" placeholder="请输入标题"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="float: right;">
                <el-button size="small" type="primary" @click="submitForm('formInline')">查询</el-button>
                <el-button size="small" icon="el-icon-plus" type="default" @click="importUser">新增文件</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="tableCom" style="margin-top: 15px;">
        <el-table :data="listData" border style="width: 100%">
          <el-table-column prop="rowId" label='序号' width="50">
          </el-table-column>
          <el-table-column prop="title" label='标题'>
          </el-table-column>
          <el-table-column prop="createTime" label='上传时间' width="200">
          </el-table-column>
          <el-table-column label='操作' width='100'>
            <template slot-scope="scope">
              <el-button @click="download(scope.row.id)" type="text" size="small">下载</el-button>
              <el-button @click="deleteAttachment(scope.row)" type="text" size="small">删除</el-button>
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
        <el-dialog title="新增文件" :visible.sync="dialogVisible" :show-close="true" width="750px">
          <div class="wrapper">
            <el-form :model="form" :rules="rules" label-width="120px" ref="ruleForm">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="标题：" prop="title">
                    <el-input size="small" clearable v-model.trim="form.title" placeholder="请输入标题"></el-input>
                  </el-form-item>
                  <el-form-item label="文件：" prop="file">
                    <el-upload class="upload-demo" drag action="" :auto-upload="false" :show-file-list="false"
                      :on-change="handleImportPreview">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text" v-if="form.name==''">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__text" v-else>{{form.name}}</div>
                      <div class="el-upload__tip" slot="tip">上传文件不超过2M</div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelForm('ruleForm')" size="mini">取 消</el-button>
            <el-button type="primary" @click="submitImportForm('ruleForm')" size="mini">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { OrderModule } from "@/api/common";
export default {
  name: 'userList',
  data () {
    return {
      dialogVisible: false,
      formInline: {
        title: '',
      },
      form: {
        title: '',
        name: "",
        file: ""
      },
      listData: [],
      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: ['blur', 'change'] },
          { required: true, min: 2, max: 128, message: '标题不能小于2或大于128个字符', trigger: ['blur', 'change'] }
        ],
      }
    }
  },
  methods: {
    getAttachmentList (pageIndex = 1, pageSize = 15) {
      let datas = {
        title: this.formInline.title,
        catType: 2,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      OrderModule.getAttachmentList(datas).then(res => {
        let list = [];
        let total = 0;
        let rowId = (pageIndex - 1) * pageSize + 1;
        if (res.data) {
          res.data.list.forEach((el, i) => {
            list.push({

              rowId: rowId,
              id: el.id,
              title: el.title,
              url: el.url,
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
    // 查询
    submitForm () {
      this.getAttachmentList();
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val;
      this.getAttachmentList(this.pageIndex, val);
    },
    handleCurrentChange (val) {
      this.pageIndex = val;
      this.getAttachmentList(val, this.pageSize);
    },
    download (id) {
      OrderModule.getAttachmentDownload(id);
    },
    importUser () {
      this.form.title = '';
      this.form.name = '';
      this.form.file = '';
      this.dialogVisible = true;

      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields();
      }
    },
    importDiner () {
      let datas = {
        title: this.form.title,
        name: this.form.name,
        file: this.form.file,
        catType: 2,
      };
      OrderModule.addAttachmentInfo(datas).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.dialogVisible = false;
            this.getAttachmentList();
          } else if (res.data.err == 1) {
            this.$message({
              type: 'error',
              message: '上传文件类型必须为XLXS!'
            });
          } else if (res.data.err == 2) {
            this.$message({
              type: 'error',
              message: '上传文件不能超过2M!'
            });
          }
        }
      });
    },
    handleImportPreview (file) {
      console.log(file);

      const isLt2M = file.raw.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
        return;
      }

      this.getBase64(file.raw).then(res => {
        const params = res.split(',')
        if (params.length > 0) {
          this.form.name = file.name;
          this.form.file = res;
        }
      })
    },
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    cancelForm (formName) {
      this.dialogVisible = false;
    },
    submitImportForm (formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.importDiner();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    deleteAttachment (row) {
      this.$confirm(`是否删除文件?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteAttachmentInfo(row.id);
        // 成功后回掉
      }).catch(() => {
        // this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        // });          
      });
    },
    deleteAttachmentInfo (id) {
      OrderModule.deleteAttachmentInfo(id).then(res => {
        if (res.data) {
          if (res.data.err == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getAttachmentList();
          }
        }
      });
    },
  },
  mounted () {
    this.getAttachmentList();
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
.order-detail /deep/ .el-pagination {
  margin-top: 10px;
  font-size: 13px !important;
}
.queryList /deep/ .el-form-item__label {
  font-size: 13px !important;
}
.statistics .el-alert {
  margin: 10px 0;
}
.dialogBox /deep/ .el-form-item {
  margin-bottom: 12px;
}

.dialogBox /deep/ .el-form-item .el-form-item__label {
  font-size: 12px;
}
.dialogBox /deep/ .el-form-item .el-radio__label {
  font-size: 12px;
}
</style>