<template>
  <div class="app-container">
    <OrderCreateTime @getOrder="relodingOrderList" />
    <el-table
      v-if="page != null"
      v-loading="listLoading"
      :data="page.list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @row-click="goOrderDetail"
    >
      <el-table-column align="center" label="订单号" width="95">
        <template slot-scope="scope">{{ scope.row.orderId }}</template>
      </el-table-column>
      <el-table-column label="用户id" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <el-table-column label="取餐号">
        <template slot-scope="scope">
          <span>{{ scope.row.orderGetNumb }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额应付金额" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.orderShouldPay }}</template>
      </el-table-column>
      <el-table-column label="订单金额实际付金额" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.orderRealPay }}</template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="订单状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.orderState === 0"
            type="info"
          >待付款</el-tag>
          <el-tag
            v-else-if="scope.row.orderState === 1"
            type=""
          >已付款</el-tag>
          <el-tag
            v-else-if="scope.row.orderState === 2"
            type="success"
          >已发货</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="时间"
        width="200"
      >
        <template slot-scope="scope">
          {{ getFormatTime(scope.row.orderCreateTime) }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.orderCreateTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <OrderPage
      :page="page"
      @changePageNum="handleCurrentChange"
      @changePageSize="handleSizeChange"
    />
    <OrderDialog
      :dialog-visible="dialogVisible"
      :order-detail="orderDetail"
      @close="closeDialog"
      @doRefresh="doRefreshAndClose"
    />
  </div>
</template>

<script>
import { getOrderList, getOrder } from '@/api/orderList'
import OrderCreateTime from '@/components/OrderCreateTiem'
import OrderPage from '@/components/OrderPage'
import OrderDialog from '@/components/OrderDialog'
import { formatTime } from '@/utils/index'

export default {
  components: {
    OrderCreateTime,
    OrderPage,
    OrderDialog
  },
  data() {
    return {
      page: {
        pageNum: 1
      },
      listLoading: true,
      dialogVisible: false,
      orderDetail: {},
      orderState: -1,
      createTime: []
    }
  },
  created() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    this.createTime.push(start.getTime())
    this.createTime.push(end.getTime())
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getOrderList(0, this.orderState, this.page.pageNum, this.createTime).then((response) => {
        this.page = response.data
        this.listLoading = false
      })
    },
    getFormatTime(time) {
      return formatTime(new Date(time))
    },
    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`)
    },
    handleCurrentChange(pageNum) {
      this.page.pageNum = pageNum
      this.fetchData()
    },
    goOrderDetail(row) {
      getOrder(row.orderId, row.userId).then((res) => {
        this.orderDetail = res.data
        this.orderDetail.orderJsonBody = JSON.parse(
          this.orderDetail.orderJsonBody
        )
        this.dialogVisible = true
      })
    },
    relodingOrderList(res) {
      this.createTime = res.creatTimes
      this.orderState = res.creatState
      this.page.pageNum = 1
      this.fetchData()
    },
    doRefreshAndClose() {
      this.closeDialog()
      this.fetchData()
    },
    closeDialog() {
      this.orderDetail = {}
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  &-radio {
    margin: 0 20px;
  }
}

.bottom-page {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
