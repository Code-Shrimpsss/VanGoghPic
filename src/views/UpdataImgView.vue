<template>
  <div id="updataMain">
    <div class="headbox">
      <div class="leftheader">
        <el-button
          type="primary"
          class="rebtn"
          icon="el-icon-back"
          @click="$router.back(-1)"
        ></el-button>
        <h1 class="headtxt">上传图片</h1>
      </div>
    </div>
    <div class="main">
      <h2>注意事项</h2>
      <h4>图片上传需要达到清晰, 正能量</h4>
      <h4>禁止出现三毒,政治,宗教等任何违反道德的图片</h4>
      <!-- <header>
        <div class="hleft">
          <el-button class="btn" type="primary" @click="onSubmit">
            上传图片
          </el-button> 
        </div>
        <div class="hright">
        <el-button class="btn" type="primary" @click="onSubmit">
            上传图片
          </el-button> 
        </div>
      </header> -->
      <el-divider></el-divider>
      <h3>选择类型</h3>
      <el-tabs
        class="typebox"
        tab-position="top"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          class="tabText"
          v-for="(item, index) in types"
          :key="index"
          :label="item.name"
        >
        </el-tab-pane>
      </el-tabs>
      <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first"></el-tab-pane>
        <el-tab-pane label="配置管理" name="second"></el-tab-pane>
        <el-tab-pane label="角色管理" name="third"></el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
      </el-tabs> -->
      <div class="updataBox">
        <el-upload
          class="upload-demo"
          drag
          action="http://192.168.177.129:8000/updata/images"
          :on-success="handlePictureCardPreview"
          :on-remove="handleRemove"

          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过2MB
          </div>
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible"> -->
        <img width="100px" :src="dialogImageUrl" alt="" />
        <!-- </el-dialog> -->
        <el-button class="btn" type="primary" @click="onSubmit">
          上传图片
        </el-button>
      </div>
    </div>
    <footers class="footers"></footers>
  </div>
</template>

<script>
import footers from "../components/Footer.vue";
import { GetAllType } from "@/api/imgAPI";
import { UploadImg } from "@/api/imgAPI";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imgList: [],
      types: "",
      Goodid: 1,
      activeName: "",
    };
  },
  inject: ["reload"],
  methods: {
    update() {
      console.log("🚀 ~ file: Login.vue ~ line 262 ~ pageUpdate ~ pageUpdate");
      this.reload();
      console.log("刷新页面");
    },
    handleRemove(file, fileList) {
      this.imgList.map((item) => {
        console.log(item);
        console.log(item == file.response.authorImg);
        if (item == file.response.authorImg) {
          this.imgList.pop(item);
        }
      });
      console.log(file, fileList);
    },
    handlePictureCardPreview(file, fileList) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      this.imgList.push(file.authorImg);
    },
    async GetAllType() {
      const { data: res } = await GetAllType();
      this.types = res.lists;
    },
    handleClick(tab, event) {
      this.Goodid = Number(tab.index);
      this.Goodid++;
      console.log(this.Goodid, event);
    },
    async onSubmit() {
      console.log(this.imgList);
      // if (this.imgList.length == 0) {
      //   this.$message.error("请上传图片");
      //   return;
      // }
      // if (this.imgList.length > 6) {
      //   this.$message.error("最多上传6张图片");
      //   return;
      // }
      let data = {
        type: this.Goodid,
        imgList: this.imgList,
      };
      const { data: res } = await UploadImg(data);
      console.log(res);
      if (res.code == 200) {
        this.$message.success("上传成功");
        // this.update();
        this.$router.go(0);
      } else {
        this.$message.error("上传失败");
      }
    },
  },
  components: {
    footers,
  },
  created() {
    this.GetAllType();
  },
};
</script>

<style lang="less">
#updataMain {
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  height: 100vh;
}
.main {
  padding: 2% 20%;
  justify-content: space-between;
  align-items: center;
  .hleft,
  .hright {
    width: 40%;
    height: 50px;
  }
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
  justify-content: space-between;
  align-content: center;
  .leftheader {
    width: 240px;
    display: flex;
  }
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
.updataBox {
  padding: 20px 0;
  .btn {
    margin-top: 50px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 20px;
    font-weight: bold;
    border: 2px solid #fff;
  }
}
h3 {
  text-decoration: #fff;
  color: #fff;
  // font-weight: 600;
  // border-bottom: 5px solid #0081EF;
  margin-bottom: 5px;
  font-family: Georgia, "Times New Roman", Times, serif;
}
.el-upload__tip {
  margin-bottom: 20px;
}
.el-upload-list__item {
  height: 40px;
}
.el-tabs__nav-scroll {
  display: flex;
  justify-content: space-around;
}
</style>