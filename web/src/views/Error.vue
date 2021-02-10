<template>
  <div class="error">
    <div class="container">
      <div class="image m-auto of-hidden w-80"><img class="block w-100" src="../assets/404.gif"></div>
      <div class="info m-auto flex fd-col w-80">
        <span class="oops text-main fw-700">OOPS!</span>
        <span class="sorry fw-700">很抱歉，页面它不小心迷路了！</span>
        <span class="guide">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</span>
        <el-button type="primary" class="w-20" @click="$router.push('/home')">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style lang="scss" scoped>
.error {
  .image {
    padding: 4rem 0;
  }
  .oops {
    font-size: 3.2rem;
  }
  .sorry {
    font-size: 2.1rem;
    padding: .5rem 0;
    color: #606266;
  }
  .guide {
    color: #909399;
    font-size: 1.4rem;
    margin-bottom: 2.5rem;
  }
  /deep/ .el-button {
    font-size: 1.6rem;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
