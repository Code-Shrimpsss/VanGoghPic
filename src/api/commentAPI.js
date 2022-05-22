import request from '@/utils/request'

// 发送评论的接口
export const setComment = (data) => {
    return request.post('/comment/set/', data)
}

// 获取评论的接口
export const getComment = (data) => {
    return request.get('/comment/get/' + data + '/')
}

// 删除评论的接口
export const delComment = (id) => {
    return request.post('/comment/delete/', id)
}