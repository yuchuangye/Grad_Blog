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
                <el-input v-model="user.security" placeholder="你的密保问题" />
              </el-form-item>
              <el-form-item class="w-80 m-lr-auto">
                <el-button type="primary w-100" @click="submit">注册</el-button>
              </el-form-item>
            </el-form>
            <div class="tips text-center">继续即代表同意
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
export default {
  name: 'Register',
  components: {
    Vcode
  },
  data() {
    // 用户名验证规则
    const checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback('请输入用户名')
      } else if (new RegExp('[^a-zA-Z0-9\u4e00-\u9fa5]', 'g').test(value)) {
        return callback('名字只能是数字、字母和中文的组合')
      } else if (value.length > 10) {
        return callback('长度不能大于10个字符')
      } else {
        return callback()
      }
    }
    // 密码验证规则
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback('请输入密码')
      } else if (value.length < 6) {
        return callback('密码长度不能小于6个字符')
      } else {
        return callback()
      }
    }
    // 密保验证规则
    const checkSecure = (rule, value, callback) => {
      if (!value) {
        return callback('必须提供密保')
      } else if (new RegExp('[^a-zA-Z0-9\u4e00-\u9fa5]', 'g').test(value)) {
        return callback('密保只能是数字、字母和中文的组合')
      } else {
        return callback()
      }
    }
    return {
      user: { // 用户注册信息
        username: '',
        password: '',
        security: ''
      },
      rules: { // 表单验证规则
        username: [{ validator: checkUserName, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }],
        security: [{ validator: checkSecure, trigger: 'blur' }]
      },
      codeShow: false // 控制滑块验证码显示
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
    register() {
      console.log('register success~')
    },
    // 验证码验证成功
    codeSuccess() {
      this.codeShow = false
      this.register()
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/_variable.scss";
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
