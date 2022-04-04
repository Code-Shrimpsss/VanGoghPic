<template>
  <div class="home">
    <h1>Van GoghPic</h1>
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in src" :key="item">
        <a href="http://www.baidu.com">
          <el-image style="width: 600px; height: 350px" :src="item" fit="fill">
          </el-image
        ></a>
      </el-carousel-item>
    </el-carousel>
    <el-divider>热门画册</el-divider>
    <el-row>
      <el-col :span="8" v-for="o in 9" :key="o">
        <el-card id="cardItem" :body-style="{ padding: '0px' }" shadow="hover">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "HomeView",
  data() {
    return {
      src: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-3015798271-3C2C4679075E545147D83FC48762CD71%2F0%3Ffmt%3Djpg%26size%3D97%26h%3D500%26w%3D750%26ppv%3D1.jpg&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651375130&t=c7247f0f3739ce774c9e6b9411e5d5c8",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0619%2F4712d92fj00quxq0j002oc000hs00kgc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651375156&t=b066168af366beb6e61e351343008eb3",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.3zitie.cn%2Fzhuangshi%2F2018%2F10%2F1173%2Fpic%2Fimgs%2F0002.jpg&refer=http%3A%2F%2Fpic.3zitie.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651375118&t=d64cfa404fc6c6cef13eb736f7158fdd",
        "https://lmg.jj20.com/up/allimg/tp07/44041017332460-lp.jpg",
      ],
    };
  },
};
</script>
<style>
h1 {
  /* font-family: Georgia, ‘Times New Roman’, Times, serif; */
  font-family: arzhu !important;
  margin-bottom: 20px;
}
.home {
  margin-top: 70px;
  padding: 0 100px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}
#cardItem{
  margin: 5px;
}
.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>