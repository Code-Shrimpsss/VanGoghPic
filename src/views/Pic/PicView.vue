<template>
  <div id="Pic" v-infinite-scroll="loadMore" :infinite-scroll-distance="500">
    <el-tooltip :content="'Switch value: ' + typeValue" placement="top">
      <el-switch
        v-model="typeValue"
        active-color="#13ce66"
        inactive-color="blue"
        active-value="展示模式"
        inactive-value="类型模式"
        class="switchBtn"
      >
      </el-switch>
    </el-tooltip>
    <el-tabs
      class="typebox"
      tab-position="top"
      :v-model="0"
      @tab-click="handleClick"
    >
      <!-- <p class="numText">{{PageTotal}}</p> -->
      <el-tab-pane
        class="tabText"
        v-for="(item, index) in types"
        :key="index"
        :label="item.name"
      >
        <div class="mypicbox">
          <el-skeleton
            :class="typeValue == '类型模式' ? 'picbox' : ' '"
            :loading="loading"
            animated
            :count="urlList.length"
            ref="skeleton"
          >
            <!-- <template slot="template">
              <el-skeleton-item variant="image" id="skeimg" />
            </template> -->
            <template>
              <div v-for="(item, index) in urlList" :key="index">
                <el-image
                  :src="item.image_link"
                  class="el-img"
                  fit="cover"
                  :preview-src-list="Thumbnails"
                  lazy
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </template>
          </el-skeleton>
        </div>
      </el-tab-pane>
    </el-tabs>
    <h5 v-if="loadingOcr" style="text-align: center">加载中...</h5>
    <h5 v-if="noMoreOcr" style="text-align: center">我也是有底线的...</h5>
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
import picbox from "../../components/picbox.vue";
import { GetAllType, GetImgData } from "@/api/imgAPI";
import infiniteScroll from "vue-infinite-scroll";
import Vue from "vue";

export default {
  data() {
    return {
      types: [], // 类型
      typeId: 1, // 类型id
      urlList: [],
      loading: false,
      listThumbnail: [],
      typeValue: "类型模式",
      //  ---
      curID: 0, // 前类型ID
      loadingOcr: false, // 是否加载
      noMoreOcr: false, // 没有更多数据
      busyScroll: false, // 是否正在加载中
      PageSize: 30, //每页显示
      PageNum: 0, //当前页
      PageTotal: 0, //总条数
    };
  },
  directives: { infiniteScroll },
  methods: {
    // 点击切换
    handleClick(tab, event) {
      this.typeId = Number(tab.index);
      this.typeId++;
      // 初始化页数
      this.urlList = [];
      this.PageNum = 0;
      // 切换时重新加载
      this.imgDataGet();
    },
    // 获取所有类型
    async GetAllType() {
      const { data: res } = await GetAllType();
      this.types = res;
    },
    // 滑动加载数据
    loadMore() {
      this.loadingOcr = true;
      // this.loading = true;
      // 如果正在加载中，则退出
      if (!this.busyScroll) {
        console.log("执行加载");
        this.noMoreOcr = false;
        let flag = true;
        if (!flag) return false;
        flag = false;
        setTimeout(() => {
          this.PageNum += 1;
          this.imgDataGet();
          flag = true;
        }, 2000);
        // this.PageNum += 1;
        // this.imgDataGet();
      } else {
        // 如果没有更多数据了 就退出
        this.noMoreOcr = true;
        this.loadingOcr = false;
      }
    },
    // 获取图片数据
    async imgDataGet() {
      // 开启加载
      // this.loading = true;
      const { data: res } = await GetImgData({
        typeId: this.typeId,
        PageNum: this.PageNum,
        PageSize: this.PageSize,
      });
      console.log("获取图片数据", res);
      // 如果当前id等同于前类型id，则不清空数据
      this.urlList = [...this.urlList, ...res.imgList];
      // if (this.curID == res.typeId && res.imgList.length != 0) {
      //   this.urlList = [...this.urlList, ...res.imgList];
      // } else {
      //   if (res.imgList.length != 0) {
      //     this.urlList = res.imgList;
      //   }
      // }
      this.curID != undefined ? res.typeId : this.typeId;
      this.PageTotal = res.total_num;
      this.loadingOcr = false;
      // 如果没有数据了
      if (res.imgList.length == 0) {
        // 不再加载数据
        this.noMoreOcr = true;
        this.busyScroll = true;
        console.log("没有更多了");
      } else {
        this.busyScroll = false;
        console.log("还有更多");
      }
      // console.log(this.urlList);
      // 数据加载完成后，重置加载状态
      // this.loading = false;
    },
  },
  components: {
    picbox,
  },
  created() {
    this.GetAllType();
  },
  computed: {
    Thumbnails() {
      for (let index = 0; index < this.urlList.length; index++) {
        this.listThumbnail.push(this.urlList[index].image_link);
      }
      return this.listThumbnail;
    },
  },
  beforeRouteLeave(to, from, next) {
    Vue.prototype.$notify.info({
      title: "提示",
      message: "销毁图片缓存",
    });
    this.$destroy();
    next();
  }
};
</script>

<style lang="less" scoped>
@w: 20%;
* {
  margin: 0;
  padding: 0;
}
body {
  width: 100%;
  display: block;
}
#Pic {
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
.el-tabs__header {
  padding: 0 20px;
}
#skebox {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
#skeimg {
  width: 17.5rem;
  height: 16.5625rem;
  display: inline-block;
  text-align: center;
}
/deep/.el-skeleton__item el-skeleton__image {
  height: 265px;
}
.picbox {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  .el-img {
    // width: 280px;
    // height: 265px;
    width: 17.5rem;
    height: 16.5625rem;
    background-repeat: no-repeat;
    margin: 0 3px;
    cursor: pointer;
    .image-slot {
      text-align: center;
    }
  }
  .el-skeleton__item el-skeleton__image {
    display: inline-block;
  }
}
.el-image__inner el-image__preview {
  object-fit: cover;
}
h5 {
  margin-top: 20px;
  font-size: 25px;
  font-weight: 700;
  color: rgb(255, 255, 255);
}
.switchBtn {
  position: relative;
  top: 30px;
  left: 40%;

  z-index: 55;
}
/deep/.el-tabs__nav-scroll {
  display: flex;
  justify-content: space-around;
}
/deep/ .el-tabs__item {
  color: gray;
}
/deep/ .is-active {
  color: #409eff;
}
/deep/ .el-tabs__nav-wrap::after {
  background-color: transparent;
}
/deep/ .el-tabs__active-bar {
  height: 5px;
  border-radius: 5px;
}
.numText {
  position: relative;
}
</style>
