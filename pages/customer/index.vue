<template>
    <div class="user-customer-page">
        <div class="container" style="padding: 30px 0;">
            <h2>Quản lí Account Customer</h2>
        </div>
        <div class="container" style="padding-bottom: 30px;">
            <div class="row" style="justify-content: space-between;">
                <div class="col-md-6">
                    <div class="row">
                        <el-input style="width: 83%;" v-model="search" placeholder="Enter name, phone, username"></el-input>
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
            :data="userCustomer"
            style="width: 100%">
                <el-table-column label="Avatar" width="100">
                    <template slot-scope="scope">
                        <el-avatar v-if="scope.row.avatar" :size="50" fit="cover" shape="circle" :src="scope.row.avatar">
                        </el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="Function" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-edit icon-funtion" @click="editDetail(scope.row.id)"></i>
                        <i class="el-icon-delete icon-funtion"></i>
                    </template>
                </el-table-column>
                <el-table-column label="User Name" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.userName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Full Name" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.fullName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Phone Number" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.phone}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Address" width="300">
                    <template slot-scope="scope">
                        <span>{{scope.row.address}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Status Account" width="150">
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
            userCustomer: [
                {
                    id: "1",
                    userName: 'td.linh',
                    password: '123456',
                    fullName: 'Thái Duy Linh',
                    phone: '0329011861',
                    address: 'Đà Thuận - Đà Loan - Đức Trọng - Lâm Đồng',
                    status: 'Hoạt động',
                    avatar: 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-hand-drawn-flat-wind-user-avatar-icon-png-image_4492039.jpg',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                },
                {
                    id: "2",
                    userName: 'pt.trung',
                    password: '123456',
                    fullName: 'Phạm Thành Trung',
                    phone: '0329011862',
                    address: 'Hooc Môn - TPHCM',
                    status: 'Hoạt động',
                    avatar: 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-hand-drawn-flat-wind-user-avatar-icon-png-image_4492039.jpg',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                },
                {
                    id: "3",
                    userName: 'pt.trung',
                    password: '123456',
                    fullName: 'Phạm Thành Trung',
                    phone: '0329011862',
                    address: 'Hooc Môn - TPHCM',
                    status: 'Hoạt động',
                    avatar: 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-hand-drawn-flat-wind-user-avatar-icon-png-image_4492039.jpg',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                },
                {
                    id: "4",
                    userName: 'pt.trung',
                    password: '123456',
                    fullName: 'Phạm Thành Trung',
                    phone: '0329011862',
                    address: 'Hooc Môn - TPHCM',
                    status: 'Hoạt động',
                    avatar: 'https://png.pngtree.com/png-clipart/20190904/original/pngtree-hand-drawn-flat-wind-user-avatar-icon-png-image_4492039.jpg',
                    createBy: null,
                    createAt: null,
                    updateBy: null,
                    updateAt: null
                }
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
            _this.$router.push('customer/id');
        },
        editDetail(id){
            const _this = this;
            _this.$router.push({path: `customer/id=?${id}`});
        }
    }
}
</script>
<style scoped>
</style>