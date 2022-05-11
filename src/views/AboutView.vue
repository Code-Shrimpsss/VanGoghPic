<template>
  <div class="about" >
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
      >
        <picbox :lists="urlList"></picbox>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :bottom="100">
       <div
      style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
    >
      UP
    </div>
    </el-backtop>
  </div>
</template>

<script>
import picbox from "../components/picbox.vue";
import {GetAllType,GetImgData} from "@/api/imgAPI";
export default {
  data() {
    return {
      activeName: 0,
      loading: true,
      types: [],
      Goodid: 1,
      urlList: [],
    };
  },
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
      const { data: res } = await GetImgData(this.Goodid);
      this.urlList = res.imgList;
    },

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