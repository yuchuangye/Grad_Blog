<template>
  <div class="register">
    <div class="container">
      <div class="wrap m-auto">
        <div class="logo text-center fw-700">GRAD<span class="text-main fw-700">BLOG</span></div>
        <div class="card bg-white">
          <div class="card-header fw-700 text-center">注册账号</div>
          <div class="card-body">
            <el-form ref="user-form" :model="user" :rules="rules">
              <el-form-item class="w-80 m-lr-auto" prop="username">
                <el-input v-model="user.username" placeholder="你的名字" />
              </el-form-item>
              <el-form-item class="w-80 m-lr-auto" prop="password">
                <el-input v-model="user.password" placeholder="你的密码" show-password />
              </el-form-item>
              <el-form-item class="w-80 m-lr-auto" prop="security">
                <el-input v-model="user.security" placeholder="你的密保问题" @keyup.native.enter="submit" />
              </el-form-item>
              <el-form-item class="w-80 m-lr-auto">
                <el-button type="primary w-100" :loading="loading" @click="submit">注册</el-button>
              </el-form-item>
            </el-form>
            <div class="text-center">继续即代表同意
              <span class="text-main">《服务条款》</span>和
              <span class="text-main">《隐私政策》</span>
            </div>
            <div class="hasuser text-main text-right m-auto w-80" @click="$router.push('/login')">已有账号？立即登录</div>
          </div>
        </div>
      </div>
      <!-- 滑块验证码 -->
      <Vcode :show="codeShow" @success="codeSuccess" @close="codeShow=false" />
    </div>
  </div>
</template>

<script>
import Vcode from 'vue-puzzle-vcode'
import check from '@/utils/check'
import user from '@/api/user'
export default {
  name: 'Register',
  components: {
    Vcode
  },
  data() {
    return {
      user: { // 用户注册信息
        username: '',
        password: '',
        security: ''
      },
      rules: { // 表单验证规则
        username: [{ validator: check.checkUserName, trigger: 'blur' }],
        password: [{ validator: check.checkPassword, trigger: 'blur' }],
        security: [{ validator: check.checkSecure, trigger: 'blur' }]
      },
      codeShow: false, // 控制滑块验证码显示
      loading: false // 按钮按钮加载中提示
    }
  },
  methods: {
    // 提交表单
    submit() {
      this.$refs['user-form'].validate(valid => {
        if (valid) { this.codeShow = true }
      })
    },

    // 用户注册
    async register() {
      this.loading = true
      let res
      try {
        res = await user.register({ data: this.user })
      } catch (err) {
        // 接口报错也要关闭 loading
        this.loading = false
        return
      }
      // 注册成功
      if (res.code === 0) {
        this.$notify({ type: 'success', title: '成功', message: res.msg })
        // 跳转到登录页
        this.$router.push('/login')
      }
      // 无论 code是0|1 都要关闭loading
      this.loading = false
    },

    // 滑块验证码验证成功
    codeSuccess() {
      this.codeShow = false
      this.register()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/_variable.scss";
.register {
  height: 100vh;
  background-color: #e9ecef;
  .container {
    padding-top: 5vh;
    padding-bottom: 5vh;
    .wrap {
      max-width: 380px;
      .logo {
        font-size: $font-t1;
      }
      .card {
        padding: 3rem 0;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        .card-header {
          font-size: $font-t1;
          padding: 1.25rem;
        }
        .card-body {
          padding: 1.25rem;
          /deep/ .el-button {
            font-size: $font-xl;
          }
          .hasuser {
            margin-top: 1rem;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
