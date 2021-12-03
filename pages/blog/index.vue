<template>
  <div class="user-admin-page">
    <div class="container" style="padding: 30px 0">
      <h2>Quản lí Blog</h2>
    </div>
    <div class="container" style="padding-bottom: 30px">
      <div class="row" style="justify-content: space-between">
        <div class="col-md-6">
          <div class="row">
            <el-input
              style="width: 83%"
              v-model="search"
              placeholder="Enter title"
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
                <el-button class="actionIcon" @click="openDialog('tag')">
                  Tag Blog</el-button
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
          <el-button
            style="width: 50%; height: 40px; font-size: 16px"
            icon="el-icon-document"
            @click="createNew()"
            >Create New</el-button
          >
        </div>
      </div>
    </div>
    <div class="container">
      <el-table :data="listBlog" style="width: 100%">
        <el-table-column width="100">
          <template slot-scope="scope">
            <el-avatar
              v-if="scope.row.imgUrl"
              :size="50"
              fit="cover"
              shape="restangle"
              :src="scope.row.imgUrl"
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
        <el-table-column label="Title" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Content" width="400">
          <template slot-scope="scope">
            <span class="threeline">{{ scope.row.bigContent }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Small Content" width="400">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tag" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.tags }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Create By" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createBy }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Create At" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createAt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Update By" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.updateBy }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Update At" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.updateAt }}</span>
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
    <el-dialog title="Filter Tags" :visible.sync="tagfilter" width="30%" center>
      <el-select
        style="width: 100%"
        v-model="tagSearch"
        placeholder="Select Create By"
      >
        <el-option
          v-for="item in tagList"
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
          @click="cancelDialog('tag')"
          >Cancel</el-button
        >
        <el-button @click="closeDialog('tag')">Confirm</el-button>
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
          @click="cancelDialog('createBy')"
          >Cancel</el-button
        >
        <el-button @click="closeDialog('createBy')">Confirm</el-button>
      </span>
    </el-dialog>
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
      tagSearch: '',
      searchSelect: '',
      tagfilter: false,
      createByFilter: false,
      tagList: [],
      createByList: [],
      currentPage: 1,
      listBlog: [],
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
        .get('https://lt-book-api.herokuapp.com/api/blog/GetByQuery')
        .then((res) => {
          _this.listBlog = res.data
          _.map(res.data, (e) => {
            _this.createByList.push({ value: e.createBy, label: e.createBy })
            _this.tagList.push({ value: e.tags, label: e.tags })
          })
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
          const res = await apiService.deleteBlog(id)
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
    createNew() {
      const _this = this
      _this.$router.push('blog/id')
    },
    editDetail(id, row) {
      const _this = this
      _this.$router.push({ path: `blog/id=?${id}`, query: { blog: row } })
    },
    filter() {
      const _this = this
      _this.listBlog = _.filter(_this.listBlog, (e) => {
        if (e.title.toLowerCase() === _this.search.toLowerCase()) {
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
        case 'tag':
          _this.tagfilter = true
          _this.getData()
          break
        case 'createBy':
          _this.createByFilter = true
          _this.getData()
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
        case 'tag':
          _this.tagfilter = false
          _this.listBlog = _.filter(_this.listBlog, (e) => {
            if (e.tags.toLowerCase() === _this.tagSearch.toLowerCase()) {
              return e
            }
            if (_this.tagSearch.toLowerCase() === '') {
              _this.getData()
            }
          })
          break
        case 'createBy':
          _this.createByFilter = false
          _this.listBlog = _.filter(_this.listBlog, (e) => {
            if (e.createBy.toLowerCase() === _this.searchSelect.toLowerCase()) {
              return e
            }
            if (_this.searchSelect.toLowerCase() === '') {
              _this.getData()
            }
          })
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
        case 'tag':
          _this.tagfilter = false
          break
        case 'createBy':
          _this.createByFilter = false
          break
      }
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
