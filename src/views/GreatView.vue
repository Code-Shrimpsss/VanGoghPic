<template>
  <div id="Great">
    <div>
      <h1>Great! ✨</h1>
      <h2 class="one">
        感谢你的奉献 <strong> VanGogh </strong> 将会在您的支持下继续更新迭代
      </h2>
      <h2 class="one">Thank you for your dedication,</h2>
      <h2>VanGogh will continue to update and iterate with your support</h2>

      <div class="btnBox">
        <!-- <el-button class="btn" type="primary" @click="$router.push('/')">
          回到首页
        </el-button> -->
         <el-button class="btn" type="primary" @click="$router.push('/favorites')">
          回到收藏夹
        </el-button>
        <el-button class="btn" type="primary" @click="$router.push(`/album/${$route.query.id}`)"> 查看画册 </el-button>
      </div>
    </div>
    <div>
      <img src="@/assets/undraw_trip_re_f724.svg" alt="" />
    </div>
    <!-- <div class="icon-like"></div> -->
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.query.id);
  },
};
</script>

<style lang="less" scoped>
#Great {
  padding: 10%;
  display: flex;
  justify-content: center;
}
.one {
  margin: 20px auto;
  //   writing-mode: vertical-lr; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
  //   writing-mode: tb-lr; /*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
// .one:nth-child(3){
// border-bottom: 5px solid #0081EF;
// }
strong {
  font-weight: bold;
  background-image: -webkit-linear-gradient(bottom, skyblue, pink, skyblue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.btnBox {
  display: flex;
  justify-content: space-evenly;
  margin-top: 80px;
  .btn {
    width: 200px;
    height: 80px;
    background: transparent;
    border: 2px solid #fff;
    border-radius: 20px;
  }
}
</style>