<template>
  <div id="phone">
    <div class="likeleft">
      <h2>画册</h2>
      <favor-box :albumList="list"></favor-box>
    </div>
  </div>
</template>

<script>
import favorBox from "../components/favorbox.vue";
import { getAllAlbums } from "@/api/albumAPI";
export default {
  components: {
    favorBox,
  },
  data () {
    return {
      list: ""
    }
  },
  methods: {
    async getAlbums() {
      const { data: res } = await getAllAlbums();
      res.datalist.forEach((item) => {
        item.cover_img = "http://192.168.177.129:8888/" + item.cover_img;
      });
      this.list = res.datalist
      console.log(this.list);
    },
  },
  created () {
    this.getAlbums();
  }
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