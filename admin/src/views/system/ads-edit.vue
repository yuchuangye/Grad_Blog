<template>
  <div class="ads-edit">
    <el-form label-position="right" label-width="80px">
      <el-card class="box-form-card">
        <h1 class="title">{{ id ? '更新' : '新增' }}广告位</h1>
        <el-input v-model="model.name" placeholder="请输入广告位名称" />
        <el-button class="add-btn" type="primary" size="small" @click="addAd">
          <i class="el-icon-plus" style="margin-right:5px" />添加广告项
        </el-button>
        <el-row>
          <el-col v-for="(item, index) in model.items" :key="index" :md="24" style="margin-top: 30px">
            <el-form-item label="链接(url)">
              <el-input v-model="item.url" placeholder="请输入图片跳转链接" />
            </el-form-item>
            <el-form-item label="广告图">
              <el-upload
                class="avatar-uploader"
                accept="image/*"
                :action="uploadUrl"
                :show-file-list="false"
                :headers="uploadHeaders"
                :on-success="uploadSuccess"
              >
                <img
                  v-if="item.image && isImage"
                  :src="item.image"
                  class="banner"
                  @error="imgLoadError"
                  @click="uploadImageIndex=index"
                >
                <i v-else class="el-icon-plus banner-uploader-icon" @click="uploadImageIndex=index" />
              </el-upload>
            </el-form-item>
            <el-form-item style="text-align: right">
              <el-button type="danger" size="small" @click="delAd(index)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <div class="save">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import ad from '@/api/ad'
import elm_upload from '@/mixins/elm_upload'
export default {
  name: 'AdsEdit',
  mixins: [elm_upload],
  props: {
    id: { type: String, default: '' } // 更新的广告位ID
  },
  data() {
    return {
      model: {
        name: '',
        items: []
      },
      isImage: true, // 用于解决上传组件中图片偶尔不显示问题
      uploadImageIndex: 0 // 用来标记上传的是哪个广告项的图片
    }
  },
  watch: {
    $route() {
      if (this.id) {
        this.getItemAds()
      } else {
        this.model.name = ''
        this.model.items = []
      }
    }
  },
  mounted() {
    this.id && this.getItemAds()
  },
  methods: {

    // 新增或更新广告位
    async save() {
      const { name } = this.model
      const id = this.id
      // 名字不能为空
      if (!name) { return this.$message({ type: 'error', message: '广告位名称不能为空' }) }
      // 根据id判断是新建还是编辑
      let res
      if (id) {
        res = await ad.updateAd({ id, data: this.model })
      } else {
        res = await ad.addAd({ data: this.model })
      }
      // 新增或更新广告位成功
      if (res.code === 0) {
        this.$message({ type: 'success', message: res.msg })
        this.$router.push('/system/ads-list')
      }
    },

    // 获取广告位详情
    async getItemAds() {
      const res = await ad.itemAd({ id: this.id })
      // 获取广告位详情成功
      if (res.code === 0) { this.model = res.data.ad }
    },

    // 添加广告位的一个广告项
    addAd() {
      this.model.items.push({ image: '', url: '' })
    },

    // 删除广告位的一个广告项
    delAd(index) {
      this.$confirm(`确认要删除该广告项?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 先前端删除数据，点保存时再提交后台
        this.model.items.splice(index, 1)
        this.$message({ type: 'success', message: '删除成功' })
      }).catch(() => {})
    },

    // 文件上传成功的回调函数
    uploadSuccess(res) {
      this.model.items[this.uploadImageIndex].image = res.data.url
      // 解决上传组件中图片偶尔不显示问题
      this.isImage = false
      this.$nextTick(() => { this.isImage = true })
    },

    // 图片加载失败触发
    imgLoadError() {
      // 解决上传组件中图片偶尔不显示问题
      this.model = JSON.parse(JSON.stringify(this.model))
      this.isImage = false
      this.$nextTick(() => { this.isImage = true })
    }

  }
}
</script>

<style lang="stylus" scoped>
@import "../../stylus/variable.styl"
.ads-edit
  .box-form-card
    position: relative
    max-width: 800px
    margin: 0 auto
    .add-btn
      position: absolute
      right: 20px
      top: 70px
    @media screen and (max-width: 520px)
      .add-btn
        position: static
      .el-input
        width: 100%
    @media screen and (max-width: 365px)
      .banner-uploader-icon
        width: 155px
  .save
    max-width: 800px
    margin: 50px auto
    margin-top: 30px
    text-align: right
</style>
