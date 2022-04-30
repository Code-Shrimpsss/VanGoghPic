import request from '@/utils/request'

// 获取所有图片类型的接口
export const GetAllType = () => {
    return request.get('/AllType/')
    // this.$axios
    //   .get(this.$host + "/AllType/")
    //   .then((res) => {
    //     this.types = res.data.lists;
    //   })
    //   .catch((err) => console.log(err));
};

// 获取指定类型下的图片的接口
export const GetImgData = (Goodid) => {
    return request.get("/imgs/" + Goodid + '/')
    // this.$axios
    //   .get(this.$host + "/imgs/" + this.Goodid + "/")
    //   .then((res) => {
    //     this.urlList = res.data.imgList;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
};