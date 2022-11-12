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
