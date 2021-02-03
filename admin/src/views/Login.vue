<template>
  <div class="login">
    <img src="../assets/images/login_bg.png" class="login-bg">
    <div class="login-card">
      <div class="card-body">
        <div class="logo"><img width="70" src="../assets/logo.png"></div>
        <h2 class="title">GRADBLOG-ADMIN</h2>

        <el-form ref="admin-form" :model="admin" :rules="rules" class="info">
          <el-form-item prop="username">
            <el-input v-model="admin.username" placeholder="请输入用户名">
              <i slot="prefix" class="el-input__icon el-icon-user" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="admin.password" placeholder="请输入密码" show-password>
              <i slot="prefix" class="el-input__icon el-icon-lock" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn btn-login" :loading="loading" @click="submitForm">登录</el-button>
            <el-button type="primary" class="btn btn-reset" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import admin from '@/api/admin'
export default {
  name: 'Login',
  data() {
    return {
      loading: false, // 控制登录按钮的加载动画
      admin: { // 用户信息
        username: 'admin',
        password: '123456'
      },
      rules: { // 表单验证规则
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 重置表单
    resetForm() {
      this.$refs['admin-form'].resetFields()
    },
    // 提交表单
    submitForm() {
      this.$refs['admin-form'].validate(valid => {
        if (valid) { this.login() }
      })
    },
    // 登录
    async login() {
      this.loading = true
      let res
      try {
        res = await admin.login({ data: this.admin })
      } catch (err) {
        // 接口报错也要关闭 loading
        this.loading = false
        return
      }
      // 登录成功
      if (res.code === 0) {
        this.$message({ type: 'success', message: res.msg })
        this.$store.commit('login', res.data)
        // 重定向到上一页 或 回到首页
        const { redirect } = this.$route.query
        redirect ? this.$router.push(redirect) : this.$router.push('/home')
      }
      // 无论 code是0|1 都要关闭loading
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../stylus/variable.styl"
.login
  .login-bg
    background-color: $colorB
    width: auto
    height: auto
    max-width: 100%
    max-height: 100%
    margin-top: 200px
  .login-card
    position: absolute
    left: 50%
    top: 17%
    z-index: 99
    transform: translate3d(-50%, 0, 0)
    width: 318px
    padding: 20px
    padding-bottom: 70px
    border: 1px solid $colorK
    border-top: 10px solid $colorB
    background-color: $colorA
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
    border-radius: 4px
    .logo
      text-align: center
    .title
      text-align: center
      color: $colorB
      font-size: $font-m
      margin: 25px 0
      font-weight: 700
    .info
      text-align: center
      .el-form-item:last-child
        margin-bottom: 0
      >>> .el-input__inner
        padding-left: 35px
      .el-input__icon
        color: $colorB
      .btn
        width: 44%
</style>

