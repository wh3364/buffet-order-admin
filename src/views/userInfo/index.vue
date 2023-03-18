<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="6">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="旧密码">
            <el-input v-model="form.oldPassword" type="password" />
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.newPassword" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateAdminPassword">立即修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import { updateAdminPassword } from '@/api/adminInfo'
export default {
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  methods: {
    updateAdminPassword() {
      if (!this.form.oldPassword || !this.form.newPassword) {
        this.$message.error('请输入完整信息')
        return
      }
      updateAdminPassword(this.form).then(res => {
        this.$message.success(res.message)
        this.$store.dispatch('user/logout').then(() => {
          this.$router.push({ path: '/login' })
        })
      })
    }
  }
}
</script>

<style>

</style>
