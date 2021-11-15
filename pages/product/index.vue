<template>
    <div class="user-admin-page">
        <div class="container" style="padding: 30px 0;">
            <h2>Quản lí Book</h2>
        </div>
        <div class="container" style="padding-bottom: 30px;">
            <div class="row" style="justify-content: space-between;">
                <div class="col-md-6">
                    <div class="row">
                        <el-input style="width: 83%;" v-model="search" placeholder="Enter name, type, artist name"></el-input>
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
            :data="listProduct"
            style="width: 100%">
                <el-table-column width="100">
                    <template slot-scope="scope">
                        <el-avatar v-if="scope.row.imgUrl" :size="50" fit="cover" shape="circle" :src="scope.row.imgUrl">
                        </el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="Function" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-edit icon-funtion" @click="editDetail(scope.row.id)"></i>
                        <i class="el-icon-delete icon-funtion"></i>
                    </template>
                </el-table-column>
                <el-table-column label="Name" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Price" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.price}} VNĐ</span>
                    </template>
                </el-table-column>
                <el-table-column label="Rating" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.rating}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Sold" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.sold}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Description" width="300">
                    <template slot-scope="scope">
                        <span>{{scope.row.description}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Artist Avatar" width="150">
                    <template slot-scope="scope">
                        <el-avatar v-if="scope.row.artistAvatar" :size="50" fit="cover" shape="circle" :src="scope.row.artistAvatar">
                        </el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="Artist Name" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.artistName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Artist Born Day" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.artistBornDay}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Type" width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.type}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Status" width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.status}}</span>
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
            listProduct: [
                {
                    id: "1",
                    name: 'Thám tử lừng danh Conan',
                    price: '100.000',
                    rating: '4',
                    sold: '2000',
                    description: 'Mô tả',
                    imgUrl: 'https://cf.shopee.vn/file/88e12da9609a8e1899ce5b4faf9bd665',
                    artistAvatar: 'https://cdn.allfamous.org/people/avatars/gosho-aoyama-snvt-allfamous.org.jpg',
                    artistName: 'Gosho Aoyama',
                    artistBornDay: '20/09/2000',
                    type: 'comic',
                    status: 'Còn hàng',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                },
                {
                    id: "2",
                    name: 'Thám tử lừng danh Conan',
                    price: '100.000',
                    rating: '4',
                    sold: '2000',
                    description: 'Mô tả',
                    imgUrl: 'https://cf.shopee.vn/file/88e12da9609a8e1899ce5b4faf9bd665',
                     artistAvatar: 'https://cdn.allfamous.org/people/avatars/gosho-aoyama-snvt-allfamous.org.jpg',
                    artistName: 'Gosho Aoyama',
                    artistBornDay: '20/09/2000',
                    type: 'comic',
                    status: 'Còn hàng',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                },
                {
                    id: "3",
                    name: 'Thám tử lừng danh Conan',
                    price: '100.000',
                    rating: '4',
                    sold: '2000',
                    description: 'Mô tả',
                    imgUrl: 'https://cf.shopee.vn/file/88e12da9609a8e1899ce5b4faf9bd665',
                     artistAvatar: 'https://cdn.allfamous.org/people/avatars/gosho-aoyama-snvt-allfamous.org.jpg',
                    artistName: 'Gosho Aoyama',
                    artistBornDay: '20/09/2000',
                    type: 'comic',
                    status: 'Còn hàng',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                },
                {
                    id: "4",
                    name: 'Thám tử lừng danh Conan',
                    price: '100.000',
                    rating: '4',
                    sold: '2000',
                    description: 'Mô tả',
                    imgUrl: 'https://cf.shopee.vn/file/88e12da9609a8e1899ce5b4faf9bd665',
                     artistAvatar: 'https://cdn.allfamous.org/people/avatars/gosho-aoyama-snvt-allfamous.org.jpg',
                    artistName: 'Gosho Aoyama',
                    artistBornDay: '20/09/2000',
                    type: 'comic',
                    status: 'Còn hàng',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                },
                {
                    id: "5",
                    name: 'Thám tử lừng danh Conan',
                    price: '100.000',
                    rating: '4',
                    sold: '2000',
                    description: 'Mô tả',
                    imgUrl: 'https://cf.shopee.vn/file/88e12da9609a8e1899ce5b4faf9bd665',
                     artistAvatar: 'https://cdn.allfamous.org/people/avatars/gosho-aoyama-snvt-allfamous.org.jpg',
                    artistName: 'Gosho Aoyama',
                    artistBornDay: '20/09/2000',
                    type: 'comic',
                    status: 'Còn hàng',
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
            _this.$router.push('product/id');
        },
        editDetail(id){
            const _this = this;
            _this.$router.push({path: `product/id=?${id}`});
        }
    }
}
</script>
<style scoped>
</style>