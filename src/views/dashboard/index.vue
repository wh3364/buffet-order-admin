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
    <div class="block">
      <el-date-picker
        v-model="dates"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="timestamp"
        @change="getData"
      />
    </div>
    <el-row :gutter="16">
      <el-col :span="12">
        <div id="echart1" />
      </el-col>
      <el-col :span="12">
        <div id="echart2" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import * as echarts from 'echarts'
import { getData } from '@/api/dashboard'
export default {
  name: 'Dashboard',
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      dates: '',
      revenue: {
        xData: [],
        seriesData: []
      },
      hotFood: [],
      myChart1: null,
      myChart2: null
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    const now = new Date()
    this.dates = [new Date(now.getTime() - 1000 * 60 * 60 * 24 * 60).getTime(), now.getTime()]
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.myChart1 !== null) {
        this.myChart1.dispose
      }
      if (this.myChart2 !== null) {
        this.myChart2.dispose
      }
      getData(this.dates[0], this.dates[1]).then(res => {
        this.revenue.xData = res.data.revenue.map(item => item.data)
        this.revenue.seriesData = res.data.revenue.map(item => item.revenue)
        this.hotFood = res.data.hotFood.map(item => {
          return {
            value: item.num,
            name: item.name
          }
        }).sort((f1, f2) => f1.value - f2.value)
        this.initEcharts()
      })
    },
    initEcharts() {
      this.myChart1 = echarts.init(document.getElementById('echart1'))
      this.myChart2 = echarts.init(document.getElementById('echart2'))
      const option1 = {
        xAxis: {
          type: 'category',
          data: this.revenue.xData
        },
        yAxis: {
          type: 'value',
          name: '收入'
        },
        series: [
          {
            data: this.revenue.seriesData,
            type: 'line'
          }
        ]
      }
      const option2 = {
        title: {
          text: '热门餐品',
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
            data: this.hotFood,
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
      this.myChart1.setOption(option1)
      this.myChart2.setOption(option2)
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
  margin: 0 auto;
  height: 400px;
  width: auto;
}

#echart2 {
  margin: 0 auto;
  height: 400px;
  width: auto;
}
</style>
