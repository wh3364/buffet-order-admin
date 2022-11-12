<template>
  <div>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      popper-class="my-autocomplete"
      @select="handleSelect"
    >
      <template slot-scope="{ item }">
        <div class="name">{{ item.value }}</div>
        <span class="addr">{{ item.detailPrice }}</span>
      </template>
    </el-autocomplete>
    <el-input v-model="input" placeholder="请输入内容" />
  </div>
</template>

<script>
import { getAllDetails } from '@/api/mealFood'
export default {
  data() {
    return {
      details: [],
      state: '',
      input: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getAllDetails().then(res => {
        this.details = res.data.map(item => {
          return {
            value: item.detailName,
            detailPrice: item.detailPrice
          }
        })
        console.log(this.details)
      })
    },
    querySearchAsync(queryString, callback) {
      const details = this.details
      // const results = queryString ? details.filter(this.createStateFilter(queryString)) : details
      callback(details)
    },

    handleSelect(item) {
      this.input = item.detailPrice
      console.log(item)
    }
  }
}
</script>

<style scoped>
.my-autocomplete li {
    line-height: 4px;
    padding: 7px;
}

.name {
    text-overflow: ellipsis;
    overflow: hidden;
}

.addr {
    font-size: 12px;
    color: #b4b4b4;
}

.highlighted .addr {
    color: #ddd;
}
</style>
