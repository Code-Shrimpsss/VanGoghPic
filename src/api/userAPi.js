import request from '@/utils/request'

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
    return request.post('/revise', { formdata: userform })
}

// export const updateUserAvatarAPI = fd => {
//     return request.patch('/v1_0/user/photo', fd)
// }


