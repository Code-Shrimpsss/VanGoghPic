<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isShow"/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "App",
  provide(){
    return{
      reload:this.reload
    }
  },
  data () {
    return {
      isShow:true
    }
  },
  methods:{
    reload(){
      this.isShow=false;
      this.$nextTick(()=>{
        this.isShow=true
      })
    }
  },
};
</script>

<style lang="less">
body{
  background-color: rgb(36, 37, 39);
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #292d32;
  // cursor: "🕊️";
}
</style>
