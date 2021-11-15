<template>
    <div class="user-admin-page">
        <div class="container" style="padding: 30px 0;">
            <h2>Create New Account Customer</h2>
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
                        <label class="label">User Name</label>
                        <el-input type="text" v-model="formData.userName" placeholder="User name"></el-input>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Password</label>
                        <el-input type="password" v-model="formData.password" placeholder="Password"></el-input>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-7">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Full Name</label>
                        <el-input type="text" v-model="formData.fullName" placeholder="Full name"></el-input>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Phone</label>
                        <el-input type="text" v-model="formData.phone" placeholder="Phone"></el-input>
                    </div>
                </div>          
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Address</label>
                        <el-input type="text" v-model="formData.address" placeholder="Address"></el-input>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-item" style="margin-top: 20px; display: flex; flex-direction: column;">
                        <label class="label">Status</label>
                        <el-select v-model="formData.valueStatus" placeholder="Choose Status">
                            <el-option
                            v-for="item in optionStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>   
            </div>
            <div class="row">
                <div class="col-md-6" style="margin-top: 20px;">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Avatar</label>
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
		type: { type: String, },
	},
    data(){
        return{
            formData: {
                userName: '',
                password: '',
                fullName: '',
                phone: '',
                address: '',
                valueStatus: '',
                imageUrl: '',
            },
            optionStatus: [{
                    value: 'active',
                    label: 'Active'
                }, 
                {
                    value: 'isActive',
                    label: 'IsActive'
                }
            ],
        }
    },
    watch: {
		value() {
			this.$emit('input', this.value);
			this.formData.imageUrl = cloneDeep(this.value);
		},
	},
    created() {
		const _this = this;
		_this.formData.imageUrl = cloneDeep(_this.value);
	},
    methods: {
        backPage(){
            const _this = this;
            _this.$router.push('/customer');
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
