<template>
    <div class="user-admin-page">
        <div class="container" style="padding: 30px 0;">
            <h2>Quản lí Blog</h2>
        </div>
        <div class="container" style="padding-bottom: 30px;">
            <div class="row" style="justify-content: space-between;">
                <div class="col-md-6">
                    <div class="row">
                        <el-input style="width: 83%;" v-model="search" placeholder="Enter title, tag"></el-input>
                        <el-button style="width: 7%; height: 40px;" icon="el-icon-search"></el-button>
                    </div>
                </div>
                <div class="col-md-4" style="text-align: right;">
                    <el-button style="width: 35%; height: 40px; font-size: 16px;" icon="el-icon-document" @click="createNew()">Create New</el-button>
                </div>
            </div>
        </div>
        <div class="container">
            <el-table
            :data="listBlog"
            style="width: 100%">
                <el-table-column width="100">
                    <template slot-scope="scope">
                        <el-avatar v-if="scope.row.imgUrl" :size="50" fit="cover" shape="restangle" :src="scope.row.imgUrl">
                        </el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="Function" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-edit icon-funtion" @click="editDetail(scope.row.id)"></i>
                        <i class="el-icon-delete icon-funtion"></i>
                    </template>
                </el-table-column>
                <el-table-column label="Title" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Content" width="300">
                    <template slot-scope="scope">
                        <span>{{scope.row.content}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Small Content" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.smallContent}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Tag" width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.tag}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Create By" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.createBy}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Create At" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.createAt}}</span>
                    </template>
                </el-table-column>
                 <el-table-column label="Update By" width="150">
                     <template slot-scope="scope">
                        <span>{{scope.row.updateBy}}</span>
                    </template>
                </el-table-column>
                 <el-table-column label="Update At" width="150">
                     <template slot-scope="scope">
                        <span>{{scope.row.updateAt}}</span>
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
                :total="50">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            search: '',
            currentPage: 1,
            listBlog: [
                {
                    id: "1",
                    tilte: 'Top 10 cuốn sách bánh cuốn',
                    content: 'content',
                    smallContent: 'smallContent',
                    tags: 'abc',
                    imgUrl: 'http://photonhanh.com/images/blog/nhung-dieu-can-biet-khi-thiet-ke-bia-sach-khong-the-bo-qua.jpg',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                },
                {
                    id: "2",
                    tilte: 'Top 10 cuốn sách bánh cuốn',
                    content: 'content',
                    smallContent: 'smallContent',
                    tags: 'abc',
                    imgUrl: 'http://photonhanh.com/images/blog/nhung-dieu-can-biet-khi-thiet-ke-bia-sach-khong-the-bo-qua.jpg',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                },
                {
                    id: "3",
                    tilte: 'Top 10 cuốn sách bánh cuốn',
                    content: 'content',
                    smallContent: 'smallContent',
                    tags: 'abc',
                    imgUrl: 'http://photonhanh.com/images/blog/nhung-dieu-can-biet-khi-thiet-ke-bia-sach-khong-the-bo-qua.jpg',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                },
                {
                    id: "4",
                    tilte: 'Top 10 cuốn sách bánh cuốn',
                    content: 'content',
                    smallContent: 'smallContent',
                    tags: 'abc',
                    imgUrl: 'http://photonhanh.com/images/blog/nhung-dieu-can-biet-khi-thiet-ke-bia-sach-khong-the-bo-qua.jpg',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                },
                {
                    id: "5",
                    tilte: 'Top 10 cuốn sách bánh cuốn',
                    content: 'content',
                    smallContent: 'smallContent',
                    tags: 'abc',
                    imgUrl: 'http://photonhanh.com/images/blog/nhung-dieu-can-biet-khi-thiet-ke-bia-sach-khong-the-bo-qua.jpg',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                },
            ]
        }
    },
    methods: {
        handleSizeChange(val) {
            const _this = this;
            _this.size = val;
        },

        handleCurrentChange(val) {
            const _this = this;
            _this.from = (_this.currentPage - 1) * _this.size;
        },
        createNew(){
            const _this = this;
            // _this.$router.push(_this.localePath('/user/none'));
            _this.$router.push('blog/id');
        },
        editDetail(id){
            const _this = this;
            _this.$router.push({path: `blog/id=?${id}`});
        }
    }
}
</script>
<style scoped>
</style>