<template>
  <div>
    <el-form
      ref="foodForm"
      label-position="right"
      label-width="120px"
      :model="food"
      :rules="foodRules"
    >
      <el-form-item prop="foodName" label="餐品名">
        <el-input
          v-model="food.foodName"
          placeholder="请输入餐品名"
        />
      </el-form-item>
      <el-form-item label="菜品分类">
        <el-select v-model="food.foodCate">
          <el-option
            v-for="item in cates"
            :key="item.cateId"
            :label="item.cateName"
            :value="item.cateId"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="foodNote" label="备注">
        <el-input v-model="food.foodNote" />
      </el-form-item>
      <el-form-item prop="foodPrice" label="售价">
        <el-input
          v-model="food.foodPrice"
          placeholder="请输入售价"
          maxlength="13"
        />
      </el-form-item>
      <el-form-item label="是否有额外选项">
        <el-switch v-model="haveDetail" active-text="是" @change="changeHaveDetail" />
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
                  suffix-icon="el-icon-s-finance"
                />
              </el-form-item>
            </el-col>
            <div class="but-group">
              <el-button type="primary" class="detail-d" @click="addDetailDM">添加</el-button>
              <el-button type="danger" class="detail-d" @click="delDetailDM">删除</el-button>
            </div>
          </el-row>
        </el-form-item>
        <el-form-item label="单选配料">
          <el-row v-for="(r, i) in food.foodDetail.dR" :key="i">
            <el-input
              v-model="r.rI"
              placeholder="输入单选标题"
              class="detail-d"
            />
            <el-col v-for="(ri, j) in r.rS" :key="j" class="detail-d" :span="4">
              <el-autocomplete
                v-model="ri.n"
                placeholder="输入单选名"
                popper-class="el-autocomplete-suggestion"
                :popper-append-to-body="false"
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
                  suffix-icon="el-icon-s-finance"
                />
              </el-form-item>
            </el-col>
            <div class="but-group">
              <el-button type="primary" class="detail-d" @click="addDetailDRRs(i)">添加</el-button>
              <el-button type="danger" class="detail-d" @click="delDetailDRRs(i)">删除</el-button>
            </div>
          </el-row>
          <el-button type="primary" class="detail-d" @click="addDetailDR">添加一组</el-button>
          <el-button type="danger" class="detail-d" @click="delDetailDR">删除一组</el-button>
        </el-form-item>
      </el-form-item>
      <el-form-item prop="foodWeight" label="权重">
        <el-input
          v-model="food.foodWeight"
          maxlength="3"
        />
      </el-form-item>
      <el-form-item label="菜品图片"> 请在修改食物中修改 </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="doAdd"
        >添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  validName,
  validWeight,
  validFoodNote,
  validFoodPrice,
  validFoodDetailPrice
} from '@/utils/validate'
import { getAllDetails } from '@/api/mealFood'
import { getAllCates } from '@/api/mealCate'
import { addFood } from '@/api/mealFood'
export default {
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
      cates: [],
      food: {},
      haveDetail: false,
      dM: {
        mI: '选择配料',
        mId: 1,
        mS: []
      },
      dR: [
        {
          rI: '',
          rId: 1,
          rS: []
        }
      ],
      details: [],
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
      }
    }
  },
  created() {
    this.getData()
    this.init()
  },
  methods: {
    init() {
      this.dM = {
        mI: '选择配料',
        mId: 1,
        mS: []
      }
      this.dR = [
        {
          rI: '',
          rId: 1,
          rS: []
        }
      ]
      this.food = {
        foodName: '',
        foodImg: '',
        foodCate: 1,
        haveDetail: 0,
        foodDetail: '',
        foodNote: '',
        foodPrice: 1,
        foodWeight: 0,
        isEnable: 1
      }
      this.haveDetail = false
      this.food.foodDetail = {
        dM: this.dM,
        dR: this.dR
      }
    },
    getData() {
      getAllCates().then((res) => {
        this.cates = res.data.filter((item) => {
          return item.isEnable === 1
        })
        this.food.foodCate = 1
        this.listLoading = false
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
        rS: [
          {
            n: '',
            s: 0,
            v: 0
          }
        ]
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
    doAdd() {
      this.$refs.foodForm.validate(valid => {
        if (valid) {
          if (this.food.haveDetail === 1) {
            this.food.foodDetail = JSON.stringify(this.food.foodDetail)
          } else {
            this.food.foodDetail = ''
          }
          addFood(this.food).then(res => {
            this.init()
            this.$message.success('添加成功')
          })
        } else {
          this.$message.error('请检查表单')
        }
      })
    }
  }
}
</script>

<style scoped>
.detail-d {
  margin: 6px;
}
.but-group {
  width: 70px;
}
::v-deep .el-autocomplete-suggestion {
  width: auto!important;
}
</style>
