<template>
  <div class="user-admin-page">
    <div class="container" style="padding: 30px 0">
      <h2 v-if="$route.params.id === 'id'">Create New Blog</h2>
      <h2 v-else>Update Blog</h2>
    </div>
    <div class="container" style="padding-bottom: 20px">
      <div class="row" style="justify-content: flex-end">
        <el-button
          icon="el-icon-error"
          @click="backPage()"
          style="
            width: 100px;
            background-color: #f56c6c !important;
            border-color: #f56c6c !important;
          "
          >Back</el-button
        >
        <el-button
          icon="el-icon-success"
          style="width: 100px"
          @click="handleSave()"
          >Save</el-button
        >
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Title</label>
            <el-input
              type="text"
              v-model="formData.title"
              placeholder="Title"
            ></el-input>
          </div>
        </div>
        <div class="col-md-6">
          <div
            class="form-item"
            style="margin-top: 20px; display: flex; flex-direction: column"
          >
            <label class="label">Tag</label>
            <div class="row">
              <el-select v-model="formData.tags" placeholder="Choose Status">
                <el-option
                  v-for="item in tagList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Small Content</label>
            <el-input
              type="textarea"
              :rows="3"
              v-model="formData.content"
              placeholder="Description"
            ></el-input>
          </div>
        </div>
        <div class="col-md-6">
          <div
            class="form-item"
            style="margin-top: 20px; display: flex; flex-direction: column"
          >
            <label class="label">Status</label>
            <div class="row">
              <el-select v-model="formData.status" placeholder="Choose Status">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px; text-align: center">
            <label class="label">Image Blog</label>
            <div style="width: 100%">
              <div class="wrapper">
                <div class="image">
                  <img id="img-upload" src="" alt="" />
                </div>
                <div class="content">
                  <div class="icon">
                    <i class="el-icon-upload"></i>
                  </div>
                  <div class="text">No file chosen, yet!</div>
                </div>
                <div id="cancel-btn">
                  <i class="el-icon-close"></i>
                </div>
                <div class="file-name">File name here</div>
              </div>
              <input id="default-btn" type="file" hidden />
              <el-button
                @click="handleUploadImage()"
                style="margin-top: 20px"
                id="custom-btn"
                >Choose a file</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Content</label>
            <div>
              <vue-editor v-model="formData.bigContent"></vue-editor>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="padding-top: 20px">
      <div class="row" style="justify-content: flex-end">
        <el-button
          icon="el-icon-error"
          @click="backPage()"
          style="
            width: 100px;
            background-color: #f56c6c !important;
            border-color: #f56c6c !important;
          "
          >Back</el-button
        >
        <el-button
          icon="el-icon-success"
          style="width: 100px"
          @click="handleSave()"
          >Save</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import axios from 'axios'
