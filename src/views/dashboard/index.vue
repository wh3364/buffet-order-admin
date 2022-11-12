<template>
  <div class="dashboard-container">
    <div class="dashboard-text">不饿了点餐系统</div>
    <!-- <div class="store-state-card">
       <div class="store-state-text">当前店铺状态:</div>
       <div class="store-state-text">营业中</div>
    </div> -->
    <el-row>
      <el-col :span="12">
        <div class="store-state-card">
          <div class="store-state-text">当前店铺状态: 营业中</div>
          <el-button type="danger">暂停营业</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="10">
        <div class="store-state-card">
          <div class="store-state-text">当前待处理订单: 0</div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="store-state-card">
          <div class="store-state-text">今天完成订单: 0</div>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="10">
        <div class="store-state-card">
          <div class="store-state-text">今日营收: 0.00￥</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
      display: flex;
      flex-direction: column;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .store-state {
    &-card {
      margin: 10px 0;
      padding: 20px;
      background-color: #FFF;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-text {
      font-size: 26px;
      line-height: 42px;
    }
  }
</style>
