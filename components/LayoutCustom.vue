<template>
  <div>
    <header class="header-admin">
      <div class="logo-menu">
        <div class="logo">Logo</div>
        <div class="menu" @click="handleButtonMenu($event)">
          <img src="../assets/icons/icon-menu.png" alt="icon-user" />
        </div>
      </div>
      <div class="account">
        <div class="avatar">
          <img src="../assets/icons/icon-user.png" alt="icon-user" />
        </div>
        <div class="name">
          <el-dropdown>
            <span class="el-dropdown-link" v-if="name">
              {{name}} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button class="actionIcon" @click="handleLogout()"
                  ><i class="el-icon-error"></i> Logout</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button class="actionIcon" @click="changePassword()"
                  ><i class="el-icon-s-tools"></i> Change Password</el-button
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </header>
    <div class="left-nav">
      <el-collapse class="list-menu">
        <el-collapse-item class="item-menu">
          <template slot="title">
            <i class="header-icon el-icon-user-solid"></i>
            Account
          </template>
          <ul>
            <li @click="handlePage('user')">Admin</li>
            <li @click="handlePage('customer')">Customer</li>
          </ul>
        </el-collapse-item>
      </el-collapse>
      <el-collapse class="list-menu">
        <el-collapse-item class="item-menu">
          <template slot="title">
            <i class="header-icon el-icon-notebook-2"></i>
            Product
          </template>
          <ul>
            <li @click="handlePage('product')">List Product</li>
          </ul>
        </el-collapse-item>
      </el-collapse>
      <el-collapse class="list-menu">
        <el-collapse-item class="item-menu">
          <template slot="title">
            <i class="header-icon el-icon-news"></i>
            Blog
          </template>
          <ul>
            <li @click="handlePage('blog')">List Blog</li>
          </ul>
        </el-collapse-item>
      </el-collapse>
      <el-collapse class="list-menu">
        <el-collapse-item class="item-menu">
          <template slot="title">
            <i class="header-icon el-icon-shopping-cart-2"></i>
            Card
          </template>
          <ul>
            <li @click="handlePage('cart')">List Cart</li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
    <main>
      <Nuxt />
    </main>
    <div class="over-lay" @click="handleCloseMenu($event)"></div>
    <footer>
      <p class="container">Web admin create by LTBook ltbook@gmail.com</p>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: 'linh',
    }
  },
  created(){
    const _this = this;
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user', user.data.name);
    _this.name = user.data.name;
  },
  methods: {
    handleButtonMenu(event) {
      const body = document.querySelector('body')
      event.stopPropagation()
      body.classList.toggle('active')
      body.style.overflow = 'hidden'
    },
    handleCloseMenu(event) {
      const body = document.querySelector('body')
      event.stopPropagation()
      body.classList.remove('active')
      body.style.overflow = 'visible'
    },
    handlePage(page) {
      const _this = this
      switch (page) {
        case 'user':
          _this.$router.push('user')
          break
        case 'customer':
          _this.$router.push('customer')
          break
        case 'product':
          _this.$router.push('product')
          break
        case 'blog':
          _this.$router.push('blog')
          break
        case 'cart':
          _this.$router.push('cart')
          break
      }
      const body = document.querySelector('body')
      body.classList.remove('active')
      body.style.overflow = 'visible'
    },
    changePassword() {
      const _this = this
      console.log('hahaa')
      _this.$router.push('changePassword')
    },
    handleLogout() {
      const _this = this;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      _this.$router.push("/");
    },
  },
}
</script>

<style scoped>
.header-admin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #d9d9d9;
  z-index: 1000;
}
.logo-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.logo {
  font-size: 30px;
  font-weight: 700;
  width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #182444;
  padding-left: 20px;
  color: #fff;
}
.menu {
  padding-left: 20px;
  cursor: pointer;
}
.menu img {
  width: 40px;
  height: 40px;
  object-fit: cover;
}
.account {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
}
.avatar {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.name span {
  font-size: 16px;
}
.left-nav {
  width: 250px;
  height: 100vh;
  background: #182444;
  transform: translateX(-100%);
  transition: 0.5s;
  z-index: 1000;
  position: fixed;
}
.list-menu {
  width: 100%;
  background: transparent;
}
.list-menu ul {
  width: 100%;
  background: #091023;
  padding-left: 40px;
  padding-bottom: 20px;
}
.list-menu ul li {
  font-size: 16px;
  color: #b3b2b2;
  padding-top: 10px;
  cursor: pointer;
}
.list-menu ul li:first-child {
  padding-top: 0;
}
.list-menu ul li:hover {
  color: #fff;
}
.list-menu ui {
  text-decoration: none;
}
.over-lay {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0;
  width: 100%;
  height: calc(100vh - 81px);
  z-index: 200;
  visibility: hidden;
  margin-top: 81px;
}
main {
  transform: translateX(0%);
  transition: 0.5s;
}
body.active {
  overflow: hidden;
}
body.active main {
  transform: translateX(5%);
  transition: 0.5s;
}
body.active .left-nav {
  transform: translateX(0%);
  transition: 0.5s;
}
body.active .over-lay {
  opacity: 0.8;
  visibility: visible;
}
footer {
  width: 100%;
  height: 80px;
}
footer p {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.actionIcon {
  font-size: 16px;
  color: #182444;
  background: transparent !important;
}
.actionIcon:hover {
  color: #091023 !important;
}
</style>
