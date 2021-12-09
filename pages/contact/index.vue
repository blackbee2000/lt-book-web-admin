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
        <el-table-column label="Function" width="150">
          <template slot-scope="scope">
            <i
              class="el-icon-view icon-funtion"
              @click="seeDetail(scope.row)"
            ></i>
            <i class="el-icon-delete icon-funtion" @click="deleteItem(scope.row.id)"></i>
            <i
              class="el-icon-s-promotion icon-funtion"
              @click="openSendEmailDialog(scope.row)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="Phone" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
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
        :total="listContact.length"
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
          v-if="contactDetail"
        >
          <div style="width: 100%; padding: 20px">
            <p><strong>Full name: </strong> {{ contactDetail.fullName }}</p>
            <p><strong>Phone: </strong>{{ contactDetail.phone }}</p>
            <p><strong>Email: </strong>{{ contactDetail.email }}</p>
            <p><strong>Note: </strong>{{ contactDetail.note }}</p>
          </div>
        </el-scrollbar>
      </div>
    </el-drawer>
    <el-dialog
      title="Send email for customer"
      :visible.sync="sendEmailDialog"
      width="50%"
      center
    >
      <div class="form">
        <div class="form-item" style="margin-top: 20px">
          <label class="label">Content email</label>
          <el-input
            style="margin-top: 10px"
            type="text"
            v-model="formData.message"
            placeholder="Content email"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="
            background-color: #f56c6c !important;
            border-color: #f56c6c !important;
          "
          @click="closeSendEmailDialog()"
          >Cancel</el-button
        >
        <el-button @click="sendEmail()">Send</el-button>
      </span>
    </el-dialog>
    <div class="over-lay"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import emailjs from 'emailjs-com'
import apiService from '@/store/apiService'
export default {
  layout: 'default',
  data() {
    return {
      search: '',
      currentPage: 1,
      listContact: [],
      showDialog: false,
      contactDetail: {},
      sendEmailDialog: false,
      formData: {
        toName: '',
        toEmail: '',
        message: '',
      },
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
    async deleteItem(id) {
      const _this = this
      _this
        .$confirm('Are you want to delete?', 'Warning', {
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancel',
          type: 'warning',
        })
        .then(async () => {
          const res = await apiService.deleteContact(id)
          if (res) {
            _this.$message({
              message: 'Delete successfully',
              type: 'success',
            })
            setTimeout(() => {
              _this.getData()
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
    seeDetail(row) {
      const _this = this
      _this.contactDetail = row
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
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
    openSendEmailDialog(row) {
      const _this = this
      const overLay = document.querySelector('.over-lay')
      overLay.classList.add('active')
      const body = document.querySelector('body')
      body.style.overflow = 'hidden'
      _this.formData.toEmail = row.email
      _this.formData.toName = row.fullName
      _this.sendEmailDialog = true
    },
    sendEmail() {
      const _this = this
      const userID = 'user_sQzt0iuwKqiN4aYCbwKyp'
      emailjs
        .send(
          'service_l09cnt9',
          'template_xtcsiyr',
          {
            from_name: 'LTBOOK',
            to_name: _this.formData.toName,
            message: _this.formData.message,
            to_email: '18110145@student.hcmute.edu.vn',
          },
          userID
        )
        .then((res) => {
          _this.$message({
            message: 'Send email successfully',
            type: 'success',
          })
          const overLay = document.querySelector('.over-lay')
          overLay.classList.remove('active')
          const body = document.querySelector('body')
          body.style.overflow = 'visible'
          _this.sendEmailDialog = false
        })
        .catch((error) => {
          _this.$message({
            message: 'Send email failed',
            type: 'error',
          })
        })
    },
    closeSendEmailDialog() {
      const _this = this
      const overLay = document.querySelector('.over-lay')
      overLay.classList.remove('active')
      const body = document.querySelector('body')
      body.style.overflow = 'visible'
      _this.sendEmailDialog = false
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
