<template>
  <div class="home">
    <div class="mainBox">
      <div class="subjectTxt">
        <h1>Van GoghPic</h1>
        <h1>Lightweight Social Wallpaper Site</h1>
      </div>
      <div class="Banner">
        <img src="../assets/vangogh.jpg" alt="" />
      </div>
      <div class="FeaturesBox">
        <p class="icon-user">
          &nbsp;{{ counts.UserCount }} <br />
          <span>collectors who love pictures</span>
        </p>
        <p class="icon-film">
          &nbsp;{{ counts.FavCount }} <br />
          <span>A famous picture book worth watching</span>
        </p>
        <p class="icon-picture">
          &nbsp;{{ counts.picCount }} <br />
          <span>Every world you see and understand</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import "../css/font-awesome.min.css";
import axios from "axios";
import host from "../js/host";
export default {
  name: "HomeView",
  data() {
    return {
      host: host,
      counts: {
        picCount: "4239",
        FavCount: "339",
        UserCount: "30",
      },
    };
  },
  methods: {
    AllCounts(){
      axios.get(this.host + '/allcounts/')
            .then(res => {
              console.log(res.data);
              this.counts.UserCount = res.data.counts
            })
            .catch(err => console.log(err))
    }
  },
  mounted () {
    this.AllCounts()
  }
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
        span {
          font-family:Georgia, 'Times New Roman', Times, serif;
          font-size: 25px;
          color: gray;
        }
      }
    }
  }
}
</style>