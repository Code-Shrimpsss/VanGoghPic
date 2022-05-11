import request from '@/utils/request'
let headers = {
    // 请求头内Content-Type一定要是form-data格式
    "Content-Type": "multipart/form-data",
}
// 首页展示的数据
export const getUser = () => {
    return request.get('/allcounts')
}

// 个人主页信息获取
export const getUserDate = (user) => {
    return request.get('/myuser/' + user + '/')
}

// 个人信息修改
export const ReviseUser = (userform) => {
    return request.post('/revise/', userform, { headers })
}

// export const updateUserAvatarAPI = fd => {
//     return request.patch('/v1_0/user/photo', fd)
// }











