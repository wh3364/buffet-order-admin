<template>
  <div v-loading="loading" class="coupon">
    <el-row>
      <el-col :span="6">优惠券名称: {{ coupon.name }}</el-col>
      <el-col :span="6">优惠券状态:
        <el-tag v-if="coupon.flag === 1" type="info">
          审核中
        </el-tag>
        <el-tag v-else-if="coupon.flag === 2" type="success">
          审核通过
        </el-tag>
        <el-tag v-else-if="coupon.flag === 3" type="danger">
          审核通过
        </el-tag>
      </el-col>
      <el-col :span="6">优惠券种类:
        <span v-if="coupon.category === 1">
          满减
        </span>
        <span v-else-if="coupon.category === 2">
          折扣
        </span>
      </el-col>
      <el-col :span="6">优惠券使用范围:
        <span v-if="coupon.scope === 1">
          单品
        </span>
        <span v-else-if="coupon.scope === 2">
          餐品类型
        </span>
        <span v-else-if="coupon.scope === 3">
          全部餐品
        </span>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-show="coupon.scope === 1" :span="6">单品id: {{ coupon.scopeId }}</el-col>
      <el-col v-show="coupon.scope === 2" :span="6">餐品类型id: {{ coupon.scopeId }}</el-col>
      <el-col :span="6">发放类型:
        <span v-if="coupon.sendType === 1">
          用户领取
        </span>
        <span v-else-if="coupon.sendType === 2">
          系统发放
        </span>
      </el-col>
      <el-col v-show="coupon.sendType === 1" :span="6">优惠券发放结束日期:
        {{ coupon.expireTime }}
      </el-col>
      <el-col v-show="coupon.sendType === 1" :span="6">优惠券发放数量:
        {{ coupon.couponCount }}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">优惠券作用的人群:
        <span v-if="coupon.target === 1">
          全体
        </span>
        <span v-else-if="coupon.target === 2">
          会员等级
        </span>
        <span v-else-if="coupon.target === 3">
          新用户
        </span>
        <span v-else-if="coupon.target === 4">
          收费会员
        </span>
      </el-col>
      <el-col v-show="coupon.target === 2" :span="6">用户等级要求: {{ coupon.targetLevel }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">优惠券介绍: {{ coupon.intro }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">优惠券生效日期:{{ coupon.startTime }}至{{ coupon.endTime }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">优惠券满多少金额可使用:{{ coupon.limitMoney }}</el-col>
      <el-col :span="12">减免/折扣:{{ coupon.discount }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">优惠券介绍: {{ coupon.intro }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-button type="success" @click="auditCoupon(2)">通过审核</el-button>
        <el-button type="danger" @click="auditCoupon(3)">拒绝审核</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import { getCouponById, auditCoupon } from '@/api/coupon'
export default {
  data() {
    return {
      loading: false,
      coupon: {
        id: 0
      },
      auditCouponDto: {
        id: 0,
        aid: 0,
        flag: 0,
        info: 'info'
      }
    }
  },
  created() {
    this.coupon.id = this.$route.params.id
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getCouponById(this.coupon.id).then(res => {
        this.coupon = res.data
      }).finally(() => {
        this.loading = false
      })
    },
    auditCoupon(flag) {
      this.auditCouponDto.flag = flag
      this.auditCouponDto.id = this.coupon.id
      auditCoupon(this.auditCouponDto).then(res => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon {
  padding: 20px;

  &-top {
    &-title {
      font-size: large;
    }

    &-right {
      float: right;
      margin-bottom: 20px;
    }

    &-but {
      margin-right: 30px;
    }
  }
}
</style>
