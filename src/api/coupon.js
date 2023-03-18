import request from '@/utils/request'

export function addCoupon(data) {
  return request({
    url: '/Assistant/coupon',
    method: 'put',
    data
  })
}

export function auditCoupon(data) {
  return request({
    url: '/Admin/coupon',
    method: 'post',
    data
  })
}

export function getCouponByPage(pageNum = 1) {
  return request({
    url: `/Assistant/coupon/page/${pageNum}`,
    method: 'get'
  })
}

export function getCouponById(id) {
  return request({
    url: `/Assistant/coupon/${id}`,
    method: 'get'
  })
}
