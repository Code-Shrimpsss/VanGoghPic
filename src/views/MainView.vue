<template>
  <div>
    <headerView></headerView>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
};
</script>

<style>
</style>