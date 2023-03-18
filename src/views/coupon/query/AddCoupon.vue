<template>
  <el-dialog
    v-loading="loading"
    title="新建优惠卷"
    :visible="dialogVisible"
    width="50%"
    :before-close="doClose"
  >
    <el-form
      ref="couponForm"
      label-position="right"
      label-width="180px"
      :model="coupon"
      :rules="couponRules"
    >
      <el-form-item prop="name" label="优惠券名称">
        <el-input
          v-model="coupon.name"
          placeholder="请输入优惠券名称"
        />
      </el-form-item>
      <el-form-item prop="intro" label="优惠券介绍">
        <el-input
          v-model="coupon.intro"
          type="textarea"
          placeholder="请输入优惠券介绍"
        />
      </el-form-item>
      <el-form-item prop="category" label="优惠券种类">
        <el-radio-group v-model="coupon.category">
          <el-radio :label="1">满减</el-radio>
          <el-radio :label="2">折扣</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="scope" label="优惠券使用范围">
        <el-radio-group v-model="coupon.scope">
          <el-radio :label="1">单品</el-radio>
          <el-radio :label="2">商品类型</el-radio>
          <el-radio :label="3">全部商品</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="coupon.scope === 1" prop="scopeId" label="单品id">
        <el-input
          v-model="coupon.scopeId"
          placeholder="请输入单品id"
        />
      </el-form-item>
      <el-form-item v-else-if="coupon.scope === 2" prop="scopeId" label="餐品类别id">
        <el-input
          v-model="coupon.scopeId"
          placeholder="请输入单品id"
        />
      </el-form-item>
      <el-form-item prop="sendType" label="发放类型">
        <el-radio-group v-model="coupon.sendType">
          <el-radio :label="1">用户领取</el-radio>
          <el-radio :label="2">系统发放</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="coupon.sendType === 1" prop="expireTime" label="优惠券发放结束日期">
        <el-date-picker
          v-model="coupon.expireTime"
          type="date"
          placeholder="选择发放结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item v-show="coupon.sendType === 1" prop="couponCount" label="优惠券发放数量">
        <el-input-number v-model="coupon.couponCount" :controls="false" :min="1" label="优惠券发放数量" />
      </el-form-item>
      <el-form-item prop="target" label="优惠券作用的人群">
        <el-radio-group v-model="coupon.target">
          <el-radio :label="1">全体</el-radio>
          <el-radio :label="2">会员等级</el-radio>
          <el-radio :label="3">新用户</el-radio>
          <el-radio :label="4">收费会员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="coupon.target === 2" prop="targetLevel" label="用户等级要求">
        <el-input-number v-model="coupon.targetLevel" :controls="false" :min="0" label="用户等级要求" />
      </el-form-item>
      <el-form-item prop="targetLevel" label="优惠券生效日期">
        <el-date-picker
          v-model="dates"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item v-if="true" prop="limitMoney" label="优惠券满多少金额可使用">
        <el-input-number v-model="coupon.limitMoney" :controls="false" :min="0" label="优惠券满多少金额可使用" />
      </el-form-item>
      <el-form-item prop="discount" :label="coupon.category === 1 ? '减免' : '折扣'">
        <el-input-number v-model="coupon.discount" :controls="false" :min="0" label="请输入减免或折扣" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="doClose">取 消</el-button>
      <el-button
        type="primary"
        @click="addCoupon"
      >确认添加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addCoupon } from '@/api/coupon'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    doClose: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      couponRules: {},
      coupon: {
        name: '',
        logo: '',
        intro: '',
        category: 1,
        scope: 1,
        scopeId: 0,
        expireTime: '',
        couponCount: 1,
        target: 1,
        targetLevel: 0,
        sendType: 1,
        startTime: '',
        endTime: '',
        limitMoney: 0,
        discount: 0
      },
      dates: []
    }
  },
  methods: {
    addCoupon() {
      this.loading = true
      this.coupon.startTime = this.dates[0]
      this.coupon.endTime = this.dates[1]
      addCoupon(this.coupon).then(res => {
        this.$message.success(res.message)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>
