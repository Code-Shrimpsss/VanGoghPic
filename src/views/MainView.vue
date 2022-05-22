<template>
  <div>
    <!-- 头部组件 -->
    <headerView></headerView>
    <keep-alive>
      <router-view :key="key"></router-view>
    </keep-alive>
    <!-- 底部组件 -->
    <footer-view></footer-view>
  </div>
</template>
<script>
import headerView from "../components/Header.vue";
import footerView from "../components/Footer.vue";
export default {
  name: "App",
  components: {
    headerView,
    footerView,
  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    },
  },
};
</script>

<style scoped></style>
