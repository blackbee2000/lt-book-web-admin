<template>
    <div class="user-admin-page">
        <div class="container" style="padding: 30px 0;">
            <h2 v-if="$route.params.id === 'id'">Create New Account Admin</h2>
            <h2 v-else>Update Account Admin</h2>
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
                        <el-select v-model="formData.status" placeholder="Choose Status">
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
                    <div class="form-item" style="margin-top: 20px; text-align: center">
                        <label class="label">Avatar</label>
                        <div style="width: 100%;">
                            <div class="wrapper">
                                <div class="image">
                                    <img id="img-upload" src="" alt=""/>
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
                            <input id="default-btn" type="file" hidden>
                            <el-button @click="handleUploadImage()" style="margin-top: 20px;" id="custom-btn">Choose a file</el-button>
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
export default{
    data(){
        return{
            formData: {
                userName: '',
                password: '',
                fullName: '',
                phone: '',
                address: '',
                status: '',
                avatar: '',
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
	created() {
		const _this = this;
        if(_this.$route.params.id === 'id')
        {
            _this.formData = {
                userName: '',
                password: '',
                fullName: '',
                phone: '',
                address: '',
                status: '',
                avatar: '',
            };
        }
        else{
            _this.formData = _this.$route.query.user;
        }
	},
    methods: {
        backPage(){
            const _this = this;
            _this.$router.push('/user');
        },
        handleSave(){
            console.log(this.formData);
        },
        handleUploadImage(){
            const _this = this;
            const defaulBtn = document.querySelector('#default-btn');
            const fileName = document.querySelector('.file-name');
            const img = document.querySelector('#img-upload');
            const regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
            const cancelBtn = document.querySelector('#cancel-btn');
            defaulBtn.click();
            defaulBtn.addEventListener("change", function(){
                const file = this.files[0];
                if(file){
                    const reader = new FileReader();
                    reader.onload = function(){
                        const result = reader.result;
                        img.src = result;
                    }
                    cancelBtn.addEventListener("click", function(){
                        img.src = "";
                    })
                    reader.readAsDataURL(file);
                }
                if(this.value){
                    const valueStore = this.value.match(regExp);
                    fileName.textContent = valueStore;
                    _this.formData.avatar = fileName.textContent;
                }
            })
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
    .wrapper{
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
    .wrapper .image{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .wrapper .image img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .wrapper .icon{
        font-size: 100px;
        color: #182444;
        text-align: center;
    }
    .wrapper .text{
        font-size: 16px;
        font-weight: 500;
        color: #182444;
    }
    .wrapper #cancel-btn{
        position: absolute;
        right: 10px;
        top: 5px;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        transform: translateX(130%);
        transition: 0.5s;
    }
    .wrapper .file-name{
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
    .wrapper:hover .file-name{
        transform: translateY(0%);
        transition: 0.5s;
    }
    .wrapper:hover #cancel-btn{
        transform: translateX(0%);
        transition: 0.5s;
    }
</style>
