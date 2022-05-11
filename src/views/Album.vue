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
              :plain="true"
              class="starBtn"
              @click="stars()"
              :icon="star"
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
    <el-drawer
      title="评论"
      :visible.sync="drawer"
      class="Commentbox"
    ></el-drawer>
    <footers class="footers"></footers>
  </div>
</template>

<script>
import footers from "../components/Footer.vue";
import { getSignAlbum } from "@/api/albumAPI";
export default {
  data() {
    return {
      drawer: false,
      star: "el-icon-star-off",
      listData: "",
      tid: this.$route.params.id,
    };
  },
  components: {
    footers,
  },
  methods: {
    // 切换收藏按钮
    stars() {
      if (this.listData.islike) {
        this.star = "el-icon-star-on";
        this.listData.islike = false;
        this.$message({
          message: "收藏成功 (●'◡'●)",
          type: "success",
        });
      } else {
        this.star = "el-icon-star-off";
        this.listData.islike = true;
        this.$message({
          message: "取消收藏 ᓚᘏᗢ",
          type: "warning",
        });
      }
      console.log(this.listData.islike);
    },
    // 首次加载时的收藏按钮
    infoStar() {
      if (this.listData.islike) {
        this.star = "el-icon-star-on";
      } else {
        this.star = "el-icon-star-off";
      }
    },
    // 画册加载
    async getSignAlbums(pid) {
      const { data: res } = await getSignAlbum(pid);
      let dataD = res.datalist;
      console.log(dataD);
      if (dataD) {
        dataD.img_list = dataD.img_list.split(";");
        this.listData = dataD;
      }
    },
  },
  created() {
    this.infoStar();
    // 首次画册加载缓冲
    this.getSignAlbums(this.tid);
  },
  // 监听画册变化
  watch: {
    $route(to, from) {
      if (typeof to.params.id != NaN) {
        console.log("route-", to.params.id);
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
</style>