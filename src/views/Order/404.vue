<template>
  <div class="error">
    <img class="errimg" src="@/assets/undraw_page_not_found_re_e9o6.svg" alt="" />
    <span class="errText"> 该路线已被封闭,禁止通行 </span><br /><br />
    <el-button class="errBtn" @click="$router.push('/')">回到主页</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.error {
  text-align: center;
  margin-top: 25px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
      font-family: "楷体";
  .errimg {
    width: 50%;
    height: 50%;
  }
  .errText {
    font-size: 80px;
    color: white;
  }
  .errBtn{
    width: 200px;
    height: 60px;
    font-size: 25px;
  }
}
</style>
