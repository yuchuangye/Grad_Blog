<template>
  <div class="tag-edit">
    <el-card class="box-form-card">
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
        ref="upload"
        class="avatar-uploader"
        accept="image/*"
        :action="uploadUrl"
        :show-file-list="false"
        :file-list="fileList"
        :headers="uploadHeaders"
        :on-success="uploadSuccess"
        :auto-upload="false"
        :on-change="fileChange"
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
import tag from '@/api/tag'
import elm_upload from '@/mixins/elm_upload'
export default {
  name: 'TagEdit',
  mixins: [elm_upload],
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
      fileList: [], // 上传的文件列表，这里是用来防止多文件上传
      tagOneList: [], // 一级标签数据
      editFlag: true, // 标记要更新的标签是一级还是二级, true为一级
      initName: '', // 用于记录更新时用户名是否有改变
      initIcon: '', // 用于记录更新时图标是否有改变
      isUpload: false // 用于记录当前显示的图标已经上传到过服务器
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
      const { name, icon } = this.model
      const { id, initIcon } = this
      // 不管是新增还是更新标签名字都要存在，而且不能大于12个字符
      if (!name || name.length > 12) { return this.$message({ type: 'error', message: '标签名字不合法' }) }
      // 手动上传文件, 不使用 elm 的自动上传, 点击保存时才上传图片到服务器
      if (id) {
        // 更新时图标没改变
        if (icon === initIcon) {
          this.editTag()
        } else {
          // 根据当前显示的图标是否已经上传过服务器执行不同操作
          this.isUpload ? this.editTag() : this.$refs.upload.submit()
        }
      } else {
        // 新增时上传了图标
        if (icon) {
          // 根据当前显示的图标是否已经上传过服务器执行不同操作
          this.isUpload ? this.editTag() : this.$refs.upload.submit()
        } else {
          this.editTag()
        }
      }
    },

    // 获取一级标签数据
    async getTagOneList() {
      const res = await tag.tagOneList({ params: { page: 1, pageSize: 9999 }})
      if (res.code === 0) { this.tagOneList = res.data.tagList }
    },

    // 获取标签详情
    async getItemTag() {
      const id = this.id
      const res = await tag.itemTag({ id })
      if (res.code === 0) {
        const { tag } = res.data
        this.model.name = tag.name
        this.model.icon = tag.icon
        this.model.parent = tag.parent || ''
        // 没有 parent字段表示是一级标签
        this.editFlag = !tag.parent
        // 记录下标签的初始名字和图标
        this.initName = tag.name
        this.initIcon = tag.icon
      }
    },

    // 新增标签
    async addTag(data) {
      const res = await tag.addTag({ data })
      if (res.code === 0) {
        this.$message({ type: 'success', message: res.msg })
        // 跳转到列表页
        this.$router.push('/tag/list')
      }
    },

    // 更新标签
    async updateTag(data) {
      const id = this.id
      const res = await tag.updateTag({ id, data })
      if (res.code === 0) {
        this.$message({ type: 'success', message: res.msg })
        // 跳转到列表页
        this.$router.push('/tag/list')
      }
    },

    // 处理请求参数以及发送请求
    async editTag() {
      const { name } = this.model
      const { id, initName } = this

      // 请求参数
      const params = {}
      // 过滤出 tag 信息中不为空的字段
      for (const key in this.model) {
        if (this.model[key]) { params[key] = this.model[key] }
      }
      // 更新 id 判断是更新还是新增
      if (id) {
        // 判断名字是否有改变, 没有则删除参数中的 name 属性
        if (name === initName) { delete params.name }
        this.updateTag(params)
      } else {
        this.addTag(params)
      }
    },

    // 文件内容改变、上传成功和失败都会触发
    fileChange(file) {
      const that = this
      // 覆盖当前上传文件列表的项
      this.fileList = [file]
      const fr = new FileReader()
      fr.readAsDataURL(file.raw)
      // this.result 是图片的 base64编码, 用于本地预览图片
      fr.onloadend = function() {
        // 文件状态改变时
        if (file.status === 'ready') {
          // 标记当前显示的图标为未上传状态
          that.isUpload = false
          that.model.icon = this.result
        }
      }
    },

    // 文件上传成功时触发
    uploadSuccess(res) {
      // 真实url 覆盖 预览时的 base64 字符串
      this.model.icon = res.data.url
      this.isUpload = true
      this.editTag()
    }

  }
}
</script>

<style lang="stylus" scoped>

</style>

