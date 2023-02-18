import request from '@/utils/request'

export function queryAllAdminInfo() {
  return request({
    url: '/Admin/QueryAllAdminInfo',
    method: 'get'
  })
}
