<template>
  <div class="default">
    <div v-if="login">
      <div class="login">
        <div class="form">
          <div class="logo">
            Logo
          </div>
          <el-form ref="form" :model="form" class="formLogin">
            <div class="logoUser">
              <img src="../assets/icons/icon-user-login.png" alt="logo-user-login"/>
              <p>Have an account ?</p>
            </div>
            <el-form-item>
              <el-input v-model="form.userName" placeholder="Enter User Name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.password" placeholder="Enter Password"></el-input>
            </el-form-item>
            <div class="remember-forget">
              <el-checkbox v-model="checked">Remember Me</el-checkbox>
              <p>Forgot Password</p>
            </div>
            <el-button @click="handleSubmit()" class="btn-login">Login</el-button>
          </el-form>
        </div>
      </div>
    </div>
    <div v-else>
      <LayoutCustom />
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      login: false,
      form: {
        userName: '',
        password: '',
      },
      checked: true,
    }
  },
  methods: {
    handleSubmit(){
      if(this.form.password === '1'){
        this.login = true;
        this.$router.push('/');
      }
    }
  }
}
</script>
<style scoped>
  .login{
    width: 100%;
    height: 100vh;
    background: #f0efef;
  }
  .form{
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .logo{
    font-size: 50px;
    text-align: center;
    padding-bottom: 20px;
  }
  .formLogin{
    width: 500px;
    height: 380px;
    background: #fff;
    padding: 30px 50px;
    text-align: center;
    box-shadow: 0px 0px 9px -1px rgba(0,0,0,0.32);
    -webkit-box-shadow: 0px 0px 9px -1px rgba(0,0,0,0.32);
    -moz-box-shadow: 0px 0px 9px -1px rgba(0,0,0,0.32);
    border-radius: 10px;
  }
  .logoUser{
    width: 100%;
  }
  .logoUser p{
    margin-top: 15px;
    margin-bottom: 20px;
    color: #182444;
    font-size: 20px;
    font-weight: 600;
  }
  .remember-forget{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .remember-forget p{
    margin: 0;
    font-size: 16px;
    color: #182444;
    font-weight: 500;
  }
  .formLogin .btn-login{
    width: 80%;
    margin-top: 52px;
  }
</style>

