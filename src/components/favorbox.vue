<template>
  <div>
    <div class="mylike" v-if="albumList">
      <li
        class="mylikeul"
        v-for="(item, index) in albumList"
        :key="index"
        :style="{ backgroundImage: 'url(' + item.cover_img + ')' }"
        @click="InFavorites(item.id)"
      >
        <p>{{ item.title }}</p>
        <el-divider class="lints" content-position="right"></el-divider>
        <span class="introduces">{{ item.expostitory }}</span>
        <div class="authorBox">
          <span>{{ item.username }}</span>
          <el-avatar
            style="margin-left: 10px"
            size="small"
            :src="item.author_img"
          ></el-avatar>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  props: ["albumList"],
  methods: {
    InFavorites(val) {
      this.$router.push({ path: `/album/${val}`, params: { id: val } });
    },
  },
  created() {
    console.log("this.albumList" ,this.albumList);
  },
};
</script>

<style lang="less" scoped>
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
.likeleft {
  text-align: left;
}
.mylike {
  li {
    position: relative;
    width: 200px;
    height: 100px;
    background-color: #3658d8;
    border-radius: 15px;
    margin: 20px 10px 20px 0;
    padding: 20px;
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    p {
      color: #fff;
      font-size: 20px;
    }
    .lints {
      width: 0px;
      height: 2px;
      transition: width 1.5s;
      -webkit-transition: width 1.5s; /* Safari */
      margin-bottom: 2px;
    }
    span {
      color: transparent;
      transition: color 1.5s;
      -webkit-transition: color 1.5s; /* Safari */
    }
    .introduces {
      display: block;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  li:hover {
    .lints {
      width: 200px;
    }
    span {
      // font-size: 14px;
      color: #fff;
    }
  }
  .authorBox {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    align-items: center;
  }
}
</style>