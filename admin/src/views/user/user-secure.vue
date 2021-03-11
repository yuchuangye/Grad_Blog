<template>
  <div class="user-secu">
    <el-card class="box-list-card">
      <div class="left">
        <i class="el-icon-document" />
        <span class="title">数据列表</span>
      </div>
      <div class="right">
        <el-button size="small" @click="openPrompt('add')">添加</el-button>
      </div>
    </el-card>

    <el-table :data="secureList" border style="width: 100%">
      <el-table-column prop="number" label="编号" width="150" />
      <el-table-column prop="_id" label="ID" width="450" />
      <el-table-column prop="name" label="密保描述" width="550" />
      <el-table-column label="操作" min-width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="openPrompt('update', scope.row._id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delSecure(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>    
  </div>
</template>

<script>
import user from '@/api/user'
export default {
  name: 'UserSecure',
  data() {
    return {
      secureList: [],
      inputValue: '' // 输入框的初始文本
    }
  },
  mounted() {
    this.getSecureList()
  },
  methods: {

    // 获取密保问题列表
    async getSecureList() {
      const res = await user.secureList()
      if (res.code === 0) {
        this.handleSecureList(res.data.secureList)
      }
    },

    // 获取密保问题详情
    async getSecureItem(id) {
      const res = await user.itemSecure({ id })
      if (res.code === 0) {
        this.inputValue = res.data.secure.name
      }
    },

    // 添加密保问题
    async addSecure(name) {
      const res = await user.addSecure({ data: { name } })
      if (res.code === 0) {
        this.$message({ type: 'success', message: res.msg })
        this.getSecureList()
      }
    },

    // 更新密保问题
    async updateSecure(id, name) {
      const res = await user.updateSecure({ id, data: { name } })
      if (res.code === 0) {
        this.$message({ type: 'success', message: res.msg })  
        this.getSecureList()
      }
    },

    // 删除密保问题 
    delSecure(row) {
      this.$confirm(`确认要删除密保问题"${row.name}"?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await user.delSecure({ id: row._id })
        // 删除成功
        if (res.code === 0) {
          this.$message({ type: 'success', message: '删除成功' })
          this.getSecureList()
        }
      }).catch(() => {})
    },

    // 编辑弹出框
    async openPrompt(type, id) {
      let promptObj = {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{6,12}$/,
        inputErrorMessage: '问题描述格式不正确'
      }
      // 更新操作时先获取数据, 并为promptObj追加一个字段
      if (type === 'update') {
        await this.getSecureItem(id)
        promptObj.inputValue = this.inputValue
      }
      this.$prompt('请输入密保问题描述', '提示', promptObj).then(({ value }) => {
        type === 'add' ? this.addSecure(value) : this.updateSecure(id, value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        })
        // 关闭时清空输入框
        this.inputValue = ''
      })
    },

    // 对返回的数据进行处理
    handleSecureList(data) {
      data.forEach((item, index) => {
        item.number = index + 1
      })
      this.secureList = data
    }
  }

}
</script>

<style lang="stylus" scoped>

</style>