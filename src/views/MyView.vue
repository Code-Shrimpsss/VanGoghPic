<template>
  <div id="my">
    <div class="headbox">
      <el-button
        type="primary"
        class="rebtn"
        icon="el-icon-back"
        @click="$router.back(-1)"
      ></el-button>
      <h1 class="headtxt">个人主页</h1>
    </div>
    <!--  -->
    <div class="my" v-if="listdata">
      <div class="mianform">
        <div class="Pinfo">
          <h1>{{ listdata.username }}</h1>
          <p class="el-icon-cpu">
            &nbsp; 第<span icon="el-icon-edit"> {{ listdata.id }} </span
            >位收藏家
          </p>
          <p class="el-icon-wind-power">
            &nbsp; hobby : &nbsp;
            <el-button
              class="btn"
              v-for="item in listdata.hobbys"
              :key="item"
              type="primary"
              >{{ item }}</el-button
            >
          </p>
          <!-- <h3 class="el-icon-picture-outline-round">&nbsp;我的收藏夹</h3>
          <div class="collectBox">
            <div v-for="item in likeUrls" :key="item">
              <a><img class="likebox" :src="item" alt="" /></a>
              <a><img class="likebox" :src="item" alt="" /></a>
              <a><img class="likebox" :src="item" alt="" /></a>
            </div>
          </div> -->
          <h3 class="el-icon-magic-stick">&nbsp;选言</h3>
          <div class="txtbox">
            {{ listdata.signature }}
          </div>
        </div>
        <div>
          <div class="authorBox">
            <el-avatar class="authorimg" :src="listdata.author_img"></el-avatar>
            <el-button
              class="aubox"
              type="primary"
              icon="el-icon-sort"
              @click="Pshow = !Pshow"
            ></el-button>
            <!-- el-icon-setting -->
          </div>
          <button class="outLogin" @click="logout()">退出登录</button>
        </div>
      </div>
      <!-- el-fade-in-linear -->
      <transition name="el-zoom-in-left">
        <div class="modifybox" v-show="Pshow">
          <h1 class="headone">修改用户信息</h1>
          <div class="Tbox">
            <div class="reinfo">
              <h4>用户名</h4>
              <el-input
                class="topm"
                placeholder="请输入要更改的用户名"
                v-model="ruleFrom.rename"
                maxlength="20"
                :show-word-limit="true"
                :rules="[
                  {
                    min: 6,
                    max: 20,
                    message: '长度在 6 到 20 个字符',
                    trigger: 'blur',
                  },
                ]"
                :validate-on-rule-change="true"
              >
                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
              </el-input>
              <h4>爱好</h4>
              <!-- <i>*&nbsp;最多为3个</i> -->
              <el-select
                class="topm"
                v-model="ruleFrom.rehobbys"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="可以自己输入喜好"
                :multiple-limit="3"
              >
                <el-option v-for="item in options" :key="item" :value="item">
                </el-option>
              </el-select>
              <h4>选言</h4>
              <el-input
                class="textareaBox"
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 8 }"
                placeholder="请输入内容"
                v-model="ruleFrom.remessage"
              >
              </el-input>
            </div>
            <div class="reimg">
              <h4 class="topm">修改头像</h4>
              <el-upload
                class="avatar-uploader"
                :action="AvatarUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <!-- 选取文件后立即进行上传 :auto-upload="false" -->
                <img v-if="urlImg" :src="urlImg" class="avatar" />
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="footbox">
                <el-button
                  class="subbtn"
                  type="warning"
                  :plain="true"
                  @click="Pshow = !Pshow;"
                  >取消修改</el-button
                >
                <el-button
                  class="subbtn"
                  type="primary"
                  :plain="true"
                  @click="submitForm(ruleFrom)"
                  >完成geng</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <footers class="footers"></footers>
  </div>
</template>



