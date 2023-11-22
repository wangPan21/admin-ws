//引入axios （axios进行二次封装）
import request from '@/utils/request'
//对外暴漏登录接口
export function login(data) {
    return request({
        url: '/admin/acl/index/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/admin/acl/index/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/admin/acl/index/logout',
        method: 'post'
    })
}