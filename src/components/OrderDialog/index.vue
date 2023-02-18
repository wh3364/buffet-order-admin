<template>
  <el-dialog
    v-if="detail != {}"
    title="订单详情"
    :visible="dialogVisible"
    width="50%"
    :before-close="doClose"
  >
    <span>订单id{{ detail.orderId }}</span>
    <el-table
      v-if="detail.orderJsonBody != null"
      :data="detail.orderJsonBody"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="食物id" align="center" width="95">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="食物名" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.na }}</template>
      </el-table-column>
      <el-table-column label="食物图片" width="140" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.img"
          />
        </template>
      </el-table-column>
      <el-table-column label="食物备注">
        <template slot-scope="scope">{{ scope.row.de }}</template>
      </el-table-column>
      <el-table-column label="食物个数" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.nu }}</template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button
        @click="
          doClose
        "
      >取 消</el-button>
      <el-button
        v-if="detail.orderState === 2"
        type="primary"
        :disabled="detail.orderState !== 2"
        @click="
          doGofood();
        "
      >出餐</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { goFood } from '@/api/orderList'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    orderDetail: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      detail: this.orderDetail
    }
  },
  watch: {
    orderDetail() {
      this.detail = this.orderDetail
    }
  },
  methods: {
    doGofood() {
      goFood(this.detail.orderId, this.detail.userId).then(res => {
        this.$message.success(res.message)
        this.$emit('doRefresh')
      })
    },
    doClose() {
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
