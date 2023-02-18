<template>
  <el-dialog
    v-if="food != {}"
    title="菜品编辑"
    :visible="dialogVisible"
    width="50%"
    :before-close="doClose"
  >
    <el-switch v-model="canEdit" class="switch" active-text="启用编辑" />
    <el-form
      ref="foodForm"
      label-position="right"
      label-width="120px"
      :model="food"
      :rules="foodRules"
    >
      <el-form-item label="餐品id">
        <el-input
          v-model="food.foodId"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item prop="foodName" label="餐品名">
        <el-input
          v-model="food.foodName"
          placeholder="请输入餐品名"
          :disabled="!canEdit"
        />
      </el-form-item>
      <el-form-item label="菜品分类">
        <el-select v-model="food.foodCate" :disabled="!canEdit">
          <el-option
            v-for="item in cates"
            :key="item.cateId"
            :label="item.cateName"
            :value="item.cateId"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="foodNote" label="备注">
        <el-input v-model="food.foodNote" :disabled="!canEdit" />
      </el-form-item>
      <el-form-item prop="foodPrice" label="售价">
        <el-input
          v-model="food.foodPrice"
          placeholder="请输入售价"
          :disabled="!canEdit"
          maxlength="13"
        />
      </el-form-item>
      <el-form-item label="是否有额外选项">
        <el-switch v-model="haveDetail" :disabled="!canEdit" active-text="是" @change="changeHaveDetail" />
      </el-form-item>
      <el-form-item v-if="haveDetail === true && typeof food.foodDetail !== 'string'" label="额外选项">
        <el-form-item label="多选配料">
          <el-row>
            <el-col v-for="(m, i) in food.foodDetail.dM.mS" :key="i" class="detail-d" :span="4">
              <el-autocomplete
                v-model="m.n"
                placeholder="输入配料名"
                popper-class="el-autocomplete-suggestion"
                :popper-append-to-body="false"
                :disabled="!canEdit"
                :fetch-suggestions="querySearchAsync"
                @select="handleSelect"
                @focus="changeDetailType(0, i)"
              >
                <template slot-scope="{ item }">
                  <span>{{ item.value }}</span>
                  <span>  {{ item.detailPrice }}￥</span>
                </template>
              </el-autocomplete>
              <el-form-item
                :prop="'foodDetail.dM.mS.' + i + '.v'"
                :rules="priceRules"
              >
                <el-input
                  v-model="m.v"
                  :disabled="!canEdit"
                  suffix-icon="el-icon-s-finance"
                />
              </el-form-item>

            </el-col>
            <div class="but-group">
              <el-button :disabled="!canEdit" type="primary" class="detail-d" @click="addDetailDM">添加</el-button>
              <el-button :disabled="!canEdit" type="danger" class="detail-d" @click="delDetailDM">删除</el-button>
            </div>
          </el-row>
        </el-form-item>
        <el-form-item label="单选配料">
          <el-row v-for="(r, i) in food.foodDetail.dR" :key="i">
            <el-input
              v-model="r.rI"
              placeholder="输入单选标题"
              :disabled="!canEdit"
              class="detail-d"
            />
            <el-col v-for="(ri, j) in r.rS" :key="j" class="detail-d" :span="4">
              <el-autocomplete
                v-model="ri.n"
                placeholder="输入单选名"
                popper-class="el-autocomplete-suggestion"
                :popper-append-to-body="false"
                :disabled="!canEdit"
                :fetch-suggestions="querySearchAsync"
                @focus="changeDetailType(1, i, j)"
                @select="handleSelect"
              >
                <template slot-scope="{ item }">
                  <span>{{ item.value }}</span>
                  <span>  {{ item.detailPrice }}￥</span>
                </template>
              </el-autocomplete>
              <el-form-item
                :prop="'foodDetail.dR.' + i + '.rS.' + j + '.v'"
                :rules="priceRules"
              >
                <el-input
                  v-model="ri.v"
                  :disabled="!canEdit"
                  suffix-icon="el-icon-s-finance"
                />
              </el-form-item>

            </el-col>
            <div class="but-group">
              <el-button :disabled="!canEdit" type="primary" class="detail-d" @click="addDetailDRRs(i)">添加</el-button>
              <el-button :disabled="!canEdit" type="danger" class="detail-d" @click="delDetailDRRs(i)">删除</el-button>
            </div>
          </el-row>
          <el-button :disabled="!canEdit" type="primary" class="detail-d" @click="addDetailDR">添加一组</el-button>
          <el-button :disabled="!canEdit" type="danger" class="detail-d" @click="delDetailDR">删除一组</el-button>
        </el-form-item>
      </el-form-item>
      <el-form-item prop="foodWeight" label="权重">
        <el-input
          v-model="food.foodWeight"
          :disabled="!canEdit"
          maxlength="3"
        />
      </el-form-item>
      <el-form-item label="菜品图片">
        点击图片更改
        <el-upload
          ref="uploadImg"
          accept=".png, .jpg"
          class="avatar-uploader"
          :action="updateUrl"
          name="File"
          :headers="{'token': token,}"
          :disabled="!canEdit"
          :show-file-list="false"
          :multiple="false"
          :auto-upload="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="food.foodImg" :src="food.foodImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="doClose">取 消</el-button>
      <el-button
        type="primary"
        :disabled="!canEdit"
        @click="doEdit"
      >修改</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  validName,
  validWeight,
  validFoodNote,
  validFoodPrice,
  validFoodDetailPrice
} from '@/utils/validate'
import { getToken } from '@/utils/auth'
import { updateFood } from '@/api/mealFood'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    foodd: {
      type: Object,
      required: true
    },
    cates: {
      type: Array,
      required: true
    },
    details: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    const validateFoodName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入分名'))
      } else if (!validName(value)) {
        callback(new Error('长度1-20'))
      } else {
        callback()
      }
    }
    const validateFoodNote = (rule, value, callback) => {
      !validFoodNote(value) ? callback(new Error('长度0-20')) : callback()
    }
    const validateFoodPrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输价格'))
      } else if (!validFoodPrice(value)) {
        callback(new Error('这不是有效的两位小数'))
      } else {
        callback()
      }
    }
    const validateFoodDetailPrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输价格'))
      } else if (!validFoodDetailPrice(value)) {
        callback(new Error('这不是有效的两位小数'))
      } else {
        callback()
      }
    }
    const validateFootWeight = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入权重'))
      } else if (!validWeight(value)) {
        callback(new Error('0到999的正整数'))
      } else {
        callback()
      }
    }
    return {
      canEdit: false,
      updateUrl: '',
      food: {},
      haveDetail: false,
      dM: {
        'mI': '选择配料',
        'mId': 1,
        mS: []
      },
      dR: [{
        rI: '',
        rId: 1,
        rS: []
      }],
      detailType: 0,
      ii: -1,
      jj: -1,
      foodRules: {
        foodName: [{ required: true, trigger: 'blur', validator: validateFoodName }],
        foodNote: [{ required: false, trigger: 'blur', validator: validateFoodNote }],
        foodPrice: [{ required: true, trigger: 'blur', validator: validateFoodPrice }],
        foodWeight: [{ required: true, trigger: 'blur', validator: validateFootWeight }]
      },
      priceRules: {
        required: true, trigger: 'blur', validator: validateFoodDetailPrice
      },
      token: getToken()
    }
  },
  watch: {
    foodd() {
      this.food = this.foodd
      this.updateUrl = `http://localhost:8080/BuffetOrder/Admin/UpdateFoodImg?foodId=${this.food.foodId}`
      this.food.haveDetail ? this.haveDetail = true : this.haveDetail = false
      if (this.food.foodDetail && this.food.haveDetail) {
        this.food.foodDetail = JSON.parse(this.food.foodDetail)
        if (this.food.foodDetail.dM === undefined) { this.food.foodDetail.dM = this.dM }
        if (this.food.foodDetail.dR === undefined) { this.food.foodDetail.dR = this.dR }
      } else {
        this.food.foodDetail = {
          dM: this.dM,
          dR: this.dR
        }
      }
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      console.log(file)
      const isPng = file.type === 'image/png'
      const isJpg = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPng && !isJpg) {
        this.$message.error('上传图片只能是 png 或 jpg 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return (isPng || isJpg) && isLt2M
    },
    handleAvatarSuccess(response) {
      if (response.code === 200) {
        this.$message.success('修改成功')
        this.food.foodImg = `${response.data.foodImg}?time=${new Date().getTime()}`
        this.$emit('updateImged', {
          food: this.food
        })
      } else {
        this.$message.error(response.message)
        this.food.foodImg = `${response.data.foodImg}?time=${new Date().getTime()}`
        this.$emit('updateImged', {
          food: this.food
        })
      }
    },
    changeHaveDetail() {
      this.haveDetail ? this.food.haveDetail = 1 : this.food.haveDetail = 0
    },
    querySearchAsync(queryString, callback) {
      const results = this.details.filter(item => { return item.detailType === this.detailType })
      callback(results)
    },
    handleSelect(item) {
      this.detailType ? this.food.foodDetail.dR[this.ii].rS[this.jj].v = item.detailPrice
        : this.food.foodDetail.dM.mS[this.ii].v = item.detailPrice
    },
    changeDetailType(detailType, ii, jj) {
      this.detailType = detailType
      ii === undefined ? ii = -1 : this.ii = ii
      jj === undefined ? jj = -1 : this.jj = jj
    },
    addDetailDM() {
      this.food.foodDetail.dM.mS.push({
        n: '',
        s: 0,
        v: 0
      })
    },
    delDetailDM() {
      this.food.foodDetail.dM.mS.pop()
    },
    addDetailDR() {
      this.food.foodDetail.dR.push({
        rI: '',
        rId: this.food.foodDetail.dR.length + 1,
        rS: [{
          n: '',
          s: 0,
          v: 0
        }]
      })
    },
    delDetailDR() {
      this.food.foodDetail.dR.pop()
    },
    addDetailDRRs(index) {
      this.food.foodDetail.dR[index].rS.push({
        n: '',
        s: 0,
        v: 0
      })
    },
    delDetailDRRs(index) {
      this.food.foodDetail.dR[index].rS.pop()
    },
    doEdit() {
      this.$refs.foodForm.validate(valid => {
        if (valid) {
          if (this.food.haveDetail) {
            if (this.food.foodDetail.dM.mS.length === 0 && this.food.foodDetail.dR.length === 0) {
              this.food.haveDetail = 0
              this.food.foodDetail = null
            }
            this.food.haveDetail = 1
            this.food.foodDetail = JSON.stringify(this.food.foodDetail)
          } else {
            this.food.haveDetail = 0
            this.food.foodDetail = null
          }
          updateFood(this.food).then(res => {
            this.$message.success('修改成功')
            this.edited()
          })
        } else {
          this.$message.error('请检查表单')
        }
      })
    },
    edited() {
      this.$emit('edited', {
        food: this.food
      })
      this.doClose()
    },
    doClose() {
      this.canEdit = false
      this.dM = {
        'mI': '选择配料',
        'mId': 1,
        mS: []
      }
      this.dR = [{
        rI: '',
        rId: 1,
        rS: []
      }]
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.switch {
  margin: 0 20px 20px 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.detail-d{
  margin: 6px;
}
.but-group{
  width: 70px;
}
::v-deep .el-autocomplete-suggestion {
  width: auto!important;
}
</style>
