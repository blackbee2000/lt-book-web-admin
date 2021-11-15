<template>
    <div class="user-admin-page">
        <div class="container" style="padding: 30px 0;">
            <h2>Create New Book</h2>
        </div>
        <div class="container" style="padding-bottom: 20px;">
            <div class="row" style="justify-content: flex-end;">
                <el-button icon="el-icon-error" @click="backPage()" style="width: 100px; background-color: #F56C6C !important; border-color: #F56C6C !important;">Back</el-button>
                <el-button icon="el-icon-success" style="width: 100px" @click="handleSave()">Save</el-button>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Name</label>
                        <el-input type="text" v-model="formData.name" placeholder="Name"></el-input>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Price</label>
                        <el-input type="text" v-model="formData.price" placeholder="Price"></el-input>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-item" style="margin-top: 20px; display: flex; flex-direction: column;">
                        <label class="label">Rating</label>
                        <div style="height: 40px; display: flex; align-items: center;">
                            <el-rate
                                v-model="formData.valueRating"
                                :colors="colorsRating">
                            </el-rate>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Description</label>
                        <el-input type="textarea" :rows="3" v-model="formData.description" placeholder="Description"></el-input>
                    </div>
                </div>    
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Artist Name</label>
                        <el-input type="text" v-model="formData.artistName" placeholder="Artist Name"></el-input>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-item" style="margin-top: 20px; display: flex; flex-direction: column;">
                        <label class="label">Artist Born Day</label>
                        <el-date-picker
                            style="width: 100%"
                            v-model="formData.artistBornDay"
                            type="date"
                            placeholder="Pick a born day">
                        </el-date-picker>
                    </div>
                </div>   
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-item" style="margin-top: 20px; display: flex; flex-direction: column;">
                        <label class="label">Type</label>
                        <el-select v-model="formData.valueType" placeholder="Choose Type">
                            <el-option
                            v-for="item in typeBook"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-item" style="margin-top: 20px; display: flex; flex-direction: column;">
                        <label class="label">Status</label>
                        <el-select v-model="formData.valueStatus" placeholder="Choose Status">
                            <el-option
                            v-for="item in status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>   
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Image Book</label>
                        <div>
                            <el-upload
                                :class="formData.imageUrl || value ? '' : 'avatar-uploader'"
                                :auto-upload="false"
                                :multiple="false"
                                action="#"
                                :show-file-list="false"
                                :on-change="handleChange"
                            >
                                <img
                                    v-if="formData.imageUrl || value"
                                    :src="formData.imageUrl"
                                    class="img-fluid"
                                />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Avatar Artist</label>
                        <div>
                            <el-upload
                                :class="formData.artistAvatar || valueTwo ? '' : 'avatar-uploader'"
                                :auto-upload="false"
                                :multiple="false"
                                action="#"
                                :show-file-list="false"
                                :on-change="handleChange"
                            >
                                <img
                                    v-if="formData.artistAvatar || valueTwo"
                                    :src="formData.artistAvatar"
                                    class="img-fluid"
                                />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" style="padding-top: 20px;">
                <div class="row" style="justify-content: flex-end;">
                    <el-button icon="el-icon-error" @click="backPage()" style="width: 100px; background-color: #F56C6C !important; border-color: #F56C6C !important;">Back</el-button>
                    <el-button icon="el-icon-success" style="width: 100px" @click="handleSave()">Save</el-button>
                </div>
        </div>
    </div>
</template>
<script>
import { cloneDeep } from 'lodash';
export default{
    props: {
		value: { type: String, },
        valueTwo: { type: String },
		type: { type: String, },
        typeTwo: { type: String },
	},
    data(){
        return{
            formData: {
                name: '',
                price: '',
                description: '',
                artistName: '',
                artistBornDay: '',
                valueType: '',
                valueRating: '',
                valueStatus: '',
                imageUrl: '',
                artistAvatar: '',
            },
            colorsRating: ['#99A9BF', '#F7BA2A', '#FF9900'],
            typeBook: [
                {
                    value: 'comic',
                    label: 'Comic'
                },
                {
                    value: 'novel',
                    label: 'Novel'
                }
            ],
            status: [
                {
                    value: 'active',
                    label: 'Còn hàng'
                }, 
                {
                    value: 'isActive',
                    label: 'Hết hàng'
                }
            ],
        }
    },
    watch: {
		value() {
			this.$emit('input', this.value);
            this.$emit('input', this.valueTwo);
			this.formData.imageUrl = cloneDeep(this.value);
            this.formData.artistAvatar = cloneDeep(this.valueTwo);
		},
	},
	created() {
		const _this = this;
		_this.formData.imageUrl = cloneDeep(_this.value);
        _this.formData.artistAvatar = cloneDeep(_this.valueTwo);
	},
    methods: {
        backPage(){
            const _this = this;
            _this.$router.push('/product');
        },
        handleSave(){
            console.log(this.formData);
        },
        handleChange(file, fileList) {
			const _this = this;

			const isImage = ['image/png', 'image/jpeg'].includes(file.raw.type);
			const isLt8M = file.raw.size / 1024 / 1024 < 8;

			if (!isImage) return this.$message.error('Hình ảnh phải ở định dạng JPG/PNG!');
			if (!isLt8M) return this.$message.error('Kích thước hình ảnh không được vượt quá 8MB!');

			_this.$emit('input', file.raw);
			_this.formData.imageUrl = URL.createObjectURL(file.raw);
		},
        handleChangeTwo(fileTwo, fileList) {
			const _this = this;

			const isImage = ['image/png', 'image/jpeg'].includes(fileTwo.raw.typeTwo);
			const isLt8M = fileTwo.raw.size / 1024 / 1024 < 8;

			if (!isImage) return this.$message.error('Hình ảnh phải ở định dạng JPG/PNG!');
			if (!isLt8M) return this.$message.error('Kích thước hình ảnh không được vượt quá 8MB!');

			_this.$emit('input', fileTwo.raw);
			_this.formData.artistAvatar = URL.createObjectURL(fileTwo.raw);
		},
    }
}
</script>
<style scoped>
    .label{
        font-size: 16px;
        font-weight: 500;
        color: #182444;
        margin-bottom: 10px;
    }
</style>
