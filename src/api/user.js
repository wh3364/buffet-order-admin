import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/Assistant/Info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/Assistant/Logout',
    method: 'post'
  })
}
