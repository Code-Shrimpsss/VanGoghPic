<template>
  <div id="favorites">
    <div v-if="token">
      <div class="headbox">
        <div class="leftheader">
          <el-button
            type="primary"
            class="rebtn"
            icon="el-icon-back"
            @click="$router.push('/')"
          ></el-button>
          <h1 class="headtxt">收藏夹</h1>
        </div>
        <button class="createImgBtn" @click="$router.push('/createimg')">
          创建画册
        </button>
      </div>
      <div id="mainbox">
        <div class="likeleft" v-if="favoriteList">
          <h2>我的画册</h2>
          <favor-box v-if="myList.length >= 0" :albumList="myList"></favor-box>
          <el-empty v-else description="暂无创建" :image-size="200"></el-empty>
          <h2>收藏画册</h2>
          <favor-box v-if="myList" :albumList="favoriteList"></favor-box>
          <el-empty v-else description="暂无收藏" :image-size="200"></el-empty>
        </div>
      </div>
    </div>
    <el-row class="elRow" v-else>
      <el-col :sm="80" :lg="36">
        <el-result
          class="elResult"
          icon="warning"
          title="未登录"
          subTitle="请点击下方按钮返回登录"
        >
          <template slot="extra">
            <el-button
              class="returnBtn"
              type="primary"
              size="medium"
              @click="$router.push('/')"
              >返回</el-button
            >
          </template>
        </el-result>
      </el-col>
    </el-row>
    <footers class="footers"></footers>
  </div>
</template>



<script>
import footers from "../components/Footer.vue";
import favorBox from "../components/favorbox.vue";
import { getAllAlbums } from "@/api/albumAPI";
export default {
  data() {
    return {
      favoriteList: [],
      myList: [],
      token: this.$cookies.get("token"),
    };
  },
  components: {
    footers,
    favorBox,
  },
  methods: {
    async getAlbums() {
      const { data: res } = await getAllAlbums();
      res.datalist.forEach((item) => {
        item.cover_img = "http://192.168.177.129:8888/" + item.cover_img;
      });
      console.log("res.datalist", res.datalist);

      res.datalist.map((item) => {
        console.log(item.id, item.creator_id);
        this.$cookies.get("user_id") == item.creator_id
          ? this.myList.push(item)
          : this.favoriteList.push(item);
        // if (this.$cookies.get("user_id") == item.creator_id) {
          
        // }else{
        //   this.favoriteList.push(item);
        // }
      });
      // this.myList = JSON.parse(JSON.stringify(this.myList));
      console.log("我的", this.myList);
      console.log("收藏", this.favoriteList);
      console.log(this.myList.length <= 0);
      
      // this.favoriteList = res.datalist;
      // this.favoriteList.forEach((item) => {
      //   item.cover_img = "http://192.168.177.129:8888/" + item.cover_img;
      // });
      // console.log(this.favoriteList);

      // childValue.map((item) => {
      //   console.log(item.id, item.creator_id);
      //   this.$cookies.get("user_id") == item.creator_id
      //     ? this.myList.push(item)
      //     : this.favoriteList.push(item);
      // });
      // console.log("我的", this.myList);
      // console.log("收藏", this.favoriteList);
    },
    childByValue(childValue) {
      console.log("子", childValue);
      // if (childValue) {
      //   childValue.map((item) => {
      //     console.log(item.id, item.creator_id);
      //     this.$cookies.get("user_id") == item.creator_id
      //       ? this.myList.push(item)
      //       : this.favoriteList.push(item);
      //   });
      // }
      // console.log("我的", this.myList);
      // console.log("收藏", this.favoriteList);
    },
  },
  mounted() {
    // this.childByValue();
    this.getAlbums();
  },
  created() {
    if (this.token == null) {
      this.$message.error("请先登录 ( •̀ ω •́ )y ");
    }
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
#favorites {
  background-color: rgb(36, 37, 39);
  color: #fff;
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
    width: 200px;
    display: flex;
  }
  .rebtn {
    width: 60px;
    height: 60px;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 20px;
    margin-right: 20px;
    // display: inline-block;
  }
  .headtxt {
    font-size: 40px;
  }
  .createImgBtn {
    width: 200px;
    background-color: transparent;
    border: 2px solid #fff;
    font-size: 25px;
    font-family: Georgia, "Times New Roman", Times, serif;
  }
}

.likeleft {
  text-align: left;
  padding: 3% 10%;
}
.insterncs {
  position: absolute;
}

.elRow {
  width: 200px;
  margin: 100px auto;
  text-align: center;
  padding: 20px;
  font-size: 30px;
  font-family: Georgia, "Times New Roman", Times, serif;
  .returnBtn {
    width: 100px;
    height: 40px;
    background-color: transparent;
    border: 2px solid #fff;
    font-size: 20px;
    font-family: Georgia, "Times New Roman", Times, serif;
  }
  // .elResult{
  //   color: #fff;
  // }
}
// .el-result__title p{
//   font-size: 40px;
//   font-family: Georgia, "Times New Roman", Times, serif;
//   color: #fff;
// }
</style>