import moment from 'moment'
import apiService from '@/store/apiService'
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      config: {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
      formData: {
        title: '',
        tags: '',
        bigContent: '',
        content: '',
        imgUrl: '',
        status: '',
      },
      tagList: [
        {
          value: 'New',
          label: 'New',
        },
        {
          value: 'Life',
          label: 'Life',
        },
        {
          value: 'Book',
          label: 'Book',
        },
      ],
      status: [
        {
          value: 'active',
          label: 'Hoạt động',
        },
        {
          value: 'inactive',
          label: 'Ngưng hoạt động',
        },
      ],
    }
  },
  created() {
    const _this = this
    if (_this.$route.params.id === 'id') {
      _this.formData = {
        title: '',
        tags: '',
        bigContent: '',
        content: '',
        imgUrl: '',
        status: '',
      }
    } else {
      _this.formData = _this.$route.query.blog
    }
  },
  methods: {
    backPage() {
      const _this = this
      _this.$router.push('/blog')
    },
    async handleSave() {
      const _this = this
      const user = await JSON.parse(localStorage.getItem('user'))
      const paramCreate = {
        id: null,
        title: _this.formData.title,
        content: _this.formData.content,
        bigContent: _this.formData.bigContent,
        tags: _this.formData.tags,
        status: _this.formData.status,
        imgUrl: _this.formData.imgUrl,
        createBy: user.data.username,
        createAt: moment().format('DD/MM/YYYY'),
        updateBy: '',
        updateAt: '',
      }
      const paramUpdate = {
        title: _this.formData.title,
        content: _this.formData.content,
        bigContent: _this.formData.bigContent,
        tags: _this.formData.tags,
        status: _this.formData.status,
        imgUrl: _this.formData.imgUrl,
        createBy: user.data.username,
        createAt: moment().format('DD/MM/YYYY'),
        updateBy: user.data.username,
        updateAt: moment().format('DD/MM/YYYY'),
      }
      if (_this.$route.params.id === 'id') {
        const res = await apiService.createBlog(paramCreate)
        if (res) {
          _this.$message({
            message: 'Create successfully',
            type: 'success',
          })
          setTimeout(() => {
            _this.$router.push('/blog')
          }, 2000)
        } else {
          _this.$message({
            message: 'Create Failed',
            type: 'error',
          })
        }
      } else {
        const res = await apiService.updateBlog(_this.$route.query.blog.id, paramUpdate)
        if (res) {
          _this.$message({
            message: 'Update successfully',
            type: 'success',
          })
          setTimeout(() => {
            _this.$router.push('/blog')
          }, 2000)
        } else {
          _this.$message({
            message: 'Update Failed',
            type: 'error',
          })
        }
      }
    },
    async uploadImage(image) {
      const _this = this
      var bodyFormData = new FormData()
      bodyFormData.append('file', image)
      await axios
        .post(
          'https://lt-book-api.herokuapp.com/api/fileUpload',
          bodyFormData,
          _this.config
        )
        .then((res) => {
          console.log('res', res.data.data)
          _this.readImage(res.data.data)
          _this.formData.imgUrl = `https://lt-book-api.herokuapp.com/api/fileUpload/files/${res.data.data}`
        })
        .catch((error) => {
          console.log('error upload image')
        })
    },
    async readImage(image) {
      await axios
        .get(
          `https://lt-book-api.herokuapp.com/api/fileUpload/files/${image}`
        )
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log('error read image')
        })
    },
    handleUploadImage() {
      const _this = this
      const defaulBtn = document.querySelector('#default-btn')
      const fileName = document.querySelector('.file-name')
      const img = document.querySelector('#img-upload')
      const cancelBtn = document.querySelector('#cancel-btn')
      defaulBtn.click()
      defaulBtn.addEventListener('change', function () {
        const file = this.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = function () {
            const result = reader.result
            img.src = result
            _this.uploadImage(file)
          }
          cancelBtn.addEventListener('click', function () {
            img.src = ''
          })
          reader.readAsDataURL(file)
        }
        if (this.value) {
          const valueStore = this.value
          fileName.textContent = valueStore
        }
      })
    },
  },
}
</script>
<style scoped>
.label {
  font-size: 16px;
  font-weight: 500;
  color: #182444;
  margin-bottom: 10px;
}
.wrapper {
  width: 100%;
  height: 300px;
  border: 2px dashed #182444;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.wrapper .image {
  position: absolute;
  width: 100%;
  height: 100%;
}
.wrapper .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.wrapper .icon {
  font-size: 100px;
  color: #182444;
  text-align: center;
}
.wrapper .text {
  font-size: 16px;
  font-weight: 500;
  color: #182444;
}
.wrapper #cancel-btn {
  position: absolute;
  right: 10px;
  top: 5px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transform: translateX(130%);
  transition: 0.5s;
}
.wrapper .file-name {
  position: absolute;
  bottom: 0;
  background: #182444;
  width: 100%;
  padding: 8px 0;
  font-size: 16px;
  text-align: center;
  color: #fff;
  transform: translateY(102%);
  transition: 0.5s;
}
.wrapper:hover .file-name {
  transform: translateY(0%);
  transition: 0.5s;
}
.wrapper:hover #cancel-btn {
  transform: translateX(0%);
  transition: 0.5s;
}
</style>
