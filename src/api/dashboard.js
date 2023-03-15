import request from '@/utils/request'

export function getData(startTime = new Date().getTime() - 1000 * 60 * 60 * 24 * 60, endTime = new Date().getTime()) {
  return request({
    url: `/Dashboard?startTime=${startTime}&endTime=${endTime}`,
    method: 'get'
  })
}

export function getOrderData() {
  return request({
    url: `/Dashboard/order`,
    method: 'get'
  })
}
