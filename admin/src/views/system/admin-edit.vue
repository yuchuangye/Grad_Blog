<template>
  <div class="admin-edit">
    <el-card class="box-form-card">
      <h1 class="title">{{ id ? '更新' : '新增' }}管理员</h1>
      <el-input v-model="admin.username" placeholder="管理员名字" :disabled="!!id" />
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
import admin from '@/api/admin'
import storage from '@/utils/storage'
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
      const id = this.id
      if (id) {
        // 更新管理员

        if (!password && !role) {
          return this.$message({ type: 'error', message: '密码或角色至少要填写一项' })
        }
        if (password && password.length < 6) {
          return this.$message({ type: 'error', message: '密码长度不能小于6位' })
        }
        if (username === 'admin') {
          return this.$message({ type: 'error', message: 'admin 管理员不能被修改' })
        }

        const params = { password, role }
        // 不修改密码
        if (!password) { delete params.password }
        this.updateAdmin(params)
      } else {
        // 新增管理员

        if (!username || !password) {
          return this.$message({ type: 'error', message: '用户名和密码不能为空' })
        }
        if (new RegExp('[^a-zA-Z0-9\u4e00-\u9fa5]', 'g').test(username) || username.length > 8) {
          return this.$message({ type: 'error', message: '名字只能是字母、数字和中文的组合, 且长度不能大于8个字符' })
        }
        if (password.length < 6) {
          return this.$message({ type: 'error', message: '密码长度不能小于6位' })
        }

        const params = { username, password, role }
        // 不填写角色
        if (!role) { delete params.role }
        // 参数校验成功, 发送请求
        this.addAdmin(params)
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
    async addAdmin(data) {
      const res = await admin.addAdmin({ data })
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
      // 更新成功
      if (res.code === 0) {
        const cur_admin = storage.getItem('adminInfo')
        const upd_admin = res.data.admin
        // 跳转到列表页
        this.$router.push('/admin/list')
        // 更新的是当前登录的用户, 让其重新登录
        if (cur_admin.username === upd_admin.username) {
          this.$store.dispatch('reLogin')
        } else {
          this.$message({ type: 'success', message: res.msg })
        }
      }
    }

  }
}
</script>

<style lang="stylus" scoped>

</style>

