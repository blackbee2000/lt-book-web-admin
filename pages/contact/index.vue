<template>
  <div class="user-admin-page">
    <div class="container" style="padding: 30px 0">
      <h2>Quản lí Contact</h2>
    </div>
    <div class="container" style="padding-bottom: 30px">
      <div class="row" style="justify-content: space-between">
        <div class="col-md-6">
          <div class="row">
            <el-input
              style="width: 83%"
              v-model="search"
              placeholder="Enter full name, phone, email"
            ></el-input>
            <el-button
              style="width: 7%; height: 40px"
              icon="el-icon-search"
              @click="filter()"
            ></el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <el-table :data="listContact" style="width: 100%">
        <el-table-column label="Full Name" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.fullName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Function" width="100">
          <!-- <template slot-scope="scope">
            <i class="el-icon-edit icon-funtion"></i>
            <i class="el-icon-delete icon-funtion"></i>
          </template> -->
          <i class="el-icon-edit icon-funtion"></i>
          <i class="el-icon-delete icon-funtion"></i>
        </el-table-column>
        <el-table-column label="Phone" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.Phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Email" width="200">
          <template slot-scope="scope">
            <span class="threeline">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Note">
          <template slot-scope="scope">
            <span>{{ scope.row.note }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[1, 10, 20, 50, 100]"
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="50"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
export default {
  layout: 'default',
  data() {
    return {
      search: '',
      currentPage: 1,
      listContact: [],
    }
  },
  created() {
    const _this = this
    _this.getData()
  },
  methods: {
    async getData() {
      const _this = this
      await axios
        .get('https://lt-book-api.herokuapp.com/api/contact/GetByQuery')
        .then((res) => {
          _this.listContact = res.data
        })
        .catch((error) => {
          console.log('error')
        })
    },
    handleSizeChange(val) {
      const _this = this
      _this.size = val
    },

    handleCurrentChange(val) {
      const _this = this
      _this.from = (_this.currentPage - 1) * _this.size
    },
    filter() {
      const _this = this
      _this.listContact = _.filter(_this.listContact, (e) => {
        if (e.fullName.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
        if (e.phone.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
        if (e.email.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
        if (_this.search.toLowerCase() === '') {
          _this.getData()
        }
      })
    },
  },
}
</script>
<style scoped>
.actionIcon {
  font-size: 16px;
  color: #182444;
  background: transparent !important;
}
.actionIcon:hover {
  color: #091023 !important;
}
.over-lay {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0;
  width: 100%;
  height: 100vh;
  z-index: 200;
  visibility: hidden;
}
.over-lay.active {
  visibility: visible;
  opacity: 0.8;
}
.threeline {
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
