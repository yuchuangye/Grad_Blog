<template>
  <div id="goods-add">
    <el-table
      :data="goodsDetail"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="描述">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getTableData } from '@/api/table'

  export default {
    name: 'GoodsDetails',
    data () {
      return {
        goodsDetail: []
      }
    },
    mounted () {
      this.getGoodsDetail()
    },
    methods: {
      async getGoodsDetail () {
        const res = await getTableData()
        this.goodsDetail = res.data
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>

