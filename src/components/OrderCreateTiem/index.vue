<template>
  <div class="top">
    <el-date-picker
      v-model="createTime"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      @change="changeTimes"
    />
    <el-radio-group
      v-model="orderStateName"
      class="top-radio"
      @change="subOrderList"
    >
      <el-radio-button label="全部" />
      <el-radio-button label="待付款" />
      <el-radio-button label="已付款" />
      <el-radio-button label="发货中" />
    </el-radio-group>
    <el-button
      type="primary"
      icon="el-icon-search"
      @click="subOrderList"
    >查询</el-button>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data() {
    return {
      createTime: [],
      orderStateName: '全部',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近两天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  created() {
    if (store.getters.orderTimes.length === 0) {
      store.dispatch('orderTime/init').then((res) => {
        this.createTime = res
      })
    } else {
      this.createTime = store.getters.orderTimes
    }
  },
  methods: {
    changeTimes() {
      store.dispatch('orderTime/setCreateTimes', this.createTime)
    },
    subOrderList() {
      this.$emit('getOrder', {
        creatTimes: this.getcreatTime(),
        creatState: this.getStateNum()
      })
    },
    getcreatTime() {
      return this.createTime.map((item) => { return item.getTime() })
    },
    getStateNum() {
      switch (this.orderStateName) {
        case '全部':
          return -1
        case '待付款':
          return 0
        case '已付款':
          return 1
        case '发货中':
          return 2
        default:
          return -1
      }
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
