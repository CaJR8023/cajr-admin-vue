<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>新闻标签表格</span>
      </div>
      <div class="searchDiv">
        <el-input
          type="text"
          placeholder="请输入id号"
          class="width1"
          v-model="sch_news_id"
        ></el-input>
        <el-select
          v-model="sch_status"
          clearable
          class="width1"
          placeholde="请选择状态"
        >
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          class="width1"
          v-model="sch_date"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="searchTab()"
          >搜索</el-button
        >
        <!-- <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addTab"
          >添加</el-button
        > -->
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="id" width="80" label="新闻图片id"></el-table-column>
        <el-table-column prop="newsId" width="100" label="新闻id"></el-table-column>
        <el-table-column prop="url" label="新闻图片url"></el-table-column>
        <el-table-column
          prop="createdAt"
          label="标签创建时间"
        ></el-table-column>
        <el-table-column prop="updatedAt" label="标签更新时间"></el-table-column>
        <el-table-column prop="status" label="状态" width="150">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | tagClass">{{
              scope.row.status | statusText
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="editTable(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="toDelete(scope.row)"
              :disabled="scope.row.status !== 3 ? false : true"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        class="fyDiv"
        @size-change="handleSize"
        @current-change="handlePage"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="新闻修改" :visible.sync="diaIsShow" class="diaForm">
      <el-form
        ref="diaForm"
        :model="formData"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="id号">
          <el-input
            type="text"
            v-model="formData.order"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="新闻时间" prop="time">
          <el-date-picker
            v-model="formData.time"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="新闻作者" prop="address">
          <el-input
            type="text"
            placeholder="请输入新的新闻作者"
            v-model="formData.address"
          ></el-input>
        </el-form-item>
        <el-form-item label="新闻标题" prop="phone">
          <el-input
            type="text"
            placeholder="请输入新闻标题"
            v-model="formData.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="新闻简述" prop="name">
          <el-input
            type="text"
            placeholder="请输入简述"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholde="请选择状态">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeTab('diaForm', editType)"
            >确认</el-button
          >
          <el-button @click="diaIsShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getNewsImgPage } from '@/api/table'
export default {
  data() {
    return {
      tableData: [],
      allList: [],
      schArr: [],
      sch_news_id: '',
      sch_status: null,
      sch_date: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 50, 100, 200],
      diaIsShow: false,
      formData: {},
      editType: '',
      options: [
        { label: '未删除', value: 1 },
        { label: '已删除', value: 0 }
      ],
      rowIndex: 0,
      rules: {
        // order: [{ required: true, message: '请输入订单号', trigger: 'blur' }],
        time: [
          {
            // type: 'datetime',
            required: true,
            message: '请输入时间',
            trigger: 'change'
          }
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        status: [
          { required: true, message: '请选择订单状态', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this._getNewsImgPage()
  },
  filters: {
    statusText(val) {
      if (val === undefined) return
      if (val === 0) {
        return '已删除'
      } else {
        return '未删除'
      }
    },
    tagClass(val) {
      if (val === undefined) return
      if (val === 0) {
        return 'danger'
      } else {
        return 'success'
      }
    }
  },
  methods: {
    handleSize(val) {
      this.pageSize = val
      this._getNewsImgPage()
    },
    handlePage(val) {
      this.currentPage = val
      this._getNewsImgPage()
    },
    _getNewsImgPage() {
      getNewsImgPage(this.currentPage, this.pageSize)
        .then(res => {
          this.tableData = res.list
          this.total = res.total
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    },
    // 查找
    searchTab() {
      let arrList = []
      for (let item of this.allList) {
        if (
          this.sch_news_id.trim() === '' &&
          this.sch_status === null &&
          this.sch_date === null
        ) {
          arrList = this.tableData
          break
        } else if (
          item.order.startsWith(this.sch_news_id) &&
          (this.sch_status !== null ? item.status === this.sch_status : true) &&
          (this.sch_date !== null ? item.time.startsWith(this.sch_date) : true)
        ) {
          let obj = Object.assign({}, item)
          arrList.push(obj)
        }
      }
      this.schArr = arrList
      this.total = arrList.length
      this.currentPage = 1
      this.pageSize = 10
      this.getPageData()
    },
    // add
    addTab() {
      this.formData = {}
      this.diaIsShow = true
      this.formData.order = (Math.random() * 10e18).toString()
      this.formData.id = this.allList.length + 1
      this.editType = 'add'
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate()
      })
    },
    // 审核
    toConfirm(row) {
      row.status = 2
      this.$notify({
        title: '成功',
        message: '审核提交成功',
        type: 'success'
      })
    },
    // 完成
    toSuccess(row) {
      row.status = 0
      this.$notify({
        title: '成功',
        message: '该订单已完成配送',
        type: 'success'
      })
    },
    // 取消
    toDelete(row) {
      row.status = 3
      this.$notify({
        title: '成功',
        message: '已取消该订单',
        type: 'success'
      })
    },
    // 编辑
    editTable(index, row) {
      this.formData = Object.assign({}, row)
      this.editType = 'update'
      this.diaIsShow = true
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate()
      })
      this.rowIndex = index
    }
  }
}
</script>
<style lang="scss" scoped>
.fyDiv {
  float: right;
  margin-top: 30px;
  padding-bottom: 20px;
}
.anoCard .el-table .el-button {
  padding: 8px 18px;
  font-size: 12px;
}
.searchDiv {
  margin-bottom: 20px;
  .el-button {
    padding: 11px 20px;
  }
}
.width1 {
  width: 180px;
  margin-right: 10px;
}
.diaForm {
  .el-input {
    width: 350px;
  }
}
</style>
<style lang="scss">
.anoCard {
  .el-card__body:after {
    content: '';
    clear: both;
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
  }
}
.diaForm .el-form-item__label {
  padding-right: 20px;
}
.searchDiv [class^='el-icon'] {
  color: #fff;
}
</style>
