<template>
  <div
    style="margin: 30px;
    display: flex;
    flex-direction: column;"
  >
    <div
      style="padding: 20px 20px 0 20px;
        background-color: #FFF;"
    >
      <span style="font-size: large;">员工信息</span>
      <div
        style="float: right;
        margin-bottom: 20px;"
      >
        <el-button v-show="fales" style="margin-right: 30px;" size="small" type="primary" @click="addAdmin">添加<i
          class="el-icon-plus el-icon--right"
        />
        </el-button>
      </div>
    </div>
    <el-table v-if="allAdmin" v-loading="listLoading" :data="allAdmin" element-loading-text="Loading" border fit>
      <el-table-column label="员工id" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.adminId }}</template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="角色" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="resetAdmin(scope.$index, scope.row)">重置密码</el-button>
          <el-button v-show="fales" size="mini" type="danger" @click="deleteAdmin(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { queryAllAdminInfo, resetAdminPassword } from '@/api/adminInfo'
export default {
  data() {
    return {
      allAdmin: [],
      listLoading: false
    }
  },
  created() {
    this.queryAllAdminInfo()
  }, methods: {
    queryAllAdminInfo() {
      this.listLoading = true
      queryAllAdminInfo().then(res => {
        this.allAdmin = res.data
      }).catch(() => {
        this.allAdmin = []
      }).finally(() => {
        this.listLoading = false
      })
    },
    addAdmin() { },
    deleteAdmin() { },
    resetAdmin(index, admin) {
      this.$confirm(`是否重置${admin.username}的密码?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetAdminPassword(admin.adminId).then(res => {
          this.$alert(`${res.data.username}的密码已重置为${res.data.password}请及时修改`, '重置成功', {
            confirmButtonText: '确定'
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 30px;
  display: flex;
  flex-direction: column;
}

.admin-top {
  padding: 20px;
  background-color: #FFF;

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
