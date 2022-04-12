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
    <div class="my">
      <div class="mianform">
        <div class="Pinfo">
          <h1>{{ listdata.username }}</h1>
          <p class="el-icon-cpu">
            &nbsp; id: <span icon="el-icon-edit">{{ listdata.pid }}</span>
          </p>
          <p class="el-icon-wind-power">
            &nbsp; hobby: &nbsp;<el-button type="primary">{{
              options[0].label
            }}</el-button>
            <el-button type="success">风景</el-button>
            <el-button type="info">宇宙</el-button>
          </p>
          <h3 class="el-icon-picture-outline-round">&nbsp;我的收藏夹</h3>
          <div class="collectBox">
            <div v-for="item in listdata.likeUrls" :key="item">
              <a><img class="likebox" :src="item" alt="" /></a>
              <a><img class="likebox" :src="item" alt="" /></a>
              <a><img class="likebox" :src="item" alt="" /></a>
            </div>
          </div>
          <h3 class="el-icon-magic-stick">&nbsp;选言</h3>
          <div class="txtbox">
            {{ listdata.pmessage }}
          </div>
        </div>
        <div>
         <div class="authorBox">
            <el-avatar class="authorimg" :src="listdata.authorUrl"></el-avatar>
          <el-button
            class="aubox"
            type="primary"
            icon="el-icon-sort"
            @click="Pshow = !Pshow"
            ></el-button>
            <!-- el-icon-setting -->
         </div>
          <button class="outLogin">退出登录</button>
        </div>
      </div>

      <transition name="el-zoom-in-left">
        <div class="modifybox" v-show="Pshow">
          <h1 class="headone">修改用户信息</h1>
          <div class="reinfo">
            <h4>用户名</h4>
            <el-input
              class="topm"
              placeholder="请输入要更改的用户名"
              v-model="rename"
              maxlength="20"
              :show-word-limit="true"
            >
              <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
            </el-input>
            <h4>爱好</h4>
            <el-select
              class="topm"
              v-model="value1"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <h4>选言</h4>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="listdata.pmessage"
            >
            </el-input>
          </div>
          <div class="reimg">
            <h4 class="topm">修改头像</h4>
            <el-upload
              class="avatar-uploader"
              action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="footbox">
            <el-button
              class="subbtn"
              type="primary"
              :plain="true"
              @click="submitForm('ruleForm')"
              >完成geng</el-button
            >
          </div>
        </div>
      </transition>
    </div>
    <footers class="footers"></footers>
  </div>
</template>



<script>
import footers from "../components/Footer.vue";
export default {
  data() {
    return {
      // 更改信息的参数
      ruleFrom: {
        rename: "",
        rehobby: "",
        reimg: "",
        remessage: "",
      },
      imageUrl: "",
      // 主要数据源
      listdata: {
        username: "坂本龙一",
        pid: "w897612",
        authorUrl:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        likeUrls: ["https://lipsum.app/312x208/000/fff"],
        pmessage:
          "世间的事情，往往失之毫厘，就会造成莫大的差异;世间的事情，往往失之毫厘，就会造成莫大的差异 -- 莎士比亚",
      },
      // 选项数据源
      options: [
        {
          value: "选项1",
          label: "风景",
        },
        {
          value: "选项2",
          label: "城市",
        },
        {
          value: "选项3",
          label: "宇宙",
        },
        {
          value: "选项4",
          label: "狗",
        },
        {
          value: "选项5",
          label: "美食",
        },
        {
          value: "选项6",
          label: "游戏",
        },
        {
          value: "选项7",
          label: "梵高",
        },
        {
          value: "选项8",
          label: "配件",
        },
      ],
      value1: [],
      Pshow: false,
    };
  },
  components: {
    footers,
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm(val) {
      console.log(val);
      // this.
      this.Pshow = !this.Pshow;

      if (val) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "警告哦，这是一条警告消息",
          type: "warning",
        });
      }
    },
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
  // padding: 1% 0;
  .mianform,
  .modifybox {
    width: 35%;
    height: 24.4371rem;
    padding: 5%;
    background-color: rgb(57, 58, 64);
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
  }
  .mianform {
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
    .authorBox{
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
    position: relative;
    .reinfo {
      position: relative;
      text-align: left;
      margin-top: 60px;
      .elinput {
        margin-top: 5px;
      }
    }
    .footbox {
      position: absolute;
      bottom: 70px;
      left: 357px;
      .subbtn {
        width: 120px;
        height: 40px;
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
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50%;
}
.topm {
  margin-bottom: 10px;
}

.outLogin {
  margin-top: 20px;
  padding: 10px;
}
</style>