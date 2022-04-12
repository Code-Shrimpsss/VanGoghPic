<template>
  <div id="favorites">
    <div class="headbox">
      <el-button
        type="primary"
        class="rebtn"
        icon="el-icon-back"
        @click="$router.back(-1)"
      ></el-button>
      <h1 class="headtxt">收藏夹</h1>
    </div>
    <div id="mainbox">
      <div class="likeleft">
        <h2>我的图册</h2>
        <favor-box  v-if="this.favoriteList"></favor-box>
        <el-empty v-else description="暂无创建" :image-size="200" image=""></el-empty>

        <h2>收藏图册</h2>
        <!-- <div class="mylike" v-if="this.favoriteList" >
          <li
            class="mylikeul"
            v-for="(item, index) in favoriteList"
            :key="index"
            :style="{ backgroundImage: 'url(' + item.defaultImg + ')' }"
          >
            <p>{{ item.favoritName }}</p>
            <el-divider class="lints" content-position="right"></el-divider>
            <span class="introduces">{{ item.introduce }}</span>
            <div class="authorBox">
              <span>{{ item.authorName }}</span>
              <el-avatar
                style="margin-left: 10px"
                size="small"
                :src="item.authorImg"
              ></el-avatar>
            </div>
          </li>
        </div> -->

        <!-- <el-empty v-else description="暂无收藏" :image-size="200" image=""></el-empty> -->
        <favor-box></favor-box>
      </div>
    </div>
    <div></div>
    <footers class="footers"></footers>
  </div>
</template>



<script>
import footers from "../components/Footer.vue";
import favorBox from "../components/favorbox.vue";
export default {
  data() {
    return {
      favoriteList:'',
    };
  },
  components: {
    footers,
    favorBox,
  },
  methods: {
    childByValue(childValue) {
      this.favoriteList = childValue
      console.log('原',this.favoriteList);
      console.log('子',this.childValue);
    }
  },
  mounted () {
    this.childByValue()
  }
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
  background-color: rgb(41, 45, 50);
  color: #fff;
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

.likeleft {
  text-align: left;
  padding: 3% 10%;
}
  // .mylike {
  //   // display: flex;
  //   // justify-content: flex-start;
  //   li {
  //     position: relative;
  //     width: 200px;
  //     height: 100px;
  //     background-color: #c8d3fa;
  //     border-radius: 15px;
  //     margin: 20px 10px 20px 0;
  //     padding: 10px;
  //     display: inline-block;
  //     p {
  //       font-size: 20px;
  //     }
  //     .lints {
  //       width: 0px;
  //       height: 2px;
  //       transition: width 1.5s;
  //       -webkit-transition: width 1.5s; /* Safari */
  //       margin-bottom: 2px;
  //     }
  //     span {
  //       // font-size: 0px;
  //       // transition: font-size 1.5s;
  //       // -webkit-transition: font-size 1.5s; /* Safari */
  //       color: transparent;
  //       transition: color 1.5s;
  //       -webkit-transition: color 1.5s; /* Safari */
  //     }
  //     .introduces {
  //       display: block;
  //       width: 200px;
  //       overflow: hidden;
  //       text-overflow: ellipsis;
  //       white-space: nowrap;
  //     }
  //   }
  //   li:hover {
  //     .lints {
  //       width: 200px;
  //     }
  //     span {
  //       // font-size: 14px;
  //       color: #fff;
  //     }
  //   }
  //   .authorBox {
  //     position: absolute;
  //     right: 10px;
  //     bottom: 10px;
  //     display: flex;
  //     align-items: center;
  //   }
  // }
</style>