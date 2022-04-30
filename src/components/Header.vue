<template>
  <div class="headbox">
    <div class="leftHead">
      <!-- <i id="dicon" class="el-icon-moon"></i> -->
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
      <a href="/favorites"><i class="el-icon-takeaway-box"></i></a>
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
    // color: #fff;

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
      font-size: 30px;
    }
  }
}

.elItem {
  background-color: #333;
}

// --------

body {
  display: flex;

  justify-content: center;

  align-items: center;

  // height: 100vh;

  // background-color: #f6f5f7;
}

h2 {
  margin-bottom: 10px;

  font-size: 32px;

  text-transform: capitalize;
}

.container {
  width: 100%;

  height: 480px;

  background-color: white;

  // box-shadow: 0 14px 28px rgbawbo0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2);

  border-radius: 10px;

  overflow: hidden;
}

.form-container {
  position: absolute;

  top: 0;

  width: 50%;

  height: 100%;

  background-color: white;

  transition: all 0.6s ease-in-out;
}

.form {
  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  height: 100%;

  // width: 100%;

  padding: 0 50px;
}

.demo-ruleForm {
  height: 100%;

  // padding: 0 50px;
}

input {
  width: 100%;

  margin: 8px 0;

  padding: 12px;

  background-color: #eee;

  border: none;
}

.codePicBox {
  width: 100%;

  display: flex;

  align-items: center;

  justify-content: space-between;

  .el-input {
    width: 50%;
  }
  button {
    width: 120px;
  }
}

.forget-password {
  display: inline-block;

  height: 20px;

  text-decoration: none;

  color: #bbb;

  text-transform: capitalize;

  font-size: 12px;
}

.forget-password:hover {
  color: lightslategray;

  border-bottom: 2px solid #ff4b2b;
}

button {
  background: #ff4b2b;
  padding: 10px 50px;
  border: 1px solid transparent;
  border-radius: 20px;
  text-transform: uppercase;
  color: white;
  margin-top: 10px;
  outline: none;
  transition: transform 80;
}

button:active {
  transform: scale(0.95);
}

.overlay_container {
  position: absolute;

  top: 0;

  width: 50%;

  height: 100%;

  z-index: 100;

  right: 0;

  overflow: hidden;

  transition: all 0.6s ease-in-out;
}

.overlay {
  position: absolute;
  width: 200%;
  height: 100%;
  left: -100%;
  // background-color: #ff4b2b;
  background-image: url("../assets/vangogh1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.overlay_panel {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  color: white;
  // padding: 0 40px;
  background-image: url("../assets/vangogh.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  h2 {
    color: #fff;
  }
}

.overlay_panel button {
  background-color: transparent;

  border: 1px solid white;
}

.overlay_panel p {
  font-size: 18px;
  // color: rgb(230, 230, 230);
  margin: 10px 0 15px 0;
}

.overlay_right_container {
  right: 0;
}

.container.active .sign-up-container {
  transform: translateX(100%);

  z-index: 5;
}

.container.active .sign-in-container {
  transform: translateX(100%);
}

.container.active .overlay_container {
  transform: translateX(-100%);
}

.container.active .overlay {
  transform: translateX(50%);
}
.singup {
  padding: 10px 50px;
  border: 1px solid transparent;

  border-radius: 20px;

  text-transform: uppercase;

  color: white;

  margin-top: 10px;
}

.el-menu li {
  font-size: 18px;
  font-weight: 700;
}
</style>

