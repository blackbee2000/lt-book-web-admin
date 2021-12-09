<template>
  <div class="user-customer-page">
    <div class="container" style="padding: 30px 0">
      <h2>Quản lí Account Customer</h2>
    </div>
    <div class="container" style="padding-bottom: 30px">
      <div class="row" style="justify-content: space-between">
        <div class="col-md-6">
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
      </div>
    </div>
    <div class="container">
      <el-table :data="userCustomer" style="width: 100%">
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
              class="el-icon-view icon-funtion"
              @click="seeDetail(scope.row)"
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
        :total="userCustomer.length"
      >
      </el-pagination>
    </div>
    <el-drawer
      title="Cart Detail"
      :visible.sync="showDialog"
      size="30%"
      :wrapperClosable="false"
      :withHeader="false"
      :close-on-press-escape="false"
    >
      <div class="" style="min-height: 45px">
        <div
          class="
            d-flex
            py-2
            px-2
            flex-row
            justify-content-between
            align-items-center
            header
          "
          style="background: #182444"
        >
          <div class="header-text" style="color: #fff; padding-left: 20px">
            Account Customer Detail
          </div>
          <div @click="handleClose()">
            <el-icon
              style="cursor: pointer; color: #ffffff"
              class="el-icon-close font-22 text-bold pb-2"
            ></el-icon>
          </div>
        </div>
        <el-scrollbar
          ref="scrollbar"
          style="height: calc(100vh - 45px); background: #d9d9d9"
          v-if="userCustomerDetail"
        >
          <div style="width: 100%; padding: 20px">
            <p><strong>Username: </strong> {{ userCustomerDetail.username }}</p>
            <p><strong>Name: </strong>{{ userCustomerDetail.name }}</p>
            <p><strong>Phone: </strong>{{ userCustomerDetail.phone }}</p>
            <p><strong>Address: </strong>{{ userCustomerDetail.address }}</p>
            <p><strong>Status: </strong>{{ userCustomerDetail.status }}</p>

            <label><strong>Avatar</strong></label
            ><br />
            <img
              style="width: 80%; object-fit: cover; margin-top: 10px"
              :src="userCustomerDetail.avtUrl"
            />
          </div>
        </el-scrollbar>
      </div>
    </el-drawer>
    <div class="over-lay"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import apiService from '@/store/apiService'
export default {
  layout: 'default',
  data() {
    return {
      search: '',
      currentPage: 1,
      userCustomer: [],
      showDialog: false,
      userCustomerDetail: {},
      customer: [],
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
        .get('https://lt-book-api.herokuapp.com/api/users')
        .then((res) => {
          _this.customer = res.data
          _this.getUserCustomer(_this.customer)
        })
        .catch((error) => {
          console.log('error')
        })
    },
    getUserCustomer(array) {
      const _this = this
      _.map(array, (e) => {
        if (e.roles[0].name === 'ROLE_USER') {
          _this.userCustomer.push(e)
        }
      })
    },
    async deleteItem(id) {
      const _this = this
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
      _this.userCustomer = _.filter(_this.userCustomer, (e) => {
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
    seeDetail(row) {
      const _this = this
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
      _this.userCustomerDetail = row
      const overLay = document.querySelector('.over-lay')
      overLay.classList.add('active')
      const body = document.querySelector('body')
      body.style.overflow = 'hidden'
      _this.showDialog = true
    },
    handleClose() {
      const _this = this
      const overLay = document.querySelector('.over-lay')
      overLay.classList.remove('active')
      const body = document.querySelector('body')
      body.style.overflow = 'visible'
      _this.showDialog = false
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
