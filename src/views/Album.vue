<template>
  <div id="favoritesPage" v-if="listData">
    <div class="headbox">
      <el-button
        type="primary"
        class="rebtn"
        icon="el-icon-back"
        @click="$router.back()"
      ></el-button>
      <h1 class="headtxt">{{ listData.title }}</h1>
    </div>
    <main>
      <div class="funbox">
        <div class="funLeft">
          <div>
            <el-avatar
              style="margin-left: 10px"
              :src="listData.author_img"
            ></el-avatar>
            <span>&nbsp;{{ listData.username }}</span>
          </div>
          <div>
            <el-button
              class="starBtn"
              @click="drawer = true"
              type="primary"
              icon="el-icon-chat-line-square"
              circle
            ></el-button>
            <el-button
              v-if="isMy == true"
              :plain="true"
              class="starBtn"
              :icon="setting"
              circle
            ></el-button>
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
      </div>
      <div class="mainbox">
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
    <el-drawer title="留言" :visible.sync="drawer" class="Commentbox">
      <li class="elTxt">
        <div class="ldiv">
          <img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcolafile.cn%2Fuploads%2Fallimg%2F20201002a01%2F14331TH6_0.jpg&refer=http%3A%2F%2Fcolafile.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655120146&t=2dec0c9d57065cfbcf065636c5ba741a"
            alt=""
            style=""
          />
        </div>
        <div class="rdiv">
          <p>哇塞~ 真不戳</p>
          <div>
            <span>2022 - 5 - 5</span>
          </div>
        </div>
      </li>
    </el-drawer>
    <footers class="footers"></footers>
  </div>
</template>

<script>
import footers from "../components/Footer.vue";
import { getSignAlbum, getFavorites, reFavorites } from "@/api/albumAPI";
export default {
  data() {
    return {
      drawer: false,
      star: "el-icon-star-off",
      setting: "el-icon-setting",
      listData: "",
      tid: this.$route.params.id,
      islike: false,
      isMy: false,
      user_id: this.$cookies.get("user_id"),
    };
  },
  components: {
    footers,
  },
  methods: {
    // 切换收藏按钮
    stars() {
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
      console.log(this.islike);
    },
    // 首次加载时的收藏按钮
    infoStar() {
      if (this.islike == true) {
        this.star = "el-icon-star-on";
      } else {
        this.star = "el-icon-star-off";
      }
      console.log(this.islike);
    },
    // 收藏
    async addFav() {
      let { data: res } = await getFavorites({
        user_id: this.user_id,
        albunm_id: this.tid,
        islike: this.islike,
      });
      console.log(res);
    },
    // 取消收藏
    async reFav() {
      let { data: res } = await reFavorites({
        user_id: this.user_id,
        albunm_id: this.tid,
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
      let dataD = res.datalist;
      // 3. 切割图片数据
      if (dataD) {
        dataD.img_list = dataD.img_list.split(";").map((item, index) => {
          return "http://192.168.177.129:8888/" + item;
        });
        this.listData = dataD;
      }
      // 4. 判断是否是当前用户的画册
      this.listData.creator_id == this.user_id
        ? (this.isMy = true)
        : (this.isMy = false);
      console.log(this.listData);
      console.log(this.listData.isLike);
      // 5. 判断是否收藏过
      if (this.listData.isLike) {
        this.islike = this.listData.isLike;
      } else {
        this.islike = false;
      }
      this.infoStar();
      console.log(this.islike);
    },
  },
  created() {
    // 首次画册加载缓冲
    this.getSignAlbums(this.tid);
  },
  // 监听画册变化
  watch: {
    $route(to, from) {
      if (typeof to.params.id != NaN) {
        this.getSignAlbums(to.params.id);
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
  background-color: rgb(36, 37, 39);
}
#favoritesPage {
  color: #fff;
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
}
.Commentbox {
  color: #dbdbdb;
}
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
    }
  }
  .funRight {
    margin-top: 20px;
    p {
      text-indent: 36px;
    }
  }
  span {
    font-size: 25px;
  }
}
.mainbox {
  // height: 600px;
  margin-top: 120px;
  padding: 0px 80px;
  width: 60%;
  margin-left: 30%;
}
.liImg {
  margin: 5px 5px 0px;
  width: 320px;
  height: 180px;
}
.starBtn {
  font-size: 30px;
}
.createTime {
  margin-top: 30px;
  font-size: 18px;
}
.elTxt {
  display: flex;
  justify-content: space-between;
  padding: 2px 20px;
  .ldiv {
    width: 20%;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .rdiv {
    width: 70%;
    text-align: left;
    p {
      font-size: 16px;
      color: #000;
    }
    div {
      text-align: right;
      span {
        font-size: 10px;
        color: rgb(128, 128, 128);
      }
    }
  }
}
</style>
