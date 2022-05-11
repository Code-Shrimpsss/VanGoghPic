<template>
  <div id="createimg">
    <div class="headbox">
      <el-button
        type="primary"
        class="rebtn"
        icon="el-icon-back"
        @click="$router.back(-1)"
      ></el-button>
      <h1 class="headtxt">创建画册</h1>
    </div>
    <div class="CreateMain">
      <!-- 画册表单填写上传 -->
      <div class="leftBox">
        <el-form ref="form" :model="form" label-width="80px">
          <!-- <div class="rightText">
          <h3>填写画册信息</h3>
          <i> </i>
        </div> -->
          <el-form-item label="画册名称">
            <el-input
              v-model="form.title"
              maxlength="8"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="类型选择">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option
                v-for="(item, index) in types"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限选择">
            <el-radio-group v-model="form.resource">
              <el-radio label="公开画册"></el-radio>
              <el-radio label="个人可见"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="画册简介">
            <el-input
              type="textarea"
              v-model="form.desc"
              maxlength="500"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="onSubmit"
              >立即创建</el-button
            >
            <el-button class="btn" @click="$router.push('/')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 画册图片填写上传 -->
      <div class="rightBox">
        <div class="rightText">
          <h3>上传图片</h3>
          <i>* 默认会使用第一张图片为画册封面</i>
        </div>
        <el-upload
          :action="action"
          list-type="picture-card"
          :on-success="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="24"
          :multiple="true"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
    </div>
    <footers class="footers"></footers>
  </div>
</template>



<script>
import footers from "../components/Footer.vue";
import { GetAllType } from "@/api/imgAPI";
import { createAlbum } from "@/api/albumAPI";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      favoriteList: "",
      form: {
        username: this.$cookies.get("username"),
        title: "",
        region: "",
        resource: "公开画册",
        desc: "",
        imgLists: [],
      },
      types: [],
      action: "http://192.168.177.129:8000/updata/images",
    };
  },
  components: {
    footers,
  },
  methods: {
    // 在上传图片之前，先把图片的url存到数组中
    handlePictureCardPreview(file, fileList) {
      this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
      // this.form.imgLists.map((item, index) => {
      //   if (item.uid === fileList.uid) {
      //     this.form["imgLists"].push(index);
      //   }
      // });
      this.form.imgLists.push(file.authorImg);
    },
    // 删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.form.imgLists.map((item, index) => {
        if (item === file.response.authorImg) {
          this.form["imgLists"].pop(item);
        }
      });
      console.log("----", this.form.imgLists);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name} ？`);
    },
    // 获取所有的画册类型
    async GetAllType() {
      const { data: res } = await GetAllType();
      this.types = res.lists;
    },
    // 画册创建
    async getAlbumFrom() {
      this.form.resource == "公开画册"
        ? (this.form.resource = true)
        : (this.form.resource = false);
      // this.form.imgLists = this.form.imgLists.join(";");
      this.form["defaultImg"] = this.form.imgLists[0];
      console.log(typeof this.form.imgLists);
      // typeof this.form.imgLists == String
      //   ? this.form.imgLists
      //   : (this.form.imgLists = this.form.imgLists.join(";"));
      this.form.imgLists = this.form.imgLists.join(";");
      console.log(this.form.imgLists);
      console.log(this.form["defaultImg"]);
      console.log(this.form);
      const { data: res } = await createAlbum(this.form);
      if (res.code === 200) {
        this.$message.success("创建成功");
      } else {
        this.$message.error(res.errmsg);
      }
    },
    onSubmit() {
      this.getAlbumFrom();
      console.log(this.form);
    },
  },
  created() {
    // 在组件创建之前，先获取所有的画册类型
    this.GetAllType();
  },
  // watch: {
  //   form: {
  //     handler(newVal) {
  //       console.log(newVal);
  //     },
  // }
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
html,
body {
  height: 100%;
}
.footers,
.headbox {
  background-color: rgb(36, 37, 39);
  color: rgb(219, 219, 219);
  border: none;
  position: relative;
}
.footers {
  width: 90%;
  padding: 20px 5%;
  height: 180px;
}
.headbox {
  padding: 20px 10%;
  display: flex;
  justify-content: flex-start;
  align-content: center;

  .rebtn {
    width: 60px;
    height: 60px;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 20px;
    margin-right: 20px;
  }
  .headtxt {
    font-size: 40px;
  }
}
.CreateMain {
  padding: 80px 10%;
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  .leftBox,
  .rightBox {
    width: 50%;
  }
  .leftBox {
    padding-right: 40px;
    .btn {
      width: 100px;
      margin: 0 30px;
    }
  }
  .rightBox {
    padding-left: 40px;
    border-left: 1px solid gray;
  }
  .el-form-item__label {
    font-size: 16px;
    color: rgb(255, 255, 255);
  }
  .el-input__inner,
  .el-input el-input--suffix,
  .el-textarea__inner {
    width: 90%;
    margin: 0 10%;
  }
  .el-textarea__inner {
    height: 200px;
  }
  .el-radio__label {
    font-size: 16px;
    color: rgb(149, 88, 88);
  }
  .rightText {
    // width: 100%;
    margin-bottom: 40px;
    text-align: left;
    color: #fff;
    i {
      color: rgb(200, 200, 200);
    }
  }
}
</style>