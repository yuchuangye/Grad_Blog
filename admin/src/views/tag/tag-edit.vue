<template>
  <div class="tag-edit">
    <el-card class="box-card">
      <h1 class="title">{{ id ? '更新' : '新建' }}标签</h1>
      <el-select v-model="model.parent" placeholder="请选择">
        <el-option label="无上级标签" value="" :disabled="!!(id && !editFlag)" />
        <el-option
          v-for="item in tagOneList"
          :key="item._id"
          :label="item.name"
          :value="item._id"
          :disabled="!!(id && editFlag)"
        />
      </el-select>
      <el-input v-model="model.name" placeholder="请输入标签名称" />
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :headers="uploadHeaders"
        :on-success="uploadSuccess"
      >
        <img v-if="model.icon" :src="model.icon" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
      <div class="save">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import tag from '@/api/tag.js'
import ele_upload from '@/mixins/ele_upload.js'
export default {
  name: 'TagEdit',
  mixins: [ele_upload],
  props: {
    id: { type: String, default: '' } // 更新的标签ID
  },
  data() {
    return {
      model: { // 当前标签数据
        name: '',
        icon: '',
        parent: ''
      },
      tagOneList: [], // 一级标签数据
      editFlag: true // 标记要更新的标签是一级还是二级, true为一级
    }
  },
  watch: {
    $route() {
      if (this.id) {
        this.getItemTag()
      } else {
        this.model.name = ''
        this.model.icon = ''
        this.model.parent = ''
      }
    }
  },
  mounted() {
    this.getTagOneList()
    this.id && this.getItemTag()
  },
  methods: {

    // 新增或更新标签
    async save() {
      const { name, icon, parent } = this.model
      const tag_id = this.id
      if (tag_id) {
        // 更新标签

        if (!name && !icon && !parent) {
          return this.$message({ type: 'error', message: '至少要填写一项' })
        }
        this.updateTag()
      } else {
        // 新增标签

        if (!name) { return this.$message({ type: 'error', message: '标签名字不能为空' }) }
        if (name.length > 8) { return this.$message({ type: 'error', message: '标签名字不能大于8个字符' }) }

        this.addTag()
      }
    },

    // 获取一级标签数据
    async getTagOneList() {
      const res = await tag.tagOneList({ params: { page: 1, pageSize: 9999 }})
      if (res.code === 0) {
        this.tagOneList = res.data.tagList
      }
    },

    // 获取标签详情
    async getItemTag() {
      const res = await tag.itemTag({ id: this.id })
      if (res.code === 0) {
        const { tag } = res.data
        this.model.name = tag.name
        this.model.icon = tag.icon
        this.model.parent = tag.parent
        this.editFlag = !tag.parent
      }
    },

    // 新增标签
    async addTag() {
      const res = await tag.addTag({ data: this.model })
      if (res.code === 0) {
        this.$message({ type: 'success', message: res.msg })
        // 跳转到列表页
        this.$router.push('/tag/list')
      }
    },

    // 更新标签
    async updateTag() {
      const res = await tag.updateTag({ id: this.id, data: this.model })
      if (res.code === 0) {
        this.$message({ type: 'success', message: res.msg })
        // 跳转到列表页
        this.$router.push('/tag/list')
      }
    }

  }
}
</script>

<style lang="stylus" scoped>
@import "../../stylus/variable.styl"
.tag-edit
  .box-card
    width: 520px
    box-shadow: none
    .title, .el-select, .el-input
      margin-bottom: 30px
    .title
      font-size: $font-s
    .el-input
      width: 70%
    .save
      margin-top: 30px
</style>

