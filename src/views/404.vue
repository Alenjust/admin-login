<template>
  <el-col :sm="12" :lg="6">
    <el-result icon="warning" title="404提示" sub-title="你找的的页面走丢了！">
      <template #extra>
        <el-button type="primary" @click="$router.push('/')"
          >点击回到首页</el-button
        >
      </template>
    </el-result>
  </el-col>
</template>