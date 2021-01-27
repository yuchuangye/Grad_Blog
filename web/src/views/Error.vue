<template>
  <div class="error">
    <div class="container">
      <div class="image m-auto of-hidden"><img class="block w-100" src="../assets/404_2.gif"></div>
      <div class="info m-auto flex fd-col">
        <span class="oops text-main fw-700">OOPS!</span>
        <span class="sorry fw-700">很抱歉，页面它不小心迷路了！</span>
        <span class="guide">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</span>
        <el-button type="primary" @click="$router.push('/home')">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style scoped lang="scss">
.error {
  .image {
    padding: 4rem 0;
    width: 80%;
  }
  .info {
    width: 80%;
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
      width: 20%;
      font-size: 1.6rem;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
  }
}
</style>
