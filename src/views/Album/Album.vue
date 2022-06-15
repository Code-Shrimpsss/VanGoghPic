<template>
  <div id="albumPage" v-if="listData">
    <div class="headbox">
      <el-button
        type="primary"
        class="rebtn"
        icon="el-icon-back"
        @click="$router.back()"
      ></el-button>
      <h1 class="headtxt">{{ listData.title }}</h1>
    </div>
    <main v-if="!isshow">
      <div class="funbox">
        <div class="funLeft">
          <div @click="infoUser(listData.creator_id)">
            <el-avatar
              style="margin-left: 10px"
              :src="listData.author_img"
            ></el-avatar>
            <span>&nbsp;{{ listData.username }}</span>
          </div>
          <div>
            <!-- 留言框 -->
            <el-button
              class="starBtn"
              @click="drawer = true"
              type="primary"
              icon="el-icon-chat-line-square"
              circle
            ></el-button>
            <!-- 修改 -->
            <el-button
              v-if="isMy == true"
              :plain="true"
              class="starBtn"
              :icon="setting"
              v-on:click="isshow = true"
              circle
            ></el-button>
            <!-- $router.push({ path: '/album/updata/' + listData.id, params: { listData } }) -->
            <!-- 收藏 -->
            <el-button
              v-else
              :plain="true"
              class="starBtn"
              @click="stars()"
              :icon="star"
              type="warning"
              circle
            ></el-button>
          </div>
        </div>
        <div class="funRight">
          <p>{{ listData.expostitory }}</p>
        </div>
        <div class="createTime">
          <p class="el-icon-date">
            &nbsp;创建时间：{{ listData.created_time }}
          </p>
        </div>
        <div class="shareBox">
          <el-button @click="share_weibo">
            <i class="el-icon-share"></i>
            分享到微博
          </el-button>
        </div>
      </div>
      <div class="mainbox" ref="Ralbum">
        <el-image
          :preview-src-list="listData.img_list"
          class="liImg"
          v-for="url in listData.img_list"
          :key="url"
          :src="url"
          fit="cover"
          lazy
        ></el-image>
      </div>
    </main>
    <!-- <el-collapse-transition> -->
    <transition name="el-zoom-in-bottom">
      <div class="updataMain" v-show="isshow">
        <div class="updataLeft">
          <div class="Lbox">
            <el-tooltip
              class="item"
              effect="dark"
              content="标题最少为4个字,最多为8个字"
              placement="bottom"
            >
              <h3>
                修改标题&nbsp;<i class="el-icon-info" style="color: #fff"></i>
              </h3>
            </el-tooltip>
            <el-input
              v-model="listData.title"
              placeholder="请输入标题"
              clearable
            ></el-input>
            <el-tooltip
              class="item"
              effect="dark"
              content="描述最少50为个字,最多为200个字"
              placement="bottom"
            >
              <h3>
                修改描述&nbsp;<i class="el-icon-info" style="color: #fff"></i>
              </h3>
            </el-tooltip>
            <el-input
              type="textarea"
              v-model="listData.expostitory"
              placeholder="请输入描述"
              :autosize="{ minRows: 6, maxRows: 8 }"
              resize="none"
              :show-word-limit="true"
              clearable
            ></el-input>
          </div>
          <div class="Rbox">
            <el-button
              type="success"
              @click="updata()"
              class="updataBtn"
              icon="el-icon-edit"
              >确认修改</el-button
            >
            <el-button
              type="warning"
              @click="isshow = !isshow"
              class="missBtn"
              icon="el-icon-close"
              >取消修改</el-button
            >
          </div>
        </div>
        <div class="updataRight">
          <div style="display: flex; justify-content: space-between">
            <h3 style="margin-right: 10px">修改图片</h3>
            <!-- <p style="color: rgb(142 139 139); font-size: 14px; line-height: 3">
              画册最多容纳24张图片,最少上传6张图片
            </p> -->
            <el-tooltip
              class="item"
              effect="dark"
              content="画册最多容纳24张图片,最少上传6张图片"
              placement="top"
            >
              <span
                ref="limitSpan"
                style="color: rgb(142 139 139); line-height: 3"
              >
                {{ limit }} / 24 &nbsp;<i
                  class="el-icon-info"
                  style="color: #fff"
                ></i
              ></span>
            </el-tooltip>
          </div>
          <li v-for="(item, index) in listData.img_list" :key="index">
            <el-image
              class="upImg"
              style="width: 150px; height: 150px; border-radius: 5px"
              :src="item"
              fit="cover"
              @hover="isshow = false"
            >
            </el-image>
            <div class="delete-img"></div>
            <div class="delete-img">
              <el-popconfirm
                confirm-button-text="好的"
                cancel-button-text="算了"
                icon="el-icon-info"
                icon-color="red"
                title="确定删除吗？"
                @confirm="deleteImg(index)"
              >
                <i class="el-icon-delete" slot="reference"></i>
              </el-popconfirm>
            </div>
          </li>
          <div style="background: gray; height: 1px; margin-bottom: 10px"></div>
          <el-upload
            class="upload-demo"
            action="http://192.168.177.129:8000/updata/images"
            list-type="picture-card"
            :on-success="handlePictureCardPreview"
            :on-remove="handleRemove"
            :multiple="true"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :limit="24 - listData.img_list.length"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </div>
    </transition>
    <!-- </el-collapse-transition> -->
    <el-drawer
      :before-close="handleClose"
      :destroy-on-close="true"
      :withHeader="false"
      size="50%"
      :visible.sync="drawer"
      style="overflow-y: auto"
    >
      <comment :album_id="this.listData.id" @isclose="isclose"></comment>
    </el-drawer>
    <footers class="footers"></footers>
  </div>
