<template>
  <div>
          <div class="mylike">
    <li
      class="mylikeul"
      v-for="(item, index) in favoriteList"
      :key="index"
      :style="{ backgroundImage: 'url(' + item.defaultImg + ')' }"
      @click="InFavorites(item.Bid)"
    >
      <p>{{ item.favoritName }}</p>
      <el-divider class="lints" content-position="right"></el-divider>
      <span class="introduces">{{ item.introduce }}</span>
      <div class="authorBox">
        <span>{{ item.authorName }}</span>
        <el-avatar
          style="margin-left: 10px"
          size="small"
          :src="item.authorImg"
        ></el-avatar>
      </div>
    </li>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favoriteList: [
        {
          Bid: "1212",
          authorName: "不素之霸",
          authorImg: "https://lipsum.app/60x60/000/fff",
          defaultImg: "https://lipsum.app/random/640x480",
          boxUrl: `/favorites/${this.Bid}`,
          favoritName: "梵高·画册",
          introduce:
            "梵高出生于1853年3月30日荷兰乡村津德尔特的一个新教牧师家庭，早年的他做过职员和商行经纪人，还当过矿区的传教士最后他投身于绘画。他早期画风写实，受到荷兰传统绘画及法国写实主义画派的影响。1886年，他来到巴黎，结识印象派和新印象派画家，并接触到日本浮世绘的作品，视野的扩展使其画风巨变。1888年，来到法国南部小镇阿尔，创作《阿尔的吊桥》；同年与画家保罗·高更交往，但由于二人性格的冲突和观念的分歧，合作很快便告失败。此后，梵高的疯病（有人记载是“癫痫病”）时常发作，但神志清醒时他仍然坚持作画。1889年创作《星月夜》。1890年7月，梵高在精神错乱中开枪自杀，年仅37岁, Van Gogh",
          islike: true,
          comment: 233,
          urls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
            "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          ],
        },
        {
          Bid: "1212",
          authorName: "不素之霸",
          authorImg: "https://lipsum.app/60x60/000/fff",
          defaultImg: "https://lipsum.app/random/640x480",
          boxUrl: `/favorites/${this.Bid}`,
          favoritName: "梵高·画册",
          introduce:
            "梵高出生于1853年3月30日荷兰乡村津德尔特的一个新教牧师家庭，早年的他做过职员和商行经纪人，还当过矿区的传教士最后他投身于绘画。他早期画风写实，受到荷兰传统绘画及法国写实主义画派的影响。1886年，他来到巴黎，结识印象派和新印象派画家，并接触到日本浮世绘的作品，视野的扩展使其画风巨变。1888年，来到法国南部小镇阿尔，创作《阿尔的吊桥》；同年与画家保罗·高更交往，但由于二人性格的冲突和观念的分歧，合作很快便告失败。此后，梵高的疯病（有人记载是“癫痫病”）时常发作，但神志清醒时他仍然坚持作画。1889年创作《星月夜》。1890年7月，梵高在精神错乱中开枪自杀，年仅37岁, Van Gogh",
          islike: true,
          comment: 233,
          urls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
            "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          ],
        },
        {
          Bid: "1212",
          authorName: "不素之霸",
          authorImg: "https://lipsum.app/60x60/000/fff",
          defaultImg: "https://lipsum.app/random/640x480",
          boxUrl: `/favorites/${this.Bid}`,
          favoritName: "梵高·画册",
          introduce:
            "梵高出生于1853年3月30日荷兰乡村津德尔特的一个新教牧师家庭，早年的他做过职员和商行经纪人，还当过矿区的传教士最后他投身于绘画。他早期画风写实，受到荷兰传统绘画及法国写实主义画派的影响。1886年，他来到巴黎，结识印象派和新印象派画家，并接触到日本浮世绘的作品，视野的扩展使其画风巨变。1888年，来到法国南部小镇阿尔，创作《阿尔的吊桥》；同年与画家保罗·高更交往，但由于二人性格的冲突和观念的分歧，合作很快便告失败。此后，梵高的疯病（有人记载是“癫痫病”）时常发作，但神志清醒时他仍然坚持作画。1889年创作《星月夜》。1890年7月，梵高在精神错乱中开枪自杀，年仅37岁, Van Gogh",
          islike: true,
          comment: 233,
          urls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
            "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          ],
        },
        {
          Bid: "1212",
          authorName: "不素之霸",
          authorImg: "https://lipsum.app/60x60/000/fff",
          defaultImg: "https://lipsum.app/random/640x480",
          boxUrl: `/favorites/${this.Bid}`,
          favoritName: "梵高·画册",
          introduce:
            "梵高出生于1853年3月30日荷兰乡村津德尔特的一个新教牧师家庭，早年的他做过职员和商行经纪人，还当过矿区的传教士最后他投身于绘画。他早期画风写实，受到荷兰传统绘画及法国写实主义画派的影响。1886年，他来到巴黎，结识印象派和新印象派画家，并接触到日本浮世绘的作品，视野的扩展使其画风巨变。1888年，来到法国南部小镇阿尔，创作《阿尔的吊桥》；同年与画家保罗·高更交往，但由于二人性格的冲突和观念的分歧，合作很快便告失败。此后，梵高的疯病（有人记载是“癫痫病”）时常发作，但神志清醒时他仍然坚持作画。1889年创作《星月夜》。1890年7月，梵高在精神错乱中开枪自杀，年仅37岁, Van Gogh",
          islike: true,
          comment: 233,
          urls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
            "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          ],
        },
        {
          Bid: "1212",
          authorName: "不素之霸",
          authorImg: "https://lipsum.app/60x60/000/fff",
          defaultImg: "https://lipsum.app/random/640x480",
          boxUrl: `/favorites/${this.Bid}`,
          favoritName: "梵高·画册",
          introduce:
            "梵高出生于1853年3月30日荷兰乡村津德尔特的一个新教牧师家庭，早年的他做过职员和商行经纪人，还当过矿区的传教士最后他投身于绘画。他早期画风写实，受到荷兰传统绘画及法国写实主义画派的影响。1886年，他来到巴黎，结识印象派和新印象派画家，并接触到日本浮世绘的作品，视野的扩展使其画风巨变。1888年，来到法国南部小镇阿尔，创作《阿尔的吊桥》；同年与画家保罗·高更交往，但由于二人性格的冲突和观念的分歧，合作很快便告失败。此后，梵高的疯病（有人记载是“癫痫病”）时常发作，但神志清醒时他仍然坚持作画。1889年创作《星月夜》。1890年7月，梵高在精神错乱中开枪自杀，年仅37岁, Van Gogh",
          islike: true,
          comment: 233,
          urls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
            "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          ],
        },
        {
          Bid: "1212",
          authorName: "不素之霸",
          authorImg: "https://lipsum.app/60x60/000/fff",
          defaultImg: "https://lipsum.app/random/640x480",
          boxUrl: `/favorites/${this.Bid}`,
          favoritName: "梵高·画册",
          introduce:
            "梵高出生于1853年3月30日荷兰乡村津德尔特的一个新教牧师家庭，早年的他做过职员和商行经纪人，还当过矿区的传教士最后他投身于绘画。他早期画风写实，受到荷兰传统绘画及法国写实主义画派的影响。1886年，他来到巴黎，结识印象派和新印象派画家，并接触到日本浮世绘的作品，视野的扩展使其画风巨变。1888年，来到法国南部小镇阿尔，创作《阿尔的吊桥》；同年与画家保罗·高更交往，但由于二人性格的冲突和观念的分歧，合作很快便告失败。此后，梵高的疯病（有人记载是“癫痫病”）时常发作，但神志清醒时他仍然坚持作画。1889年创作《星月夜》。1890年7月，梵高在精神错乱中开枪自杀，年仅37岁, Van Gogh",
          islike: true,
          comment: 233,
          urls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
            "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          ],
        },
        {
          Bid: "1212",
          authorName: "不素之霸",
          authorImg: "https://lipsum.app/60x60/000/fff",
          defaultImg: "https://lipsum.app/random/640x480",
          boxUrl: `/favorites/${this.Bid}`,
          favoritName: "梵高·画册",
          introduce:
            "梵高出生于1853年3月30日荷兰乡村津德尔特的一个新教牧师家庭，早年的他做过职员和商行经纪人，还当过矿区的传教士最后他投身于绘画。他早期画风写实，受到荷兰传统绘画及法国写实主义画派的影响。1886年，他来到巴黎，结识印象派和新印象派画家，并接触到日本浮世绘的作品，视野的扩展使其画风巨变。1888年，来到法国南部小镇阿尔，创作《阿尔的吊桥》；同年与画家保罗·高更交往，但由于二人性格的冲突和观念的分歧，合作很快便告失败。此后，梵高的疯病（有人记载是“癫痫病”）时常发作，但神志清醒时他仍然坚持作画。1889年创作《星月夜》。1890年7月，梵高在精神错乱中开枪自杀，年仅37岁, Van Gogh",
          islike: true,
          comment: 233,
          urls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
            "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          ],
        },
        {
          Bid: "1212",
          authorName: "不素之霸",
          authorImg: "https://lipsum.app/60x60/000/fff",
          defaultImg: "https://lipsum.app/random/640x480",
          boxUrl: `/favorites/${this.Bid}`,
          favoritName: "梵高·画册",
          introduce:
            "梵高出生于1853年3月30日荷兰乡村津德尔特的一个新教牧师家庭，早年的他做过职员和商行经纪人，还当过矿区的传教士最后他投身于绘画。他早期画风写实，受到荷兰传统绘画及法国写实主义画派的影响。1886年，他来到巴黎，结识印象派和新印象派画家，并接触到日本浮世绘的作品，视野的扩展使其画风巨变。1888年，来到法国南部小镇阿尔，创作《阿尔的吊桥》；同年与画家保罗·高更交往，但由于二人性格的冲突和观念的分歧，合作很快便告失败。此后，梵高的疯病（有人记载是“癫痫病”）时常发作，但神志清醒时他仍然坚持作画。1889年创作《星月夜》。1890年7月，梵高在精神错乱中开枪自杀，年仅37岁, Van Gogh",
          islike: true,
          comment: 233,
          urls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
            "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          ],
        },
        {
          Bid: "1212",
          authorName: "不素之霸",
          authorImg: "https://lipsum.app/60x60/000/fff",
          defaultImg: "https://lipsum.app/random/640x480",
          boxUrl: `/favorites/${this.Bid}`,
          favoritName: "梵高·画册",
          introduce:
            "梵高出生于1853年3月30日荷兰乡村津德尔特的一个新教牧师家庭，早年的他做过职员和商行经纪人，还当过矿区的传教士最后他投身于绘画。他早期画风写实，受到荷兰传统绘画及法国写实主义画派的影响。1886年，他来到巴黎，结识印象派和新印象派画家，并接触到日本浮世绘的作品，视野的扩展使其画风巨变。1888年，来到法国南部小镇阿尔，创作《阿尔的吊桥》；同年与画家保罗·高更交往，但由于二人性格的冲突和观念的分歧，合作很快便告失败。此后，梵高的疯病（有人记载是“癫痫病”）时常发作，但神志清醒时他仍然坚持作画。1889年创作《星月夜》。1890年7月，梵高在精神错乱中开枪自杀，年仅37岁, Van Gogh",
          islike: true,
          comment: 233,
          urls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
            "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          ],
        },
      ],
    };
  },
  methods: {
    InFavorites(val) {
      this.$router.replace(`/favorites/${val}`);
    },
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
body {
  width: 100%;
  display: block;
}
.likeleft {
  text-align: left;
}
.mylike {
  li {
    position: relative;
    width: 200px;
    height: 100px;
    background-color: #3658d8;
    border-radius: 15px;
    margin: 20px 10px 20px 0;
    padding: 20px;
    display: inline-block;
    background-size:cover;
    background-repeat:no-repeat;
    p {
      color: #fff;
      font-size: 20px;
    }
    .lints {
      width: 0px;
      height: 2px;
      transition: width 1.5s;
      -webkit-transition: width 1.5s; /* Safari */
      margin-bottom: 2px;
    }
    span {
      color: transparent;
      transition: color 1.5s;
      -webkit-transition: color 1.5s; /* Safari */
    }
    .introduces {
      display: block;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  li:hover {
    .lints {
      width: 200px;
    }
    span {
      // font-size: 14px;
      color: #fff;
    }
  }
  .authorBox {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    align-items: center;
  }
}
</style>