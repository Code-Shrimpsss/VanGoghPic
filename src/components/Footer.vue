<template>
  <div class="footerbox">
    <el-divider id="logTxt"><i class="el-icon-ship"></i></el-divider>
    <div class="copyright">©2021 - 2022 By Shrimpsss</div>
    <p>“Do not quench your inspiration and your imagination; do not become the slave of your model.”</p>
    <p> — Vincent van Gogh</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less">
.footerbox {
  // background-color: rgb(251, 250, 250);
  padding: 0.7rem 20px;
  height: 60px;
  margin-bottom: 45px;
  // border-top: 1px solid #e6e6e6;
  text-align: center;
  // #logTxt{
  //   background-color: transparent;
  // }
  .el-icon-ship{
    font-size: 25px;
    background-color: transparent;
  }
}
</style>
