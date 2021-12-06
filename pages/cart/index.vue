<template>
  <div class="user-admin-page">
    <div class="container" style="padding: 30px 0">
      <h2>Quản lí Cart</h2>
    </div>
    <div class="container" style="padding-bottom: 30px">
      <div class="row" style="justify-content: space-between">
        <div class="col-md-6">
          <div class="row">
            <el-input
              style="width: 83%"
              v-model="search"
              placeholder="Enter code, name customer, phone customer"
            ></el-input>
            <el-button
              style="width: 7%; height: 40px"
              icon="el-icon-search"
              @click="filter()"
            ></el-button>
          </div>
        </div>
        <div class="col-md-3">
          <el-dropdown>
            <el-button>
              Filter<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button class="actionIcon" @click="openDialog('status')">
                  Status</el-button
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="col-md-3" style="text-align: right">
          <!-- <el-button style="width: 50%; height: 40px; font-size: 16px;" icon="el-icon-document">Create New</el-button> -->
        </div>
      </div>
    </div>
    <div class="container">
      <el-table :data="listCart" style="width: 100%">
        <el-table-column label="Code" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Function" width="150">
          <template slot-scope="scope">
            <i
              class="el-icon-edit icon-funtion"
              @click="openDialog('edit')"
            ></i>
            <i class="el-icon-delete icon-funtion"></i>
            <i
              @click="handleOpen(scope.row)"
              class="el-icon-view icon-funtion"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="Name Customer" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.nameCustomer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Phone Customer" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneCustomer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Address Customer">
          <template slot-scope="scope">
            <span>{{ scope.row.addressCustomer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Total" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.total }} VNĐ</span>
          </template>
        </el-table-column>
        <el-table-column label="Status" width="150">
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
        :total="50"
      >
      </el-pagination>
    </div>

    <el-drawer
      title="Cart Detail"
      :visible.sync="showDialog"
      size="60%"
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
            Cart Detail
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
          v-if="cartDetail"
        >
          <div class="tableDetail">
            <el-table :data="cartDetail" style="width: 100%">
              <el-table-column width="100">
                <template slot-scope="scope">
                  <el-avatar
                    v-if="scope.row.imgBook"
                    :size="50"
                    fit="cover"
                    shape="circle"
                    :src="scope.row.imgBook"
                  >
                  </el-avatar>
                </template>
              </el-table-column>
              <el-table-column label="Function" width="100">
                <i class="el-icon-edit icon-funtion"></i>
                <i class="el-icon-delete icon-funtion"></i>
              </el-table-column>
              <el-table-column label="Name Book">
                <template slot-scope="scope">
                  <span>{{ scope.row.nameBook }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Price" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.price }} VNĐ</span>
                </template>
              </el-table-column>
              <el-table-column label="Amount" width="80">
                <template slot-scope="scope">
                  <span>{{ scope.row.amount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Total" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.totalPrice }} VNĐ</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
      </div>
    </el-drawer>
    <div class="over-lay"></div>
    <el-dialog
      title="Status Cart"
      :visible.sync="statusCartDialog"
      width="30%"
      center
    >
      <el-select
        style="width: 100%"
        v-model="statusCart"
        placeholder="Select status"
      >
        <el-option
          v-for="item in statusCartList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="
            background-color: #f56c6c !important;
            border-color: #f56c6c !important;
          "
          @click="closeDialog('status')"
          >Cancel</el-button
        >
        <el-button @click="closeDialog('status')">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Edit Contact Customer"
      :visible.sync="editCart"
      width="50%"
      center
    >
      <div class="form">
        <div class="form-item">
          <label class="label">Name Customer</label>
          <el-input
            type="text"
            v-model="formData.nameCustomer"
            placeholder="Name Customer"
          ></el-input>
        </div>
        <div class="form-item" style="margin-top: 20px">
          <label class="label">Phone Customer</label>
          <el-input
            type="text"
            v-model="formData.phoneCustomer"
            placeholder="Name Customer"
          ></el-input>
        </div>
        <div class="form-item" style="margin-top: 20px">
          <label class="label">Add Customer</label>
          <el-input
            type="text"
            v-model="formData.addressCustomer"
            placeholder="Name Customer"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="
            background-color: #f56c6c !important;
            border-color: #f56c6c !important;
          "
          @click="closeDialog('edit')"
          >Cancel</el-button
        >
        <el-button @click="closeDialog('edit')">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
export default {
  layout: 'default',
  data() {
    return {
      editCart: false,
      search: '',
      statusCart: '',
      statusCartDialog: false,
      statusCartList: [
        {
          value: 'noPayment',
          label: 'No Payment',
        },
        {
          value: 'payment',
          label: 'Payment',
        },
      ],
      currentPage: 1,
      listCart: [],
      formData: {
        nameCustomer: '',
        phoneCustomer: '',
        addressCustomer: '',
      },
      showDialog: false,
      cartDetail: [],
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
        .get('https://lt-book-api.herokuapp.com/api/bill/GetByQuery')
        .then((res) => {
          _this.listCart = res.data
        })
        .catch((error) => {
          console.log('error')
        })
    },
    async getCartDetail(id) {
      const _this = this
      const token = JSON.parse(localStorage.getItem('token'))?.access_token
      await axios
        .get(
          `https://lt-book-api.herokuapp.com/api/bookinbill/GetByIdBill?idBill=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          _this.cartDetail = res.data.data
        })
        .catch((error) => {
          console.log('error product cart')
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
    handleOpen(row) {
      const _this = this
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
      const overLay = document.querySelector('.over-lay')
      const body = document.querySelector('body')
      body.style.overflow = 'hidden'
      overLay.classList.add('active')
      _this.getCartDetail(row.id)
      _this.showDialog = true
    },
    handleClose() {
      const _this = this
      const overLay = document.querySelector('.over-lay')
      const body = document.querySelector('body')
      overLay.classList.remove('active')
      body.style.overflow = 'visible'
      _this.showDialog = false
    },
    filter() {
      const _this = this
      _this.listCart = _.filter(_this.listCart, (e) => {
        if (e.code.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
        if (e.nameCustomer.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
        if (e.phoneCustomer.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
        if (_this.search.toLowerCase() === '') {
          _this.getData()
        }
      })
    },
    openDialog(type) {
      const _this = this
      const overLay = document.querySelector('.over-lay')
      const body = document.querySelector('body')
      body.style.overflow = 'hidden'
      overLay.classList.add('active')
      switch (type) {
        case 'status':
          _this.statusCartDialog = true
          _this.getData()
          break
        case 'edit':
          _this.editCart = true
          break
      }
    },
    closeDialog(type) {
      const _this = this
      const overLay = document.querySelector('.over-lay')
      const body = document.querySelector('body')
      overLay.classList.remove('active')
      body.style.overflow = 'visible'
      switch (type) {
        case 'status':
          _this.statusCartDialog = false
          _this.listCart = _.filter(_this.listCart, (e) => {
            if (e.status.toLowerCase() === _this.statusCart.toLowerCase()) {
              return e
            }
            if (_this.statusCart.toLowerCase() === '') {
              _this.getData()
            }
          })
          break
        case 'edit':
          _this.editCart = false
          break
      }
    },
    cancelDialog(type) {
      const _this = this
      const overLay = document.querySelector('.over-lay')
      const body = document.querySelector('body')
      overLay.classList.remove('active')
      body.style.overflow = 'visible'
      switch (type) {
        case 'status':
          _this.statusCartDialog = false
          break
        case 'createBy':
          _this.editCart = false
          break
      }
    },
  },
}
</script>
<style scoped>
.tableDetail {
  margin: 20px 30px 50px 30px;
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
.actionIcon {
  font-size: 16px;
  color: #182444;
  background: transparent !important;
}
.actionIcon:hover {
  color: #091023 !important;
}
</style>
