<template>
  <div class="about">
    <!-- <el-divider>类型选择</el-divider> -->
    <el-tabs
      class="typebox"
      tab-position="top"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        class="tabText"
        v-for="(item, index) in types"
        :key="index"
        :label="item.name"
        v-infinite-scroll="loadMore"
        :infinite-scroll-distance="10"
      >
        <picbox :lists="urlList"></picbox>
      </el-tab-pane>
    </el-tabs>
    <p v-if="loadingOcr" style="text-align: center">加载中...</p>
    <p v-if="noMoreOcr" style="text-align: center">没有更多了</p>
    <el-backtop :bottom="100">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
            border-radius: 4px;
          }
        "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import picbox from "../components/picbox.vue";
import { GetAllType, GetImgData } from "@/api/imgAPI";
import infiniteScroll from "vue-infinite-scroll";

export default {
  data() {
    return {
      activeName: 0,
      loading: true,
      types: [],
      Goodid: 1,
      urlList: [],

      //  ---
      loadingOcr: false,
      noMoreOcr: false,
      busyScroll: false,
      PageSize: 50, //每页显示
      PageNum: 0, //当前页
      PageTotal: 0, //总条数
    };
  },
  directives: { infiniteScroll },
  methods: {
    handleClick(tab, event) {
      this.Goodid = Number(tab.index);
      this.Goodid++;
      console.log(this.Goodid, event);
      this.imgDataGet();
    },
    async GetAllType() {
      const { data: res } = await GetAllType();
      this.types = res.lists;
    },
    async imgDataGet() {
      const rLoading = await this.openLoading();
      const { data: res } = await GetImgData(this.Goodid);
      // res = res.reverse();
      res.imgList.map((item) => {
        item.image_link = "http://192.168.177.129:8888/" + item.image_link;
      });
      this.urlList = res.imgList;
      await rLoading.close();
    },
    loadMore() {
      this.loadingOcr = true;
      if (!this.busyScroll) {
        this.noMoreOcr = false;
        setTimeout(() => {
          this.PageNum += 1;
          this.imgDataGet();
        }, 2000);
      } else {
        this.noMoreOcr = true;
        this.loadingOcr = false;
      }
    },
    // async imgDataGet() {
    //   const { data: res } = await GetImgData(
    //     this.Goodid,
    //     this.PageNum,
    //     this.PageSize
    //   );
    //   // {
    //   //     Goodid: this.Goodid,
    //   //     page: this.PageNum,
    //   //     page_num: this.PageSize,
    //   //   }
    //   console.log(res);
    //   // this.urlList = this.urlList.concat(res.imgList);
    //   // .then((res) => {
    //   //   this.PageTotal = res.data.total_num;
    //   //   this.loadingOcr = false;

    //   //   this.ocrList = this.ocrList.concat(res.data.ocr_list);
    //   //   if (res.data.ocr_list.length == 0) {
    //   //     this.noMoreOcr = true;
    //   //     this.busyScroll = true;
    //   //   } else {
    //   //     this.busyScroll = false;
    //   //   }
    //   // })
    //   // .catch((error) => console.log(error));
    // },
  },
  components: {
    picbox,
  },
  created() {
    this.GetAllType();
    this.imgDataGet();
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
body {
  width: 100%;
  display: block;
}
.about {
  // margin-top: 70px;
  padding: 80px 12% 0;
  background-color: rgb(36, 37, 39);
  .typebox {
    width: 100%;
    color: #fff;
  }
}
.el-tabs__nav-scroll {
  display: flex;
  transform: translateX(0px);
  justify-content: space-around;
}
.el-tabs__nav {
  // border-bottom-left: 2px solid #fff;
  border: 2px solid gray;
  border-bottom: 0px;
  border-radius: 20px;
  padding: 5px 15px;
}
.el-tabs__nav div {
  font-size: 16px;
  font-weight: 700;
  color: gray;
}
</style>