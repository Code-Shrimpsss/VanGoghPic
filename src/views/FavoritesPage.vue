<template>
  <div id="favoritesPage">
    <div class="headbox">
      <el-button
        type="primary"
        class="rebtn"
        icon="el-icon-back"
        @click="$router.back(-1)"
      ></el-button>
      <h1 class="headtxt">{{ listData.favoritName }}</h1>
    </div>
    <main>
      <div class="funbox">
        <div class="funLeft">
          <div>
            <el-avatar
              style="margin-left: 10px"
              size="center"
              :src="listData.authorImg"
            ></el-avatar>
            <span>&nbsp;{{ listData.authorName }}</span>
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
          <el-drawer title="评论" :visible.sync="drawer" class="Commentbox">
          </el-drawer>
        </div>
        <div class="funRight">
          <p>{{ listData.introduce }}</p>
        </div>
      </div>

      <div class="mainbox">
        <el-image
          :preview-src-list="listData.urls"
          class="liImg"
          v-for="url in listData.urls"
          :key="url"
          :src="url"
          fit="cover"
          lazy
        ></el-image>
      </div>
    </main>
    <footers class="footers"></footers>
  </div>
</template>

<script>
import footers from "../components/Footer.vue";
export default {
  data() {
    return {
      drawer: false,
      star: "el-icon-star-off",
      listData: {
        Bid: "1212",
        authorName: "不素之霸",
        authorImg: "https://lipsum.app/60x60/000/fff",
        defaultImg: "https://lipsum.app/random/640x480",
        boxUrl: `/favorites/${this.Bid}`,
        favoritName: "梵高·画册",
        introduce:
          "梵高出生于1853年3月30日荷兰乡村津德尔特的一个新教牧师家庭，早年的他做过职员和商行经纪人，还当过矿区的传教士最后他投身于绘画。他早期画风写实，受到荷兰传统绘画及法国写实主义画派的影响。1886年，他来到巴黎，结识印象派和新印象派画家，并接触到日本浮世绘的作品，视野的扩展使其画风巨变。1888年，来到法国南部小镇阿尔，创作《阿尔的吊桥》；同年与画家保罗·高更交往，但由于二人性格的冲突和观念的分歧，合作很快便告失败。此后，梵高的疯病（有人记载是“癫痫病”）时常发作，但神志清醒时他仍然坚持作画。1889年创作《星月夜》。1890年7月，梵高在精神错乱中开枪自杀，年仅37岁, Van Gogh",
        islike: true,
        comment: 233,
        urls: [
          "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
          "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
          "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
          "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
        ],
      },
    };
  },
  components: {
    footers,
  },
  methods: {
    onlike() {
      console.log(this.value1);
    },
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
  // padding: 0 5%;
}
.Commentbox {
  color: #dbdbdb;
}
.funbox {
  width: 40%;
  height: 20%;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  padding: 20px 3%;
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
.mainbox{
  height: 600px;
  padding: 0px 20px ;
}
.liImg {
  margin: 5px 5px 0px;
  width: 320px;
  height: 180px;
}
.starBtn {
  font-size: 30px;
}
</style>