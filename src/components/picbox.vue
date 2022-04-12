<template>
  <div class="mypicbox">
    <el-skeleton id="picbox" :loading="loading" >
      <!-- animated :count="10" -->
      <template slot="template" id="skebox">
        <el-skeleton-item variant="image" id="skeimg" />
      </template>
      <template>
        <!-- :preview-src-list="listData.urls" -->
        <div id="cardbox" v-for="(item, index) in lists" :key="index" >
          <el-image :src="item.imgUrl" class="el-img" >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </template>
    </el-skeleton>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      lists: [],
      urls: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    setLoading() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 1000);
    },
  },
  created () {
    this.loading = false;
    this.lists = [
      {
        imgUrl:
          "https://fus10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        name: "鹿",
      },
      {
        imgUrl:
          "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        name: "马",
      },
      {
        imgUrl:
          "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        name: "山狮",
      },
      {
        imgUrl:
          "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        name: "马",
      },
      {
        imgUrl:
          "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
        name: "山狮",
      },
      {
        imgUrl:
          "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
        name: "山狮",
      },
      {
        imgUrl:
          "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
        name: "山狮",
      },
    ];
    this.setLoading();
  },
};
</script>

<style lang="less" scoped>
#skebox {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  #skeimg {
    width: 1065px;
    height: 1040px;
    display: inline-block;
    margin: 20px;
  }
}
#picbox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  .el-img {
    width: 265px;
    object-fit: cover;
    background-repeat: no-repeat;
    margin: 0 3px;
    .image-slot {
      text-align: center;
    }
  }
}
</style>