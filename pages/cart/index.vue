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
                <el-button class="actionIcon" @click="openDialog('createAt')">
                  Create At</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button class="actionIcon" @click="openDialog('createBy')">
                  Create By</el-button
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
            <i @click="handleOpen(scope.row)" class="el-icon-view icon-funtion"></i>
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
                    v-if="scope.row.imgUrl"
                    :size="50"
                    fit="cover"
                    shape="circle"
                    :src="scope.row.imgUrl"
                  >
                  </el-avatar>
                </template>
              </el-table-column>
              <el-table-column label="Function" width="100">
                <i class="el-icon-edit icon-funtion"></i>
                <i class="el-icon-delete icon-funtion"></i>
              </el-table-column>
              <el-table-column label="Name">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Price" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.price }} VNĐ</span>
                </template>
              </el-table-column>
              <el-table-column label="Rating" width="80">
                <template slot-scope="scope">
                  <span>{{ scope.row.rating }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Amount" width="80">
                <template slot-scope="scope">
                  <span>{{ scope.row.amount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Total" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.total }} VNĐ</span>
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
        </el-scrollbar>
      </div>
    </el-drawer>
    <div class="over-lay"></div>
    <el-dialog
      title="Filter Create At"
      :visible.sync="createAtFilter"
      width="30%"
      center
    >
      <div class="block">
        <el-date-picker
          style="width: 100%"
          v-model="searchDay"
          type="daterange"
          align="right"
          start-placeholder="Start Date"
          end-placeholder="End Date"
          default-value="2010-10-01"
        >
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="
            background-color: #f56c6c !important;
            border-color: #f56c6c !important;
          "
          @click="closeDialog('createAt')"
          >Cancel</el-button
        >
        <el-button @click="closeDialog('createAt')">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Filter Create By"
      :visible.sync="createByFilter"
      width="30%"
      center
    >
      <el-select
        style="width: 100%"
        v-model="searchSelect"
        placeholder="Select Create By"
      >
        <el-option
          v-for="item in createByList"
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
          @click="closeDialog('createBy')"
          >Cancel</el-button
        >
        <el-button @click="closeDialog('createBy')">Confirm</el-button>
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
      searchDay: '',
      createAtFilter: false,
      createByFilter: false,
      createByList: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
      ],
      searchSelect: '',
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
    // _this.getData()
  },
  methods: {
    async getData() {
      const _this = this
      await axios
        .get('https://lt-book-online.herokuapp.com/api/bill/GetByQuery')
        .then((res) => {
          _this.listCart = res.data
        })
        .catch((error) => {
          console.log('error')
        })
    },
    async getProductCart(code) {
      const _this = this;
      await axios
        .get(`https://lt-book-online.herokuapp.com/api/productCart/GetByCodeCart?codeCart=${code}`)
        .then((res) => {
          _this.cartDetail = res.data.data;
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
      const overLay = document.querySelector('.over-lay')
      overLay.classList.add('active')
      // _this.getProductCart(row.code);
      _this.showDialog = true;
    },
    handleClose() {
      const _this = this
      const overLay = document.querySelector('.over-lay')
      overLay.classList.remove('active')
      _this.showDialog = false
    },
    filter() {
      const _this = this
      const filter = _.filter(_this.listCart, (e) => {
        if (e.code.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
        if (e.nameCustomer.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
        if (e.phoneCustomer.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
      })

      _this.listCart = filter
    },
    openDialog(type) {
      const _this = this
      const overLay = document.querySelector('.over-lay')
      overLay.classList.add('active')
      switch (type) {
        case 'createAt':
          _this.createAtFilter = true
          break
        case 'createBy':
          _this.createByFilter = true
          break
        case 'edit':
          _this.editCart = true
          break
      }
    },
    closeDialog(type) {
      const _this = this
      const overLay = document.querySelector('.over-lay')
      overLay.classList.remove('active')
      switch (type) {
        case 'createAt':
          _this.createAtFilter = false
          break
        case 'createBy':
          _this.createByFilter = false
          break
        case 'edit':
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
