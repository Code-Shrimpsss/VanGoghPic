import request from '@/utils/request'
let headers = {
    // 请求头内Content-Type一定要是form-data格式
    "Content-Type": "multipart/form-data",
}
// 获取所有画册的接口
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
export const createAlbum = (form) => {
    return request.post('/createAlbum/', form, {headers})
}


// 修改画册


// 收藏画册
export const getFavorites = (data) => {
    return request.post('/getFavorites/', data)
}

// 取消收藏画册
export const reFavorites = (data) => {
    return request.post('/reFavorites/', data)
}
// 判断是否收藏画册
export const isFavorites = (data) => {
    return request.post('/isFavorites/', data)
}