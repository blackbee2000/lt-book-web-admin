<template>
  <div class="user-admin-page">
    <div class="container" style="padding: 30px 0">
      <h2 v-if="$route.params.id === 'id'">Create New Book</h2>
      <h2 v-else>Update Book</h2>
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
            <label class="label">Name</label>
            <el-input
              type="text"
              v-model="formData.name"
              placeholder="Name"
            ></el-input>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Price</label>
            <el-input
              type="text"
              v-model="formData.price"
              placeholder="Price"
            ></el-input>
          </div>
        </div>
        <div class="col-md-3">
          <div
            class="form-item"
            style="margin-top: 20px; display: flex; flex-direction: column"
          >
            <label class="label">Rating</label>
            <div style="height: 40px; display: flex; align-items: center">
              <el-rate v-model="formData.rating" :colors="colorsRating">
              </el-rate>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Description</label>
            <el-input
              type="textarea"
              :rows="3"
              v-model="formData.description"
              placeholder="Description"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Artist Name</label>
            <el-input
              type="text"
              v-model="formData.artistName"
              placeholder="Artist Name"
            ></el-input>
          </div>
        </div>
        <div class="col-md-6">
          <div
            class="form-item"
            style="margin-top: 20px; display: flex; flex-direction: column"
          >
            <label class="label">Artist Born Day</label>
            <el-date-picker
              style="width: 100%"
              v-model="formData.artistBornDay"
              type="date"
              placeholder="Pick a born day"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div
            class="form-item"
            style="margin-top: 20px; display: flex; flex-direction: column"
          >
            <label class="label">Type</label>
            <el-select v-model="formData.type" placeholder="Choose Type">
              <el-option
                v-for="item in typeBook"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="col-md-6">
          <div
            class="form-item"
            style="margin-top: 20px; display: flex; flex-direction: column"
          >
            <label class="label">Status</label>
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
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px; text-align: center">
            <label class="label">Image Blog</label>
            <div style="width: 100%">
              <div class="wrapperTwo">
                <div class="imageTwo">
                  <img id="img-uploadTwo" src="" alt="" />
                </div>
                <div class="contentTwo">
                  <div class="iconTwo">
                    <i class="el-icon-upload"></i>
                  </div>
                  <div class="textTwo">No file chosen, yet!</div>
                </div>
                <div id="cancel-btnTwo">
                  <i class="el-icon-close"></i>
                </div>
                <div class="file-nameTwo">File name here</div>
              </div>
              <input id="default-btnTwo" type="file" hidden />
              <el-button
                @click="handleUploadImageTwo()"
                style="margin-top: 20px"
                id="custom-btn"
                >Choose a file</el-button
              >
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
import axios from 'axios'
import moment from 'moment'
export default {
  data() {
    return {
      config: {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
      formData: {
        name: '',
        price: '',
        description: '',
        artistName: '',
        artistBornDay: '',
        type: '',
        rating: '',
        status: '',
        imageBook: '',
        artistAvatar: '',
      },
      colorsRating: ['#99A9BF', '#F7BA2A', '#FF9900'],
      typeBook: [
        {
          value: 'comic',
          label: 'Comic',
        },
        {
          value: 'novel',
          label: 'Novel',
        },
      ],
      status: [
        {
          value: 'avaiable',
          label: 'Còn hàng',
        },
        {
          value: 'unavailable',
          label: 'Hết hàng',
        },
      ],
    }
  },
  created() {
    const _this = this
    if (_this.$route.params.id === 'id') {
      _this.formData = {
        name: '',
        price: '',
        description: '',
        artistName: '',
        artistBornDay: '',
        type: '',
        rating: '',
        status: '',
        imageBook: '',
        artistAvatar: '',
      }
    } else {
      _this.formData = _this.$route.query.product
    }
  },
  methods: {
    backPage() {
      const _this = this
      _this.$router.push('/product')
    },
    async handleSave() {
      const _this = this;
      const user = await JSON.parse(localStorage.getItem('user'));
      const token = await JSON.parse(localStorage.getItem('token'));
      console.log(token);
      const paramCreate = {
        id: null,
        name: _this.formData.name,
        price: _this.formData.price,
        rating: _this.formData.rating,
        sold: '2000',
        description: _this.formData.description,
        artistAvatar: _this.formData.artistAvatar,
        artistName: _this.formData.artistName,
        artistBornDay: moment(_this.formData.artistBornDay).format(
          'DD/MM/YYYY'
        ),
        type: _this.formData.type,
        status: _this.formData.status,
        imageBook: _this.formData.imageBook,
        createBy: user.data.username,
        createAt: moment().format('DD/MM/YYYY'),
        updateBy: '',
        updateAt: '',
      }
      console.log(paramCreate);
      if (_this.$route.params.id === 'id') {
        await axios.post(
          'https://lt-book-online.herokuapp.com/api/book/Create',
          paramCreate,
          {
            headers: {
              'content-type': 'application/json',
              // 'Authorization': `Bearer ${token.access_token}`
            }
          }
        ).then(
          res => {
            _this.$message({
              message: 'Create successfully',
              type: 'success'
            });
            setTimeout(() =>{
              _this.$router.push('/product');
            }, 2000)
          }
        )
        .catch(
          error =>{
            _this.$message({
              message: 'Create Failed',
              type: 'error'
            });
          }
        )
      } else {
        console.log('helllooooo')
      }
    },
    async uploadImage(image, type) {
      const _this = this
      var bodyFormData = new FormData()
      bodyFormData.append('file', image)
      await axios
        .post(
          'https://lt-book-online.herokuapp.com/api/fileUpload',
          bodyFormData,
          _this.config
        )
        .then((res) => {
          console.log('res', res.data.data)
          if (type === 'book') {
            _this.formData.imageBook = `https://lt-book-online.herokuapp.com/api/fileUpload/files/${res.data.data}`
          }
          if (type === 'avatar') {
            _this.formData.artistAvatar = `https://lt-book-online.herokuapp.com/api/fileUpload/files/${res.data.data}`
          }
        })
        .catch((error) => {
          console.log('error upload image')
        })
    },
    handleUploadImage() {
      const _this = this
      const defaulBtn = document.querySelector('#default-btn')
      const fileName = document.querySelector('.file-name')
      const img = document.querySelector('#img-upload')
      const regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/
      const cancelBtn = document.querySelector('#cancel-btn')
      defaulBtn.click()
      defaulBtn.addEventListener('change', function () {
        const file = this.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = function () {
            const result = reader.result
            img.src = result
            _this.uploadImage(file, 'book')
          }
          cancelBtn.addEventListener('click', function () {
            img.src = ''
          })
          reader.readAsDataURL(file)
        }
        if (this.value) {
          const valueStore = this.value.match(regExp)
          fileName.textContent = valueStore
        }
      })
    },
    handleUploadImageTwo() {
      const _this = this
      const defaulBtn = document.querySelector('#default-btnTwo')
      const fileName = document.querySelector('.file-nameTwo')
      const img = document.querySelector('#img-uploadTwo')
      const regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/
      const cancelBtn = document.querySelector('#cancel-btnTwo')
      defaulBtn.click()
      defaulBtn.addEventListener('change', function () {
        const file = this.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = function () {
            const result = reader.result
            img.src = result
            _this.uploadImage(file, 'avatar')
          }
          cancelBtn.addEventListener('click', function () {
            img.src = ''
          })
          reader.readAsDataURL(file)
        }
        if (this.value) {
          const valueStore = this.value.match(regExp)
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

.wrapperTwo {
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
.wrapperTwo .imageTwo {
  position: absolute;
  width: 100%;
  height: 100%;
}
.wrapperTwo .imageTwo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.wrapperTwo .iconTwo {
  font-size: 100px;
  color: #182444;
  text-align: center;
}
.wrapperTwo .textTwo {
  font-size: 16px;
  font-weight: 500;
  color: #182444;
}
.wrapperTwo #cancel-btnTwo {
  position: absolute;
  right: 10px;
  top: 5px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transform: translateX(130%);
  transition: 0.5s;
}
.wrapperTwo .file-nameTwo {
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
.wrapperTwo:hover .file-nameTwo {
  transform: translateY(0%);
  transition: 0.5s;
}
.wrapperTwo:hover #cancel-btnTwo {
  transform: translateX(0%);
  transition: 0.5s;
}
</style>
