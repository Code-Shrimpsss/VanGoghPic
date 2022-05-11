<template>
  <div class="mypicbox">
    <el-skeleton
      id="picbox"
      :loading="loading"
      animated
      v-if="listThumbnail"
      lazy
    >
      <!-- animated :count="10" -->
      <template slot="template" id="skebox">
        <el-skeleton-item variant="image" id="skeimg" />
      </template>
      <template>
        <!--  -->
        <div id="cardbox" v-for="(item, index) in lists" :key="index">
          <!-- :src="item.image_thumbnail" -->
          <!-- ['fill', 'contain', 'cover', 'none', 'scale-down'] -->
          <el-image
            :src="item.image_link"
            class="el-img"
            fit="cover"
            :preview-src-list="Thumbnails"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </template>
    </el-skeleton>
    <el-empty v-else :image-size="200"></el-empty>
  </div>
</template>

<script>
export default {
  props: { lists: { typeof: Array } },
  data() {
    return {
      loading: true,
      listThumbnail: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(this.lists[0]);
    },
    setLoading() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 1550);
    },
  },
  created() {
    this.loading = false;
    this.setLoading();
  },
  computed: {
    Thumbnails() {
      for (let index = 0; index < this.lists.length; index++) {
        this.listThumbnail.push(this.lists[index].image_link);
      }
      return this.listThumbnail;
    },
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
    // width: 275px;
    width: 280px;
    height: 265px;
    background-repeat: no-repeat;
    margin: 0 3px;
    .image-slot {
      text-align: center;
    }
  }
}
#skeimg {
  height: 650px;
}
.el-image__inner el-image__preview {
  object-fit: cover;
}
</style>