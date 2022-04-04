<template>
  <div class="Phone">
    <div style="width: 240px">
      <p>
        <label style="margin-right: 16px">切换 Loading</label>
        <el-switch v-model="loading" />
      </p>
      <el-skeleton style="width: 240px" :loading="loading" animated>
        <template slot="template">
          <el-skeleton-item
            variant="image"
            style="width: 240px; height: 240px"
          />
          <div style="padding: 14px">
            <el-skeleton-item variant="h3" style="width: 50%" />
            <div style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                margin-top: 16px;
                height: 16px;
              "
            >
            </div>
          </div>
        </template>
        <template>
          <el-card :body-style="{ padding: '0px', marginBottom: '1px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
          </el-card>
        </template>
      </el-skeleton>
    </div>
    <div class="demo-image__preview">
      <el-image
        style="width: 100px; height: 100px"
        :src="srcList[0]"
        :preview-src-list="srcList">
      </el-image>
    </div>
    <div class="demo-image__placeholder">
      <div class="block">
        <el-image :src="src" :preview-src-list="srcList" :lazy="true">
          <div slot="placeholder" class="image-slot">
          </div>
        </el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      currentDate: "2021-06-01",
      srcList: [
        "https://cdn.jsdelivr.net/gh/jiaoyanxia/picgo@master/blogimg/202112120249559.png",
        "https://cdn.jsdelivr.net/gh/jiaoyanxia/picgo@master/blogimg/202112120209416.jpeg",
      ],
      src: "https://cdn.jsdelivr.net/gh/jiaoyanxia/picgo@master/blogimg/202112120209416.jpeg",
    };
  },
};
</script>

<style lang="less">
@seven: 70px;

.Phone {
  margin-top: @seven;
  padding: 0 100px;
}
.phoneModel {
  width: 24.375rem;
  height: 52.75rem;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>