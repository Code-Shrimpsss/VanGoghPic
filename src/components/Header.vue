<template>
  <div class="headbox">
    <!-- 左侧Logo以及黑夜白天 -->
    <div class="leftHead">
      <i id="dicon" class="el-icon-moon"></i>
      <h3 class="lefttxt">Van GoghPic</h3>
    </div>
    <!-- 主要导航功能块 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      :background-color="achange"
      :router="true"
      text-color="#b6ebff"
      active-text-color="#0353ff"
    >
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/about">类型</el-menu-item>
      <el-menu-item index="/phone">画册</el-menu-item>
    </el-menu>
    <div class="demo-type">
      <!-- <el-switch
        id="heib"
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-icon-class="el-icon-sunrise-1"
        inactive-icon-class="el-icon-moon-night">
      </el-switch> -->
      <!-- <el-popover
        placement="top-bottom"
        trigger="hover"
        title="标题"
        width="40"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      >
        >
        <a href="/phone" slot="reference"
          ><i class="el-icon-takeaway-box"></i
        ></a>
      </el-popover> -->
      <a href="/phone"><i class="el-icon-takeaway-box"></i></a>
      <div class="befoBox" v-if="username">
        <a href="/My">
          <el-avatar
            @click="dialogVisible = true"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            @error="errorHandler"
          >
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
        </a>
      </div>
      <div class="befoBox" v-else @click="dialogVisible = true">
        <el-avatar @error="errorHandler">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
      </div>

      <!-- 登录页面信息 -->
      <el-dialog
        class="Edialog"
        title="账号注册"
        :visible.sync="dialogVisible"
        width="50%"
        :modal-append-to-body="false"
      >
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="info">
            <el-input
              type="text"
              v-model="ruleForm.info"
              autocomplete="off"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
              :show-password="true"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNum">
            <el-input
              type="text"
              v-model="ruleForm.phoneNum"
              autocomplete="off"
              maxlength="11"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
var checkinfo = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("账号不能为空"));
  }
  setTimeout(() => {
    if (value.length < 6) {
      callback(new Error("长度必须大于6"));
    } else {
      if (value.length > 11) {
        callback(new Error("长度必须小于11"));
      } else {
        callback();
      }
    }
  }, 1000);
};
var validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (this.ruleForm.checkPass !== "") {
      this.$refs.ruleForm.validateField("checkPass");
    }
    callback();
  }
};
var validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== this.ruleForm.pass) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
var checkNum = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else if (value !== this.ruleForm.phoneNum) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      value: true,
      activeIndex: "1",
      activeIndex2: "1",
      achange: "#fff",
      dialogVisible: false,
      username: "",
      ruleForm: {
        info: "",
        pass: "",
        checkPass: "",
        phoneNum: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        info: [{ validator: checkinfo, trigger: "blur" }],
        phoneNum: [{ validator: checkNum, trigger: "blur" }],
      },
    };
  },
  methods: {
    errorHandler() {
      return true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
@media screen and (max-width: 400px) {
  .headbox {
    padding: 0 0px;
    display: flex;
    justify-content: space-evenly;
  }
}
.el-dialog__body {
  padding: 0px;
}
.headbox {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 0 20px;
  height: 60px;
  border-bottom: 2px solid #f4f4f4;
  .leftHead {
    position: relative;
    .lefttxt {
      text-align: center;
      margin-top: 20px;
      display: inline-block;
      font-family: "STXinwei";
    }
  }
  .el-menu{
    position: relative;
  }
  #dicon {
    // color: #fff;
    font-size: 25px;
    margin: 0 2px;
  }
  .demo-type {
    margin-top: 15px;
    width: 130px;
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
</style>