</template>

<script>
import footers from "../../components/Footer.vue";
import comment from "../../components/Comment";
import {
  getSignAlbum,
  getFavorites,
  reFavorites,
  updataAlbum,
} from "@/api/albumAPI";

export default {
  data() {
    return {
      // 列表数据
      drawer: false, // 另留言框切换
      star: "el-icon-star-off", // 是否收藏icon
      setting: "el-icon-setting", // 设置icon
      listData: "", // 列表数据
      relist: [],
      limit: 6,
      // 是否喜欢
      islike: false,
      // 是否关闭
      toclose: true,
      // 是否是自己的
      isMy: false,
      // 是否显示修改框
      isshow: false,
      user_id: this.$cookies.get("user_id"),
    };
  },
  components: {
    footers,
    comment,
  },
  methods: {
    infoUser(cid) {
      let uid = this.$cookies.get("user_id");
      console.log(this.$route.path);
      if (cid == uid) {
        this.$message.success("无法访问自己哦");
      } else {
        // this.$router.push("/");
        // this.$router.push(`avatar/${cid}`, { params: { id: cid } });
        this.$router.push({
          path: `avatar/${cid}`,
          query: { name: this.listData.username },
          // query: { id: cid},
        });
      }
    },
    isclose(bol) {
      console.log("bol", bol);
      this.toclose = bol;
    },
    handleClose(done) {
      if (this.toclose) {
        this.toclose = false;
        done();
      } else {
        this.$confirm("还有未保存的评论哦确定关闭吗？")
          .then((_) => {
            done();
          })
          .catch((_) => {});
      }
    },
    // 检测上传前的长度
    beforeUpload() {
      if (this.limit >= 24) {
        this.$message.error("最多上传24张图片");
        return;
      }
    },
    // 检测删除前的长度
    beforeRemove() {
      if (this.limit < 6) {
        this.$message.error("最少上传6张图片");
        return;
      }
    },
    // 在上传图片之前，先把图片的url存到数组中
    handlePictureCardPreview(file, fileList) {
      console.log(file, fileList);
      this.relist.push(file.data);
      this.limit += 1;
    },
    // 删除图片
    handleRemove(file, fileList) {
      let index = this.relist.indexOf(file.response.data);
      this.relist.splice(index, 1);
      console.log(this.relist);
      this.limit -= 1;
    },
    // 切换收藏按钮
    stars() {
      if (this.user_id == null) {
        this.$notify({
          title: "提示",
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      if (this.islike == false) {
        this.star = "el-icon-star-on";
        this.$message({
          message: "收藏成功 (●'◡'●)",
          type: "success",
        });
        this.islike = true;
        this.addFav();
      } else {
        this.star = "el-icon-star-off";
        this.$message({
          message: "取消收藏 ᓚᘏᗢ",
          type: "warning",
        });
        this.islike = false;
        this.reFav();
      }
    },
    // 首次加载时的收藏按钮
    infoStar() {
      if (this.islike == true) {
        this.star = "el-icon-star-on";
      } else {
        this.star = "el-icon-star-off";
      }
    },
    // 收藏
    async addFav() {
      let { data: res } = await getFavorites({
        user_id: this.user_id,
        albunm_id: this.listData.id,
        islike: this.islike,
      });
      console.log(res);
    },
    // 取消收藏
    async reFav() {
      let { data: res } = await reFavorites({
        user_id: this.user_id,
        albunm_id: this.listData.id,
        islike: this.islike,
      });
      console.log(res);
    },
    // 画册加载
    async getSignAlbums(pid) {
      // 1. 判断是否为空
      if (pid == void 0) {
        return;
      }
      // 2. 获取数据
      const { data: res } = await getSignAlbum({ pid, user_id: this.user_id });
      // 3. 切割图片数据
      if (res) {
        res.img_list = res.img_list.split(";").map((item, index) => {
          return "http://192.168.177.129:8888/" + item;
        });
        this.listData = res;
      }
      // 4. 判断是否是当前用户的画册
      this.listData.creator_id == this.user_id
        ? (this.isMy = true)
        : (this.isMy = false);
      // 5. 判断是否收藏过
      if (this.listData.isLike) {
        this.islike = this.listData.isLike;
      } else {
        this.islike = false;
      }
      this.limit = this.listData.img_list.length;
      this.infoStar();
    },
    // 修改画册
    async updata() {
      // 1. 判断是否符合条件
      // let title, expost, list;
      let [title, expost, list] = [
        this.listData["title"],
        this.listData["expostitory"],
        this.listData["img_list"],
      ];
      if (title.length < 4 || title.length > 8) {
        this.$message.error("标题不能少于4个字或大于8个字");
        return;
      }
      if (expost.length < 50 || expost.length > 200) {
        this.$message.error("描述不能少于50个字或大于200个字");
        return;
      }
      if (list.length > 24 || list.length < 6) {
        this.$message.error("图片不能超过24张或少于6张");
        return;
      }
      // 2. 处理数据
      list = list.map((item) => {
        return item.slice(item.indexOf("group"));
      });
      for (let i = 0; i < this.relist.length; i++) {
        list.push(this.relist[i]);
      }

      // 3. 发送请求
      let { data: res } = await updataAlbum({
        id: this.listData.id,
        title, // 标题
        expost, // 描述
        list, // 图片
      });
      this.$notify({
        title: "成功",
        message: "修改成功(●'◡'●)",
        type: "success",
      });
      this.isshow = false;
    },
    // 删除图片
    deleteImg(index, from) {
      console.log(this.listData.img_list);
      this.listData.img_list.splice(index, 1);
      console.log(index, from);
      this.limit -= 1;
    },
    // 分享到新浪微博
    share_weibo(event) {
      console.log(event);
      console.log();
      event.preventDefault();
      console.log(this.listData.img_list[0]);
      // shareUrl是微博的分享地址，（有资料说需要真实的appkey，必选参数，这里我没用appkey也可以正常分享）
      var _shareUrl = "http://service.weibo.com/share/share.php?";
      _shareUrl += "url=" + encodeURIComponent(window.location.href); //参数url设置分享的内容链接
      _shareUrl += "&title=" + encodeURIComponent(this.listData.title); //参数title设置分享的标题
      _shareUrl +=
        "&pic=" +
        encodeURIComponent(
          "http%3A%2F%2Fn.sinaimg.cn%2Fdefault%2F1_img%2Fupload%2F3933d981%2F601%2Fw930h471%2F20210705%2Fe031-ksmehzs6892501.jpg"
        ); //参数pic设置分享的图片链接
      // 保留当前页面,打开一个非tab页面（按需求来，可以新开标签页，也可以在当前页新开页面）
      window.open(
        _shareUrl,
        "_blank",
        "height=100, width=400",
        "scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes"
      );
    },
  },

  created() {
    // 首次画册加载缓冲
    this.getSignAlbums(this.$route.params.id);
  },
  // 监听画册变化
  watch: {
    $route(to, from) {
      this.$nextTick(() => {
        this.$router.go(0);
      });
    },
    // 监听画册图片长度
    limit() {
      if (this.limit >= 24 || this.limit <= 6) {
        this.$nextTick(() => {
          this.$refs.limitSpan.color = "red";
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
#albumPage {
  color: #fff;
}
html,
body ::-webkit-scrollbar {
  display: none; /* Chrome Safari */
  width: 0 !important;
}

.footers,
.headbox {
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
  padding: 20px 3%;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  background-color: rgb(36, 37, 39);
  position: fixed;
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

main {
  width: 100%;
  height: 100%;
  display: flex;
  // 左侧信息栏
  .funbox {
    margin-top: 100px;
    width: 500px;
    position: fixed;
    z-index: 2;
    padding: 20px 3%;
    width: 30%;
    color: rgb(232, 232, 232);
    .funLeft {
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
    .funRight {
      width: 100%;
      margin-top: 20px;
      p {
        width: 100%;
        text-indent: 36px;
      }
    }
    span {
      font-size: 25px;
    }
    .starBtn {
      font-size: 30px;
    }
    .createTime {
      margin-top: 30px;
      font-size: 18px;
    }
  }
  // 右侧画册栏
  .mainbox {
    // height: 600px;
    margin-top: 120px;
    padding: 0px 80px;
    width: 60%;
    margin-left: 30%;
    .liImg {
      margin: 5px 5px 0px;
      width: 320px;
      height: 180px;
    }
  }
}
.shareBox {
  margin: 20px 0;
}

// 修改框
.updataMain {
  overflow-y: auto;
  width: 80%;
  height: 100%;
  padding: 3% 10%;
  background: rgba(0, 0, 0);
  position: fixed;
  top: 0;
  z-index: 5;
  .updataLeft {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .Lbox,
    .Rbox {
      width: 50%;
    }
    .Rbox {
      // position: relative;
      // left: 0;
      margin-top: 50px;
      // display: flex;
      // justify-items: center;
    }
  }
  .updataRight {
    // display: flex;
    // justify-content: left;
    margin-bottom: 80px;
    text-align: left;
    .upImg {
      margin: 0 10px 10px 0;
    }
  }
  h3 {
    margin: 10px 0;
    text-align: left;
    font-size: 20px;
    color: #fff;
  }
  /deep/ .el-input__inner {
    margin: 0;
  }
  #imgRemove {
    position: relative;
    z-index: 3;
    color: #fff;
  }
}

li {
  display: inline-block;
  position: relative;
  &:hover {
    .delete-img {
      display: block;
      position: absolute;
      width: 40px;
      height: 40px;
      line-height: 40px;
      right: 10px;
      top: 110px;
      border-radius: 5px;
      background: rgba(59, 60, 61, 0.5);
      // box-sizing: content-box;
      z-index: 999;
      cursor: pointer;
      text-align: right;
      i {
        margin: 8px 10px 0 0;
        display: block;
        font-size: 24px;
        color: white;
      }
    }
  }
  .delete-img {
    display: none;
  }
}
.upload-demo {
  text-align: left;
}
</style>
