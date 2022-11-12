<template>
  <div v-if="page != null" class="bottom-page">
    <el-pagination
      layout="prev, pager, next, jumper"
      :total="page.total"
      :page-size="page.pageSize"
      :current-page="page.pageNum"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.$emit('changePageSize', pageSize)
    },
    handleCurrentChange(pageNum) {
      this.$emit('changePageNum', pageNum)
    }
  }
}
</script>

<style lang="sass" scoped>
.bottom-page
    margin-top: 20px
    display: flex
    justify-content: center
</style>>

