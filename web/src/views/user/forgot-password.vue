<template>
  <div class="forgot-password">
    <div class="container">
      <!-- 步骤条 -->
      <div class="steps-bar">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="填写验证信息" />
          <el-step title="设置新密码" />
          <el-step title="找回成功" />
        </el-steps>
      </div>
      <!-- 第一步 -->
      <div v-if="active===1" class="steps-item m-auto">
        <el-form ref="vertify-form" :model="user" :rules="rules">
          <el-form-item class="w-80 m-lr-auto" prop="username">
            <el-input v-model="user.username" placeholder="你的名字" />
          </el-form-item>
          <el-form-item class="w-80 m-lr-auto">
            <el-select v-model="user.security.question" placeholder="请选择密保问题">
              <el-option
                v-for="item in secureList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="w-80 m-lr-auto" prop="security">
            <el-input v-model="user.security.answer" placeholder="密保问题答案" />
          </el-form-item>
          <el-form-item class="w-80 m-lr-auto">
            <el-button type="primary w-100" @click="submitVertifyInfo">填写完成，下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 第二步 -->
      <div v-if="active===2" class="steps-item m-auto">
        <el-form ref="newpassword-form" :model="user" :rules="rules">
          <el-form-item class="w-80 m-lr-auto" prop="newpassword">
            <el-input v-model="user.newpassword" placeholder="设置新密码" show-password />
          </el-form-item>
          <el-form-item class="w-80 m-lr-auto" prop="order_newpassword">
            <el-input v-model="user.order_newpassword" placeholder="确认新密码" show-password />
          </el-form-item>
          <el-form-item class="w-80 m-lr-auto">
            <el-button type="primary w-100" @click="submitNewPassword">设置完成</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 第三步 -->
      <div v-if="active===3" class="steps-item-success text-center">
        <p class="success-info fw-700">新密码设置成功!</p>
        <p class="jump-info">{{ time }}s后将自动跳转到登录页面</p>
      </div>
      <!-- 左下角图片 -->
      <div class="fixed-image">
        <img class="w-100 block" src="../../assets/images/findpassword.png">
      </div>
    </div>
  </div>
</template>

<script>
import check from '@/utils/check.js'
import user from '@/api/user.js'
export default {
  name: 'ForgotPassword',
  data() {
    return {
      active: 1, // 控制步骤条
      time: 3, // 3s倒计时跳转登录页
      secureList: [], // 密保问题列表
      user: { // 用户信息
        username: '',
        security: {
          question: '',
          answer: ''
        },
        newpassword: '',
        order_newpassword: ''
      },
      rules: { // 表单验证规则
        username: [{ validator: check.checkUserName, trigger: 'blur' }],
        newpassword: [{ validator: check.checkPassword, trigger: 'blur' }],
        order_newpassword: [{ validator: check.checkPassword, trigger: 'blur' }],
        security: [{ validator: check.checkSecure, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getSecureList()
  },
  methods: {

    // 获取密保问题列表
    async getSecureList() {
      const res = await user.getSecureList()
      if (res.code === 0) {
        this.secureList = res.data.secureList
      }
    },

    // 提交验证信息表单
    submitVertifyInfo() {
      this.$refs['vertify-form'].validate(valid => {
        if (valid) { this.vertifyInfo() }
      })
    },

    // 提交新密码设置表单
    submitNewPassword() {
      this.$refs['newpassword-form'].validate(valid => {
        if (valid) { this.setNewPassword() }
      })
    },

    // 发送请求验证输入的信息
    async vertifyInfo() {
      const { username, security } = this.user
      const res = await user.resetAuth({ data: { username, security }})
      if (res.code === 0) {
        this.$notify({ type: 'success', title: '成功', message: res.msg })
        this.jumpTwo()
      }
    },

    // 发送请求设置新密码
    async setNewPassword() {
      const { username, security, newpassword, order_newpassword } = this.user
      // 两次输入的新密码不一致
      if (newpassword !== order_newpassword) {
        this.$notify({ type:'error', title: '错误', message: '两次输入的新密码不一致' })
        return
      }
      const res = await user.resetPassword({ data: { username, security, password: newpassword }})
      if (res.code === 0) {
        // 无论目前登录与否，都退出登录清除用户信息
        this.$store.commit('logout')
        this.setSuccss()
      }
    },

    // 跳转第二步
    jumpTwo() {
      this.active = 2
    },

    // 设置成功, 跳转到第三步
    setSuccss() {
      this.active = 3
      // 开启定时器, 3s后跳转到登录页
      const timer = setInterval(() => {
        if (this.time === 1) { this.$router.push('/login') }
        this.time--
      }, 1000)
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_variable.scss";
@import "../../styles/_mixins.scss";
.forgot-password {
  .steps-bar {
    padding: 10vh 0 8vh 0;
  }
  .steps-item {
    max-width: 460px;
    /deep/ .el-button {
      font-size: $font-xl;
    }
  }
  .steps-item-success {
    .success-info {
      font-size: $font-vl;
    }
    .jump-info {
      font-size: $font-lg;
      color: $ft-tag;
    }
  }
  .fixed-image {
    @include position(fixed, 25vh, 25vh, $left:0, $bottom:10px)
  }
}
</style>
