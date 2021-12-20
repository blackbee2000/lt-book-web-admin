<template>
  <div class="user-admin-page">
    <div class="container" style="padding: 30px 0">
      <h2>Quản lí Account Admin</h2>
    </div>
    <div class="container" style="padding-bottom: 30px">
      <div class="row" style="justify-content: space-between">
        <div class="col-md-4">
          <div class="row">
            <el-input
              style="width: 83%"
              v-model="search"
              placeholder="Enter name, phone, username"
            ></el-input>
            <el-button
              style="width: 7%; height: 40px"
              icon="el-icon-search"
              @click="filter()"
            ></el-button>
          </div>
        </div>
        <div class="col-md-3"></div>
        <div class="col-md-5" style="text-align: right">
          <el-button
            style="
              width: 30%;
              height: 40px;
              font-size: 16px;
              margin-right: 15px;
            "
            icon="el-icon-document"
            @click="exportExcel()"
            >Export Excel</el-button
          >
          <el-button
            style="width: 30%; height: 40px; font-size: 16px"
            icon="el-icon-document"
            @click="createNew()"
            >Create New</el-button
          >
        </div>
      </div>
    </div>
    <div class="container">
      <el-table
        ref="userAdminData"
        :data="userAdmin"
        style="width: 100%"
        id="table-data"
      >
        <el-table-column label="Avatar" width="100">
          <template slot-scope="scope">
            <el-avatar
              v-if="scope.row.avtUrl"
              :size="50"
              fit="cover"
              shape="circle"
              :src="scope.row.avtUrl"
            >
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="Function" width="100">
          <template slot-scope="scope">
            <i
              class="el-icon-edit icon-funtion"
              @click="editDetail(scope.row.id, scope.row)"
            ></i>
            <i
              class="el-icon-delete icon-funtion"
              @click="deleteItem(scope.row.id)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="User Name" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Full Name" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Phone Number" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Address">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status Account" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
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
        :total="userAdmin.length"
      >
      </el-pagination>
    </div>
    <div class="over-lay"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import apiService from '@/store/apiService'
import fileSaver from 'file-saver'
import xlsx from 'xlsx'
export default {
  layout: 'default',
  data() {
    return {
      search: '',
      currentPage: 1,
      userAdmin: [],
      admin: [],
      user: {},
    }
  },
  created() {
    const _this = this
    _this.getData()
  },
  mounted() {
    const _this = this
    _this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    async getData() {
      const _this = this
      const admin = []
      await axios
        .get('https://lt-book-api.herokuapp.com/api/users')
        .then((res) => {
          _this.admin = res.data
          _this.getUserAdmin(_this.admin)
          console.log('res', _this.admin)
        })
        .catch((error) => {
          console.log('error')
        })
    },
    getUserAdmin(array) {
      const _this = this
      _.map(array, (e) => {
        if (
          e.roles[0].name === 'ROLE_SUPER_ADMIN' ||
          e.roles[0].name === 'ROLE_ADMIN'
        ) {
          _this.userAdmin.push(e)
        }
      })
    },
    async deleteItem(id) {
      const _this = this
      if (_this.user?.data?.roles[0]?.name === 'ROLE_ADMIN') {
        _this.$message({
          message: 'You do not allow',
          type: 'error',
        })
      } else {
        _this
          .$confirm('Are you want to delete?', 'Warning', {
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel',
            type: 'warning',
          })
          .then(async () => {
            const res = await apiService.deleteUser(id)
            if (res) {
              _this.$message({
                message: 'Delete successfully',
                type: 'success',
              })
              setTimeout(() => {
                window.location.reload()
              }, 1000)
            } else {
              _this.$message({
                message: 'Delete Failed',
                type: 'error',
              })
            }
          })
      }
    },

    handleSizeChange(val) {
      const _this = this
      _this.size = val
    },

    handleCurrentChange(val) {
      const _this = this
      _this.from = (_this.currentPage - 1) * _this.size
    },
    createNew() {
      const _this = this
      if (_this.user?.data?.roles[0]?.name === 'ROLE_ADMIN') {
        _this.$message({
          message: 'You do not allow',
          type: 'error',
        })
      } else {
        _this.$router.push('user/id')
      }
    },
    editDetail(id, row) {
      const _this = this
      if (_this.user?.data?.roles[0]?.name === 'ROLE_ADMIN') {
        _this.$message({
          message: 'You do not allow',
          type: 'error',
        })
      } else {
        _this.$router.push({ path: `user/id=?${id}`, query: { user: row } })
      }
    },
    filter() {
      const _this = this
      _this.userAdmin = _.filter(_this.userAdmin, (e) => {
        if (e.name.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
        if (e.phone.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
        if (e.username.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
        if (_this.search.toLowerCase() === '') {
          _this.getData()
        }
      })
    },
    exportExcel() {
      const _this = this
      let box = xlsx.utils.table_to_book(document.querySelector('#table-data'))
      let out = xlsx.write(box, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array',
      })
      try {
        fileSaver.saveAs(
          new Blob([out], {
            type: 'application/octet-stream',
          }),
          'userAdminData.xlsx',
          _this.$message({
          message: 'Export data successfully',
          type: 'success',
        })
        )
      } catch (e) {
        _this.$message({
          message: 'Export data failed',
          type: 'error',
        })
      }
      return out
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
</style>
