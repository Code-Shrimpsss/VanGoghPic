import request from '@/utils/request'

// 获取所有图片类型的接口
export const getAllAlbums = () => {
    return request.get("/albums/")
      // this.$axios
      //   .get(this.$host + "/albums/")
      //   .then((res) => {
      //     this.albumList = res.data.datalist;
      //     // this.albumList.img_list = this.albumList.img_list.split(";");
      //   })
      //   .catch((err) => console.log(err));
};

// 获取画册详情数据
export const getSignAlbum = (pid) => {
    return request.post("/album/" + pid + "/")
};

// 获取收藏夹画册分类
// export


// 上传画册 
// 参数 from(albumname, albumtype,is)


// 修改画册