<template>
  <div class="coupon">
    <div class="coupon-top">
      <span class="coupon-top-title">查询优惠卷</span>
      <div class="coupon-top-right">
        <el-button class="cate-top-but" size="small" type="primary" @click="openAdd">新建优惠券<i
          class="el-icon-plus el-icon--right"
        />
        </el-button>
      </div>
    </div>
    <el-table
      v-if="page != null"
      v-loading="listLoading"
      :data="page.list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @row-click="goCoupon"
    >
      <el-table-column align="center" label="优惠券id" width="80">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="优惠券名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column width="80" align="center" label="折扣类型">
        <template slot-scope="scope">
          <span v-if="scope.row.category === 1">满减</span>
          <span v-else-if="scope.row.category === 2">折扣</span>
        </template>
      </el-table-column>
      <el-table-column label="使用范围" width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.scope === 1">单品</span>
          <span v-else-if="scope.row.scope === 2">餐品类型</span>
          <span v-else-if="scope.row.scope === 3">全部餐品</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠券有效日期" width="320" align="center">
        <template slot-scope="scope">{{ scope.row.startTime }}👉{{ scope.row.endTime }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="当前状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.flag === 1" type="info">
            审核中
          </el-tag>
          <el-tag v-if="scope.row.flag === 2" type="success">
            审核通过
          </el-tag>
          <el-tag v-if="scope.row.flag === 3" type="danger">
            审核通过
          </el-tag>
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
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <Page
      :page="page"
      @changePageNum="handleCurrentChange"
      @changePageSize="handleSizeChange"
    />
    <AddCoupon
      ref="addCoupon"
      :dialog-visible="addDialogVisible"
      :do-close="doAddClose"
    />
  </div>
</template>

<script>
import { getCouponByPage } from '@/api/coupon'
import AddCoupon from './AddCoupon'
import Page from '@/components/OrderPage'
export default {
  components: {
    AddCoupon,
    Page
  },
  data() {
    return {
      listLoading: false,
      addDialogVisible: false,
      page: {
        pageNum: 1
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCouponByPage(this.page.pageNum).then(res => {
        this.page = res.data
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`)
    },
    handleCurrentChange(pageNum) {
      this.page.pageNum = pageNum
      this.fetchData()
    },
    goCoupon(row) {
      this.$router.push({ path: `/coupon/${row.id}` })
    },
    openAdd() {
      this.addDialogVisible = true
    },
    doAddClose() {
      this.addDialogVisible = false
      this.$refs.addCoupon.coupon = {
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
      }
      this.$refs.addCoupon.dates = []
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon {
  padding: 20px;
  background-color: #FFF;

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
