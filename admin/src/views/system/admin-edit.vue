<template>
  <div class="admin-edit">
    <el-card class="box-card">
      <h1 class="title">{{ id ? '更新' : '新增' }}管理员</h1>
      <el-input v-model="admin.username" placeholder="管理员名字" :disabled="id?true:false" />
      <el-input v-model="admin.password" placeholder="管理员密码" show-password />
      <el-select v-model="admin.role" placeholder="请选择">
        <el-option
          v-for="item in roleList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div class="save">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import admin from '@/api/admin.js'
export default {
  name: 'AdminEdit',
  props: {
    id: { type: String, default: '' } // 更新的管理员ID
  },
  data() {
    return {
      admin: { // 管理员信息
        username: '',
        password: '',
        role: ''
      },
      roleList: [ // 角色列表
        { id: 1, value: 'visitor', label: '访客' },
        { id: 2, value: 'admin', label: '管理员' }
      ]
    }
  },
  watch: {
    // 监听路由, 判断是更新还是新增
    $route() {
      if (this.id) {
        this.getItemAdmin()
      } else {
        this.admin.username = ''
        this.admin.password = ''
        this.admin.role = ''
      }
    }
  },
  mounted() {
    this.id && this.getItemAdmin()
  },
  methods: {
    // 新增或更新管理员
    async save() {
      const { username, password, role } = this.admin
      const admin_id = this.id
      if (admin_id) {
        // 更新管理员
        if (!password && !role) {
          return this.$message({ type: 'error', message: '密码或角色至少要填写一项' })
        }
        let updateParams
        if (!password) {
          // 不修改密码
          updateParams = { role }
        } else {
          updateParams = { password, role }
        }
        this.updateAdmin(updateParams)
      } else {
        // 新增管理员
        if (!username || !password || !role) {
          return this.$message({ type: 'error', message: '请将信息填写完整' })
        }
        if (new RegExp('[^a-zA-Z0-9\u4e00-\u9fa5]', 'g').test(username) || username.length > 8) {
          return this.$message({ type: 'error', message: '名字只能是字母、数字和中文的组合, 且长度不能大于8个字符' })
        }
        if (password.length < 6) {
          return this.$message({ type: 'error', message: '密码长度不能小于6位' })
        }
        // 参数校验成功, 发送请求
        this.addAdmin()
      }
    },
    // 获取管理员详情
    async getItemAdmin() {
      const id = this.id
      const res = await admin.itemAdmin({ id })
      if (res.code === 0) {
        // 获取成功后赋值
        const { admin } = res.data
        this.admin.username = admin.username
        this.admin.password = ''
        this.admin.role = admin.role
      }
    },
    // 新增管理员
    async addAdmin() {
      const res = await admin.addAdmin({ data: this.admin })
      if (res.code === 0) {
        this.$message({ type: 'success', message: res.msg })
        // 跳转到列表页
        this.$router.push('/admin/list')
      }
    },
    // 更新管理员
    async updateAdmin(data) {
      const id = this.id
      const res = await admin.updateAdmin({ id, data })
      if (res.code === 0) {
        this.$message({ type: 'success', message: res.msg })
        // 跳转到列表页
        this.$router.push('/admin/list')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../stylus/variable.styl"
.admin-edit
  .box-card
    width: 520px
    box-shadow: none
    .title, .el-input, .el-select
      margin-bottom: 30px
    .title
      font-size: $font-s
    .el-input
      width: 70%
</style>

