import request from '@/utils/request'

export function getAllCates() {
  return request({
    url: '/Admin/GetAllCates',
    method: 'get'
  })
}

export function updateCate(data) {
  return request({
    url: '/Admin/UpdateCate',
    method: 'post',
    data
  })
}

export function addCate(data) {
  return request({
    url: '/Admin/AddCate',
    method: 'post',
    data
  })
}
