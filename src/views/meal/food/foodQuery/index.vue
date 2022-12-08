<template>
  <div class="food">
    <div class="food-top">
      <span class="food-top-title">菜单食物</span>
      <div class="food-top-right">
        <el-select v-model="cate.cateId" class="food-top-select" placeholder="请选择" @change="changeShowFoods">
          <el-option
            :key="0"
            label="全部"
            :value="0"
          />
          <el-option
            v-for="item in cates"
            :key="item.cateId"
            :label="item.cateName"
            :value="item.cateId"
          />
        </el-select>
        <el-switch v-model="showUnenable" class="food-top-switch" active-text="显示禁用" @change="changeShowFoods" />
      </div>
    </div>
    <el-table v-loading="listLoading" :data="showFoods" element-loading-text="Loading" border fit>
      <el-table-column label="食物id" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.foodId }}</template>
      </el-table-column>
      <el-table-column label="食物名" align="center">
        <template slot-scope="scope">{{ scope.row.foodName }}</template>
      </el-table-column>
      <el-table-column label="食物图片" width="140" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.foodImg"
          />
        </template>
      </el-table-column>
      <el-table-column label="当前分类" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.cateName }}</template>
      </el-table-column>
      <el-table-column label="售价￥" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.foodPrice }}￥</template>
      </el-table-column>
      <el-table-column label="是否有附加项" width="120" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.haveDetail === 0" type="info">无附加项</el-tag>
          <el-tag v-else-if="scope.row.haveDetail === 1">有附加项</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="权重(越大排的越前)" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.foodWeight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否可用" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEnable === 0" type="danger">禁用</el-tag>
          <el-tag v-else-if="scope.row.isEnable === 1" type="success">可用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editFood(scope.$index, scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.isEnable === 0"
            size="mini"
            type="success"
            @click="enableFood(scope.$index, scope.row)"
          >启用</el-button>
          <el-button
            v-else-if="scope.row.isEnable === 1"
            size="mini"
            type="danger"
            @click="banCate(scope.$index, scope.row)"
          >禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <FoodDialog
      :dialog-visible="dialogVisible"
      :cates="cates"
      :details="details"
      :foodd="food"
      :index="index"
      @close="closeDialog"
      @edited="edited"
      @updateImged="updateImged"
    />
  </div>
</template>

<script>
import {
  getAllFoods,
  updateFood,
  getAllDetails
} from '@/api/mealFood'
import { getAllCates } from '@/api/mealCate'
import FoodDialog from './foodDialog.vue'
export default {
  components: {
    FoodDialog
  },
  data() {
    return {
      showUnenable: false,
      listLoading: true,
      cates: [],
      details: [],
      cate: {
        cateId: 0
      },
      dialogVisible: false,
      foods: [],
      showFoods: [],
      food: {},
      index: -1
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      getAllFoods().then(res => {
        this.foods = res.data
        getAllCates().then(res => {
          this.cates = res.data.filter((item) => {
            return item.isEnable === 1
          })
          this.listLoading = false
          this.changeShowFoods()
        })
      })
      getAllDetails().then(res => {
        this.details = res.data.map(item => {
          return {
            value: item.detailName,
            detailPrice: item.detailPrice,
            detailType: item.detailType
          }
        })
      })
    },
    changeShowFoods() {
      this.listLoading = true
      if (this.showUnenable) {
        this.showFoods = this.foods
      } else {
        this.showFoods = this.foods.filter((item) => {
          return item.isEnable === 1
        })
      }
      this.showFoods = this.showFoods.filter((item) => {
        if (this.cate.cateId === 0) {
          return item
        } else {
          return item.foodCate === this.cate.cateId
        }
      })
      this.showFoods.sort((a, b) => { return a.foodId - b.foodId })
      this.listLoading = false
    },
    enableFood(index, food) {
      this.$confirm(`食品名 ${food.foodName}`, '是否启用食品', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        food.isEnable = 1
        updateFood(food).then(res => {
          this.$message.success('启用成功')
          const index = this.foods.findIndex(item => {
            return item.foodId === food.foodId
          })
          if (index >= 0) {
            this.foods[index].isEnable = food.isEnable
            this.changeShowFoods()
          }
        })
      })
    },
    banCate(index, food) {
      this.$confirm(`食品名 ${food.foodName} 将不会出现在菜单上`, '是否禁用食品', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        food.isEnable = 0
        updateFood(food).then(res => {
          this.$message.success('禁用成功')
          const index = this.foods.findIndex(item => {
            return item.foodId === food.foodId
          })
          if (index >= 0) {
            this.foods[index].isEnable = food.isEnable
            this.changeShowFoods()
          }
        })
      })
    },
    editFood(index, food) {
      this.index = index
      this.food = { ...food }
      this.dialogVisible = true
    },
    edited(res) {
      const index = this.foods.findIndex(item => {
        return item.foodId === res.food.foodId
      })
      if (index >= 0) {
        this.foods[index] = res.food
        this.foods[index].cateName = this.cates.find(item => {
          return item.cateId === this.foods[index].foodCate
        }).cateName
        this.changeShowFoods()
      }
      this.closeDialog()
    },
    updateImged(res) {
      const index = this.foods.findIndex(item => {
        return item.foodId === res.food.foodId
      })
      if (index >= 0) {
        this.foods[index].foodImg = res.food.foodImg
        this.changeShowFoods()
      }
    },
    closeDialog() {
      this.food = {}
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .food {
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

    &-select {
      margin-right: 30px;
    }
  }
}
</style>

