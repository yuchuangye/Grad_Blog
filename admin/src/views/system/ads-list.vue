<template>
  <div class="ads-list">
    <el-card class="box-list-card data-list-card">
      <div class="left">
        <i class="el-icon-document" />
        <span class="title">数据列表</span>
      </div>
      <div class="right">
        <el-button size="small" @click="$router.push('/system/ads-add')">添加</el-button>
      </div>
    </el-card>
    <el-table :data="adList" border style="width: 100%">
      <el-table-column prop="number" label="编号" width="150" />
      <el-table-column prop="name" label="广告位名称" width="550" />
      <el-table-column prop="adNum" label="广告数量" width="350" />
      <el-table-column label="操作" min-width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push(`/system/ads-update/${scope.row._id}`)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delAd(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ad from '@/api/ad'
export default {
  name: 'AdsList',
  data() {
    return {
      adList: [] // 广告位列表
    }
  },
  mounted() {
    this.getAdList()
  },
  methods: {

    // 获取广告位列表
    async getAdList() {
      const res = await ad.adList()
      if (res.code === 0) {
        this.handleAdList(res.data.adList)
      }
    },

    // 删除广告位
    async delAd(row) {
      this.$confirm(`确认要删除广告位"${row.name}"?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await ad.delAd({ id: row._id })
        // 删除成功
        if (res.code === 0) {
          this.$message({ type: 'success', message: '删除成功' })
          this.getAdList()
        }
      }).catch(() => {})
    },

    // 对返回的数据进行处理
    handleAdList(data) {
      data.forEach((item, index) => {
        item.number = index + 1
        item.adNum = item.items.length
      })
      this.adList = data
    }

  }
}
</script>

<style lang="stylus" scoped>

</style>
