import request from '@/utils/request'

export function queryAllAdminInfo() {
  return request({
    url: '/Admin/QueryAllAdminInfo',
    method: 'get'
  })
}

export function resetAdminPassword(id) {
  return request({
    url: `/Admin/reset/${id}`,
    method: 'post'
  })
}

export function updateAdminPassword(data) {
  return request({
    url: `/Assistant/updatePassword`,
    method: 'post',
    data
  })
}
