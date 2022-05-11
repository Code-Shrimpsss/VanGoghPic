<template>
  <div class="home">
    <div class="mainBox">
      <div class="subjectTxt">
        <h1>Van GoghPic</h1>
        <h1>Lightweight Social Wallpaper Site</h1>
      </div>
      <div class="Banner">
        <img src="../assets/vangogh1.jpg" alt="" />
      </div>
      <div class="FeaturesBox">
        <p class="icon-user">
          &nbsp;{{ counts.UserCount }} <br />
          <i>热爱图片的收藏家</i><br />
          <span>collectors who love pictures</span>
        </p>
        <p class="icon-film">
          &nbsp;{{ counts.FavCount }} <br />
          <i>值得一看的著名画册</i><br />
          <span>A famous picture book worth watching</span>
        </p>
        <p class="icon-picture">
          &nbsp;{{ counts.picCount }} <br />
          <i>你所看到与理解的每一张世界</i><br />
          <span>Every world you see and understand</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import "../css/font-awesome.min.css";
import { getUser } from "@/api/userAPi";
export default {
  name: "HomeView",
  data() {
    return {
      counts: {
        UserCount: "42",
        FavCount: "339",
        picCount: "4239",
      },
    };
  },
  methods: {
    async getUserPro() {
      const { data: res } = await getUser();
      // this.counts.UserCount = res.counts[0];
      // this.counts.FavCount = res.counts[1];
      // this.counts.picCount = res.counts[2];
      res.counts.map((item, index) => {
        this.counts.UserCount = index === 0 ? item : this.counts.UserCount;
        this.counts.FavCount = index === 1 ? item : this.counts.FavCount;
        this.counts.picCount =  index === 2 ? item : this.counts.picCount;
        console.log(item);
      });
      // console.log(this.counts);
    },
  },
  created() {
    this.getUserPro();
  },
};
</script>
<style lang="less">
h1,
h2 {
  /* font-family: Georgia, ‘Times New Roman’, Times, serif; */
  font-family: arzhu !important;
  margin-bottom: 20px;
  color: #fff;
}
.home {
  padding: 80px 200px 0;
  background-color: rgb(36, 37, 39);
  .mainBox {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 30px;
    div {
      width: 33%;
    }
    .subjectTxt {
      position: relative;
      left: 198px;
      margin-top: 30px;
      h1 {
        width: 511px;
        font-size: 75px;
      }
    }
    .Banner {
      margin-top: 20px;
      border-radius: 20px 0px 0px;
      img {
        width: 550px;
        height: 640px;
        object-fit: cover;
      }
    }
    .FeaturesBox {
      width: 100%;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      text-align: left;
      color: rgb(233, 233, 233);
      position: relative;
      top: 100px;
      right: -100px;
      p {
        display: block;
        font-size: 30px;
        margin: 30px 0;
        i {
          font-style: normal;
          font-size: 20px;
          color: gray;
          font-family: Georgia, "Times New Roman", Times, serif;
        }
        span {
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: 25px;
          color: gray;
        }
      }
    }
  }
}
// @media all and (max-width: 700px) {

// }
@media screen and (max-width: 600px) {
  .home {
    padding: 80px 0px;
  }
  .home div {
    width: 0;
  }
  .subjectTxt {
    position: absolute;
  }
  h1{
    font-size: 20px;
  }
  .FeaturesBox{
    position: static;
  }
  // .Banner{
  //     display:none ;
  //     margin-top: 0;
  // }
  .Banner img {
    width: 250px;
  }
}
</style>