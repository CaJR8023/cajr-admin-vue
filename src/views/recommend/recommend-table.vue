<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>推荐表格</span>
      </div>
      <div class="searchDiv">
        <el-input type="text" placeholder="请输入新闻id号" class="width1" v-model="sch_order"></el-input>
        <el-select v-model="sch_status" clearable class="width1" placeholde="请选择状态">
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
        <el-button type="primary" icon="el-icon-search" @click="searchTab()">搜索</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addTab">添加</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="id" label="序号" width="60"></el-table-column>
        <el-table-column prop="order" label="新闻id" width="110"></el-table-column>
        <el-table-column prop="time" label="新闻时间" width="210"></el-table-column>
        <el-table-column prop="address" label="新闻作者" width="130"></el-table-column>
        <el-table-column prop="phone" label="新闻标题"></el-table-column>

        <el-table-column prop="name" label="推荐给的用户" width="120"></el-table-column>
        <el-table-column prop="name" label="用户状态" width="120"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | tagClass">
              {{
              scope.row.status | statusText
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="推荐算法" width="100"></el-table-column>
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
      ></el-pagination>
    </el-card>
    <el-dialog title="订单修改" :visible.sync="diaIsShow" class="diaForm">
      <el-form ref="diaForm" :model="formData" :rules="rules" label-width="140px">
        <el-form-item label="订单号">
          <el-input type="text" v-model="formData.order" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单时间" prop="time">
          <el-date-picker
            v-model="formData.time"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="配送地址" prop="address">
          <el-input type="text" placeholder="请输入地址" v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input type="text" placeholder="请输入电话" v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="配送员" prop="name">
          <el-input type="text" placeholder="请输入姓名" v-model="formData.name"></el-input>
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
          <el-button type="primary" @click="changeTab('diaForm', editType)">确认</el-button>
          <el-button @click="diaIsShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getPageTab2 } from "@/api/table";
export default {
  data() {
    return {
      tableData: [],
      allList: [],
      schArr: [],
      sch_order: "",
      sch_status: null,
      sch_date: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: "",
      options: [
        { label: "已浏览", value: 1 },
        { label: "已点赞", value: 2 },
        { label: "无操作", value: 0 },
        { label: "已收藏", value: 3 },
        { label: "不喜欢", value: -1 }
      ],
      rowIndex: 0,
      rules: {
        // order: [{ required: true, message: '请输入订单号', trigger: 'blur' }],
        time: [
          {
            // type: 'datetime',
            required: true,
            message: "请输入时间",
            trigger: "change"
          }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        status: [
          { required: true, message: "请选择订单状态", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this._getPageTab2()
  },
  filters: {
    statusText(val) {
      if (val === undefined) return;
      if (val === 0) {
        return "无操作"
      } else if (val === 1) {
        return "已浏览"
      } else if (val === 2) {
        return "已点赞"
      } else if (val == 3) {
        return "已收藏"
      } else {
        return "不喜欢"
      }
    },
    tagClass(val) {
      if (val === undefined) return;
      if (val === 0) {
        return "warning"
      } else if (val === 1) {
        return "success"
      } else if (val === 2) {
        return "success"
      } else if (val === 3) {
        return "success"
      } else {
        return "danger"
      }
    }
  },
  methods: {
    handleSize(val) {
      this.pageSize = val;
      this.getPageData();
    },
    handlePage(val) {
      this.currentPage = val;
      this.getPageData();
    },
    _getPageTab2() {
      getPageTab2()
        .then(res => {
          this.allList = res.data.tableList;
          this.schArr = this.allList;
          this.getPageData();
          this.total = res.data.total;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getPageData() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = start + this.pageSize;
      this.tableData = this.schArr.slice(start, end);
    },
    // 查找
    searchTab() {
      let arrList = [];
      for (let item of this.allList) {
        if (
          this.sch_order.trim() === "" &&
          this.sch_status === null &&
          this.sch_date === null
        ) {
          arrList = this.allList;
          break;
        } else if (
          item.order.startsWith(this.sch_order) &&
          (this.sch_status !== null ? item.status === this.sch_status : true) &&
          (this.sch_date !== null ? item.time.startsWith(this.sch_date) : true)
        ) {
          let obj = Object.assign({}, item);
          arrList.push(obj);
        }
      }
      this.schArr = arrList;
      this.total = arrList.length;
      this.currentPage = 1;
      this.pageSize = 10;
      this.getPageData();
    }
  }
};
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
    content: "";
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
.searchDiv [class^="el-icon"] {
  color: #fff;
}
</style>
