<template>
    <div class="change-pass-page">
        <div class="container" style="padding: 30px 0;">
            <h2>Change PassWord</h2>
        </div>
        <div class="container">
            <div class="row" style="margin-top: 20px;">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-item">
                        <label class="label">Old PassWord</label>
                        <el-input type="password" v-model="oldPassword" placeholder="Enter old password"></el-input>
                    </div>
                </div>
                <div class="col-md-3"></div>
            </div>
            <div class="row" style="margin-top: 20px;">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-item">
                        <label class="label">Old PassWord</label>
                        <el-input type="password" v-model="newPassword" placeholder="Enter old password"></el-input>
                    </div>
                </div>
                <div class="col-md-3"></div>
            </div>
            <div class="row"  style="margin-top: 20px;">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-item">
                        <label class="label">Old PassWord</label>
                        <el-input type="password" v-model="confirmPassword" placeholder="Enter old password"></el-input>
                    </div>
                </div>
                <div class="col-md-3"></div>
            </div>
            <div class="row"  style="margin-top: 20px;">
                <div class="col-md-3"></div>
                <div class="col-md-6" style="text-align: right;">
                    <el-button icon="el-icon-error" @click="backPage()" style="width: 100px; background-color: #F56C6C !important; border-color: #F56C6C !important;">Back</el-button>
                    <el-button icon="el-icon-success" style="width: 100px">Save</el-button>
                </div>
                <div class="col-md-3"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    },
    methods: {
        backPage(){
            const _this = this;
            _this.$router.push('/');
        }
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