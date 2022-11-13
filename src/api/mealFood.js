import request from '@/utils/request'

export function getAllFoods() {
  return request({
    url: '/Admin/GetAllFoods',
    method: 'get'
  })
}

export function updateFood(data) {
  return request({
    url: '/Admin/UpdateFood',
    method: 'post',
    data
  })
}

export function addFood(data) {
  return request({
    url: '/Admin/AddFood',
    method: 'post',
    data
  })
}

export function getAllDetails() {
  return request({
    url: '/Admin/GetAllDetails',
    method: 'get'
  })
}

export function addDetail(data) {
  return request({
    url: '/Admin/AddDetail',
    method: 'post',
    data
  })
}

export function updateDetail(data) {
  return request({
    url: '/Admin/UpdateDetail',
    method: 'post',
    data
  })
}

export function deleteDetail(data) {
  return request({
    url: '/Admin/DeleteDetail',
    method: 'post',
    data
  })
}
