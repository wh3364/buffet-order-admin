<template>
  <el-dialog
    v-if="newCate != {}"
    title="分类详情"
    :visible="dialogVisible"
    width="30%"
    :before-close="doClose"
  >
    <el-switch v-model="canEdit" class="switch" active-text="启用编辑" />
    <el-form
      ref="cateForm"
      label-position="right"
      label-width="80px"
      :model="newCate"
      :rules="cateRules"
    >
      <el-form-item v-if="!isAdd" label="分类id">
        <el-input v-model="newCate.cateId" :disabled="true" />
      </el-form-item>
      <el-form-item prop="cateName" label="分类名">
        <el-input
          v-model="newCate.cateName"
          placeholder="请输入分类名"
          :disabled="!canEdit || newCate.cateId === 1"
        />
      </el-form-item>
      <el-form-item prop="cateWeight" label="权重">
        <el-input
          v-model="newCate.cateWeight"
          :disabled="!canEdit"
          placeholder="请输入权重"
          maxlength="3"
        />
        <!--oninput="value=value.replace(/[^\d]/g,'')" -->
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="doClose">取 消</el-button>
      <el-button
        v-if="isAdd"
        type="primary"
        :disabled="!canEdit"
        @click="doUpdateCate"
      >确认添加</el-button>
      <el-button
        v-else
        type="primary"
        :disabled="!canEdit"
        @click="doUpdateCate"
      >确认修改</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  updateCate,
  addCate
} from '@/api/mealCate'
import {
  validName,
  validWeight
} from '@/utils/validate'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    cate: {
      type: Object,
      required: true
    },
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const validateCateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入分类名'))
      } else if (!validName(value)) {
        callback(new Error('长度1-20'))
      } else {
        callback()
      }
    }
    const validateCateWeight = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入分权重'))
      } else if (!validWeight(value)) {
        callback(new Error('0到999的正整数'))
      } else {
        callback()
      }
    }
    return {
      canEdit: false,
      newCate: {
        cateName: '',
        cateWeight: 0
      },
      oldName: '',
      oldWeight: 0,
      cateRules: {
        cateName: [{ required: true, trigger: 'blur', validator: validateCateName }],
        cateWeight: [{ required: true, trigger: 'blur', validator: validateCateWeight }]
      }
    }
  },
  watch: {
    cate() {
      this.newCate = this.cate
      this.oldName = this.newCate.cateName
      this.oldWeight = this.newCate.cateWeight
    }
  },
  methods: {
    doUpdateCate() {
      this.$refs.cateForm.validate(valid => {
        if (valid) {
          let title, message
          if (this.isAdd) {
            title = '是否添加分类'
            message = `分类名 ${this.newCate.cateName}<br/>
                  权重 ${this.newCate.cateWeight}`
          } else {
            title = '是否修改分类'
            message = `分类名 ${this.oldName} -> ${this.newCate.cateName}<br/>
                  权重 ${this.oldWeight} -> ${this.newCate.cateWeight}`
          }
          this.$confirm(message, title, {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isAdd) {
              addCate(this.newCate).then((res) => {
                this.$message.success(res.message)
                this.edited(res.data)
              })
            } else {
              updateCate(this.newCate).then((res) => {
                this.$message.success(res.message)
                this.edited(res.data)
              })
            }
          })
        }
      })
    },
    edited(cate) {
      this.canEdit = false
      this.$emit('edited',
        { 'cate': cate,
          'isAdd': this.isAdd
        }
      )
    },
    doClose() {
      this.canEdit = false
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.switch {
  margin: 0 20px 20px 20px;
}
</style>