<script>
import footers from "../components/Footer.vue";
import { getUserDate, ReviseUser } from "@/api/userAPi";
export default {
  data() {
    return {
      // 更改信息的参数
      ruleFrom: {
        username: this.$cookies.get("username"),
        rename: "",
        rehobbys: "",
        reimg: "",
        remessage: "",
      },
      urlImg: "",
      // 主要数据源
      likeUrls: ["https://lipsum.app/312x208/000/fff"],
      listdata: {},
      // 选项数据源
      options: ["风景", "城市", "自然", "人物", "动物", "其他"],
      Pshow: false,
      AvatarUrl: "http://192.168.177.129:8000/updata/images",
    };
  },
  components: {
    footers,
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(file);
      console.log(res);
      this.urlImg = URL.createObjectURL(file.raw);
      this.ruleFrom.reimg = res.authorImg;
      // this.ruleFrom.reimg = file;
      // console.log(this.ruleFrom.reimg);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 或 GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 提交修改
    async submitForm(val) {
      // this.$refs[val].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      const { data: res } = await ReviseUser(val);
      if (res.code === 200) {
        console.log(res);
        this.$cookies.set("username", res.data);
        this.$message.success("修改成功");
        this.Pshow = false;
        this.infoUser();
      } else {
        this.$message.error("修改失败");
      }
    },
    logout() {
      // 1.删除cookies中的用户信息
      this.$cookies.remove("username");
      this.$cookies.remove("token");
      this.$message.info("退出成功");
      this.$router.push("/");
    },
    // 显示用户数据
    async infoUser() {
      let user = this.$cookies.get("username");
      const { data: res } = await getUserDate(user);
      this.listdata = res.data;
      // 将喜好通过<;>切割转换为数组 再截取前三位
      this.listdata.hobbys = res.data.hobby.split(";").slice(0, 3);
      console.log(res.data);
      // console.log(this.listdata.hobbys);
    },
    clearFrom(val) {
      this.ruleFrom = "";
      Pshow = !Pshow;
    }
  },
  created() {
    this.infoUser();
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
html,
body,
#my {
  height: 100%;
}
.footers,
.headbox {
  background-color: rgb(41, 45, 50);
  color: rgb(219, 219, 219);
  border: none;
  position: relative;
}
.footers {
  width: 90%;
  padding: 20px 5%;
  height: 180px;
}
.headone {
  position: absolute;
}
.headbox {
  padding: 20px 3%;
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
.my {
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: space-evenly;
  background-color: rgb(41, 45, 50);
  .mianform,
  .modifybox {
    width: 35%;
    height: 24.4371rem;
    padding: 5%;
    // padding-top: 3%;
    background-color: rgb(57, 58, 64);
    border-radius: 15px;
  }
  .mianform {
    animation: both;
    display: flex;
    justify-content: space-between;
    .Pinfo {
      position: relative;
      text-align: left;
      p {
        display: block;
        margin: 10px 0;
      }
      h3 {
        margin-top: 30px;
      }
      .collectBox {
        width: 100%;
        display: flex;
        // justify-content: space-evenly;
        justify-content: flex-start;
        padding-top: 5%;
        .likebox {
          width: 150px;
          margin-right: 10px;
        }
      }
      .txtbox {
        margin-top: 5%;
        // position: absolute;
        border: 1px solid rgb(94, 95, 101);
        border-radius: 20px;
        padding: 20px;
      }
    }
    .authorimg {
      width: 100px;
      height: 100px;
    }
    .authorBox {
      position: relative;
    }
    .aubox {
      // margin-top: 20px;
      position: absolute;
      left: 80px;
      bottom: 8px;
      padding: 5px;
    }
  }
  .modifybox {
    position: absolute;
    .reinfo {
      position: relative;
      text-align: left;
      margin-top: 60px;
      .elinput {
        margin-top: 5px;
      }
    }
    .footbox {
      margin-top: 155px;
      .subbtn {
        margin: 20px 0 0;
        width: 120px;
        height: 40px;
        display: block;
      }
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 50%;
}
.avatar {
  width: 105px;
  height: 105px;
  display: block;
  border-radius: 50%;
  position: absolute;
}
.topm {
  margin-bottom: 10px;
}

.outLogin {
  margin-top: 20px;
  padding: 10px;
}
// .el-textarea__inner {
//   min-height: 100px;
//   height: 170px;
//   position: absolute;
//   left: 20px;
// }
.reimg {
  margin-right: 50px;
}
.btn {
  padding: 5px;
}
.el-select-dropdown__item {
  text-align: center;
  margin: 0;
  padding: 0;
}
.Tbox {
  display: flex;
  justify-content: space-between;
}
</style>