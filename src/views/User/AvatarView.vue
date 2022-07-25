<template>
  <div id="avater" v-if="listdata">
    <div class="headbox">
      <el-button
        type="primary"
        class="rebtn"
        icon="el-icon-back"
        @click="$router.go(-1)"
      ></el-button>
      <h1 class="headtxt">{{ listdata.username }}的个人主页</h1>
    </div>
    <div class="avater">
      <div class="mianform">
        <div class="Pinfo">
          <h1>{{ listdata.username }}</h1>
          <p class="el-icon-cpu">
            &nbsp; 第<span icon="el-icon-edit"> {{ listdata.id }} </span
            >位收藏家
          </p>
          <p id="hobbyBox" class="el-icon-wind-power">
            &nbsp; hobby : &nbsp;
            <el-button
              class="btn"
              v-for="item in listdata.hobbys"
              :key="item"
              type="primary"
              >{{ item }}</el-button
            >
          </p>
          <p v-if="listdata.hobbys == []">没有喜欢的...</p>
          <h3 class="el-icon-magic-stick">&nbsp;个性签名</h3>
          <div class="txtbox">
            <span v-if="listdata.signature">{{ listdata.signature }}</span>
            <span v-else> 伟大的人从来不缺个性签名... </span>
          </div>
        </div>
        <div>
          <div class="authorBox">
            <el-avatar class="authorimg" :src="listdata.author_img"></el-avatar>
          </div>
        </div>
      </div>
      <div class="albumBox">
        <h1>作品集</h1>
        <li v-for="(item, index) in albumList" :key="index">
          <img
            class="likebox"
            @click="$router.push(`/album/${item.id}`)"
            :src="item.cover_img"
            alt=""
          />
          <h3>{{ item.title }}</h3>
        </li>
      </div>
    </div>
    <footers class="footers"></footers>
  </div>
</template>

<script>
import footers from "../../components/Footer.vue";
import { getUserDate } from "@/api/userAPi";
import { testFavorites } from "@/api/albumAPI";
export default {
  data() {
    return {
      listdata: {}, // 用户数据
      albumList: [], // 画册数据
      id: this.$route.params.id,
      // id: this.$route.params.id,
    };
  },
  components: {
    footers,
  },
  methods: {
    // 显示用户数据
    async infoUser() {
      const { data: res } = await getUserDate(this.id);
      this.listdata = res;
      console.log(this.listdata);
      // 将喜好通过<;>切割转换为数组 再截取前三位
      if (res.hobby) {
        this.listdata.hobbys = res.hobby.split(";").slice(0, 3);
      }
    },
    async AlbumData() {
      const { data: res } = await testFavorites(this.id);
      this.albumList = res;
      console.log(res);
    },
  },
  created() {
    this.infoUser();
    this.AlbumData();
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.footers,
.headbox {
  background-color: rgb(41, 45, 50);
  color: rgb(219, 219, 219);
  border: none;
  position: relative;
}
.footers {
  width: 90%;
  padding: 20px 5%;
  height: 180px;
}
.headone {
  position: absolute;
}
.headbox {
  padding: 20px 3%;
  display: flex;
  justify-content: flex-start;
  align-content: center;

  .rebtn {
    width: 60px;
    height: 60px;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 20px;
    margin-right: 20px;
  }
  .headtxt {
    font-size: 40px;
  }
}
.avater {
  // width: 100%;
  color: #fff;
  display: flex;
  justify-content: space-between;
  background-color: rgb(41, 45, 50);
  padding: 20px 7%;
  .mianform {
    width: 30%;
    padding: 3%;
    background-color: rgb(57, 58, 64);
    border-radius: 15px;
  }
  .albumBox {
    width: 55%;
    background: #393a40;
    border-radius: 15px;
    position: relative;
    display: flex;
    padding: 50px 50px 0;
    align-items: center;
    h1 {
      position: absolute;
      left: 50px;
      top: 30px;
    }
    li {
      .likebox {
        width: 180px;
        height: 150px;
        margin-right: 10px;
        border: 2px solid #fff;
        cursor: pointer;
        border-radius: 20px;
      }
    }
  }
  .mianform {
    animation: both;
    display: flex;
    justify-content: space-between;
    .Pinfo {
      position: relative;
      text-align: left;
      p {
        display: block;
        margin: 10px 0;
      }
      h3 {
        margin-top: 30px;
      }
      .collectBox {
        width: 100%;
        display: flex;
        // justify-content: space-evenly;
        justify-content: flex-start;
        padding-top: 5%;
        .pError {
          padding: 20px;
          background: #8c939d69;
          border-radius: 20px;
        }
        p {
          text-align: right;
          margin: 0;
          position: relative;
          top: -30px;
          right: 15px;
        }
      }
      .txtbox {
        margin-top: 5%;
        // position: absolute;
        border: 1px solid rgb(94, 95, 101);
        border-radius: 20px;
        padding: 20px;
      }
    }
    .authorimg {
      width: 150px;
      height: 150px;
    }
    .authorBox {
      position: relative;
    }
    .aubox {
      // margin-top: 20px;
      position: absolute;
      left: 80px;
      bottom: 8px;
      padding: 5px;
    }
  }
}
</style>
