<template>
    <div class="user-admin-page">
        <div class="container" style="padding: 30px 0;">
            <h2>Create New Blog</h2>
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
                        <label class="label">Title</label>
                        <el-input type="text" v-model="formData.title" placeholder="Title"></el-input>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-item" style="margin-top: 20px; display: flex; flex-direction: column;">
                        <label class="label">Tag</label>
                        <div class="row">
                            <el-tag
                                v-for="tag in formData.dynamicTags"
                                :key="tag"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)"
                                style="width: 80px; height: 40px; display: flex; justify-content: center; align-items: center; margin-right: 10px;">
                                {{tag}}
                            </el-tag>
                            <el-input
                                style="width: 120px;"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                class="input-new-tag"
                                size="mini"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                            >
                            </el-input>
                            <el-button style="width: 120px; height: 40px;" v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Small Content</label>
                        <el-input type="textarea" :rows="3" v-model="formData.smallContent" placeholder="Description"></el-input>
                    </div>
                </div>    
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Image Blog</label>
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
            <div class="row">
                <div class="col-md-12">
                    <div class="form-item" style="margin-top: 20px">
                        <label class="label">Content</label>
                        <div>
                            <vue-editor v-model="formData.content"></vue-editor>
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
import { VueEditor } from "vue2-editor";
import { cloneDeep } from 'lodash';
export default{
    props: {
		value: { type: String, },
		type: { type: String, },
	},
    components: {
        VueEditor,
    },
    data(){
        return{
            formData: {
                title: '',
                tag: '',
                smallContent: '',
                content: '',
                dynamicTags: [],
                imageUrl: '',
            },
            inputVisible: false,
            inputValue: '',
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
            _this.$router.push('/blog');
        },
        handleClose(tag) {
            this.formData.dynamicTags.splice(this.formData.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            const inputValue = this.inputValue;
            if (inputValue) {
            this.formData.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
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
