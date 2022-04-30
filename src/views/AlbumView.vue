<template>
  <div id="phone">
    <div class="likeleft">
      <h2>画册</h2>
      <favor-box></favor-box>
    </div>
  </div>
</template>

<script>
import favorBox from "../components/favorbox.vue";
export default {
  components: {
    favorBox,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
body {
  width: 100%;
  display: block;
}
#phone {
  height: 100%;
  padding: 80px 12% 0;
  background-color: rgb(36, 37, 39);
  .typebox {
    width: 100%;
    color: #fff;
  }
}
.likeleft {
  text-align: left;
}
</style>