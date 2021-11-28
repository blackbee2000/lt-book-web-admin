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
                <el-button class="actionIcon" @click="createAtFilter = true">
                  Create At</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button class="actionIcon" @click="createByFilter = true">
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
            <i class="el-icon-delete icon-funtion"></i>
          </template>
        </el-table-column>
        <el-table-column label="Title" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Content" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.bigContent }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Small Content" width="150">
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
          @click="createAtFilter = false"
          >Cancel</el-button
        >
        <el-button @click="createAtFilter = false">Confirm</el-button>
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
          @click="createByFilter = false"
          >Cancel</el-button
        >
        <el-button @click="createByFilter = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
export default {
  layout: "default",
  data() {
    return {
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
      currentPage: 1,
      listBlog: [],
    }
  },
  created() {
    const _this = this;
    _this.getData();
  },
  methods: {
    async getData() {
      const _this = this
      await axios
        .get('https://lt-book-online.herokuapp.com/api/blog/GetByQuery')
        .then((res) => {
          _this.listBlog = res.data;
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
    createNew() {
      const _this = this
      // _this.$router.push(_this.localePath('/user/none'));
      _this.$router.push('blog/id')
    },
    editDetail(id, row) {
      const _this = this
      _this.$router.push({ path: `blog/id=?${id}`, query: {blog: row} })
    },
    filter() {
      const _this = this
      const filter = _.filter(_this.listBlog, (e) => {
        if (e.title.toLowerCase() === _this.search.toLowerCase()) {
          return e
        }
      })

      _this.listBlog = filter
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
</style>
