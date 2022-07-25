<template>
  <div id="comment">
    <div class="header">
      <h1>评论</h1>
      <!-- <el-button id="hbtn" class="el-icon-close" circle></el-button> -->
    </div>
    <div v-if="CommentList">
      <li v-for="(item, index) in CommentList" :key="index">
        <div class="elTxt">
          <div class="ldiv">
            <img :src="item.author_img" />
          </div>
          <div class="cdiv">
            <p>{{ item.username }}</p>
            <span>{{ item.content_time }}</span>
          </div>
          <div class="rdiv">
            <p @click="checkLike">
              {{ item.like_num }} <span class="el-icon-orange"></span>
            </p>
          </div>
        </div>
        <div class="content">
          <p>{{ item.content }}</p>
        </div>
        <div class="optionBox">
          <el-link
            type="primary"
            icon="el-icon-s-comment"
            v-if="!item.isMy"
            @click="comment(item.id, item.username)"
            >讨论</el-link
          >
          <el-link
            type="danger"
            icon="el-icon-remove-outline"
            v-else
            @click="removeComment(item.id)"
            >删除</el-link
          >
        </div>
      </li>
    </div>
    <div v-else>
      <p>暂无评论</p>
    </div>
    <p style="color: gary">------ 我是一条底线 ------</p>
    <div class="footer">
      <div>
        <el-input
          type="textarea"
          resize="none"
          class="ipt"
          v-model="text"
          :placeholder="curText"
          :rows="4"
          :show-word-limit="true"
          clearable
          ref="ipt"
        >
        </el-input>
        <!-- <div class="foot">
        <p class="el-icon-grape">表情</p>
        <el-button @click="subimt()"> 发送 </el-button>
      </div> -->
        <el-button class="subBtn" @click="subimt()"> 发送 </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { setComment, getComment, delComment } from "@/api/commentAPI";
export default {
  props: ["album_id"],
  data() {
    return {
      curText: "输入评论（最少输入10个字,最多输入100个字）",
      text: "",
      user_id: this.$cookies.get("user_id"),
      CommentList: [],
      bol: true,
    };
  },
  methods: {
    comment(id, username) {
      this.curText = `回复${username}:`;
      this.text = "";
      this.$refs.ipt.focus();
      this.bol = false;
      this.curId = id;
    },
    // 获取评论
    async getComment() {
      let { data: res } = await getComment(this.album_id);
      for (let i = 0; i < res.length; i++) {
        res[i]["isMy"] = false;
        if (res[i].uid_id == this.user_id) {
          res[i]["isMy"] = true;
        }
      }
      this.CommentList = res;
      console.log(this.CommentList);
    },
    // 发表评论
    async subimt() {
      if (this.text.length > 100 || this.text.length < 10) {
        this.$message.error(
          "评论字数不符合规范！ 最少输入10个字,最多输入100个字"
        );
        return;
      } else if (!this.user_id) {
        this.$message.error("请登录后再发表言论~");
      }
      console.log(this.album_id);
      await setComment({
        user_id: this.user_id,
        album_id: this.album_id,
        text: this.text,
      });
      this.$message.success("评论成功！");
      // 返回 头像 名字 评论内容 时间
      this.getComment();
      this.text = "";
    },
    // 删除评论
    async removeComment(id) {
      await this.$confirm("确定删除该评论？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await delComment(id);
          this.$message.success("已删除");
          this.getComment();
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 未保存时是否关闭
    isblur() {
      if (this.text.length > 0 && this.text != "") {
        this.bol = false;
      }
      this.$emit("isclose", this.bol);
    },
    checkLike() {
      this.$emit("checklike");
    },
  },
  created() {
    this.getComment();
  },
  mounted() {
    this.isblur();
  },
  watch: {
    bol() {
      this.isblur();
    },
  },
};
</script>

<style lang="less" scoped>
// 留言框
#comment {
  margin-bottom: 150px;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 2px 20px;
    margin: 10px 0 20px;
    h1 {
      font-size: 35px;
    }
    #hbtn {
      width: 40px;
      height: 40px;
    }
  }
  .footer {
    font-size: 20px;
    background: white;
    position: fixed;
    bottom: 0;
    width: 50%;
    padding: 10px 0;
    .ipt {
      width: 80%;
      font-family: Georgia, "Times New Roman", Times, serif;
    }
    .subBtn {
      position: absolute;
      right: 50px;
      bottom: 12px;
    }
    .foot {
      display: flex;
      justify-content: space-between;
      width: 80%;
      margin: 10px 10%;
    }
  }
  li {
    list-style: none;
    margin-bottom: 20px;
    padding: 2px 20px;
  }
  color: #dbdbdb;
  .elTxt {
    display: flex;
    .ldiv {
      text-align: left;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
      }
    }
    .cdiv {
      text-align: left;
      width: 60%;
      padding-left: 10px;
      p {
        color: #000;
      }
      span {
        font-size: 14px;
        color: gray;
      }
    }
    .rdiv {
      width: 30%;
      text-align: right;
      p {
        font-size: 20px;
        color: gray;
        cursor: pointer;
        &:hover {
          color: #ff5a5f;
        }
      }
    }
  }
  .content {
    padding: 0px 20px 0 40px;
    color: rgb(28, 28, 28);
    p {
      padding: 5px 0;
    }
  }
  .optionBox {
    text-align: right;
  }
}
/deep/ .el-drawer__header {
  display: none;
}
</style>
