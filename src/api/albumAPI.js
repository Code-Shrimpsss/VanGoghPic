import request from '@/utils/request'
let headers = {
    // 请求头内Content-Type一定要是form-data格式
    "Content-Type": "multipart/form-data",
}
// 获取所有画册的接口
export const getAllAlbums = () => {
    return request.get("/albums/")
};

// 获取画册详情数据
export const getSignAlbum = (data) => {
    /**
 * @param {Object} data  // 上传的数据
 */
    return request.post("/album/", data)
};

// 上传画册 
export const createAlbum = (form) => {
    /**
     * @param {Object} form  // 上传的数据
     * @returns {Promise}
     */
    return request.post('/createAlbum/', form, { headers })
}

// 修改画册
export const updataAlbum = (data) => {
    /**
     * @param {Object} data  // 上传的数据
     */
    return request.post('/updataAlbum/', data)
}

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
// 主页画册展示
export const myFavorites = (data) => {
    return request.post('/myFavorites/', data)
}
// 个人主页画册
export const testFavorites = (user) => {
    return request.get('/testFavorites/' + user + '/')
}