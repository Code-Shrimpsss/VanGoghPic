<template>
  <div id="favorites">
    <div class="headbox">
      <div class="leftheader">
        <el-button
        type="primary"
        class="rebtn"
        icon="el-icon-back"
        @click="$router.back(-1)"
      ></el-button>
      <h1 class="headtxt">收藏夹</h1>
      </div>
      <button class="createImgBtn" @click="$router.push('/createimg')">创建画册</button>
    </div>
    <div id="mainbox">
      <div class="likeleft">
        <h2>我的图册</h2>
        <!-- v-if="this.favoriteList" -->
        <!-- <favor-box></favor-box> -->
        <el-empty description="暂无创建" :image-size="200"></el-empty>

        <h2>收藏图册</h2>
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
      favoriteList: "",
    };
  },
  components: {
    footers,
    favorBox,
  },
  methods: {
    childByValue(childValue) {
      this.favoriteList = childValue;
      console.log("原", this.favoriteList);
      console.log("子", this.childValue);
    },
  },
  mounted() {
    this.childByValue();
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
  .leftheader{
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
  .createImgBtn{
    width: 200px;
    background-color: transparent;
    border: 2px solid #fff;
    font-size: 25px;
    font-family:Georgia, 'Times New Roman', Times, serif;
  }
}

.likeleft {
  text-align: left;
  padding: 3% 10%;
}
.insterncs{
  position:absolute;
}
</style>