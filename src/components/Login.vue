<template>
  <div>
    <!-- 登录成功的头像链接 -->
    <div class="befoBox" v-if="username && token">
      <a href="/My">
        <el-avatar :src="author_img" @error="errorHandler">
          <img src="@/assets/logo.png" />
        </el-avatar>
      </a>

    </div>

    <!-- 未登录则进行注册或登录 -->
    <div class="befoBox" v-else @click="dialogVisible = true">
      <el-avatar @error="errorHandler">
        <img src="@/assets/default_avatar.png" />
      </el-avatar>

      <!-- 登录页面信息 -->
    </div>
    <el-dialog
      class="Edialog"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :show-close="false"
    >
      <div
        class="container"
        :class="{ active: Infoclass == true ? 'active' : '' }"
      >
        <!-- register -->

        <div class="form-container sign-up-container">
          <div class="form">
            <h2>注册</h2>

            <el-input
              class="el-input user"
              type="text"
              placeholder="输入您的用户名"
              v-model="username"
              maxlength="20"
              minlength="5"
              show-word-limit
              @change="select_username"
            >
            </el-input>

            <span v-show="error_name" class="el-icon-warning">{{
              error_name_message
            }}</span>

            <el-input
              class="el-input password"
              type="password"
              placeholder="输入您的密码"
              v-model="password"
              :show-password="true"
            >
            </el-input>

            <span v-show="error_password" class="el-icon-warning"
              >请输入8-20位的密码</span
            >
            <el-input
              class="el-input password2"
              type="password2"
              placeholder="输入您的密码"
              v-model="password2"
              :show-password="true"
            >
            </el-input>

            <span v-show="error_check_password" class="el-icon-warning"
              >两次输入的密码不一致</span
            >

            <el-input
              class="el-input phone"
              type="text"
              placeholder="输入您的电话"
              v-model="phone"
              maxlength="11"
              show-word-limit
            >
            </el-input>

            <span v-show="error_phone" class="el-icon-warning">{{
              error_phone_message
            }}</span>

            <div class="codePicBox">
              <el-input
                class="el-input codepic"
                type="text"
                placeholder="输入验证码"
                v-model="image_code"
              >
              </el-input>

              <img
                :src="image_code_url"
                @click="generate_image_code"
                alt="图形验证码"
                class="pic_code"
              />

              <span v-show="error_image_code" class="el-icon-warning">{{
                error_image_code_message
              }}</span>
            </div>

            <div class="codePicBox">
              <el-input
                class="el-input message"
                type="text"
                placeholder="输入短信验证码"
                v-model="sms_code"
              >
              </el-input>

              <button @click="send_sms_code" class="get_msg_code">
                {{ sms_code_tip }}
              </button>
            </div>
            <span class="el-icon-warning" v-show="error_sms_code">{{
              error_sms_code_message
            }}</span>

            <button class="signUp" @click="on_submit()" :plain="true">
              注册
            </button>
          </div>
        </div>

        <!-- login -->

        <div class="form-container sign-in-container">
          <div class="form">
            <h2>登录</h2>

            <el-input
              class="el-input username"
              type="text"
              placeholder="输入您的用户名"
              v-model="username"
              @blur="check_username_login"
            >
            </el-input>
            <div class="el-icon-warning" v-show="error_username" v-cloak>
              请填写用户名或手机号
            </div>
            <el-input
              class="el-input password"
              type="password"
              placeholder="输入您的密码"
              :show-password="true"
              v-model="password"
              @blur="check_pwd_login"
            >
            </el-input>
            <div class="el-icon-warning" v-show="error_pwd" v-cloak>
              {{ error_pwd_message }}
            </div>
            <a href="#" class="forget-password">forget your password</a>
            <button class="signIn" @click="on_login()" :plain="true">
              登录
            </button>
          </div>
        </div>

        <!-- overlay container -->

        <div class="overlay_container">
          <div class="overlay">
            <!-- overlay left -->

            <div class="overlay_panel overlay_left_container">
              <h2 class="HTitle">welcome back!</h2>
              <p>Continue to contribute your picture book</p>

              <button id="sign-in" @click="infoLogin()">登录</button>
            </div>

            <!-- overlay right -->

            <div class="overlay_panel overlay_right_container">
              <h2 class="HTitle">hello collectors!</h2>

              <p>Looking forward to your joining this picture world</p>

              <button id="sign-up" @click="infoRegister()">注册</button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>



