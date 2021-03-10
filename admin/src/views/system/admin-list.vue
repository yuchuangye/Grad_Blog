<template>
  <div class="admin-list">
    <el-card class="box-list-card">
      <div class="left">
        <i class="el-icon-document" />
        <span class="title">数据列表</span>
      </div>
      <div class="right">
        <el-button size="small" @click="$router.push('/system/admin-add')">添加</el-button>
      </div>
    </el-card>

    <el-table :data="adminList" border style="width: 100%">
      <el-table-column prop="number" label="编号" width="150" />
      <el-table-column prop="username" label="用户名" width="350" />
      <el-table-column prop="password" label="密码" width="350" />
      <el-table-column prop="role" label="角色" width="350" />
      <el-table-column label="操作" min-width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push(`/system/admin-update/${scope.row._id}`)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delAdmin(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import admin from '@/api/admin'
export default {
  name: 'AdminList',
  data() {
    return {
      adminList: [] // 管理员列表
    }
  },
  mounted() {
    this.getAdminList()
  },
  methods: {

    // 删除管理员
    delAdmin(row) {
      this.$confirm(`确认要删除管理员"${row.username}"?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 不能 对 admin这个管理员 进行删除
        if (row.username === 'admin') {
          return this.$message({ type: 'error', message: 'admin 管理员不能被删除' })
        }
        const res = await admin.delAdmin({ id: row._id })
        if (res.code === 0) {
          // 删除成功
          this.$message({ type: 'success', message: res.msg })
          this.getAdminList()
        }
      }).catch(() => {})
    },

    // 获取管理员列表
    async getAdminList() {
      const res = await admin.adminList()
      if (res.code === 0) {
        const { adminList } = res.data
        // 填写编号 和 密码字段
        adminList.forEach((item, index) => {
          item.number = index + 1
          item.password = '******'
        })
        this.adminList = adminList
      }
    }

  }
}
</script>

<style lang="stylus" scoped>

</style>

