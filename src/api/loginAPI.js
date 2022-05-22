import request from '@/utils/request'
let headers = {
    // 请求头内Content-Type一定要是form-data格式
    "Content-Type": "multipart/form-data",
}

// 个人主页信息获取
export const getUserDate = (user) => {
    return request.get('/myuser/' + user + '/')
}
// 检查电话号码是否已经注册
export const checkMobile = (phone) => {
    return request.get('/mobiles/' + phone + '/', { loading: false })
}
// 检查用户名是否已经注册
export const checkUser = (username) => {
    return request.get("/usernames/" + username + "/count/", { loading: false })
}
