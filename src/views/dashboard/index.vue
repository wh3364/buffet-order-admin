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
    <el-row :gutter="16">
      <el-col :span="8">
        <div id="echart1" />
      </el-col>
      <el-col :span="8">
        <div id="echart2" />
      </el-col>
      <el-col :span="8">
        <div id="echart3" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import * as echarts from 'echarts'
export default {
  name: 'Dashboard',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      const myChart1 = echarts.init(document.getElementById('echart1'))
      const myChart2 = echarts.init(document.getElementById('echart2'))
      const myChart3 = echarts.init(document.getElementById('echart3'))
      const option1 = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      }
      const option2 = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line'
          }
        ]
      }
      const option3 = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' },
              { value: 1048, name: 'Search Engine' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart1.setOption(option1)
      myChart2.setOption(option2)
      myChart3.setOption(option3)
    }
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

.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}

.layer-1 {
  margin-bottom: 20px;
}

#echart1 {
  height: 400px;
  width: auto;
}

#echart2 {
  height: 400px;
  width: auto;
}

#echart3 {
  height: 400px;
  width: auto;
}
</style>
