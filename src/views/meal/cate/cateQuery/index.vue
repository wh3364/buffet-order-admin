<template>
  <div class="cate">
    <div class="cate-top">
      <span class="cate-top-title">菜单分类</span>
      <div class="cate-top-right">
        <el-button class="cate-top-but" size="small" type="primary" @click="addCate">添加<i
          class="el-icon-plus el-icon--right"
        />
        </el-button>
        <el-switch v-model="showUnenable" class="cate-top-switch" active-text="显示禁用" @change="changeShow" />
      </div>
    </div>
    <el-table v-if="cates != null" v-loading="listLoading" :data="cates" element-loading-text="Loading" border fit>
      <el-table-column label="分类id" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.cateId }}</template>
      </el-table-column>
      <el-table-column label="分类名" align="center">
        <template slot-scope="scope">{{ scope.row.cateName }}</template>
      </el-table-column>
      <el-table-column label="权重(越大排的越前)" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cateWeight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否可用" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEnable === 0" type="danger">禁用</el-tag>
          <el-tag v-else-if="scope.row.isEnable === 1" type="success">可用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editCate(scope.$index, scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.isEnable === 0"
            size="mini"
            type="success"
            @click="enableCate(scope.$index, scope.row)"
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
    <CateUpdateDialog
      :dialog-visible="dialogVisible"
      :is-add="isAdd"
      :cate="cate"
      @close="closeDialog"
      @edited="edited"
    />
  </div>
</template>

<script>
import {
  getAllCates,
  updateCate
} from '@/api/mealCate'
import CateUpdateDialog from './cateUpdateDialog.vue'
export default {
  components: {
    CateUpdateDialog
  },
  data() {
    return {
      showUnenable: false,
      listLoading: true,
      cates: [],
      dialogVisible: false,
      isAdd: false,
      cate: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      getAllCates().then(res => {
        if (this.showUnenable) {
          this.cates = res.data
        } else {
          this.cates = res.data.filter((item) => {
            return item.isEnable === 1
          })
        }
        this.listLoading = false
      })
    },
    addCate() {
      this.isAdd = true
      this.cate = {
        cateId: null,
        cateName: '',
        cateWeight: 0
      }
      this.dialogVisible = true
    },
    editCate(index, cate) {
      this.isAdd = false
      this.cate = { ...cate }
      this.dialogVisible = true
    },
    enableCate(index, cate) {
      this.$confirm(`分类 ${cate.cateName}`, '是否启用分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cate.isEnable = 1
        updateCate(cate).then(res => {
          this.$message.success('启用成功')
          cate.isEnable = 1
          this.cates[index] = cate
        })
      })
    },
    banCate(index, cate) {
      this.$confirm(`分类 ${cate.cateName} 将不会出现在菜单上`, '是否禁用分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        cate.isEnable = 0
        updateCate(cate).then(res => {
          this.$message.success('禁用成功')
          cate.isEnable = 0
          this.cates[index] = cate
        })
      })
    },
    changeShow() {
      this.getData()
    },
    edited(res) {
      if (res.isAdd) {
        this.cates.push(res.cate)
      } else {
        const index = this.cates.findIndex(item => {
          return item.cateId === res.cate.cateId
        })
        if (index >= 0) {
          this.cates[index].cateName = res.cate.cateName
          this.cates[index].cateWeight = res.cate.cateWeight
        }
      }
      this.closeDialog()
    },
    closeDialog() {
      this.cate = {}
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.cate {
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
