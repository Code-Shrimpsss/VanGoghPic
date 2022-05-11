<template>
  <div>
    <el-upload class="avatar-uploader"
        ref="otherLicense"
        action
        :auto-upload="false"
        :on-preview="handlePicPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-change="otherSectionFile"
        list-type="picture-card"
        multiple>
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" class="avatar">
      </el-dialog>
  </div>
</template>

data(){
  return{
    fileList: {},
    dialogVisible: false,
    dialogImageUrl: ''
    }  
}

handlePicPreview(file){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
handleRemove(file, fileList) {
        this.fileList.map((item,index)=>{
          if(item.uid==file.uid){
            this.fileList.splice(index,1)
          }
        })
      },
beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
},

otherSectionFile(file){
        const typeArr = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
          const isJPG = typeArr.indexOf(file.raw.type) !== -1;
          const isLt3M = file.size / 1024 / 1024 < 3;
          if (!isJPG) {
            this.$message.error('只能是图片!');
            this.$refs.upload.clearFiles();
            this.otherFiles = null;
            return;
          }
          if (!isLt3M) {
            this.$message.error('上传图片大小不能超过 3MB!');
            this.$refs.upload.clearFiles();
            this.otherFiles = null;
            return;
          }
          this.otherFiles = file.raw;
          // FormData 对象
          var formData = new FormData();
          // 文件对象
          formData.append('file', this.otherFiles);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          methods: 'post'
        }
        this.axios.post("/api/upload/getObjectId",formData,config).then(res=>{
          this.fileList.push(file)
          if(res.data.flag == 'S'){
              this.otherPhotoObj = res.data.data.objectId
              this.otherPhoto = res.data.data.url
              this.otherLicense.push({
                certificationName: this.form.certificationName,
                certificationObj: this.otherPhotoObj,
                certificationUrl: this.otherPhoto
              })
          }else{
            this.$message.error(res.data.message)
          }
        })
      },


.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    background-color: #fff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 180px;
    height: 180px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
.avatar-uploader /deep/ .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 180px;
    height: 180px;
    margin: 0 8px 8px 0;
    display: inline-block;
}