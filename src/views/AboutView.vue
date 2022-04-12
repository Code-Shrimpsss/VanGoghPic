<template>
  <div class="about">
    <!-- <el-divider>类型选择</el-divider> -->
    <el-tabs
      class="typebox"
      tab-position="top"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="动漫" name="first"><picbox></picbox></el-tab-pane>
      <el-tab-pane label="头像" name="second"> <picbox></picbox> </el-tab-pane>
      <el-tab-pane label="风景" name="third"> <picbox></picbox></el-tab-pane>
      <el-tab-pane class="" label="萌宠" name="fourth">
        <picbox></picbox>
      </el-tab-pane>
      <el-tab-pane label="人物" name="five"> <picbox></picbox></el-tab-pane>
      <el-tab-pane label="名画" name="six"> <picbox></picbox></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import picbox from "../components/picbox.vue";
export default {
  data() {
    return {
      activeName: "first",
      loading: true,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  components: {
    picbox,
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
#tab-first,
#tab-second,
#tab-third,
#tab-fourth,
#tab-five,
#tab-six {
  width: 100px;
  text-align: center;
  color: #fff;
  &:hover {
    color: blue;
  }
}
.el-tabs__nav{
  // border-bottom-left: 2px solid #fff;
  border: 1px solid gray;
  border-radius: 20px;
}
</style>