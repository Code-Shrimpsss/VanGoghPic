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
          <el-form-item label="画册名称">
            <el-input
              v-model="form.name"
              maxlength="8"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="类型选择">
            <el-select v-model="form.region" p laceholder="请选择活动区域">
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
              <el-radio label="个人可见"></el-radio>
              <el-radio label="公开画册"></el-radio>
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
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
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
          action="http://192.168.177.129:8000/updata/images"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="24"
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
import {GetAllType} from "@/api/imgAPI";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      favoriteList: "",
      form: {
        name: "",
        region: "",
        resource: "",
        desc: "",
      },
      types: [],
    };
  },
  components: {
    footers,
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async GetAllType() {
      const { data: res } = await GetAllType();
      this.types = res.lists;
    },
  },
  created() {
    this.GetAllType();
  },
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