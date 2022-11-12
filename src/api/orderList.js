import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/Assistant/List',
    method: 'get',
    params
  })
}

export function getOrderList(w, s, pageNum, createTime) {
  return request({
    url: `/Assistant/GetOrderList?way=${w}&state=${s}&createTime=${createTime}&pageNum=${pageNum}`,
    method: 'get'
  })
}

export function getOrder(orderId, userId = -1) {
  return request({
    url: `/Assistant/GetOrder?orderId=${orderId}&userId=${userId}`,
    method: 'get'
  })
}

export function goFood(orderId, userId) {
  return request({
    url: `/Assistant/GoFood?orderId=${orderId}&userId=${userId}`,
    method: 'post'
  })
}
