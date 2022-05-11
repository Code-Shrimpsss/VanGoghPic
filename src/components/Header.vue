<template>
  <div class="headbox">
    <div class="leftHead">
      <i id="dicon" class="el-icon-moon"></i>
      <h3 class="lefttxt"><a href="/">Van GoghPic</a></h3>
    </div>
    <!-- 主要导航功能块 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      background-color="rgba(255, 255, 255, 0.00)"
      :router="true"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item class="el-icon-s-home" index="/">主页</el-menu-item>
      <el-menu-item class="el-icon-menu" index="/about">类型</el-menu-item>
      <el-menu-item class="el-icon-s-management" index="/album"
        >画册</el-menu-item
      >
    </el-menu>
    <div class="demo-type">
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
  },
  created() {
    // 页面一创建，就去cookie中取值
    this.username = this.$cookies.get("username");
    this.token = this.$cookies.get("token");
  },
};
</script>

<style lang="less">
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

@media screen and (max-width: 400px) {
  .headbox {
    padding: 0 0px;

    display: flex;

    justify-content: space-evenly;
  }
}

.pic_code {
  width: 40%;
}

.el-icon-warning {
  color: red;
}

#warnings {
  text-align: left;

  color: #ff4b2b;
}

.get_msg_code {
  width: 6.25rem;

  height: 38px;

  padding: 0;

  border: 1px solid #c6c6c6;

  color: #333;

  background-color: #fff;

  margin: 0px;
}

.el-dialog__body {
  padding: 0;
}

.Edialog {
  padding: 0;
  h2 {
    color: #333;
  }
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

    .lefttxt {
      text-align: center;

      margin-top: 20px;

      display: inline-block;
      color: #fff;
      font-family: "STXinwei";
      a {
        text-decoration: none;
        color: #fff;
      }
    }
  }

  #dicon {
    color: #fff;
    display: none;
    font-size: 25px;
    margin: 0 2px;
  }

  .demo-type {
    margin-top: 15px;
    width: 130px;
    i {
      // color: #bbb;
      color: #fff;
    }
    .el-avatar {
      position: relative;

      right: -40px;

      top: -35px;

      margin-left: 10px;
    }

    .el-icon-takeaway-box {
      margin-right: 10px;
      font-size: 30px;
    }
  }
}

.elItem {
  background-color: #333;
}
@media screen and (max-width: 600px) {
  #dicon{
    display: inline-block;
  }
}
</style>

