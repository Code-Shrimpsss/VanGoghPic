<template>
  <div class="headbox">
    <div class="leftHead">
      <h3 class="lefttxt" @click="showText = !showText">Van GoghPic</h3>
      <!-- 搜索框 -->
      <transition name="el-zoom-in-top">
        <el-input
          class="searchBox"
          v-show="showText"
          prefix-icon="el-icon-search"
        >
        </el-input>
      </transition>
    </div>
    <!-- 主要导航功能块 -->
    <div class="centerNav">
      <!-- <p class="el-icon-s-home" @click="$router.push('/')"><span>主页</span></p>
      <p class="el-icon-menu" @click="$router.push('/pic')">
        <span>类型</span>
      </p>
      <p class="el-icon-s-management" @click="$router.push('/album')">
        <span>画册</span>
      </p> -->
      <!-- <p v-for="item, index in typeList" :key="index" :class="item.icon" @click="$router.push(item.url)"> 
        <span>{{item.text}}</span>
      </p>       -->
      <p v-for="item, index in typeList" :key="index" :class="[item.text === activeText ? item.icon + ' active' : item.icon]" @click="tabItem(item.text,item.url)"> 
        <span>{{item.text}}</span>
      </p>
    </div>
    <div class="demo-type">
      <a href="/updataimg"><i class="el-icon-upload"></i></a>
      <a href="/favorites"><i class="el-icon-takeaway-box"></i> </a>
      <Login></Login>
    </div>
  </div>
</template>

<script>
import host from "@/js/host";
import Login from "@/components/Login.vue";
export default {
  components: {
    Login,
  },
  data() {
    return {
      host: host,
      activeIndex: "1", // 头部页面默认下标
      showText: false,
      activeText: "主页",
      typeList: [
        {icon: "el-icon-s-home", text: "主页", url: "/"},
        {icon: "el-icon-menu", text: "类型", url: "/pic"},
        {icon: "el-icon-s-management", text: "画册", url: "/album"},
      ]
    };
  },
  methods: {
    errorHandler() {
      return true;
    },
    FatherBox(data) {
      this.dialogVisible = data;
      if (this.username && this.token) {
        this.dialogVisible = false;
      }
    },
    tabItem(text, url) {
      this.activeText= text;
      this.$router.push(url);
    },

  },
  created() {
    // 页面一创建，就去cookie中取值
    this.username = this.$cookies.get("username");
    this.token = this.$cookies.get("token");
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  // box-sizing: border-box;
}

ul li {
  width: 100px;
  text-decoration: none;
  list-style: none;
  color: #fff;
}
ul {
  display: flex;
}

.headbox {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.083);
  padding: 5px 0px;
  height: 60px;
  .leftHead {
    position: relative;
    width: 30%;
    text-align: left;
    .lefttxt {
      margin-top: 20px;
      display: inline-block;
      color: #fff;
      font-family: "STXinwei";
      font-size: 1.5rem;
      a {
        text-decoration: none;
        color: #fff;
      }
    }
  }
  .el-menu {
    width: 30%;
    display: flex;
    background-color: rgba(255, 255, 255, 0);
    justify-content: space-between;
  }
  #dicon {
    color: #fff;
    font-size: 30px;
    margin: 0 2px;
  }

  .demo-type {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    i {
      // color: #bbb;
      color: #fff;
    }
    .el-avatar {
      position: relative;
      // margin-left: 10px;
      bottom: 7px;
    }

    .el-icon-takeaway-box,
    .el-icon-upload {
      margin-right: 20px;
      font-size: 30px;
    }
  }
}

.elItem {
  background-color: #333;
}

::deep .el-menu.el-menu--horizontal {
  // border: 0px;
  border-bottom: solid 3px #e6e6e6;
}

.centerNav {
  width: 30%;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    width: 30%;
    font-size: 30px;
    cursor: pointer;
    span {
      display: block; /*统一转化为块级元素*/
      font-size: 0;
    }
    &:hover {
      font-size: 0px;
      color: rgb(193, 221, 255);
      span {
        font-size: 25px;
        font-weight: 900;
      }
    }
  }
}
.active {
  font-size: 0px;
  color: rgb(74, 155, 255);
  span {
    font-size: 25px;
    font-weight: 900;
  }
}
.searchBox {
  margin-left: 20px;
  width: 70%;
  /deep/ .el-input__inner {
  background: transparent;
  border-radius: 20px;
  border: 2px solid whitesmoke;
}
}

</style>