<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
import { getUserDate } from "@/api/userAPi";
export default {
  data() {
    return {
      // 登录注册共用
      token: "",
      username: "",
      password: "",
      author_img: "",
      Infoclass: false, // 登录注册框切换
      dialogVisible: this.newshow,

      // 注册
      password2: "",
      phone: "",
      codepic: "", // 图形验证码
      sms_code: "", // 短信验证码
      sms_code_tip: "获取短信验证码",
      image_code: "",
      image_code_id: "",
      image_code_url: "",
      error_name: false,
      error_password: false,
      error_check_password: false,
      error_phone: false,
      error_sms_code: false,
      error_name_message: "",
      error_phone_message: "请输入手机号码",
      error_sms_code_message: "",
      error_image_code: "",
      error_image_code_message: "",

      // 登录
      error_username: false,
      error_pwd: false,
      error_pwd_message: "请填写密码",
      remember: false,
    };
  },
  props: {
    newshow: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  mounted() {
    // 向服务器获取图片验证码
    this.generate_image_code();
  },
  computed: {
    // ...mapState(["user", "tokenInfo"]),
  },
  methods: {
    // ...mapMutations(["updateTokenInfo"]),
    errorHandler() {
      return true;
    },
    // 切换清空方法
    infoLogin() {
      this.Infoclass = false;
      (this.username = ""),
      (this.password = ""),
      (this.password2 = ""),
      (this.phone = ""),
      (this.codepic = ""), // 图形验证码
      (this.message = ""), // 短信验证码
      (this.error_name = false),
      (this.error_password = false),
      (this.error_check_password = false),
      (this.error_phone = false),
      (this.sms_code = ""),
      (this.image_code = ""),
      (this.error_sms_code = false);
    },
    infoRegister() {
      this.Infoclass = true;
      this.username = "";
      this.password = "";
      this.error_username = false;
      this.error_pwd = false;
    },
    async imgUpdata() {
      const { data: res } = await getUserDate(this.username);
      this.author_img = res.data.author_img;
      console.log(res);
    },
    // 提取地址栏中的查询字符串
    get_query_string(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURI(r[2]);
      }
      return null;
    },
    // 生成uuid
    generateUUID: function () {
      var d = new Date().getTime();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
      }
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    },

    // 生成一个图片验证码的编号，并设置页面中图片验证码img标签的src属性
    generate_image_code: function () {
      // 生成一个编号 : 严格一点的使用uuid保证编号唯一， 不是很严谨的情况下，也可以使用时间戳
      this.image_code_id = this.generateUUID();
      // 设置页面中图片验证码img标签的src属性
      this.image_code_url =
        this.$host + "/image_codes/" + this.image_code_id + "/";
    },
    // 检查用户名
    check_username: function () {
      var re = /^[a-zA-Z0-9_-]{5,20}$/;
      var re2 = /^[0-9]+$/;
      if (re.test(this.username) && !re2.test(this.username)) {
        this.error_name = false;
      } else {
        this.error_name_message = "请输入5-20个字符的用户名且不能为纯数字";
        this.error_name = true;
      }
      // 检查重名
      if (this.error_name == false) {
        var url = this.$host + "/usernames/" + this.username + "/count/";
        axios
          .get(url, {
            responseType: "json",
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.count > 0) {
              this.error_name_message = "用户名已存在";
              this.error_name = true;
            } else {
              this.error_name = false;
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
    select_username () {
      var re = /^[a-zA-Z0-9_-]{5,20}$/;
      var re2 = /^[0-9]+$/;
      if (re.test(this.username) && !re2.test(this.username)) {
        this.error_name = false;
      } else {
        this.error_name_message = "请输入5-20个字符的用户名且不能为纯数字";
        this.error_name = true;
      }
      },
    check_pwd() {
      var len = this.password.length;
      if (len < 8 || len > 20) {
        this.error_password = true;
      } else {
        this.error_password = false;
      }
    },
    check_cpwd() {
      if (this.password != this.password2) {
        this.error_check_password = true;
      } else {
        this.error_check_password = false;
      }
    },
    // 检查手机号
    check_phone() {
      var re = /^1[345789]\d{9}$/;
      if (re.test(this.phone)) {
        this.error_phone = false;
      } else {
        this.error_phone_message = "您输入的手机号格式不正确";
        this.error_phone = true;
      }

      if (this.error_phone == false) {
        var url = this.$host + "/mobiles/" + this.phone + "/count/";

        axios
          .get(url, {
            responseType: "json",
            withCredentials: true,
          })
          .then((response) => {
            if (response.data.count > 0) {
              this.error_phone_message = "手机号已存在";
              this.error_phone = true;
            } else {
              this.error_phone = false;
              console.log(321);
            }
          })

          .catch((error) => {
            console.log(error.response);
          });
      }
    },

    // 检查图片验证码
    check_image_code() {
      if (!this.image_code) {
        this.error_image_code_message = "请填写图片验证码";
        this.error_image_code = true;
      } else {
        this.error_image_code = false;
      }
    },
    check_sms_code() {
      if (!this.sms_code) {
        this.error_sms_code_message = "请填写短信验证码";
        this.error_sms_code = true;
      } else {
        this.error_sms_code = false;
      }
    },

    // 发送手机短信验证码
    send_sms_code() {
      if (this.sending_flag == true) {
        return;
      }
      this.sending_flag = true;
      // 校验参数，保证输入框有数据填写
      this.check_phone();
      if (this.error_phone == true) {
        this.sending_flag = false;
        return;
      }
      // 向后端接口发送请求，让后端发送短信验证码
      var url =
        this.$host +
        "/sms_codes/" +
        this.phone +
        "/" +
        "?image_code=" +
        this.image_code +
        "&image_code_id=" +
        this.image_code_id;
      axios
        .get(url, {
          responseType: "json",
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          if (response.data.code == 0) {
            // 表示后端发送短信成功
            // 倒计时60秒，60秒后允许用户再次点击发送短信验证码的按钮
            var num = 60;
            // 设置一个计时器
            var t = setInterval(
              () => {
                if (num == 1) {
                  // 如果计时器到最后, 清除计时器对象
                  clearInterval(t);
                  // 将点击获取验证码的按钮展示的文本回复成原始文本
                  this.sms_code_tip = "获取短信验证码";
                  // 将点击按钮的onclick事件函数恢复回去
                  this.sending_flag = false;
                } else {
                  num -= 1;
                  // 展示倒计时信息
                  this.sms_code_tip = num + "秒";
                }
              },
              1000,
              60
            );
          } else {
            this.error_sms_code_message = response.data.errmsg;
            this.error_sms_code = true;
          }
        })

        .catch((error) => {
          if (error.response.status == 400) {
            this.error_sms_code_message = error.response.data.message;
            this.error_sms_code = true;
          } else {
            console.log(error.response.data);
          }
          this.sending_flag = false;
        });
    },

    // 注册
    on_submit() {
      this.check_username();
      this.check_pwd();
      this.check_cpwd();
      this.check_phone();
      this.check_sms_code();
      // 点击注册按钮之后, 发送请求 (下面的代码是通过请求体传参的)
      if (
        this.error_name == false &&
        this.error_password == false &&
        this.error_check_password == false &&
        this.error_phone == false &&
        this.error_sms_code == false
      ) {
        axios
          .post(
            this.$host + "/register/",
            {
              username: this.username,
              password: this.password,
              password2: this.password2,
              mobile: this.phone,
              sms_code: this.sms_code,
            },
            {
              responseType: "json",

              withCredentials: true,
            }
          )

          .then((response) => {
            if (response.data.code == 0) {
              this.$message({
                message: "注册成功 (〃￣︶￣)人(￣︶￣〃) ",
                type: "success",
              });
              this.dialogVisible = false;
              location.href = "/";
            }

            if (response.data.code == 400) {
              alert(response.data.errmsg);
            }
          })

          .catch((error) => {
            if (error.response.code == 400) {
              if ("non_field_errors" in error) {
                this.error_sms_code_message = error.response;
              } else {
                this.error_sms_code_message = "数据有误";
              }
              this.error_sms_code = true;
            } else {
              console.log(error);
            }
          });
      }
    },

    // --- 登录
    // 检查数据
    check_username_login: function () {
      if (!this.username) {
        this.error_username = true;
      } else {
        this.error_username = false;
      }
    },
    check_pwd_login: function () {
      if (!this.password) {
        this.error_pwd_message = "请填写密码";
        this.error_pwd = true;
      } else {
        this.error_pwd = false;
      }
    },
    // 表单提交
    on_login() {
      this.check_username();
      this.check_pwd();
      console.log(this.error_name);
      console.log(this.error_pwd);
      if (this.error_name == false && this.error_pwd == false) {
        axios
          .post(
            this.$host + "/login/",
            {
              username: this.username,
              password: this.password,
              remembered: this.remember,
            },
            {
              responseType: "json",
              // 发送请求的时候, 携带上cookie
              withCredentials: true,
              crossDomain: true
            }
          )
          .then((response) => {
            if (response.data.code == 200) {
              // 跳转页面
              // var return_url = this.get_query_string("next");
              // if (!return_url) {
                let t = response.data.data;
                this.$cookies.set("token", t.token);
                this.$cookies.set("username", t.username);
                this.username =t.username;
                this.token = t.token;
                console.log(t);
                this.$message({
                  message: ` ${response.data.username} 欢迎回家(●'◡'●) `,
                  type: "success",
                });
                this.dialogVisible = false;
                // return_url = "/";
              // }
              // location.href = return_url;
            } else if (response.data.code == 400) {
              this.error_pwd_message = "用户名或密码错误";
              this.error_pwd = true;
            } else {
              this.error_pwd_message = "未知错误";
              this.error_pwd = true;
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status == 400) {
              this.error_pwd_message = "用户名或密码错误";
            } else {
              this.error_pwd_message = "服务器错误";
            }
            this.error_pwd = true;
          });
      }else{
        console.log(this.error_username);
      }
    },
  },
  created() {
    // 页面一创建，就去cookie中取值
    this.username = this.$cookies.get("username");
    this.token = this.$cookies.get("token");
    // if (this.username && this.token) {
    //   this.is_login = true;
    // }
    this.imgUpdata();
  },
};
</script>


<style lang="less">
* {
  margin: 0;
  padding: 0;
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

body {
  display: flex;
  justify-content: center;
  align-items: center;
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
  border-radius: 10px;  // 圆角
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
  padding: 0 50px;
}
.HTitle{
  color: #fff;
}

.demo-ruleForm {
  height: 100%;
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
</style>

