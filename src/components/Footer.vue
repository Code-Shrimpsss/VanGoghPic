<template>
  <div class="footerbox">
    <el-divider id="logTxt"><i></i></el-divider>
    <div class="copyright">©2021 - 2022 By  <el-link class="link" href="https://github.com/jiaoyanxia" target="_blank">jiaoyanxia</el-link></div>
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
  padding: 0.7rem 12% 20px;
  // border-top: 1px solid #e6e6e6;
  background-color: rgb(36, 37, 39);
  color: #bbb;
  .link{
    color: #fff;
    font-size:18px ;
    // text-decoration: none;
    font-family:Georgia, 'Times New Roman', Times, serif;
  }
  text-align: center;
  .el-icon-ship{
    font-size: 25px;
    background-color: transparent;
  }
}
</style>
