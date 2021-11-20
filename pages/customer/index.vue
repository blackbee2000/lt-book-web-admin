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
                        <el-button style="width: 7%; height: 40px;" icon="el-icon-search" @click="filter()"></el-button>
                    </div>
                </div>
                <div class="col-md-3">
                    <el-dropdown>
                        <el-button>
                            Filter<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item >
                                <el-button class="actionIcon" @click="openDialog('createAt')"> Create At</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item >
                                <el-button class="actionIcon" @click="openDialog('createBy')"> Create By</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="col-md-3" style="text-align: right;">
                    <el-button style="width: 50%; height: 40px; font-size: 16px;" icon="el-icon-document" @click="createNew()">Create New</el-button>
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
        <el-dialog
            title="Filter Create At"
            :visible.sync="createAtFilter"
            width="30%"
            center>
            <div class="block">
                <el-date-picker
                    style="width: 100%;"
                    v-model="searchDay"
                    type="daterange"
                    align="right"
                    start-placeholder="Start Date"
                    end-placeholder="End Date"
                    default-value="2010-10-01">
                </el-date-picker>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button style="background-color: #F56C6C !important; border-color: #F56C6C !important;" @click="closeDialog('createAt')">Cancel</el-button>
                <el-button @click="closeDialog('createAt')">Confirm</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="Filter Create By"
            :visible.sync="createByFilter"
            width="30%"
            center>
            <el-select style="width: 100%;" v-model="searchSelect" placeholder="Select Create By">
                <el-option
                v-for="item in createByList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button style="background-color: #F56C6C !important; border-color: #F56C6C !important;" @click="closeDialog('createBy')">Cancel</el-button>
                <el-button @click="closeDialog('createBy')">Confirm</el-button>
            </span>
        </el-dialog>
        <div class="over-lay"></div>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    data(){
        return{
            search: '',
            searchDay: '',
            createAtFilter: false,
            createByFilter: false,
            createByList: [
                {
                    value: 'Option1',
                    label: 'Option1'
                }, 
                {
                    value: 'Option2',
                    label: 'Option2'
                }, 
            ],
            searchSelect: '',
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
        },
        filter(){
            const _this = this;
            const filter = _.filter(_this.userCustomer, e =>{
                if(e.userName.toLowerCase() === _this.search.toLowerCase()){
                    return e;
                }
                if(e.fullName.toLowerCase() === _this.search.toLowerCase()){
                    return e;
                }
                if(e.phone.toLowerCase() === _this.search.toLowerCase()){
                    return e;
                }
            })

            _this.userCustomer = filter;
        },
        openDialog(type){
            const _this = this;
            const overLay = document.querySelector('.over-lay');
            overLay.classList.add('active');
            switch(type){
                case 'createAt':
                    _this.createAtFilter = true;
                    break;
                case 'createBy':
                    _this.createByFilter = true;
                    break;
            }
        },
        closeDialog(type){
            const _this = this;
            const overLay = document.querySelector('.over-lay');
            overLay.classList.remove('active');
            switch(type){
                case 'createAt':
                    _this.createAtFilter = false;
                    break;
                case 'createBy':
                    _this.createByFilter = false;
                    break;
            }
        },
    }
}
</script>
<style scoped>
    .actionIcon{
        font-size: 16px;
        color: #182444;
        background: transparent !important;
    }
    .actionIcon:hover{
        color: #091023 !important;
    }
    .over-lay{
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0;
        width: 100%;
        height: 100vh;
        z-index: 200;
        visibility: hidden;
    }
    .over-lay.active{
        visibility: visible;
        opacity: 0.8;
    }
</style>