<template>
  <div class="detail">
    <div class="detail-top">
      <span class="detail-top-title">食物细节</span>
      <div class="detail-top-right">
        <el-select v-model="nowType" placeholder="请选择">
          <el-option
            v-for="item in detailsType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <el-form ref="detailPriceForm" :model="showDetails">
      <el-table v-loading="listLoading" :data="showDetails.data" element-loading-text="Loading" border fit>
        <el-table-column label="细节名" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.detailName" class="input-mmargin16" placeholder="请输入内容" />
          </template>
        </el-table-column>
        <el-table-column label="售价(￥)" width="200" align="center">
          <template slot-scope="scope">
            <el-form-item
              :prop="'data.' + scope.$index + '.detailPrice'"
              :rules="priceRules"
            >
              <el-input v-model="scope.row.detailPrice" placeholder="请输入内容" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="分类" width="100" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.detailType" class="input-mmargin16" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <div v-if="scope.$index === 0" class="input-mmargin16">
              <el-button
                size="mini"
                type="primary"
                @click="addDetail(scope.$index, scope.row)"
              >添加
                <i class="el-icon-plus el-icon--right" />
              </el-button>
            </div>
            <div v-else class="input-mmargin16">
              <el-button
                size="mini"
                type="primary"
                @click="editDetail(scope.$index, scope.row)"
              >修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteDetail(scope.$index, scope.row)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import { validFoodDetailPrice } from '@/utils/validate'
import {
  getAllDetails,
  addDetail,
  updateDetail,
  deleteDetail
} from '@/api/mealFood'
export default {
  data() {
    const validateFoodDetailPrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输价格'))
      } else if (!validFoodDetailPrice(value)) {
        callback(new Error('这不是有效的两位小数'))
      } else {
        callback()
      }
    }
    return {
      details: [],
      newDetail: {
        detailId: null,
        detailName: '',
        detailPrice: 0,
        detailType: 0
      },
      showDetails: {
        data: []
      },
      detailsType: [{
        value: -1,
        label: '全部'
      }, {
        value: 0,
        label: '多选'
      }, {
        value: 1,
        label: '单选'
      }],
      nowType: -1,
      options: [{
        value: 0,
        label: '多选'
      }, {
        value: 1,
        label: '单选'
      }],
      listLoading: true,
      priceRules: {
        required: true, trigger: 'blur', validator: validateFoodDetailPrice
      }
    }
  },
  watch: {
    nowType() {
      this.changeType()
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      getAllDetails().then(res => {
        this.details = res.data
        this.listLoading = false
        this.changeType()
      }).catch(res => {
        this.details = []
        this.listLoading = false
        this.changeType()
      })
    },
    changeType() {
      const copy = this.details.map(item => { return { ...item } })
      if (this.nowType === -1) {
        this.newDetail.detailType = 0
        this.showDetails.data = copy
      } else {
        this.newDetail.detailType = this.nowType
        this.showDetails.data = copy.filter(item => { return item.detailType === this.nowType })
      }
      this.showDetails.data.unshift(this.newDetail)
    },
    addDetail(index, detail) {
      this.$refs.detailPriceForm.validate(valid => {
        if (valid) {
          addDetail(detail).then(res => {
            this.$message.success('添加成功')
            this.getData()
          })
        }
      })
    },
    editDetail(index, detail) {
      updateDetail(detail).then(res => {
        this.$message.success('修改成功')
        this.getData()
      }).catch(() => {
        this.getData()
      })
    },
    deleteDetail(index, detail) {
      deleteDetail(detail).then(res => {
        this.$message.success('删除成功')
        this.getData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
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
  }
  .el-table .cell{
    overflow: visible;
  }
  .el-form-item{
    height: 56px;
    margin-bottom: 0;
  }
  .input-mmargin16{
    margin-bottom: 16px;
  }
}
</style>
